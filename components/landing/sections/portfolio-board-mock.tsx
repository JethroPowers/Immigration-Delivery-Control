"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";

import { boardMetrics, boardRows, portfolioBoard } from "@/lib/demoData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PortfolioBoardMock() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const selectedRow = useMemo(
    () => boardRows.find((row) => row.caseId === selectedCaseId) ?? null,
    [selectedCaseId]
  );

  useEffect(() => {
    if (!selectedCaseId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCaseId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCaseId]);

  return (
    <section className="container pb-10 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="space-y-4"
      >
        <div className="mx-auto max-w-3xl space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Portfolio Board</p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{portfolioBoard.heading}</h2>
          <p className="text-sm text-muted-foreground md:text-base">Sample live view focused on delivery acceleration.</p>
        </div>

        <Card className="relative overflow-hidden border-border/70 bg-card/95 p-1 shadow-hero-soft">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 left-0 h-36 w-36 rounded-full bg-success/15 blur-3xl" aria-hidden />
          <CardContent className="space-y-5 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Delivery Acceleration Board</p>
                <h3 className="mt-1 text-lg font-semibold">What is blocking speed right now</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="danger">Exceptions: 5</Badge>
                <Badge variant="outline">Sample live view</Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {boardMetrics.map((metric) => (
                <article
                  key={metric.label}
                  className={cn(
                    "rounded-lg border border-border/70 bg-background/80 p-3",
                    metric.tone === "danger" && "border-danger/35 bg-danger/5",
                    metric.tone === "warning" && "border-amber-500/30 bg-amber-500/5"
                  )}
                >
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">{metric.value}</p>
                </article>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground">
              Click any row to see the next unblock action and partner exception context.
            </p>

            <div className="hidden overflow-hidden rounded-lg border border-border/70 bg-background/70 md:block">
              <div className="grid grid-cols-5 gap-2 border-b border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground">
                <span>Case ID</span>
                <span>Route</span>
                <span>Next deadline</span>
                <span>What’s blocking speed</span>
                <span>Next action</span>
              </div>
              <div className="divide-y divide-border/70">
                {boardRows.map((row) => (
                  <button
                    key={row.caseId}
                    type="button"
                    onClick={() => setSelectedCaseId(row.caseId)}
                    className="grid w-full grid-cols-5 gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-muted/40 md:text-sm"
                  >
                    <span className="font-medium text-foreground">{row.caseId}</span>
                    <span className="text-muted-foreground">{row.route}</span>
                    <span className="text-danger">{row.nextDeadline}</span>
                    <span className="text-muted-foreground">{row.blocker}</span>
                    <span className="flex items-center justify-between gap-2 text-muted-foreground">
                      <span className="truncate">{row.nextAction}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 md:hidden">
              {boardRows.map((row) => (
                <button
                  key={row.caseId}
                  type="button"
                  onClick={() => setSelectedCaseId(row.caseId)}
                  className="w-full rounded-lg border border-border/70 bg-background/70 p-3 text-left text-xs transition-colors hover:bg-muted/30"
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{row.caseId}</p>
                    <Badge variant="danger">{row.nextDeadline}</Badge>
                  </div>
                  <p className="text-muted-foreground">{row.route}</p>
                  <p className="mt-1 text-muted-foreground">{row.blocker}</p>
                  <p className="mt-1 flex items-center justify-between gap-2 text-muted-foreground">
                    <span>{row.nextAction}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                  </p>
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
              {portfolioBoard.caption}
            </div>

            <AnimatePresence>
              {selectedRow ? (
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
                        <h4 className="mt-1 text-lg font-semibold">{selectedRow.caseId}</h4>
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
                          <p className="mt-0.5 text-foreground">{selectedRow.route}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Next deadline</p>
                          <p className="mt-0.5 text-danger">{selectedRow.nextDeadline}</p>
                        </div>
                      </div>

                      <div className="rounded-md border border-danger/25 bg-danger/5 p-3">
                        <p className="text-xs uppercase tracking-[0.12em] text-danger">What’s blocking speed</p>
                        <p className="mt-1 text-foreground">{selectedRow.blocker}</p>
                      </div>

                      <div className="rounded-md border border-border/70 bg-muted/30 p-3">
                        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Next action</p>
                        <p className="mt-2 flex items-start gap-2 text-muted-foreground">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{selectedRow.nextAction}</span>
                        </p>
                      </div>

                      <div className="rounded-md border border-border/70 bg-background/70 p-3 text-xs text-muted-foreground">
                        Note: this action is logged to proof timeline with owner + timestamp.
                      </div>
                    </div>
                  </motion.aside>
                </>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
