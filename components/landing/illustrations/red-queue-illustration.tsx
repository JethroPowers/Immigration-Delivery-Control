import { cn } from "@/lib/utils";

type IllustrationProps = {
  variant?: "default" | "compact";
  compact?: boolean;
  theme?: "light" | "dark";
  className?: string;
};

const rows = [
  { caseId: "2419", issue: "Client ignored 3 reminders", status: "Action needed" },
  { caseId: "2430", issue: "Address mismatch flagged", status: "Exception" },
  { caseId: "2448", issue: "Sponsor letter stalled", status: "Escalate" }
];

export function RedQueueIllustration({
  variant = "default",
  compact = false,
  theme = "light",
  className
}: IllustrationProps) {
  const isCompact = compact || variant === "compact";

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card/90 p-4 shadow-glow",
        theme === "dark" && "bg-slate-900/80",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold">Partner Red Queue</h4>
        <span className="rounded-full bg-danger/15 px-2 py-0.5 text-[11px] text-danger">5 exceptions</span>
      </div>
      <div className="space-y-2 text-[11px]">
        {rows.map((row) => (
          <div key={row.caseId} className="rounded-md border border-border/70 bg-background/80 p-2">
            <p className="font-medium">Case {row.caseId} - {row.status}</p>
            <p className="text-muted-foreground">{row.issue}</p>
          </div>
        ))}
      </div>
      {!isCompact ? <p className="mt-3 text-[11px] text-muted-foreground">Only exceptions surface to partners. Routine cases stay automated.</p> : null}
    </div>
  );
}
