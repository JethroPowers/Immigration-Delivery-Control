"use client";

import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/landing/sections/section-shell";
import { PhonePortalIllustration } from "@/components/landing/illustrations/phone-portal-illustration";
import { RedQueueIllustration } from "@/components/landing/illustrations/red-queue-illustration";
import { clientPortalData } from "@/lib/demoData";

export function ClientPortalShowcase() {
  return (
    <SectionShell id="client-portal" title={clientPortalData.title} subtitle={clientPortalData.subtitle}>
      <div className="space-y-4 rounded-2xl border border-border/70 bg-card/90 p-5">
        <div className="grid gap-2 rounded-xl border border-border/70 bg-muted/25 p-3 text-sm md:grid-cols-2">
          <p className="rounded-md border border-border/70 bg-background/70 px-3 py-2 text-muted-foreground">
            Before: clients chase status because they cannot see progress.
          </p>
          <p className="rounded-md border border-success/35 bg-success/10 px-3 py-2 text-success">
            After: clients self-serve status and upload tasks in one place.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">What your client sees</p>
            <PhonePortalIllustration />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">What you see</p>
            <RedQueueIllustration />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">24/7 self-service</Badge>
          <Badge variant="success">Stops status-email loops</Badge>
          <Badge variant="success">White-labeled + mobile-first</Badge>
        </div>
        <p className="rounded-lg border border-primary/35 bg-primary/5 px-3 py-2 text-sm">
          Clients check progress in portal. Partners only handle true exceptions.
        </p>

        <div className="grid gap-2 md:grid-cols-2">
          <p className="rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm">
            Outcome: fewer inbound status requests and fewer WhatsApp interruptions.
          </p>
          <p className="rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm">
            Outcome: faster document completion from clear upload instructions.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
