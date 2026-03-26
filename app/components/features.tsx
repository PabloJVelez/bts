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
    <section id="features" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built to solve real booking problems
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Keep texting clients if you want. Use one link when it is time to collect details and payment.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Want to see it in action?{" "}
              <a
                href={DEMO_STOREFRONT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Browse our live demo storefront
              </a>
              .
            </p>
          </div>
        </FadeInUp>

        {/* Feature Buckets */}
        <StaggerContainer className="mt-16">
          <div className="space-y-10">
            {featureBuckets.map((bucket) => (
              <StaggerItem key={bucket.heading}>
                <div>
                  <h3 className="mb-4 font-serif text-2xl font-semibold text-foreground">
                    {bucket.heading}
                  </h3>
                  <div className="grid auto-rows-fr gap-6 sm:grid-cols-2">
                    {bucket.items.map((feature) => (
                      <HoverScale key={feature.title} className="h-full">
                        <div className="flex h-full min-h-0 flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                          <feature.icon className="mb-4 h-8 w-8 shrink-0 text-primary" />
                          <h4 className="mb-2 font-serif text-lg font-semibold text-foreground">
                            {feature.title}
                          </h4>
                          <p className="min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground">
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
