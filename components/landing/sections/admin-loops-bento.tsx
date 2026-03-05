"use client";

import { motion } from "framer-motion";

import { adminLoopCards } from "@/lib/demoData";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function AdminLoopsBento() {
  return (
    <SectionShell
      id="admin-loops"
      title="Admin drops when the system runs the loops"
      subtitle="The workflow enforces consistent handoffs so cases move with fewer manual touches."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {adminLoopCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            whileHover={{ y: -2 }}
            className={
              index === 0 || index === 3
                ? "rounded-xl border border-border/70 bg-card/90 p-5 md:col-span-2"
                : "rounded-xl border border-border/70 bg-card/90 p-5"
            }
          >
            <h3 className="text-base font-semibold tracking-tight">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
