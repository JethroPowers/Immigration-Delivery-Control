"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  CircleArrowDown,
  CircleAlert,
  CircleCheck,
  X,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  TimerReset,
  Workflow
} from "lucide-react";

import { CaseScrollDemo } from "@/components/landing/case-scroll-demo";
import { ControlRoomStory } from "@/components/landing/control-room-story";
import { ThemeToggle } from "@/components/theme-toggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  bentoCards,
  caseSteps,
  faqs,
  partnerProofStats,
  pilotMetrics,
  pilotPlans,
  primitives,
  redQueueItems,
  regulatedDeliveryBullets,
  riskMetrics,
  securityItems,
  whyCasesBreak
} from "@/constants/landing";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const roiBarMetrics = [
  {
    label: "At-Risk Deadline Count",
    value: "Down 35% target",
    note: "90-day benchmark"
  },
  {
    label: "Client update latency",
    value: "Down 30-50%",
    note: "SLA-based update rhythm"
  },
  {
    label: "Readiness at D-14",
    value: ">=85%",
    note: "Submission-safe pipeline"
  }
];

function SectionWrapper({
  id,
  title,
  subtitle,
  children
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="scroll-mt-24 py-14 md:py-16"
    >
      <div className="mb-8 space-y-3">
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

function nextActionsForBlocker(blocker: string) {
  const lower = blocker.toLowerCase();
  if (lower.includes("payslip")) {
    return [
      "Issue targeted upload request for missing payslips",
      "Set 24-hour chase reminder in evidence loop",
      "Keep submission gate locked until verification passes"
    ];
  }
  if (lower.includes("address mismatch")) {
    return [
      "Send fix request with exact mismatch details",
      "Require corrected address proof and re-validate",
      "Trigger partner review only after fix is verified"
    ];
  }
  if (lower.includes("sign-off")) {
    return [
      "Escalate to assigned partner with deadline context",
      "Confirm timing validity before unlocking gate",
      "Log sign-off decision in proof timeline"
    ];
  }
  if (lower.includes("update overdue")) {
    return [
      "Send overdue client update immediately",
      "Reset update SLA timer with next due date",
      "Flag if second update cycle is missed"
    ];
  }
  return [
    "Validate blocker root cause and owner",
    "Assign next action with a 24-hour checkpoint",
    "Re-test readiness gate after resolution"
  ];
}

function PortfolioRiskBoard() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const selectedItem = useMemo(
    () => redQueueItems.find((item) => item.caseId === selectedCaseId) ?? null,
    [selectedCaseId]
  );

  useEffect(() => {
    if (!selectedCaseId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCaseId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCaseId]);

  return (
    <Card className="relative overflow-hidden border-border/70 bg-card/95 p-1 shadow-hero-soft">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-20 left-0 h-36 w-36 rounded-full bg-success/20 blur-3xl" aria-hidden />
      <CardContent className="space-y-5 p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Portfolio Risk Board</p>
            <h3 className="mt-1 text-lg font-semibold">Live operational risk view</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="danger">Red Queue: 5</Badge>
            <Badge variant="outline">Sample live view</Badge>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {riskMetrics.map((metric) => (
            <article
              key={metric.label}
              className={cn(
                "rounded-lg border border-border/70 bg-background/80 p-3",
                metric.tone === "danger" && "border-danger/40 bg-danger/5",
                metric.tone === "warning" && "border-amber-500/30 bg-amber-500/5"
              )}
            >
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{metric.value}</p>
              {metric.hint ? <p className="mt-1 text-xs text-muted-foreground">{metric.hint}</p> : null}
            </article>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground">
          Click any red queue row to open a partner drill-in with next control actions.
        </p>

        <div className="hidden overflow-hidden rounded-lg border border-border/70 bg-background/70 md:block">
          <div className="grid grid-cols-4 gap-2 border-b border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground">
            <span>Case ID</span>
            <span>Route</span>
            <span>Deadline</span>
            <span>Blocker</span>
          </div>
          <div className="divide-y divide-border/70">
            {redQueueItems.map((item) => (
              <button
                key={item.caseId}
                type="button"
                onClick={() => setSelectedCaseId(item.caseId)}
                className="grid w-full grid-cols-4 gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-muted/40 md:text-sm"
              >
                <span className="font-medium text-foreground">{item.caseId}</span>
                <span className="text-muted-foreground">{item.route}</span>
                <span className="text-danger">{item.deadline}</span>
                <span className="flex items-center justify-between gap-2 text-muted-foreground">
                  <span className="truncate">{item.blocker}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 md:hidden">
          {redQueueItems.map((item) => (
            <button
              key={item.caseId}
              type="button"
              onClick={() => setSelectedCaseId(item.caseId)}
              className="w-full rounded-lg border border-border/70 bg-background/70 p-3 text-left text-xs transition-colors hover:bg-muted/30"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="font-medium text-foreground">{item.caseId}</p>
                <Badge variant="danger">{item.deadline}</Badge>
              </div>
              <p className="text-muted-foreground">{item.route}</p>
              <p className="mt-1 flex items-center justify-between gap-2 text-muted-foreground">
                <span>{item.blocker}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary" />
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
          Partner view: 5 matters require intervention before readiness gate.
        </div>

        <AnimatePresence>
          {selectedItem ? (
            <>
              <motion.button
                type="button"
                aria-label="Close case drill-in"
                className="absolute inset-0 z-20 bg-background/35 backdrop-blur-[1px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCaseId(null)}
              />
              <motion.aside
                initial={{ x: 48, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 48, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 right-0 z-30 w-full max-w-sm border-l border-border/70 bg-card p-4 shadow-hero-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Partner drill-in</p>
                    <h4 className="mt-1 text-lg font-semibold">{selectedItem.caseId}</h4>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label="Close drill-in"
                    onClick={() => setSelectedCaseId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2 rounded-md border border-border/70 bg-background/70 p-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Route</p>
                      <p className="mt-0.5 text-foreground">{selectedItem.route}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="mt-0.5 text-danger">{selectedItem.deadline}</p>
                    </div>
                  </div>

                  <div className="rounded-md border border-danger/25 bg-danger/5 p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-danger">Active blocker</p>
                    <p className="mt-1 text-foreground">{selectedItem.blocker}</p>
                  </div>

                  <div className="rounded-md border border-border/70 bg-muted/30 p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Next control actions</p>
                    <ul className="mt-2 space-y-2">
                      {nextActionsForBlocker(selectedItem.blocker).map((action) => (
                        <li key={action} className="flex items-start gap-2 text-muted-foreground">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-md border border-border/70 bg-background/70 p-3 text-xs text-muted-foreground">
                    Proof timeline note: this drill-in is logged with blocker, owner, and next action timestamp.
                  </div>
                </div>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const lightDarkMix = useTransform(scrollYProgress, [0, 0.22, 0.62, 1], [0, 0.03, 0.1, 0.14]);
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
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              Control Room Story
            </a>
            <a href="#pilot" className="transition-colors hover:text-foreground">
              90-day pilot
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm">
              <a href="#final-cta">Book a Delivery Control Audit</a>
            </Button>
          </div>
        </nav>
        <div className="container pb-2 md:hidden">
          <div className="scrollbar-subtle flex gap-2 overflow-x-auto pb-1 text-xs text-muted-foreground">
            <a className="rounded-full border border-border/70 px-3 py-1 whitespace-nowrap" href="#how-it-works">
              Control Room Story
            </a>
            <a className="rounded-full border border-border/70 px-3 py-1 whitespace-nowrap" href="#single-case">
              Live workflow
            </a>
            <a className="rounded-full border border-border/70 px-3 py-1 whitespace-nowrap" href="#pilot">
              Pilot
            </a>
            <a className="rounded-full border border-border/70 px-3 py-1 whitespace-nowrap" href="#faq">
              FAQ
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        <section className="container scroll-mt-24 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto flex min-h-[62vh] max-w-4xl flex-col items-center justify-center space-y-5 text-center"
          >
            <Badge variant="secondary" className="rounded-md px-3 py-1 text-xs">
              For UK immigration firms with 3-15 staff
            </Badge>
            <h1 className="text-balance text-[2.2rem] font-semibold tracking-tight md:text-[3.85rem] md:leading-[1.02]">
              Stop late and unready immigration filings.
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground md:text-[1.22rem]">
              Delivery Control for extensions {"->"} ILR (Skilled Worker + Partner).
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[0.98rem]">
              If your team is juggling deadlines, evidence, and client updates across multiple tools, we give you one
              control layer that keeps matters submission-ready and reduces partner fire-fighting.
            </p>
            <p className="max-w-3xl rounded-md border border-border/70 bg-card/70 px-4 py-3 text-sm text-foreground">
              You get earlier risk visibility, cleaner evidence readiness, and a defensible proof trail for every key
              case action.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Button size="lg" asChild>
                <a href="#final-cta">
                  Book a Delivery Control Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#single-case">See the live workflow</a>
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="container pb-10 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            <div className="sticky top-[4.35rem] z-30 rounded-xl border border-border/70 bg-background/85 p-3 shadow-glow backdrop-blur-xl">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Control outcomes bar</p>
                <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                  <CircleArrowDown className="h-3.5 w-3.5" />
                  <span>Weekly partner review focus</span>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {roiBarMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-md border border-border/70 bg-card/80 px-3 py-2">
                    <p className="text-sm font-semibold text-foreground">{metric.value}</p>
                    <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-2 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Portfolio Risk Board</p>
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                See at-risk matters before they become urgent.
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Sample live board view for deadline windows, evidence blockers, and partner-level red queue.
              </p>
            </div>
            <PortfolioRiskBoard />
          </motion.div>
        </section>

        <div className="container border-t border-border/70" />

        <div className="container">
          <SectionWrapper
            id="why-cases-break"
            title="Why cases break"
            subtitle="For 3-15 person teams, the pain is not legal analysis. It is operational drift that creates avoidable risk."
          >
            <Card className="border-border/70">
              <CardContent className="p-6">
                <ul className="grid gap-4 md:grid-cols-2">
                  {whyCasesBreak.map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-lg border border-border/70 bg-background/60 px-4 py-3 text-sm"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/10 text-[11px] font-semibold text-danger">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </SectionWrapper>

          <SectionWrapper
            id="control-layer"
            title="Not practice management. A control layer."
            subtitle="Keep your current PMS/CRM. Add this layer to reduce partner fire-fighting and improve filing readiness."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-border/70">
                <CardHeader>
                  <CardTitle className="text-xl">Practice management / CRM</CardTitle>
                  <CardDescription>Good at records, workflow logging, and contact history.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- Matter records and metadata</li>
                    <li>- General tasks and reminders</li>
                    <li>- Time and billing workflows</li>
                    <li>- Communication archive</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Immigration Delivery Control</CardTitle>
                  <CardDescription>Focused on preventing late or unready filing conditions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- Deadline window risk board (45 / 30 / 14)</li>
                    <li>- Evidence gating with needs-fix loops</li>
                    <li>- Submission readiness lock until safe</li>
                    <li>- Partner red queue + proof timeline</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {primitives.map((primitive) => (
                <Card key={primitive.title}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Workflow className="h-4 w-4 text-primary" aria-hidden />
                      {primitive.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{primitive.body}</CardContent>
                </Card>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper
            id="single-case"
            title="A single case, end-to-end"
            subtitle="Your team sees what is blocked, what is waiting, and what can move safely now."
          >
            <CaseScrollDemo steps={caseSteps} />
          </SectionWrapper>

          <SectionWrapper
            id="admin-loops"
            title="Admin drops when the system runs the loops"
            subtitle="The loops below target the daily bottlenecks that consume fee earner and partner time."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {bentoCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "rounded-xl border border-border/70 bg-card/90 p-5 shadow-glow",
                    index === 0 && "md:col-span-2",
                    index === 3 && "md:col-span-2"
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{card.metric}</p>
                  <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
                </motion.article>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper
            id="how-it-works"
            title="How it works"
            subtitle="Control Room Story: what partners see now, why it matters, and how this reduces operational risk."
          >
            <ControlRoomStory />
          </SectionWrapper>

          <SectionWrapper
            id="trust"
            title="Designed for regulated delivery"
            subtitle="Built for partner-led firms that need traceable supervision without adding operational chaos."
          >
            <div className="mb-4 grid gap-3 md:grid-cols-3">
              {partnerProofStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border/70 bg-card/70 px-4 py-3">
                  <p className="text-lg font-semibold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-foreground">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {regulatedDeliveryBullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckIcon />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
                    Auditability note: every readiness state change, escalation, sign-off, and submission event is
                    timestamped.
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/70 bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Security controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <SecurityChip icon={<LockKeyhole className="h-4 w-4" />} label={securityItems[0]} />
                    <SecurityChip icon={<KeyRound className="h-4 w-4" />} label={securityItems[1]} />
                    <SecurityChip icon={<ShieldCheck className="h-4 w-4" />} label={securityItems[2]} />
                    <SecurityChip icon={<TimerReset className="h-4 w-4" />} label={securityItems[3]} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </SectionWrapper>

          <SectionWrapper
            id="pilot"
            title="90-day pilot"
            subtitle="Start small, show measurable control gains, then decide on broader rollout with confidence."
          >
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-border/70">
                <CardHeader>
                  <CardTitle>Pilot scope and delivery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li>- In-country Skilled Worker + Partner extensions</li>
                    <li>- ILR readiness and conversion controls</li>
                    <li>- Up to 25 active matters in pilot board</li>
                    <li>- Weekly partner risk review rhythm</li>
                  </ul>
                  <div className="rounded-lg border border-border/70 bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Week 1 deliverable</p>
                    <p className="mt-2 text-foreground">
                      Live Portfolio Risk Board with your routes, deadlines, blocker taxonomy, and partner queue active.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Success metrics</p>
                    <ul className="mt-3 space-y-2">
                      {pilotMetrics.map((metric) => (
                        <li key={metric} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChartNoAxesColumnIncreasing className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Who this is not for</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                        <span>Firms looking for legal advice automation instead of operational control.</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                        <span>Teams expecting a full PMS replacement in week one.</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                        <span>Very low-volume practices without active extension or ILR pipeline pressure.</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {pilotPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={cn(
                      "border-border/70",
                      plan.featured && "border-primary/35 bg-primary/5 shadow-hero-soft"
                    )}
                  >
                    <CardHeader className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        {plan.label ? <Badge variant={plan.featured ? "default" : "outline"}>{plan.label}</Badge> : null}
                      </div>
                      <p className="text-2xl font-semibold tracking-tight">{plan.price}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {plan.inclusions.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full" variant={plan.featured ? "default" : "outline"}>
                        <a href="#final-cta">{plan.cta}</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper id="faq" title="FAQ" subtitle="Common objections from partner-led immigration teams.">
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </SectionWrapper>
        </div>

        <section id="final-cta" className="container scroll-mt-24 py-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-card to-success/10 p-8 shadow-hero-soft md:p-10"
          >
            <div className="absolute -right-14 -top-12 h-36 w-36 rounded-full bg-primary/30 blur-3xl" aria-hidden />
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Regain control before cases become urgent
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-muted-foreground md:text-base">
              If extension and ILR matters still rely on inboxes, memory, and late-stage escalation, this is the point
              to put a control layer in place.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <CircleAlert className="h-4 w-4 text-danger" />
              <span>30-minute audit format. You leave with a risk and readiness gap summary.</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="mailto:hello@example.com?subject=Delivery%20Control%20Audit">Book a Delivery Control Audit</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#single-case">See the live workflow</a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="container border-t border-border/70 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p>Immigration Delivery Control</p>
          <div className="flex items-center gap-5">
            <a className="hover:text-foreground" href="#how-it-works">
              Control Room Story
            </a>
            <a className="hover:text-foreground" href="#pilot">
              Pilot scope
            </a>
            <a className="hover:text-foreground" href="#faq">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon() {
  return <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />;
}

function SecurityChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-background/70 px-3 py-2 text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}
