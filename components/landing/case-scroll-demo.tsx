"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStep } from "@/constants/landing";
import { cn } from "@/lib/utils";

type CaseScrollDemoProps = {
  steps: CaseStep[];
};

const statusVariant: Record<CaseStep["status"], "default" | "danger" | "success" | "secondary"> =
  {
    active: "default",
    blocked: "danger",
    ready: "success",
    waiting: "secondary"
  };

export function CaseScrollDemo({ steps }: CaseScrollDemoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    setActiveIndex((prev) => {
      const safeNext = Number.isFinite(next) ? next : 0;
      return prev === safeNext ? prev : safeNext;
    });
  });

  const activeStep = useMemo(() => steps[activeIndex] ?? steps[0], [activeIndex, steps]);

  return (
    <div ref={sectionRef} className="relative">
      <div className="mb-5 rounded-full border border-border/70 bg-muted/40 p-1">
        <motion.div
          className="h-1.5 rounded-full bg-primary"
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-border/70 bg-card/95 shadow-hero-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Active case panel</p>
                <p className="text-xs text-muted-foreground">
                  Step {activeIndex + 1} / {steps.length}
                </p>
              </div>
              <CardTitle className="text-lg">{activeStep.panel.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={statusVariant[activeStep.status]}>{activeStep.status}</Badge>
                <span className="text-sm text-muted-foreground">{activeStep.timeline}</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {activeStep.panel.details.map((detail) => (
                  <li key={detail} className="rounded-md bg-muted/40 px-3 py-2">
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {activeStep.panel.badges.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className={cn(
                "group relative min-h-[38vh] rounded-xl border border-border/70 bg-card/70 p-6 shadow-glow transition-colors",
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
              <motion.div
                initial={{ opacity: 0.4, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35 }}
                className="space-y-3 pl-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <Badge variant={index === activeIndex ? "default" : "outline"}>
                    {step.timeline}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.caption}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
