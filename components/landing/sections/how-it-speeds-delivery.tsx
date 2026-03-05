"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CircleDot } from "lucide-react";

import {
  deliveryMapSteps,
  mapDetailDefinitions,
  mapOverviewDefinitions
} from "@/lib/demoData";
import { cn } from "@/lib/utils";
import { MermaidDiagram } from "@/components/landing/mermaid-diagram";
import { SectionShell } from "@/components/landing/sections/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function microcopyVariant(text: string): "danger" | "secondary" | "success" | "outline" {
  const normalized = text.toLowerCase();
  if (normalized.includes("blocked") || normalized.includes("needs fix") || normalized.includes("overdue")) {
    return "danger";
  }
  if (normalized.includes("verified") || normalized.includes("ready")) {
    return "success";
  }
  if (normalized.includes("waiting")) {
    return "secondary";
  }
  return "outline";
}

function legendTone(item: string) {
  const normalized = item.toLowerCase();
  if (normalized.includes("blocked")) return "text-danger";
  if (normalized.includes("waiting")) return "text-amber-500";
  if (normalized.includes("ready")) return "text-success";
  return "text-primary";
}

export function HowItSpeedsDelivery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(deliveryMapSteps.length - 1, Math.floor(progress * deliveryMapSteps.length));
    if (Number.isFinite(next)) {
      setActiveIndex((previous) => (previous === next ? previous : next));
    }
  });

  const activeStep = useMemo(() => deliveryMapSteps[activeIndex] ?? deliveryMapSteps[0], [activeIndex]);
  const chart = showDetail ? mapDetailDefinitions[activeStep.id] : mapOverviewDefinitions[activeStep.id];

  return (
    <SectionShell
      id="how-it-works"
      title="How it speeds delivery"
      subtitle="One sticky partner view while the operator flow, evidence loop, and overlay architecture move as you scroll."
    >
      <div ref={sectionRef} className="relative">
        <div className="mb-5 rounded-full border border-border/70 bg-muted/40 p-1">
          <motion.div className="h-1.5 rounded-full bg-primary" style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border/70 bg-card/95 shadow-hero-soft">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">What partner sees right now</Badge>
                  <p className="text-xs text-muted-foreground">
                    {activeIndex + 1} / {deliveryMapSteps.length}
                  </p>
                </div>
                <CardTitle className="text-xl">{activeStep.title}</CardTitle>
                <CardDescription>{activeStep.after}</CardDescription>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={showDetail ? "default" : "outline"}
                    onClick={() => setShowDetail((previous) => !previous)}
                  >
                    {showDetail ? "Show high-level" : "Show detail"}
                  </Button>
                  <span className="text-xs text-muted-foreground">{showDetail ? "Detailed map" : "High-level map"}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <MermaidDiagram chart={chart} title={`${activeStep.title} diagram`} />

                <div className="rounded-md border border-border/70 bg-muted/30 p-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">Legend</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {activeStep.legend.map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <CircleDot className={cn("h-3.5 w-3.5", legendTone(item))} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeStep.microcopy.map((line) => (
                    <Badge key={line} variant={microcopyVariant(line)}>
                      {line}
                    </Badge>
                  ))}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {activeStep.outcomes.map((outcome) => (
                    <div key={outcome} className="rounded-md border border-border/70 bg-background/70 px-3 py-2 text-xs text-foreground">
                      {outcome}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-10">
            {deliveryMapSteps.map((step, index) => (
              <article
                key={step.id}
                className={cn(
                  "group relative min-h-[44vh] rounded-xl border border-border/70 bg-card/75 p-6 shadow-glow transition-colors",
                  index === activeIndex && "border-primary/50 bg-card"
                )}
              >
                <div
                  className={cn(
                    "absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-muted-foreground/30 transition-colors",
                    index <= activeIndex && "bg-primary"
                  )}
                  aria-hidden
                />

                <div className="space-y-4 pl-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant={index === activeIndex ? "default" : "outline"}>{step.label}</Badge>
                    <span className="text-xs text-muted-foreground">Map {index + 1}</span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-sm">
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Before</p>
                      <p className="mt-1 text-muted-foreground">{step.before}</p>
                    </div>
                    <div className="rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm">
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">After</p>
                      <p className="mt-1 text-foreground">{step.after}</p>
                    </div>
                  </div>

                  <p className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground">
                    {step.payoff}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-primary/35 bg-primary/5 p-5 text-center">
          <h3 className="text-lg font-semibold">See this on your current caseload</h3>
          <p className="mt-2 text-sm text-muted-foreground">No platform replacement required.</p>
          <div className="mt-4">
            <Button asChild>
              <a href="#final-cta">See this on your current caseload</a>
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
