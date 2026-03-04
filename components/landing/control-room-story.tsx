"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CircleDot } from "lucide-react";

import { MermaidDiagram } from "@/components/landing/mermaid-diagram";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mapDefinitions, mapOverviewDefinitions, mapStorySteps } from "@/constants/landing";
import { cn } from "@/lib/utils";

function microcopyTone(text: string): "danger" | "secondary" | "success" | "outline" {
  const lower = text.toLowerCase();
  if (
    lower.startsWith("blocked") ||
    lower.startsWith("needs fix") ||
    lower.startsWith("update overdue") ||
    lower.includes("timing invalid")
  ) {
    return "danger";
  }
  if (lower.startsWith("verified")) return "success";
  if (lower.startsWith("waiting")) return "secondary";
  return "outline";
}

function legendTone(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("blocked")) return "text-danger";
  if (lower.includes("waiting")) return "text-amber-500";
  if (lower.includes("ready") || lower.includes("verified")) return "text-success";
  return "text-primary";
}

export function ControlRoomStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(mapStorySteps.length - 1, Math.floor(latest * mapStorySteps.length));
    setActiveIndex((prev) => {
      const safeNext = Number.isFinite(next) ? next : 0;
      return prev === safeNext ? prev : safeNext;
    });
  });

  const activeStep = useMemo(() => mapStorySteps[activeIndex] ?? mapStorySteps[0], [activeIndex]);
  const activeMap = showDetail ? mapDefinitions[activeStep.id] : mapOverviewDefinitions[activeStep.id];

  return (
    <div ref={sectionRef} className="relative">
      <div className="mb-5 rounded-full border border-border/70 bg-muted/40 p-1">
        <motion.div
          className="h-1.5 rounded-full bg-primary"
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="border-border/70 bg-card/95 shadow-hero-soft">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary">What partner sees right now</Badge>
                <p className="text-xs text-muted-foreground">
                  {activeIndex + 1} / {mapStorySteps.length}
                </p>
              </div>
              <CardTitle>{activeStep.title}</CardTitle>
              <CardDescription>{activeStep.benefit}</CardDescription>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={showDetail ? "default" : "outline"}
                  onClick={() => setShowDetail((prev) => !prev)}
                >
                  {showDetail ? "Show high-level" : "Show detail"}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {showDetail ? "Detailed map" : "High-level map"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <MermaidDiagram chart={activeMap} title={`${activeStep.title} map`} />

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

              <div className="space-y-2">
                {activeStep.microcopy.map((line) => (
                  <Badge key={line} variant={microcopyTone(line)} className="mr-2 mb-2">
                    {line}
                  </Badge>
                ))}
              </div>

              <p className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground">
                {activeStep.payoff}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          {mapStorySteps.map((step, index) => (
            <article
              key={step.id}
              className={cn(
                "group relative min-h-[44vh] rounded-xl border border-border/70 bg-card/70 p-6 shadow-glow transition-colors",
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
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={index === activeIndex ? "default" : "outline"}>{step.label}</Badge>
                  <span className="text-xs text-muted-foreground">{step.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
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
                <div className="flex flex-wrap gap-2">
                  {step.outcomes.map((outcome) => (
                    <Badge key={outcome} variant="secondary" className="rounded-full">
                      {outcome}
                    </Badge>
                  ))}
                </div>
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
  );
}
