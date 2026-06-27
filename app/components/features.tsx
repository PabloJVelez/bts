"use client";

import {
  Store,
  ClipboardList,
  Wallet,
  BadgeCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const bookingSystemGroups = [
  {
    icon: Store,
    title: "A branded booking page",
    description:
      "A polished page built from your real menus, photos, event types, and booking preferences.",
    items: [
      "Your brand, photos, menus, add-ons, pricing, and event types",
      "A simple path from browsing to starting a request",
      "A shareable link clients can open from any DM, email, or bio",
    ],
  },
  {
    icon: ClipboardList,
    title: "A guided request flow",
    description:
      "A guided form collects the details you usually have to chase manually before you quote.",
    items: [
      "Date, timing, headcount, address, allergies, notes, and event context",
      "Every request waits for your approval before anything is booked",
      "A dashboard where event details stay together instead of scattered across threads",
    ],
  },
  {
    icon: Wallet,
    title: "Payment and follow-up",
    description:
      "Approved clients get a clean next step for payment, confirmation, and booking details.",
    items: [
      "Deposit, full payment, or guest-split payment options",
      "Email confirmations with the booking details and next steps",
      "Done-for-you setup from your menu, photos, branding, and booking rules",
    ],
  },
];

const confidenceCues = [
  "Built from your existing menus and photos",
  "Reviewed with you before you send it to clients",
  "Live demo available before the walkthrough",
];

const setupSteps = [
  "You send your menu, photos, event types, and booking rules.",
  "We build your first booking page and request flow.",
  "You review the live flow before sending it to clients.",
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/90">
              What you get
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your private chef booking system, built for you.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              BTS turns your menus, request forms, approvals, payments, and client follow-up into one branded flow.
            </p>
            <div className="mt-6 grid gap-2 text-left sm:grid-cols-3">
              {confidenceCues.map((cue) => (
                <div
                  key={cue}
                  className="flex items-start gap-2 rounded-lg border border-border/70 bg-card/70 px-3 py-3 text-sm leading-snug text-foreground/85 shadow-sm shadow-black/5"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{cue}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Want proof before a walkthrough?{" "}
              <a
                href={DEMO_STOREFRONT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Browse our live demo booking page
              </a>
              .
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {bookingSystemGroups.map((group, index) => (
            <StaggerItem key={group.title}>
              <HoverScale className="h-full">
                <div className="flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-5 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:border-primary/35 hover:shadow-md sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
                      <group.icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
                        0{index + 1}
                      </p>
                      <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {group.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                    {group.description}
                  </p>
                  <ul className="mt-5 space-y-3 border-t border-border/70 pt-5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp className="mt-8">
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-5 text-center shadow-sm shadow-black/5 sm:px-6">
            <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-foreground sm:text-lg">
              The end result is simple: clients request a date, you approve the right fit, and payment happens before the event details get lost in messages.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp className="mt-14">
          <div className="grid gap-8 border-y border-border/80 py-10 md:grid-cols-[1fr_1.1fr] md:items-center md:py-12">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BadgeCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Built for you, then walked through with you.
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
