"use client";

import { motion } from "framer-motion";
import { CircleAlert, CircleCheck } from "lucide-react";

import {
  focusedPilot,
  notForBullets,
  pilotMetrics,
  pilotSectionCopy,
  rolloutOffer
} from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function PilotSection() {
  return (
    <SectionShell id="pilot" title={pilotSectionCopy.title} subtitle={pilotSectionCopy.subtitle}>
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full border-primary/30 bg-primary/5">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Operational pilot</Badge>
                <Badge variant="outline">Partner-led delivery teams</Badge>
              </div>
              <CardTitle className="text-2xl">{focusedPilot.title}</CardTitle>
              <p className="text-2xl font-semibold tracking-tight">{focusedPilot.price}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{focusedPilot.subtext}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Scope</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {focusedPilot.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border/70 bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Operational outcomes the pilot targets</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {focusedPilot.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border/70 bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Week-1 deliverable</p>
                <p className="mt-2 text-sm text-foreground">{focusedPilot.weekOneDeliverable}</p>
              </div>

              <Button asChild className="w-full">
                <a href="#final-cta">{focusedPilot.cta}</a>
              </Button>

              <p className="text-xs text-muted-foreground">{focusedPilot.note}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, delay: 0.04 }}
        >
          <Card className="h-full border-border/70 bg-card/90">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Scale after proof</Badge>
                <Badge variant="outline">Structured commercial model</Badge>
              </div>
              <CardTitle className="text-2xl">{rolloutOffer.title}</CardTitle>
              <p className="text-2xl font-semibold tracking-tight">{rolloutOffer.price}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{rolloutOffer.subtext}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Includes</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {rolloutOffer.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button asChild className="w-full" variant="outline">
                <a href="#final-cta">{rolloutOffer.cta}</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-xl">{pilotSectionCopy.metricsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pilotMetrics.map((metric) => (
                <li key={metric} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-background/75">
          <CardHeader>
            <CardTitle className="text-xl">Who this is not for</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notForBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}

export const Pilot = PilotSection;
