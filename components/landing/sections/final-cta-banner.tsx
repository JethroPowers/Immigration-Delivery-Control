"use client";

import { motion } from "framer-motion";
import { CircleAlert } from "lucide-react";

import { finalCta, heroContent } from "@/lib/demoData";
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
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground md:text-base">{finalCta.body}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <CircleAlert className="h-4 w-4 text-danger" />
          <span>{finalCta.sub}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <a href="mailto:jethropowers@outlook.com?subject=Focused%2090-day%20pilot%20conversation">{heroContent.primaryCta}</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#single-case">{heroContent.secondaryCta}</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
