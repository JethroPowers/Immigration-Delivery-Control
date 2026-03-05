"use client";

import { motion } from "framer-motion";

import { weekOneSteps } from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function Week1Value() {
  return (
    <SectionShell
      id="week-1-value"
      title="What you get in week 1"
      subtitle="Specific setup actions that create visible unblock wins fast on live matters."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {weekOneSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
          >
            <Card className="h-full border-border/70 bg-card/90">
              <CardContent className="space-y-3 p-5">
                <Badge variant="outline">{step.day}</Badge>
                <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 rounded-lg border border-primary/35 bg-primary/5 px-4 py-3 text-sm text-foreground">
        No platform replacement required to see week-1 value.
      </p>
    </SectionShell>
  );
}
