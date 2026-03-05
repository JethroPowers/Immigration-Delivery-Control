"use client";

import { whyCasesBreakBullets } from "@/lib/demoData";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function WhyCasesBreak() {
  return (
    <SectionShell
      id="why-cases-break"
      title="Why cases stall"
      subtitle="The core issue is operational friction, not legal effort."
    >
      <Card className="border-border/70 bg-card/90">
        <CardContent className="p-5 md:p-6">
          <ul className="grid gap-3 md:grid-cols-2">
            {whyCasesBreakBullets.map((bullet, index) => (
              <li key={bullet} className="flex gap-3 rounded-lg border border-border/70 bg-background/70 px-4 py-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[11px] font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </SectionShell>
  );
}
