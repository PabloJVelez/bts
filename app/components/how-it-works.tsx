"use client";

import type { LucideIcon } from "lucide-react";
import {
  UtensilsCrossed,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "~/components/motion-wrapper";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

type Step = {
  number: number;
  icon: LucideIcon;
  eyebrow: string;
};

const steps: Step[] = [
  {
    number: 1,
    icon: UtensilsCrossed,
    eyebrow: "Client sees the menu",
  },
  {
    number: 2,
    icon: CalendarCheck,
    eyebrow: "Client submits the details",
  },
  {
    number: 3,
    icon: CheckCircle,
    eyebrow: "Chef stays in control",
  },
  {
    number: 4,
    icon: CreditCard,
    eyebrow: "Client gets the next step",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/25 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl text-center lg:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/90">
                Live template demo
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                See the booking flow your clients would use.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                A short look at the working demo: clients choose a menu, send event details, wait for your approval, then get the payment handoff.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="mx-auto w-full bg-primary text-primary-foreground hover:bg-accent-hover sm:w-auto lg:mx-0"
            >
              <a
                href={DEMO_STOREFRONT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Live Demo
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </FadeInUp>

        <FadeInUp className="mt-12">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm shadow-black/5 ring-1 ring-black/5">
            <div className="border-b border-border/70 bg-muted/30 p-2 sm:p-3">
              <video
                className="aspect-video w-full rounded-lg bg-muted object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/chefevethub-menus.png"
                aria-label="Demo loop showing the private chef booking flow from menu browsing to payment handoff."
              >
                <source
                  src="/videos/chef-booking-flow.webm"
                  type="video/webm"
                />
              </video>
            </div>
            <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
                  One flow from first look to paid booking.
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  The demo keeps each next step clear, so serious inquiries do not disappear into screenshots, texts, and follow-up messages.
                </p>
              </div>
              <Button
                variant="outline"
                asChild
                className="w-full bg-background sm:w-auto"
              >
                <a
                  href={DEMO_STOREFRONT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View demo storefront
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="flex h-full items-center gap-3 rounded-lg border border-border/70 bg-background px-4 py-3 shadow-sm shadow-black/5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                  <step.icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
                    Step {step.number}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {step.eyebrow}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
