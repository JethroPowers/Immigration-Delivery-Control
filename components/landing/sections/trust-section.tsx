"use client";

import type { ReactNode } from "react";
import { FileCheck2, KeyRound, LockKeyhole, ShieldCheck, TimerReset } from "lucide-react";

import { securityItems, trustBullets } from "@/lib/demoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function TrustSection() {
  return (
    <SectionShell
      id="trust"
      title="Designed for regulated delivery"
      subtitle="Control and auditability stay as supporting proof for the speed and convenience promise."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70 bg-card/90">
          <CardContent className="p-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {trustBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Security controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <SecurityChip icon={<LockKeyhole className="h-4 w-4" />} label={securityItems[0]} />
              <SecurityChip icon={<KeyRound className="h-4 w-4" />} label={securityItems[1]} />
              <SecurityChip icon={<ShieldCheck className="h-4 w-4" />} label={securityItems[2]} />
              <SecurityChip icon={<TimerReset className="h-4 w-4" />} label={securityItems[3]} />
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}

function SecurityChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-background/70 px-3 py-2 text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

export const Trust = TrustSection;
