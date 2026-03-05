"use client";

import { useMemo } from "react";

import { faqItems } from "@/lib/demoData";
import { trackEvent } from "@/lib/analytics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function FaqSection() {
  const valueLookup = useMemo(
    () => Object.fromEntries(faqItems.map((faq, index) => [`faq-${index}`, faq.question])),
    []
  );

  return (
    <SectionShell id="faq" title="FAQ" subtitle="Objections we hear from partner-led immigration teams.">
      <Card className="border-border/70 bg-card/90">
        <CardContent className="p-6">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) => {
              if (!value) return;
              trackEvent("faq_question_open", { question: valueLookup[value] ?? value });
            }}
          >
            {faqItems.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </SectionShell>
  );
}

export const FAQ = FaqSection;
