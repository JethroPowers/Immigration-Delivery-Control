"use client";

import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/landing/sections/section-shell";
import { RoiCalculator } from "@/components/landing/sections/roi-calculator";
import { roiTaskRows } from "@/lib/demoData";
import { formatCurrency } from "@/lib/roi";
import { trackEvent } from "@/lib/analytics";

export function MoneySection() {
  const totalHours = roiTaskRows.reduce((sum, row) => sum + row.hoursPerWeek, 0);
  const totalMonthly = roiTaskRows.reduce((sum, row) => sum + row.monthlyCost, 0);
  const netAnnual = totalMonthly * 12 - 395 * 12;
  const recoveredHoursPct = Math.max(0, Math.min(100, (totalHours / 40) * 100));

  return (
    <SectionShell
      id="money"
      title="The real cost of manual document chasing"
      subtitle="Model your current admin cost and compare it with the £395/month automation path."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <RoiCalculator compact />

        <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
          <h3 className="text-lg font-semibold">What the AI replaces</h3>
          <p className="mt-1 text-sm text-muted-foreground">Weekly hours your team spends on automatable tasks.</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-2 py-2">Task</th>
                  <th className="px-2 py-2">Hrs/wk</th>
                  <th className="px-2 py-2">£/month</th>
                </tr>
              </thead>
              <tbody>
                {roiTaskRows.map((row) => (
                  <tr key={row.task} className="border-b border-border/40 last:border-0">
                    <td className="px-2 py-2">{row.task}</td>
                    <td className="px-2 py-2">{row.hoursPerWeek}</td>
                    <td className="px-2 py-2">{formatCurrency(row.monthlyCost)}</td>
                  </tr>
                ))}
                <tr className="bg-muted/30">
                  <td className="px-2 py-2 font-semibold">Total time saved</td>
                  <td className="px-2 py-2 font-semibold">{totalHours}</td>
                  <td className="px-2 py-2 font-semibold text-success">{formatCurrency(totalMonthly)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-md border border-border/70 bg-background/75 px-3 py-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Your cost</span>
              <span className="font-medium">{formatCurrency(395)}/month</span>
            </div>
          </div>

          <div className="mt-2 rounded-md border border-success/35 bg-success/10 px-3 py-2 text-sm text-success">
            Net savings: {formatCurrency(totalMonthly - 395)}/month = {formatCurrency(netAnnual)}/year
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Planning model based on your slider inputs and tracked weekly workload.</p>

          <div className="mt-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Weekly hours recovered</p>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-success" style={{ width: `${recoveredHoursPct}%` }} />
            </div>
            <p className="mt-1 text-sm font-medium text-success">{totalHours}h saved</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button asChild onClick={() => trackEvent("monthly_cta_click", { location: "money" })}>
          <a href="#pricing">Start monthly</a>
        </Button>
        <Button asChild variant="outline" onClick={() => trackEvent("setup_call_booking", { location: "money" })}>
          <a href="mailto:jethropowers@outlook.com?subject=15-minute%20setup%20call">Book 15-min setup call</a>
        </Button>
      </div>
    </SectionShell>
  );
}
