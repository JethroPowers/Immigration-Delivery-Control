"use client";

import { SectionShell } from "@/components/landing/sections/section-shell";
import { redQueueData } from "@/lib/demoData";

export function PartnerRedQueueSection() {
  return (
    <SectionShell id="partner-queue" title={redQueueData.title} subtitle={redQueueData.subtitle}>
      <div className="rounded-2xl border border-border/70 bg-card/90 p-5">
        <div className="mb-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-border/70 bg-background/70 px-3 py-2">
            <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Active matters</p>
            <p className="text-lg font-semibold">23</p>
          </div>
          <div className="rounded-lg border border-danger/35 bg-danger/10 px-3 py-2">
            <p className="text-xs uppercase tracking-[0.1em] text-danger/80">Partner exceptions</p>
            <p className="text-lg font-semibold text-danger">5</p>
          </div>
          <div className="rounded-lg border border-success/35 bg-success/10 px-3 py-2">
            <p className="text-xs uppercase tracking-[0.1em] text-success/80">Weekly partner time recovered</p>
            <p className="text-lg font-semibold text-success">8-10h</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Before</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Partners are pulled into routine status checks, chase decisions, and avoidable back-and-forth across 23 active matters.
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/75 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">After</p>
            <p className="mt-2 text-sm">
              AI handles routine loops. Partner queue shows only the 5 cases that need legal or supervisory judgment.
            </p>
          </div>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {redQueueData.cases.map((entry) => (
            <li key={entry} className="rounded-md border border-border/70 bg-background/75 px-3 py-2">
              {entry}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-md border border-success/35 bg-success/10 px-3 py-2 text-sm text-success">
          8-10 hours/week saved by removing routine partner interruptions.
        </p>
      </div>
    </SectionShell>
  );
}
