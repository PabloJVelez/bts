"use client";

import {
  Store,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  Wallet,
  Mail,
  Wrench,
  CalendarCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const offerItems = [
  {
    icon: Store,
    title: "Branded booking page",
    description:
      "A polished page for your chef brand, photos, menus, event types, and booking CTA.",
  },
  {
    icon: BookOpen,
    title: "Menu and experience upload",
    description:
      "Your tasting menus, family-style dinners, add-ons, pricing, and course details organized clearly.",
  },
  {
    icon: ClipboardList,
    title: "Event request intake",
    description:
      "Clients submit date, headcount, timing, address, allergies, notes, and the context you need.",
  },
  {
    icon: ShieldCheck,
    title: "Approval-first workflow",
    description:
      "Every request waits for your approval, so you never accept a booking before checking fit.",
  },
  {
    icon: Wallet,
    title: "Deposit or full-payment flow",
    description:
      "After approval, clients get the payment link. Collect a deposit, full payment, or guest split.",
  },
  {
    icon: Mail,
    title: "Email confirmations",
    description:
      "Clients get clear next steps and booking details without another round of manual follow-up.",
  },
  {
    icon: CalendarCheck,
    title: "Booking dashboard",
    description:
      "Review requests, keep event details together, and reduce the calendar risk of scattered threads.",
  },
  {
    icon: Wrench,
    title: "Done-for-you setup",
    description:
      "Send your menu, photos, and branding. We build the first version and walk you through it.",
  },
];

const setupSteps = [
  "You send your menu, photos, event types, and booking rules.",
  "We build your first booking page and request flow.",
  "You review the live flow before sending it to clients.",
];

export function Features() {
  return (
    <section id="features" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/90">
              The offer
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to turn interest into a payable booking request
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              BTS is not another profile page. It is the booking system private chefs wish they had before the next serious inquiry lands.
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Want proof before a walkthrough?{" "}
              <a
                href={DEMO_STOREFRONT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Browse our live demo storefront
              </a>
              .
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {offerItems.map((item) => (
            <StaggerItem key={item.title}>
              <HoverScale className="h-full">
                <div className="flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:border-primary/35 hover:shadow-md">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 ring-1 ring-black/5">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="mb-2 max-w-[24ch] font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp className="mt-14">
          <div className="grid gap-8 border-y border-border/80 py-10 md:grid-cols-[1fr_1.1fr] md:items-center md:py-12">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BadgeCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Built for you, then walked through with you
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                You do not need to stitch together forms, payment links, menu PDFs, and follow-up emails. We turn your existing material into a working booking flow.
              </p>
            </div>

            <div className="space-y-4">
              {setupSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground ring-1 ring-border/80">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp className="mt-10">
          <div className="flex flex-col items-center justify-between gap-5 rounded-xl border border-border/80 bg-secondary/35 px-5 py-6 text-center shadow-sm shadow-black/5 ring-1 ring-black/5 sm:px-6 md:flex-row md:text-left">
            <p className="max-w-2xl text-base font-medium leading-relaxed text-foreground sm:text-lg">
              See exactly what your client would click through before we build yours.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                onClick={openCalendlyPopup}
                className="w-full bg-primary text-primary-foreground hover:bg-accent-hover sm:w-auto"
              >
                Get My Booking Page Built
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" asChild className="w-full bg-background/70 sm:w-auto">
                <a
                  href={DEMO_STOREFRONT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open live demo
                </a>
              </Button>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
