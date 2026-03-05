"use client";

import { SetupStepsIllustration } from "@/components/landing/illustrations/setup-steps-illustration";
import { SectionShell } from "@/components/landing/sections/section-shell";
import { setupStepsFast } from "@/lib/demoData";
import { trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stepToArt: Record<string, "csv" | "upload" | "whatsapp"> = {
  "Step 1": "csv",
  "Step 2": "upload",
  "Step 3": "whatsapp"
};

export function SetupFastSection() {
  return (
    <SectionShell
      id="setup"
      title="Setup in 5 minutes, no IT required"
      subtitle="Export CSV, upload once, and let CasePiiotAI run alongside your current case system."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {setupStepsFast.map((step) => (
          <article key={step.step} className="rounded-xl border border-border/70 bg-card/90 p-4">
            <Badge variant="outline" className="mb-2">
              {step.step}
            </Badge>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
            <SetupStepsIllustration step={stepToArt[step.step]} className="mt-3" />
          </article>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="success">No integrations required</Badge>
        <Badge variant="success">No developer required</Badge>
        <Badge variant="success">No IT tickets</Badge>
        <Badge variant="success">Live in 5 minutes</Badge>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        This does not replace your case system. It automates chasing and update loops on top of your existing delivery workflow.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button asChild onClick={() => trackEvent("setup_call_booking", { location: "setup" })}>
          <a href="mailto:jethropowers@outlook.com?subject=15-minute%20setup%20call">Book 15-min setup call</a>
        </Button>
        <Button asChild variant="outline" onClick={() => trackEvent("hero_video_play", { source: "setup" })}>
          <a href="mailto:jethropowers@outlook.com?subject=Request%2090-second%20setup%20video">Watch 90-second setup video</a>
        </Button>
      </div>
    </SectionShell>
  );
}
