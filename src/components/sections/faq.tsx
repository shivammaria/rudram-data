
"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Shield, Rocket, Building2, HardDrive, HelpCircle, Bot } from 'lucide-react';
import faqContent from "@/app/content/faq.json";
import { FreeIntroCallModal } from "../modals/free-intro-call-modal";

const faqIcons: { [key: string]: React.ReactNode } = {
  "data-volume": <HelpCircle className="h-6 w-6 text-primary" />,
  "software": <HardDrive className="h-6 w-6 text-primary" />,
  "business-size": <Building2 className="h-6 w-6 text-primary" />,
  "results-speed": <Rocket className="h-6 w-6 text-primary" />,
  "data-security": <Shield className="h-6 w-6 text-primary" />,
  "support": <Bot className="h-6 w-6 text-primary" />,
};

export default function Faq() {
  return (
    <section id="faq" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {faqContent.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {faqContent.subheadline}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqContent.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="mb-4 rounded-lg glass-morphic border-primary/20 border-b-0 data-[state=open]:border data-[state=open]:shadow-lg data-[state=open]:shadow-primary/20">
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline text-left">
                  <div className="flex items-center gap-4">
                    {faqIcons[faq.icon] || <HelpCircle className="h-6 w-6 text-primary" />}
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <p className="text-muted-foreground mb-4">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-20 text-center p-8 rounded-lg glass-morphic border-primary/20">
            <h3 className="text-2xl font-bold mb-4">{faqContent.cta.headline}</h3>
            <FreeIntroCallModal>
                <Button size="lg" className="btn-glow px-8 py-6 text-lg">
                    Book a 30-Min Call
                </Button>
            </FreeIntroCallModal>
        </div>
      </div>
    </section>
  );
}
