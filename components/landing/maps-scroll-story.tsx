"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { MermaidDiagram } from "@/components/landing/mermaid-diagram";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mapDefinitions, mapStorySteps } from "@/constants/landing";
import { cn } from "@/lib/utils";

export function MapsScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(mapStorySteps.length - 1, Math.floor(latest * mapStorySteps.length));
    setActiveIndex((prev) => {
      const safeNext = Number.isFinite(next) ? next : 0;
      return prev === safeNext ? prev : safeNext;
    });
  });

  const activeStep = useMemo(() => mapStorySteps[activeIndex] ?? mapStorySteps[0], [activeIndex]);

  return (
    <div ref={sectionRef} className="relative">
      <div className="mb-5 rounded-full border border-border/70 bg-muted/40 p-1">
        <motion.div
          className="h-1.5 rounded-full bg-primary"
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-border/70 bg-card/95 shadow-hero-soft">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary">Auto-scroll map view</Badge>
                <p className="text-xs text-muted-foreground">
                  {activeIndex + 1} / {mapStorySteps.length}
                </p>
              </div>
              <CardTitle>{activeStep.title}</CardTitle>
              <CardDescription>{activeStep.benefit}</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram
                chart={mapDefinitions[activeStep.id]}
                title={`${activeStep.title} diagram`}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          {mapStorySteps.map((step, index) => (
            <article
              key={step.id}
              className={cn(
                "group relative min-h-[42vh] rounded-xl border border-border/70 bg-card/70 p-6 shadow-glow transition-colors",
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
                <Badge variant={index === activeIndex ? "default" : "outline"}>{step.label}</Badge>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <p className="rounded-md border border-border/70 bg-muted/40 px-3 py-2 text-sm text-foreground">
                  {step.benefit}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
