import { cn } from "@/lib/utils";

type IllustrationProps = {
  variant?: "default" | "compact";
  compact?: boolean;
  theme?: "light" | "dark";
  className?: string;
};

export function WhatsAppChaseIllustration({
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
      <div className="space-y-2">
        <MessageBubble tone="sent" text="Hi Sarah, we still need bank statements + payslips. Upload link attached." />
        <MessageBubble tone="received" text="Uploaded all docs now." />
        <MessageBubble tone="sent" text="Payslip 3 is blurry and will fail review. Please retake." />
        <MessageBubble tone="received" text="Re-uploaded. Is this clear?" />
        <MessageBubble tone="sent" text="Validated. Checklist complete." />
      </div>
      {!isCompact ? <p className="mt-3 text-[11px] text-muted-foreground">Automated chasing + instant validation loop.</p> : null}
    </div>
  );
}

function MessageBubble({ tone, text }: { tone: "sent" | "received"; text: string }) {
  return (
    <div className={cn("max-w-[90%] rounded-lg px-3 py-2 text-[11px]", tone === "sent" ? "ml-auto bg-primary/15" : "bg-muted/50")}>
      {text}
    </div>
  );
}
