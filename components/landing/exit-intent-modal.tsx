"use client";

import { useEffect, useMemo, useState } from "react";

import { calculateRoi, formatCurrency } from "@/lib/roi";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "exit_intent_seen";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [annualSalary, setAnnualSalary] = useState(30000);
  const [chaseHours, setChaseHours] = useState(15);

  const output = useMemo(
    () => calculateRoi({ annualSalary, chaseHoursPerWeek: chaseHours, statusHoursPerWeek: 8, monthlyAiCost: 395 }),
    [annualSalary, chaseHours]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 12) return;
      setOpen(true);
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      trackEvent("exit_intent_shown", { trigger: "mouseleave" });
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/65 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-5 shadow-hero-soft">
        <h3 className="text-lg font-semibold">Wait. See what you could save.</h3>
        <div className="mt-3 space-y-3 text-sm">
          <label className="block">
            <span className="text-xs text-muted-foreground">Paralegal salary</span>
            <input
              type="number"
              className="mt-1 w-full rounded-md border border-border/70 bg-background/70 px-3 py-2"
              value={annualSalary}
              onChange={(event) => setAnnualSalary(Number(event.target.value || 0))}
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted-foreground">Hours on document chasing/week</span>
            <input
              type="range"
              min={0}
              max={30}
              value={chaseHours}
              onChange={(event) => setChaseHours(Number(event.target.value))}
              className="mt-2 w-full accent-primary"
            />
            <span className="text-xs text-muted-foreground">{chaseHours} hrs/week</span>
          </label>
          <p className="rounded-md border border-success/35 bg-success/10 px-3 py-2 text-sm text-success">
            Estimated annual savings: {formatCurrency(output.annualSavings)}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            asChild
            onClick={() => {
              trackEvent("exit_intent_converted", { action: "start_monthly" });
              setOpen(false);
            }}
          >
            <a href="#pricing">Start monthly</a>
          </Button>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            No thanks
          </Button>
        </div>
      </div>
    </div>
  );
}
