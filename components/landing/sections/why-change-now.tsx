"use client";

import { motion } from "framer-motion";

import { whyChangeNow, whyChangeNowCards } from "@/lib/demoData";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function WhyChangeNow() {
  return (
    <SectionShell id="why-change-now" title={whyChangeNow.title}>
      <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[0.98rem]">
        <p>{whyChangeNow.paragraphOne}</p>
        <p>{whyChangeNow.paragraphTwo}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {whyChangeNowCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ y: -2 }}
          >
            <Card className="h-full border-border/70 bg-card/90">
              <CardContent className="space-y-2 p-5">
                <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
