"use client";

import { User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "~/components/motion-wrapper";

const personas = [
  {
    name: "Private chefs doing regular events",
    description:
      "You book a few events every month, handle client messages yourself, and want one clean way to collect details and payment.",
  },
  {
    name: "Chefs growing a small team",
    description:
      "You are juggling more dates, trying to avoid double-booking, and need requests, payments, and confirmations in one place.",
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
              Who this is for
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              If booking work comes through texts and email, this will feel familiar.
            </p>
          </div>
        </FadeInUp>

        {/* Persona Cards */}
        <StaggerContainer className="mt-16">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {personas.map((persona) => (
              <StaggerItem key={persona.name} className="h-full min-h-0">
                <HoverScale className="h-full">
                  <div className="flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-6 text-center shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-200 hover:border-primary/35 hover:shadow-md">
                    {/* Avatar */}
                    <div className="mx-auto mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary/70 ring-1 ring-black/5">
                      <User className="h-7 w-7 text-muted-foreground" />
                    </div>

                    {/* Name */}
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {persona.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                      {persona.description}
                    </p>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeInUp delay={0.25}>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-border/80 bg-secondary/20 p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 text-left md:p-7">
            <h3 className="font-serif text-xl font-semibold text-foreground">Who this is not for</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Chefs who only do one event every few months and do not care about deposits or keeping event details organized.
            </p>
          </div>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={0.3}>
          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Want to see if it fits your workflow?</p>
            <Button
              onClick={openCalendlyPopup}
              className="bg-primary px-8 text-primary-foreground hover:bg-accent-hover"
            >
              Get a walkthrough
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
