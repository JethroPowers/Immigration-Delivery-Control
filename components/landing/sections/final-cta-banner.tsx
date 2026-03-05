"use client";

import { motion } from "framer-motion";

import { finalCta, finalCtaTimeline } from "@/lib/demoData";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function FinalCtaBanner() {
  return (
    <section id="final-cta" className="container scroll-mt-24 py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-card to-success/10 p-8 shadow-hero-soft md:p-10"
      >
        <div className="absolute -right-14 -top-12 h-36 w-36 rounded-full bg-primary/30 blur-3xl" aria-hidden />

        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{finalCta.title}</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">{finalCta.body}</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-background/75 p-4">
            <p className="text-sm font-medium">CasePiiotAI monthly plan (£395/month)</p>
            <p className="mt-2 text-sm text-muted-foreground">{finalCta.sub}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button asChild onClick={() => trackEvent("monthly_cta_click", { location: "final" })}>
                <a href="#pricing">Start monthly</a>
              </Button>
              <Button asChild variant="outline" onClick={() => trackEvent("setup_call_booking", { location: "final" })}>
                <a href="mailto:jethropowers@outlook.com?subject=15-minute%20setup%20call">Book 15-min setup call</a>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/90 p-4">
            <p className="text-sm font-medium">What happens next</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {finalCtaTimeline.map((item) => (
                <li key={item} className="rounded-md border border-border/70 bg-background/75 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
