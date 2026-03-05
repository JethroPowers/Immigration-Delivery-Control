"use client";

import { motion } from "framer-motion";

import { clientConvenienceCards, clientConvenienceNote } from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function ClientConvenience() {
  return (
    <SectionShell
      id="client-convenience"
      title="Client convenience that reduces chasing."
      subtitle="Personalisation is operational: clearer requests and clearer progress reduce back-and-forth."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {clientConvenienceCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ y: -2 }}
          >
            <Card className="h-full border-border/70 bg-card/90">
              <CardContent className="space-y-4 p-5">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
                </div>

                <div className="rounded-lg border border-border/70 bg-background/75 p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-foreground">{card.mockTitle}</p>
                    <Badge variant="outline" className="text-[11px]">
                      Live pattern
                    </Badge>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {card.mockLines.map((line) => (
                      <li key={line} className="rounded border border-border/70 bg-muted/35 px-2.5 py-1.5">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
        {clientConvenienceNote}
      </p>
    </SectionShell>
  );
}
