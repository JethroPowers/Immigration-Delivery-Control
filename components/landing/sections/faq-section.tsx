"use client";

import { faqItems } from "@/lib/demoData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "@/components/landing/sections/section-shell";

export function FaqSection() {
  return (
    <SectionShell id="faq" title="FAQ" subtitle="Common objections from partner-led immigration teams.">
      <Card className="border-border/70 bg-card/90">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
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
