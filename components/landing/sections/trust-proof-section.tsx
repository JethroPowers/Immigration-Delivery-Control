"use client";

import { ShieldCheck, Quote } from "lucide-react";

import { trustProof } from "@/lib/demoData";
import { SectionShell } from "@/components/landing/sections/section-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TrustProofSection() {
  return (
    <SectionShell
      id="trust"
      title={trustProof.title}
      subtitle="Evidence from London extension + ILR teams that automation reduces chasing and protects partner time."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle className="text-lg">Pilot outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {trustProof.metrics.map((item) => (
              <p key={item} className="rounded-md border border-border/70 bg-background/75 px-3 py-2">
                {item}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Quote className="h-4 w-4 text-primary" />
              Customer proof
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
              {trustProof.quote}
            </blockquote>
            <p className="mt-2 text-xs text-muted-foreground">{trustProof.quoteBy}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline">
                <a href="mailto:jethropowers@outlook.com?subject=Request%20pilot%20case%20study">Read pilot case study</a>
              </Button>
              <Button asChild>
                <a href="mailto:jethropowers@outlook.com?subject=Request%20intro%20to%20pilot%20firms">Request intro to pilot firms</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 border-border/70 bg-muted/25">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Security and compliance snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-3">
          {trustProof.security.map((item) => (
            <p key={item} className="rounded-md border border-border/70 bg-background/75 px-3 py-2">
              {item}
            </p>
          ))}
        </CardContent>
      </Card>
    </SectionShell>
  );
}
