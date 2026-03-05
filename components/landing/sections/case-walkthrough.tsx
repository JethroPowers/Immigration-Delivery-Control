"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { caseWalkthroughSteps } from "@/lib/demoData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

const statusVariant: Record<
  (typeof caseWalkthroughSteps)[number]["status"],
  "default" | "danger" | "success" | "secondary"
> = {
  active: "default",
  blocked: "danger",
  ready: "success",
  waiting: "secondary"
};

export function CaseWalkthrough() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(caseWalkthroughSteps.length - 1, Math.floor(progress * caseWalkthroughSteps.length));
    if (Number.isFinite(next)) {
      setActiveIndex((previous) => (previous === next ? previous : next));
    }
  });

  const activeStep = useMemo(() => caseWalkthroughSteps[activeIndex] ?? caseWalkthroughSteps[0], [activeIndex]);

  return (
    <SectionShell
      id="single-case"
      title="A single case, end-to-end"
      subtitle="Every stage is explicit, and each stage has a speed effect so the team can move with fewer chases."
    >
      <div ref={sectionRef} className="relative">
        <div className="mb-5 rounded-full border border-border/70 bg-muted/40 p-1">
          <motion.div className="h-1.5 rounded-full bg-primary" style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-border/70 bg-card/95 shadow-hero-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Active case panel</p>
                  <p className="text-xs text-muted-foreground">
                    Step {activeIndex + 1} / {caseWalkthroughSteps.length}
                  </p>
                </div>
                <CardTitle className="text-lg">{activeStep.panelTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={statusVariant[activeStep.status]}>{activeStep.status}</Badge>
                  <Badge variant="outline">{activeStep.timeline}</Badge>
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  {activeStep.panelDetails.map((detail) => (
                    <li key={detail} className="rounded-md border border-border/70 bg-background/75 px-3 py-2">
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {activeStep.panelBadges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <p className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground">
                  {activeStep.speedEffect}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-10">
            {caseWalkthroughSteps.map((step, index) => (
              <article
                key={step.id}
                className={cn(
                  "group relative min-h-[38vh] rounded-xl border border-border/70 bg-card/75 p-6 shadow-glow transition-colors",
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

                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                    <Badge variant={index === activeIndex ? "default" : "outline"}>{step.timeline}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.caption}</p>
                  <p className="rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-sm text-foreground">
                    {step.speedEffect}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
