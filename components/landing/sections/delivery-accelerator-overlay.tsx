"use client";

import { motion } from "framer-motion";

import {
  overlayColumns,
  overlayPrimitives,
  overlaySection,
  proofTimelineSupport
} from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function DeliveryAcceleratorOverlay() {
  return (
    <SectionShell id="control-layer" title={overlaySection.title} subtitle={overlaySection.subtitle}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle className="text-xl">{overlayColumns.left.title}</CardTitle>
            <CardDescription>Useful foundation, but not designed to run delivery acceleration loops.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {overlayColumns.left.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="mb-1">
              <Badge variant="default">Overlay mode</Badge>
            </div>
            <CardTitle className="text-xl">{overlayColumns.right.title}</CardTitle>
            <CardDescription>
              Focused on moving matters to submission-ready with less chasing and fewer interruptions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {overlayColumns.right.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {overlayPrimitives.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-border/70 bg-card/90 p-5"
          >
            <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        {proofTimelineSupport}
      </div>
    </SectionShell>
  );
}
