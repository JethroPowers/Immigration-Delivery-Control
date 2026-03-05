"use client";

import { motion } from "framer-motion";

import { outcomeCards } from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function OutcomeScorecards() {
  return (
    <section id="outcome-scorecards" className="container scroll-mt-24 pb-8 md:pb-10">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {outcomeCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
          >
            <Card className="h-full border-border/70 bg-card/90 shadow-glow">
              <CardContent className="space-y-3 p-4">
                <p className="text-sm font-medium">{card.title}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Tracked</Badge>
                  <Badge variant="secondary">Pilot outcome</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{card.microcopy}</p>
                <div className="rounded-md border border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                  {card.tracked} {"->"} {card.pilotOutcome}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
