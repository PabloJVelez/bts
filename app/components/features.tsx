"use client";

import {
  Store,
  BookOpen,
  ChefHat,
  ClipboardList,
  ShieldCheck,
  Wallet,
  Mail,
  Wrench,
} from "lucide-react";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const featureBuckets = [
  {
    heading: "Get paid upfront",
    items: [
      {
        icon: Wallet,
        title: "Collect deposits or full payment online",
        description:
          "Take a deposit, charge in full, or split it so guests can each pay their part online.",
      },
      {
        icon: Mail,
        title: "Send payment links and confirmations automatically",
        description:
          "After you approve, clients get a clear email with next steps and payment details so you are not chasing money.",
      },
    ],
  },
  {
    heading: "Keep event details in one place",
    items: [
      {
        icon: ClipboardList,
        title: "Collect the details you need to cook",
        description:
          "Date, headcount, timing, kitchen address, allergies, and notes are all captured in one guided form.",
      },
      {
        icon: ShieldCheck,
        title: "Approve or decline from your dashboard",
        description:
          "See each request in one view. Stay in control of your calendar and avoid accidental double-booking.",
      },
    ],
  },
  {
    heading: "Look professional without extra work",
    items: [
      {
        icon: Store,
        title: "Get your own branded chef website",
        description:
          "Your name, photos, menus, and experiences all live on one page you can send to anyone who asks, 'Are you free?'",
      },
      {
        icon: BookOpen,
        title: "Show menus clearly",
        description:
          "Clients browse your dishes and pricing on your site instead of asking for menu screenshots or old PDFs.",
      },
      {
        icon: ChefHat,
        title: "Set up experiences your way",
        description:
          "Offer the event types you actually run, from tasting menus to family-style dinners, with the pricing you choose.",
      },
      {
        icon: Wrench,
        title: "Let us set everything up",
        description:
          "Send us your menu, photos, and branding. We build the site and booking flow for you.",
      },
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built to solve real booking problems
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Keep texting clients if you want. Use one link when it is time to collect details and payment.
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Want to see it in action?{" "}
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

        {/* Feature Buckets */}
        <StaggerContainer className="mt-14">
          <div className="space-y-12 md:space-y-14">
            {featureBuckets.map((bucket) => (
              <StaggerItem key={bucket.heading}>
                <div>
                  <h3 className="mb-5 font-serif text-2xl font-semibold tracking-tight text-foreground">
                    {bucket.heading}
                  </h3>
                  <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:gap-6">
                    {bucket.items.map((feature) => (
                      <HoverScale key={feature.title} className="h-full">
                        <div className="flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:border-primary/35 hover:shadow-md">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/70 ring-1 ring-black/5">
                              <feature.icon className="h-5 w-5 text-primary" aria-hidden />
                            </div>
                          </div>
                          <h4 className="mb-2 max-w-[28ch] font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                            {feature.title}
                          </h4>
                          <p className="min-h-0 flex-1 max-w-prose text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                            {feature.description}
                          </p>
                        </div>
                      </HoverScale>
                    ))}
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
