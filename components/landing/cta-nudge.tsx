"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function CtaNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = window.scrollY / max;
      if (progress >= 0.6) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-40 max-w-sm rounded-xl border border-border/70 bg-background/95 p-4 shadow-hero-soft"
    >
      <p className="text-sm font-semibold">Ready to stop document chasing?</p>
      <p className="mt-1 text-xs text-muted-foreground">Start CasePiiotAI at £395/month and keep partners focused on exceptions only.</p>
      <div className="mt-3 flex gap-2">
        <Button asChild size="sm" onClick={() => trackEvent("monthly_cta_click", { location: "nudge" })}>
          <a href="#pricing">Start monthly</a>
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setDismissed(true)}>
          Dismiss
        </Button>
      </div>
    </motion.aside>
  );
}
