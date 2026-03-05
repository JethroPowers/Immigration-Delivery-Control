"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AdminLoopsBento } from "@/components/landing/sections/admin-loops-bento";
import { CaseWalkthrough } from "@/components/landing/sections/case-walkthrough";
import { ClientConvenience } from "@/components/landing/sections/client-convenience";
import { DeliveryAcceleratorOverlay } from "@/components/landing/sections/delivery-accelerator-overlay";
import { FaqSection } from "@/components/landing/sections/faq-section";
import { FinalCtaBanner } from "@/components/landing/sections/final-cta-banner";
import { FounderStrip } from "@/components/landing/sections/founder-strip";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { HowItSpeedsDelivery } from "@/components/landing/sections/how-it-speeds-delivery";
import { OutcomeScorecards } from "@/components/landing/sections/outcome-scorecards";
import { PilotSection } from "@/components/landing/sections/pilot-section";
import { PortfolioBoardMock } from "@/components/landing/sections/portfolio-board-mock";
import { SiteFooter } from "@/components/landing/sections/site-footer";
import { StackStrip } from "@/components/landing/sections/stack-strip";
import { TrustSection } from "@/components/landing/sections/trust-section";
import { Week1Value } from "@/components/landing/sections/week1-value";
import { WhyCasesBreak } from "@/components/landing/sections/why-cases-break";
import { WhyChangeNow } from "@/components/landing/sections/why-change-now";
import { heroContent, navItems } from "@/lib/demoData";

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const lightDarkMix = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0, 0.03, 0.1, 0.14]);
  const darkLightMix = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.03, 0.07]);

  return (
    <div className="relative pb-16">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-[-14rem] z-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.25)_0%,_transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-soft-grid bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,white,transparent_75%)] opacity-[0.22]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 dark:hidden bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.22)_100%)]"
        style={{ opacity: reduceMotion ? 0.08 : lightDarkMix }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden dark:block bg-[radial-gradient(ellipse_at_top,rgba(248,250,252,0.12),transparent_62%)]"
        style={{ opacity: reduceMotion ? 0.04 : darkLightMix }}
      />

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <nav className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Immigration Delivery Control
          </Link>

          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm">
              <a href="#final-cta">{heroContent.primaryCta}</a>
            </Button>
          </div>
        </nav>

        <div className="container pb-2 md:hidden">
          <div className="scrollbar-subtle flex gap-2 overflow-x-auto pb-1 text-xs text-muted-foreground">
            {navItems.map((item) => (
              <a key={item.href} className="rounded-full border border-border/70 px-3 py-1 whitespace-nowrap" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <OutcomeScorecards />
        <PortfolioBoardMock />

        <div className="container border-t border-border/70" />

        <div className="container">
          <WhyChangeNow />
          <WhyCasesBreak />
          <DeliveryAcceleratorOverlay />
          <ClientConvenience />
          <CaseWalkthrough />
          <AdminLoopsBento />
          <Week1Value />
          <StackStrip />
          <HowItSpeedsDelivery />
          <TrustSection />
          <PilotSection />
          <FaqSection />
        </div>

        <FounderStrip />
        <FinalCtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
