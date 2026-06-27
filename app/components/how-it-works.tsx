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
  HoverScale,
} from "~/components/motion-wrapper";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

type Step = {
  number: number;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  previewSrc: string;
  previewAlt: string;
};

const steps: Step[] = [
  {
    number: 1,
    icon: UtensilsCrossed,
    eyebrow: "Client sees the menu",
    title: "Menus are easy to browse",
    description:
      "Send one link from a DM, text, email, or bio. Clients can review menus, add-ons, photos, and pricing without asking for screenshots.",
    previewSrc: "/chefevethub-menus.png",
    previewAlt:
      "Example storefront menus page showing catalog cards with images, course counts, and pricing.",
  },
  {
    number: 2,
    icon: CalendarCheck,
    eyebrow: "Client submits the details",
    title: "The request form gathers context",
    description:
      "Date, timing, headcount, kitchen address, allergies, notes, and event context are collected before you quote.",
    previewSrc: "/chefeventhub-request.png",
    previewAlt:
      "Example multi-step request form for choosing experience type, menu, and guest count.",
  },
  {
    number: 3,
    icon: CheckCircle,
    eyebrow: "Chef stays in control",
    title: "You review before anything is booked",
    description:
      "Every request lands in your dashboard first, so you can accept the right fit and decline dates that do not work.",
    previewSrc: "/chefeventhub-admin-request.png",
    previewAlt:
      "Example admin screen for reviewing an event request with accept and reject actions.",
  },
  {
    number: 4,
    icon: CreditCard,
    eyebrow: "Client gets the next step",
    title: "Payment happens after approval",
    description:
      "Approved clients receive the confirmation and payment handoff, whether you collect a deposit, full payment, or guest-split payment.",
    previewSrc: "/chefeventhub-request-accepted.png",
    previewAlt:
      "Example email confirmation with event details, payment summary, and a purchase tickets link.",
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
                These screens come from the working demo: choose a menu, submit event details, wait for chef approval, then pay after approval.
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

        <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {steps.map((step) => (
            <StaggerItem key={step.number} className="h-full">
              <HoverScale className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-200 hover:border-primary/35 hover:shadow-md">
                  <figure className="border-b border-border/70 bg-muted/30">
                    <img
                      src={step.previewSrc}
                      alt={step.previewAlt}
                      className="aspect-16/10 w-full object-cover object-top"
                      loading={step.number === 1 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </figure>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                        <step.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
                          Step {step.number}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                          {step.eyebrow}
                        </p>
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </article>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp className="mt-10">
          <div className="grid gap-6 rounded-xl border border-border/80 bg-background px-5 py-6 shadow-sm shadow-black/5 ring-1 ring-black/5 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:py-7">
            <div>
              <p className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
                Click through the demo before booking a walkthrough.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                It shows the same menu, request, approval, and payment handoff we would adapt for your chef brand.
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="w-full bg-card sm:w-auto"
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
        </FadeInUp>
      </div>
    </section>
  );
}
