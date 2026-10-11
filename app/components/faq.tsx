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
    question: "Why does response speed matter for private chef bookings?",
    answer:
      "People ask about private events while the need is active. If the next step is slow or unclear, that urgency fades. BTS gives them a booking path they can use right away, while you still keep approval control.",
  },
  {
    question: "Do I still control which events I accept?",
    answer:
      "Yes. Every request lands in your dashboard first. You review it, then accept or decline. Nothing is booked without your approval.",
  },
  {
    question: "Can I collect deposits?",
    answer:
      "Yes. After you accept the event, the client gets a confirmation email with a link to pay the deposit or purchase tickets online.",
  },
  {
    question: "Can clients purchase tickets?",
    answer:
      "Yes. If the event is ticketed, clients can purchase tickets from the same booking flow instead of coordinating payment through DMs.",
  },
  {
    question: "What if I want to keep texting my clients?",
    answer:
      "Keep texting. BTS gives you one place to collect event details, approve the fit, and send the payment link, so DMs stay personal without becoming the place you chase every detail.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "That is common. We handle setup and can work with the domain your clients already know.",
  },
  {
    question: "How long does setup take?",
    answer:
      "You send your menu, photos, and branding. We do the build. Timeline depends on how fast content is ready.",
  },
  {
    question: "Do I need any technical skills?",
    answer:
      "No. We set it up for you. Your day to day is reviewing requests, accepting the right events, and managing upcoming bookings from the admin overview.",
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
              Questions chefs ask
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
