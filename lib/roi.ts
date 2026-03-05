export type RoiInput = {
  annualSalary: number;
  chaseHoursPerWeek: number;
  statusHoursPerWeek: number;
  monthlyAiCost: number;
};

export type RoiOutput = {
  hourlyRate: number;
  manualAnnualCost: number;
  aiAnnualCost: number;
  annualSavings: number;
  roiPercent: number;
  paybackWeeks: number;
  totalHoursPerWeek: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function calculateRoi(input: RoiInput): RoiOutput {
  const annualSalary = clamp(input.annualSalary, 18000, 120000);
  const chaseHoursPerWeek = clamp(input.chaseHoursPerWeek, 0, 40);
  const statusHoursPerWeek = clamp(input.statusHoursPerWeek, 0, 40);
  const monthlyAiCost = clamp(input.monthlyAiCost, 1, 5000);

  const hourlyRate = annualSalary / 2080;
  const totalHoursPerWeek = chaseHoursPerWeek + statusHoursPerWeek;
  const manualAnnualCost = totalHoursPerWeek * hourlyRate * 52;
  const aiAnnualCost = monthlyAiCost * 12;
  const annualSavings = manualAnnualCost - aiAnnualCost;
  const roiPercent = aiAnnualCost > 0 ? (annualSavings / aiAnnualCost) * 100 : 0;
  const weeklyManualCost = manualAnnualCost / 52;
  const paybackWeeks = weeklyManualCost > 0 ? aiAnnualCost / weeklyManualCost : 0;

  return {
    hourlyRate,
    manualAnnualCost,
    aiAnnualCost,
    annualSavings,
    roiPercent,
    paybackWeeks,
    totalHoursPerWeek
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}
