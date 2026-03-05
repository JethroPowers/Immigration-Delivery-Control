"use client";

import { motion } from "framer-motion";

import { pricingFinePrint, pricingMiniFaq, pricingPlans } from "@/lib/demoData";
import { trackEvent } from "@/lib/analytics";
import { useExperimentVariant } from "@/lib/experiments";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function PricingSection() {
  const monthlyPriceVariant = useExperimentVariant("monthly_price_variant", "a");
  const ctaVariant = useExperimentVariant("cta_label_variant", "a");
  const monthlyPrice = monthlyPriceVariant === "b" ? "£350/month" : "£395/month";
  const primaryCtaLabel = ctaVariant === "b" ? "See it working" : ctaVariant === "c" ? "Calculate savings" : "Start monthly";

  return (
    <SectionShell
      id="pricing"
      title="Pricing for CasePiiotAI"
      subtitle="Monthly is the default buying path for extension + ILR teams. Annual lowers cost for committed firms."
    >
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <p className="rounded-md border border-border/70 bg-muted/25 px-3 py-2 text-sm">No setup fee</p>
        <p className="rounded-md border border-border/70 bg-muted/25 px-3 py-2 text-sm">No long-term contract</p>
        <p className="rounded-md border border-border/70 bg-muted/25 px-3 py-2 text-sm">Cancel monthly anytime</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {pricingPlans.map((plan, index) => {
          const displayPrice = plan.id === "monthly" ? monthlyPrice : plan.price;
          const displayCta = plan.id === "monthly" ? primaryCtaLabel : plan.cta;

          return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onMouseEnter={() => trackEvent("pricing_card_hover", { plan: plan.id })}
          >
            <Card className={cn("h-full border-border/70 bg-card/90", plan.recommended && "border-primary/35 bg-primary/5") }>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{plan.title}</CardTitle>
                  {plan.recommended ? <Badge>Recommended</Badge> : <Badge variant="outline">Secondary</Badge>}
                </div>
                <p className="text-3xl font-semibold tracking-tight">{displayPrice}</p>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {plan.highlights.map((item) => (
                    <li key={item} className="rounded-md border border-border/70 bg-background/75 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => trackEvent(plan.id === "monthly" ? "monthly_cta_click" : "annual_cta_click", { location: "pricing" })}
                >
                  <a href="#final-cta">{displayCta}</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Commercial notes</p>
        <ul className="mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          {pricingFinePrint.map((item) => (
            <li key={item} className="rounded-md border border-border/60 bg-background/70 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {pricingMiniFaq.map((item) => (
          <article key={item.question} className="rounded-xl border border-border/70 bg-card/90 p-4">
            <h4 className="text-sm font-semibold">{item.question}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
