"use client";

import { useEffect, useState } from "react";

import { analyticsEnabled } from "@/lib/analytics";

export function useExperimentVariant(flagKey: string, fallback: string) {
  const [variant, setVariant] = useState(fallback);

  useEffect(() => {
    if (!analyticsEnabled()) {
      setVariant(fallback);
      return;
    }

    const current = window.posthog?.getFeatureFlag?.(flagKey);
    if (typeof current === "string") {
      setVariant(current);
    }

    window.posthog?.onFeatureFlags?.(() => {
      const updated = window.posthog?.getFeatureFlag?.(flagKey);
      if (typeof updated === "string") {
        setVariant(updated);
      }
    });
  }, [flagKey, fallback]);

  return variant;
}
