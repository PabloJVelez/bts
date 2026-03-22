"use client";

import { User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const personas = [
  {
    name: "The Solo Chef",
    description:
      "You do 3-8 events a month, manage everything yourself, and lose leads in your inbox. You need a system, not more apps.",
  },
  {
    name: "The Growing Operation",
    description:
      "You're booking 10-20 events a month and need to stop being the bottleneck. You want clients to self-serve and pay upfront.",
  },
];

export function SocialProof() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for chefs like you
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Here's who we're building this for.
            </p>
          </div>
        </FadeInUp>

        {/* Persona Cards */}
        <StaggerContainer className="mt-16">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {personas.map((persona) => (
              <StaggerItem key={persona.name} className="h-full min-h-0">
                <HoverScale className="h-full">
                  <div className="flex h-full min-h-0 flex-col rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                    {/* Avatar */}
                    <div className="mx-auto mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>

                    {/* Name */}
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {persona.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {persona.description}
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* CTA */}
        <FadeInUp delay={0.3}>
          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Join the early access waitlist</p>
            <Button
              onClick={openCalendlyPopup}
              className="bg-primary px-8 text-primary-foreground hover:bg-accent-hover"
            >
              Book a Demo
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
