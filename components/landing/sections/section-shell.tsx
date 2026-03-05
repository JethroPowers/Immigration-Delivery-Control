"use client";

import { motion } from "framer-motion";

type SectionShellProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function SectionShell({ id, title, subtitle, children }: SectionShellProps) {
  return (
    <motion.section
      id={id}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="scroll-mt-24 py-14 md:py-16"
    >
      <div className="mb-7 space-y-3">
        <h2 className="text-balance text-[1.9rem] font-semibold tracking-tight md:text-[2.35rem] md:leading-[1.12]">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[0.98rem]">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}
