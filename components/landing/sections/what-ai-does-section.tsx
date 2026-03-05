"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/landing/sections/section-shell";
import { scenarioExamples } from "@/lib/demoData";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppChaseIllustration } from "@/components/landing/illustrations/whatsapp-chase-illustration";
import { PhonePortalIllustration } from "@/components/landing/illustrations/phone-portal-illustration";

export function WhatAiDoesSection() {
  const [activeId, setActiveId] = useState(scenarioExamples[0]?.id ?? "auto-chasing");

  return (
    <SectionShell
      id="what-ai-does"
      title="What the AI actually does"
      subtitle="Concrete automation scenarios your team deals with every week."
    >
      <Tabs
        value={activeId}
        onValueChange={(value) => {
          setActiveId(value);
          trackEvent("scenario_tab_view", { scenario: value });
        }}
        className="w-full"
      >
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-muted/40 p-1">
          {scenarioExamples.map((scenario) => (
            <TabsTrigger key={scenario.id} value={scenario.id} className="text-xs md:text-sm">
              {scenario.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {scenarioExamples.map((scenario) => (
          <TabsContent key={scenario.id} value={scenario.id} className="mt-4">
            <article className="grid gap-4 rounded-2xl border border-border/70 bg-card/90 p-5 md:grid-cols-[1fr_1fr]">
              <div className="space-y-3">
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Without AI</p>
                    <p className="mt-2 text-sm text-muted-foreground">{scenario.withoutAi}</p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background/70 p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">With AI</p>
                    <p className="mt-2 text-sm">{scenario.withAi}</p>
                  </div>
                </div>
                <p className="rounded-md border border-primary/35 bg-primary/5 px-3 py-2 text-sm">{scenario.outcome}</p>
                <Badge variant="success" className="rounded-md px-2 py-1 text-xs">
                  {scenario.timeSaved}
                </Badge>
              </div>

              <div>
                {scenario.id === "auto-chasing" || scenario.id === "blurry-doc" ? (
                  <WhatsAppChaseIllustration />
                ) : (
                  <PhonePortalIllustration />
                )}
              </div>
            </article>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 overflow-x-auto md:hidden">
        <div className="flex snap-x snap-mandatory gap-3">
          {scenarioExamples.map((scenario) => (
            <div key={scenario.id} className="min-w-[88%] snap-center rounded-xl border border-border/70 bg-card/90 p-4">
              <p className="text-sm font-semibold">{scenario.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">{scenario.timeSaved}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
