"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FadeInUp } from "~/components/motion-wrapper";

const faqs = [
  {
    question: "Do I still control which events I accept?",
    answer:
      "Absolutely. Every request goes to your admin dashboard. You review the details (date, party size, menu, location) and accept or decline with one click. Nothing gets booked without your approval.",
  },
  {
    question: "How do guests pay per seat?",
    answer:
      "When you accept a request, tickets for that event become purchasable. You share the link with the host, and they can either pay for all seats or forward the link so each guest pays individually.",
  },
  {
    question: "Do you support deposits?",
    answer:
      "Yes. For larger parties, the system supports partial deposits with a deadline for the remaining balance. For smaller events, full payment is collected upfront. The exact rules are configurable per chef.",
  },
  {
    question: "What payment processor do you use?",
    answer: "All payments are processed securely through Stripe.",
  },
  {
    question: "Can I customize my menus and experiences?",
    answer:
      "Yes. You get a full menu management system: organize by course, add dishes with ingredients and descriptions, set pricing, and upload photos. You can offer plated dinners, cooking classes, buffets, or any combination.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "That's very common. We handle the technical setup so you can keep the domain your clients already know, and your website becomes where they browse menus and book.",
  },
  {
    question: "How long does setup take?",
    answer:
      "We handle the technical setup while you provide menus, photos, and branding preferences. How fast you go live depends on your content and availability, and we work with you on a realistic timeline.",
  },
  {
    question: "Do I need any technical skills?",
    answer:
      "None. We do the setup for you. Your day-to-day is reviewing requests and clicking approve. That's it.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
        </FadeInUp>

        {/* Accordion */}
        <FadeInUp delay={0.2}>
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left font-serif text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInUp>
      </div>
    </section>
  );
}
