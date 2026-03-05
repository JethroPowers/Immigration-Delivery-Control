"use client";

import { ArrowUpRight } from "lucide-react";

import { founderStrip } from "@/lib/demoData";

export function FounderStrip() {
  return (
    <section id="founder-strip" className="container scroll-mt-24 py-12 md:py-14">
      <div className="rounded-xl border border-border/70 bg-card/90 p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Human credibility</p>
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight md:text-3xl">{founderStrip.title}</h2>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          {founderStrip.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <a
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          href="mailto:jethropowers@outlook.com?subject=London%20Immigration%20Ops%20Research%20Summary"
        >
          {founderStrip.cta}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
