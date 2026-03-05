import { cn } from "@/lib/utils";

type IllustrationProps = {
  variant?: "default" | "compact";
  compact?: boolean;
  theme?: "light" | "dark";
  className?: string;
};

export function PhonePortalIllustration({
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
      <div className="mx-auto w-[220px] rounded-[1.8rem] border border-border/80 bg-background p-3 shadow-hero-soft">
        <div className="mb-3 h-5 w-20 rounded-full bg-muted" />
        <div className="space-y-2">
          <p className="text-xs font-semibold">Your Case: Partner Visa</p>
          <p className="text-[11px] text-muted-foreground">Status: Evidence Review</p>
          <div className="h-2 rounded-full bg-muted">
            <div className="h-2 w-3/4 rounded-full bg-primary" />
          </div>
        </div>
        <div className="mt-3 space-y-2 text-[11px]">
          <div className="rounded-md border border-success/30 bg-success/10 px-2 py-1">Documents submitted</div>
          <div className="rounded-md border border-success/30 bg-success/10 px-2 py-1">Validation complete</div>
          <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1">Under review (2 days)</div>
          {!isCompact ? <div className="rounded-md border border-border/70 bg-muted/30 px-2 py-1">Next update: Friday 5pm</div> : null}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <button type="button" className="rounded-md border border-border/70 bg-muted/30 px-2 py-1 text-left">
            Upload docs
          </button>
          <button type="button" className="rounded-md border border-border/70 bg-muted/30 px-2 py-1 text-left">
            Message team
          </button>
        </div>
      </div>
      {!isCompact ? (
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" aria-hidden>
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 11h5v-2h-3V7h-2Z" />
          </svg>
          Clients self-serve status 24/7.
        </div>
      ) : null}
    </div>
  );
}
