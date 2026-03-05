"use client";

import { motion, useReducedMotion } from "framer-motion";

import { heroSocialProof } from "@/lib/demoData";

export function SocialProofTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/20 px-3 py-2">
      <motion.div
        className="flex w-max items-center gap-6 text-xs text-muted-foreground"
        animate={reduceMotion ? undefined : { x: [0, -320] }}
        transition={reduceMotion ? undefined : { repeat: Infinity, duration: 18, ease: "linear" }}
      >
        {[...heroSocialProof, ...heroSocialProof].map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-semibold text-foreground">{item.value}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
