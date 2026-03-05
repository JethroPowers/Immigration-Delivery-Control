import { cn } from "@/lib/utils";

type IllustrationProps = {
  variant?: "default" | "compact";
  compact?: boolean;
  theme?: "light" | "dark";
  className?: string;
  step: "csv" | "upload" | "whatsapp";
};

export function SetupStepsIllustration({
  variant = "default",
  compact = false,
  theme = "light",
  className,
  step
}: IllustrationProps) {
  const isCompact = compact || variant === "compact";

  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-card/90 p-4",
        theme === "dark" && "bg-slate-900/80",
        className
      )}
    >
      <div className="mb-3 h-6 w-24 rounded-full bg-muted" />
      {step === "csv" ? <CsvArt compact={isCompact} /> : null}
      {step === "upload" ? <UploadArt compact={isCompact} /> : null}
      {step === "whatsapp" ? <WhatsappArt compact={isCompact} /> : null}
    </div>
  );
}

function CsvArt({ compact }: { compact: boolean }) {
  return (
    <div className="space-y-1 text-[11px]">
      <div className="rounded border border-border/70 bg-background/80 px-2 py-1">case_id,route,deadline,status</div>
      <div className="rounded border border-border/70 bg-background/80 px-2 py-1">2419,Partner,14d,blocked</div>
      {!compact ? <div className="rounded border border-border/70 bg-background/80 px-2 py-1">2430,SW,9d,needs_fix</div> : null}
    </div>
  );
}

function UploadArt({ compact }: { compact: boolean }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6 text-center text-[11px] text-muted-foreground">
      <svg className="mb-2 h-8 w-8 text-primary" viewBox="0 0 24 24" aria-hidden>
        <path fill="currentColor" d="M12 16 7 11l1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11ZM5 20q-.825 0-1.412-.587T3 18v-3h2v3h14v-3h2v3q0 .825-.587 1.413T19 20Z" />
      </svg>
      Drag CSV here
      {!compact ? <span className="mt-1 block">Upload completes in seconds</span> : null}
    </div>
  );
}

function WhatsappArt({ compact }: { compact: boolean }) {
  return (
    <div className="grid place-items-center rounded-lg border border-border/70 bg-background/80 p-4 text-center text-[11px]">
      <div className="grid h-20 w-20 place-items-center rounded bg-muted">
        <div className="grid h-14 w-14 place-items-center rounded border border-border/70 bg-card text-[10px]">QR</div>
      </div>
      {!compact ? <p className="mt-2 text-muted-foreground">Scan with WhatsApp Business</p> : null}
    </div>
  );
}
