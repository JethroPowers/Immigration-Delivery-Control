"use client";

import { useMemo, useState } from "react";

import { roiDefaults } from "@/lib/demoData";
import { calculateRoi, formatCurrency } from "@/lib/roi";
import { trackEvent } from "@/lib/analytics";

export function RoiCalculator({ compact = false }: { compact?: boolean }) {
  const [annualSalary, setAnnualSalary] = useState(roiDefaults.annualSalary);
  const [chaseHoursPerWeek, setChaseHoursPerWeek] = useState(roiDefaults.chaseHoursPerWeek);
  const [statusHoursPerWeek, setStatusHoursPerWeek] = useState(roiDefaults.statusHoursPerWeek);

  const output = useMemo(
    () => calculateRoi({ annualSalary, chaseHoursPerWeek, statusHoursPerWeek, monthlyAiCost: roiDefaults.monthlyAiCost }),
    [annualSalary, chaseHoursPerWeek, statusHoursPerWeek]
  );

  return (
    <div className="rounded-2xl border border-border/70 bg-card/90 p-5">
      <h3 className="text-lg font-semibold">{compact ? "Your current setup" : "Interactive ROI calculator"}</h3>
      <div className={compact ? "mt-4 grid gap-4" : "mt-4 grid gap-4 md:grid-cols-2"}>
        <SliderField
          label="Paralegal salary (annual)"
          value={annualSalary}
          min={18000}
          max={70000}
          step={500}
          onChange={(value) => {
            setAnnualSalary(value);
            trackEvent("roi_calculator_interaction", { field: "annualSalary", value });
          }}
          formatter={(value) => formatCurrency(value)}
        />
        <SliderField
          label="Hours on document chasing / week"
          value={chaseHoursPerWeek}
          min={0}
          max={30}
          step={1}
          onChange={(value) => {
            setChaseHoursPerWeek(value);
            trackEvent("roi_calculator_interaction", { field: "chaseHours", value });
          }}
        />
        <SliderField
          label="Hours on status updates / week"
          value={statusHoursPerWeek}
          min={0}
          max={30}
          step={1}
          onChange={(value) => {
            setStatusHoursPerWeek(value);
            trackEvent("roi_calculator_interaction", { field: "statusHours", value });
          }}
        />
      </div>

      <div className={compact ? "mt-5 grid gap-3 sm:grid-cols-2" : "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"}>
        <Stat label="Manual annual cost" value={formatCurrency(output.manualAnnualCost)} />
        <Stat label="AI annual cost" value={formatCurrency(output.aiAnnualCost)} />
        <Stat label="Annual savings" value={formatCurrency(output.annualSavings)} accent />
        <Stat label="ROI" value={`${output.roiPercent.toFixed(0)}%`} />
        <Stat label="Payback" value={`${output.paybackWeeks.toFixed(1)} weeks`} />
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatter
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatter?: (value: number) => string;
}) {
  return (
    <label className="rounded-lg border border-border/70 bg-background/75 p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{formatter ? formatter(value) : `${value} hrs`}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-primary"
      />
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background/70 px-3 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={accent ? "mt-1 text-sm font-semibold text-success" : "mt-1 text-sm font-semibold"}>{value}</p>
    </div>
  );
}
