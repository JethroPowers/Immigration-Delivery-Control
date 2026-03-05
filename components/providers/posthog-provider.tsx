"use client";

import { useEffect } from "react";

import { analyticsEnabled } from "@/lib/analytics";

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!analyticsEnabled()) return;

    let active = true;

    const init = async () => {
      const { default: posthog } = await import("posthog-js");
      if (!active) return;

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (instance) => {
          if (typeof window !== "undefined") {
            window.posthog = {
              capture: instance.capture.bind(instance),
              getFeatureFlag: instance.getFeatureFlag.bind(instance),
              onFeatureFlags: instance.onFeatureFlags.bind(instance)
            };
          }
        }
      });
    };

    void init();

    return () => {
      active = false;
    };
  }, []);

  return <>{children}</>;
}
