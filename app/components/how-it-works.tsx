"use client";

import type { LucideIcon } from "lucide-react";
import {
  UtensilsCrossed,
  CalendarCheck,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "~/components/motion-wrapper";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

type Step = {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  previewSrc?: string;
  previewAlt?: string;
};

const steps: Step[] = [
  {
    number: 1,
    icon: UtensilsCrossed,
    title: "Share your link",
    description:
      "Send your booking page in a text, email, or Instagram DM. Clients can see your menus and experiences without asking for screenshots.",
    previewSrc: "/chefevethub-menus.png",
    previewAlt:
      "Example storefront menus page showing catalog cards with images, course counts, and pricing.",
  },
  {
    number: 2,
    icon: CalendarCheck,
    title: "Client answers the questions you always ask",
    description:
      "They add date, timing, headcount, kitchen address, allergies, and notes in one guided form.",
    previewSrc: "/chefeventhub-request.png",
    previewAlt:
      "Example multi-step request form for choosing experience type, menu, and guest count.",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "You approve or decline",
    description:
      "Every request lands in your dashboard. Accept the ones you want and decline the ones that do not fit your calendar.",
    previewSrc: "/chefeventhub-admin-request.png",
    previewAlt:
      "Example admin screen for reviewing an event request with accept and reject actions.",
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Payment happens and details stay in one place",
    description:
      "After approval, they get a Stripe payment link by email. You can collect a deposit, full payment, or let guests chip in.",
    previewSrc: "/chefeventhub-request-accepted.png",
    previewAlt:
      "Example email confirmation with event details, payment summary, and a purchase tickets link.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From first message to confirmed booking in four steps.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-16 flex flex-col gap-16 md:gap-20 lg:gap-24">
          {steps.map((step, index) => {
            const hasPreview = Boolean(step.previewSrc);
            const reverseOnLarge = index % 2 === 1;

            return (
              <StaggerItem key={step.number}>
                <div
                  className={
                    hasPreview
                      ? `flex flex-col gap-8 lg:items-center lg:gap-12 ${reverseOnLarge ? "lg:flex-row-reverse" : "lg:flex-row"}`
                      : "flex justify-center"
                  }
                >
                  <div
                    className={
                      hasPreview
                        ? "flex min-w-0 flex-1 flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40 md:p-8"
                        : "w-full max-w-3xl rounded-xl border border-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40 md:p-8"
                    }
                  >
                    <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    <step.icon
                      className="mb-4 h-8 w-8 shrink-0 text-primary"
                      aria-hidden
                    />
                    <h3 className="mb-2 font-serif text-xl font-semibold text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  {hasPreview && step.previewSrc && step.previewAlt ? (
                    <div className="min-w-0 flex-1 lg:max-w-none">
                      <figure className="overflow-hidden rounded-xl border border-border bg-muted/30 shadow-md ring-1 ring-black/5 dark:ring-white/10">
                        <img
                          src={step.previewSrc}
                          alt={step.previewAlt}
                          className="aspect-16/10 w-full object-cover object-top"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </figure>
                    </div>
                  ) : null}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeInUp className="mt-20">
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card px-6 py-8 text-center shadow-sm md:px-10">
            <p className="font-serif text-lg font-semibold text-foreground">
              Want to click through a real booking page?
            </p>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Open the live demo. It is the same flow your clients use.
            </p>
            <a
              href={DEMO_STOREFRONT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline sm:text-base"
            >
              Open live demo
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
