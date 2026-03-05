"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

import {
  heroBenefits,
  heroContent,
  paralegalVsAi,
  roiHeroHighlight
} from "@/lib/demoData";
import { trackEvent } from "@/lib/analytics";
import { useExperimentVariant } from "@/lib/experiments";
import { SocialProofTicker } from "@/components/landing/social-proof-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const headlineVariant = useExperimentVariant("hero_headline_variant", "a");
  const ctaVariant = useExperimentVariant("cta_label_variant", "a");

  const title =
    headlineVariant === "b"
      ? "Stop chasing documents while you sleep.\nHandle exceptions only."
      : heroContent.title;

  const primaryCta =
    ctaVariant === "b" ? "See it working" : ctaVariant === "c" ? "Calculate savings" : heroContent.primaryCta;

  const valuePillars = [
    "Faster time to submission-ready",
    "Fewer document chase loops",
    "Fewer partner interruptions"
  ];

  return (
    <section className="container scroll-mt-24 py-9 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-5xl space-y-6"
      >
        <div className="space-y-4 text-center">
          <Badge variant="secondary" className="rounded-md px-3 py-1 text-xs">
            {heroContent.eyebrow}
          </Badge>
          <h1 className="text-balance whitespace-pre-line text-[2.3rem] font-semibold tracking-tight md:text-[3.95rem] md:leading-[1.03]">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-[1.1rem]">{heroContent.subhead}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-glow">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Where time leaks today</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{heroContent.support}</p>
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{paralegalVsAi.title}</p>
              <p className="mt-2 text-sm text-foreground">{paralegalVsAi.manual}</p>
              <p className="mt-1 text-sm font-medium text-primary">{paralegalVsAi.ai}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-glow">
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">What gets automated</p>
            <ul className="space-y-2">
              {heroBenefits.map((benefit) => (
                <li key={benefit.text} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">ROI: {roiHeroHighlight.value}</p>
              <p className="text-xs text-muted-foreground">{roiHeroHighlight.note}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">{heroContent.trust}</p>

        <div className="mx-auto grid max-w-4xl gap-2 sm:grid-cols-3">
          {valuePillars.map((pillar) => (
            <p key={pillar} className="rounded-lg border border-border/70 bg-muted/25 px-3 py-2 text-center text-xs text-foreground">
              {pillar}
            </p>
          ))}
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            asChild
            onClick={() => trackEvent("hero_cta_click", { location: "hero", cta: "monthly" })}
            className="sm:min-w-[220px]"
          >
              <a href="#pricing">
              {primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            onClick={() => trackEvent("setup_call_booking", { location: "hero" })}
            className="sm:min-w-[220px]"
          >
            <a href="mailto:jethropowers@outlook.com?subject=15-minute%20setup%20call">{heroContent.secondaryCta}</a>
          </Button>
        </div>

        <SocialProofTicker />
      </motion.div>
    </section>
  );
}

export const Hero = HeroSection;
