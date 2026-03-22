"use client";

import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const tiers = [
  {
    name: "Launch",
    price: "$99",
    description: "Perfect for solo chefs getting started",
    features: [
      "Branded website",
      "Menu & experience pages",
      "Request form + admin dashboard",
      "Automated email notifications",
      "Stripe checkout",
      "Done-for-you setup",
    ],
    note: "+ per-booking commission (agreed per chef)",
    popular: false,
  },
  {
    name: "Growth",
    price: "$149",
    description: "For chefs scaling to more events",
    features: [
      "Everything in Launch, plus:",
      "Custom domain",
      "Priority support",
      "Lower commission rate",
    ],
    note: "+ per-booking commission (agreed per chef)",
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No hidden fees. Cancel anytime.
            </p>
          </div>
        </FadeInUp>

        {/* Pricing Cards */}
        <StaggerContainer className="mt-16">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {tiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <HoverScale>
                  <div
                    className={`relative h-full rounded-xl border-2 bg-card p-8 transition-all duration-300 ${
                      tier.popular
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Popular Badge */}
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}

                    {/* Tier Name */}
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tier.description}
                    </p>

                    {/* Features List */}
                    <ul className="mt-8 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Note */}
                    <p className="mt-6 text-xs text-muted-foreground">{tier.note}</p>

                    {/* CTA Button */}
                    <Button
                      onClick={openCalendlyPopup}
                      className="mt-8 w-full bg-primary text-primary-foreground hover:bg-accent-hover"
                    >
                      Book a Demo
                    </Button>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Footer Note */}
        <FadeInUp delay={0.3}>
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Exact commission structure is agreed individually per chef. White-glove setup included in all plans.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
