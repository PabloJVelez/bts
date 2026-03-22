"use client";

import {
  Store,
  BookOpen,
  ChefHat,
  ClipboardList,
  ShieldCheck,
  Ticket,
  Share2,
  Wallet,
  Mail,
  Wrench,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const features = [
  {
    icon: Store,
    title: "Branded Website",
    description:
      "Your own website with your name, bio, photos, and branding. SEO-ready so clients find you on Google.",
  },
  {
    icon: BookOpen,
    title: "Full Menu Catalog",
    description:
      "Organize menus by course with dishes, ingredients, and pricing. Clients browse instead of downloading a PDF.",
  },
  {
    icon: ChefHat,
    title: "Experiences you define",
    description:
      "Create and manage your own experience types, pricing, and structure, so your site matches how you actually work, not a fixed template.",
  },
  {
    icon: ClipboardList,
    title: "Structured Request Form",
    description:
      "One multi-step form captures date, time, party size, address, dietary needs, and special requests.",
  },
  {
    icon: ShieldCheck,
    title: "Your Decision",
    description:
      "Every request lands in your dashboard. You decide what gets booked: accept or decline, add chef notes, or send a clear decline reason.",
  },
  {
    icon: Ticket,
    title: "Per-Seat Ticketed Checkout",
    description:
      "Once you approve, tickets for that event become purchasable for your customers. Guests pay per seat.",
  },
  {
    icon: Share2,
    title: "Shareable Booking Links",
    description:
      "Share your event link via text, email, Facebook, or Twitter. Hosts or guests can each pay individually.",
  },
  {
    icon: Wallet,
    title: "Secure Stripe Checkout",
    description:
      "Payments run through Stripe so clients check out safely and you get paid reliably.",
  },
  {
    icon: Mail,
    title: "Automated Email Notifications",
    description:
      "Clients get instant confirmations, acceptance emails with booking links, or polite decline notices.",
  },
  {
    icon: Wrench,
    title: "Done-for-You Setup",
    description:
      "We build your website, upload your menus, and configure your admin. You provide content; we handle the rest.",
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
              Everything you need to run your business
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Less admin. More cooking.
            </p>
          </div>
        </FadeInUp>

        {/* Features Grid */}
        <StaggerContainer className="mt-16">
          <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, index) => (
              <StaggerItem
                key={feature.title}
                className={cn(
                  "h-full min-h-0",
                  /* center last row when the grid has empty slots */
                  index === 8 && "xl:col-start-2",
                  index === 9 && "lg:col-start-2 xl:col-start-auto",
                )}
              >
                <HoverScale className="h-full">
                  <div className="flex h-full min-h-0 flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                    <feature.icon className="mb-4 h-8 w-8 shrink-0 text-primary" />
                    <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
