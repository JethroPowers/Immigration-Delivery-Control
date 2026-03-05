"use client";

declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
      getFeatureFlag?: (key: string) => string | boolean | undefined;
      onFeatureFlags?: (callback: () => void) => void;
    };
  }
}

export type AnalyticsEventName =
  | "hero_cta_click"
  | "hero_video_play"
  | "scenario_tab_view"
  | "roi_calculator_interaction"
  | "pricing_card_hover"
  | "monthly_cta_click"
  | "annual_cta_click"
  | "setup_call_booking"
  | "faq_question_open"
  | "exit_intent_shown"
  | "exit_intent_converted";

export function analyticsEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}

export function trackEvent(eventName: AnalyticsEventName, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!analyticsEnabled()) return;
  window.posthog?.capture(eventName, properties);
}
