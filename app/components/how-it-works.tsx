"use client";

import { UtensilsCrossed, CalendarCheck, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "~/components/motion-wrapper";

const steps = [
  {
    number: 1,
    icon: UtensilsCrossed,
    title: "Clients browse your menus & experiences",
    description:
      "Your storefront showcases your full menu catalog: courses, dishes, pricing, plus experience types like plated dinners, cooking classes, and buffets. No more PDF attachments.",
  },
  {
    number: 2,
    icon: CalendarCheck,
    title: "They submit one structured request",
    description:
      "Date, time, party size, location, dietary needs, special requests: everything captured in a single guided form. No more back-and-forth DMs.",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "You review and approve from your dashboard",
    description:
      "See every request in your admin panel. Accept with one click or decline with a reason. You stay in full control of your calendar.",
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Guests pay per seat via a shareable link",
    description:
      "Approved events auto-generate a bookable product. Share the link with the host: they can pay for everyone, or each guest pays for their own seat.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From inquiry to paid booking in four simple steps.
            </p>
          </div>
        </FadeInUp>

        {/* Steps */}
        <StaggerContainer className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <div className="group relative">
                  {/* Connector Line (hidden on last item and mobile) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-full top-12 z-0 hidden w-8 border-t-2 border-dashed border-border lg:block">
                      <ArrowRight className="absolute -right-1 -top-2.5 h-5 w-5 text-primary" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                    {/* Number Badge */}
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <step.icon className="mb-4 h-8 w-8 text-primary" />

                    {/* Title */}
                    <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
