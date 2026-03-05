"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { heroContent } from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container scroll-mt-24 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48 }}
        className="mx-auto flex min-h-[62vh] max-w-4xl flex-col items-center justify-center space-y-5 text-center"
      >
        <Badge variant="secondary" className="rounded-md px-3 py-1 text-xs">
          {heroContent.eyebrow}
        </Badge>
        <h1 className="text-balance whitespace-pre-line text-[2.2rem] font-semibold tracking-tight md:text-[3.85rem] md:leading-[1.02]">
          {heroContent.title}
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-[1.22rem]">{heroContent.subhead}</p>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[0.98rem]">
          {heroContent.support}
        </p>
        <p className="max-w-3xl text-xs text-muted-foreground md:text-sm">{heroContent.trust}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Button size="lg" asChild>
            <a href="#final-cta">
              {heroContent.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#single-case">{heroContent.secondaryCta}</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export const HeroSection = Hero;
