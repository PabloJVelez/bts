"use client";

import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";
import { FadeInUp } from "~/components/motion-wrapper";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-28 sm:pt-24 md:pb-24 md:pt-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/35 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <FadeInUp>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-primary/90">
                Behind the Sauté is a booking and payment page for private
                chefs.
              </p>
              <h1 className="mx-auto max-w-xl font-serif text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl lg:mx-0 lg:max-w-none lg:text-6xl text-balance">
                Send one link. Get booking details. Get paid.
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty lg:mx-0">
                Your client picks a menu, fills out a short request, pays a
                deposit or full amount, and you approve or decline from one
                dashboard.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/90 sm:text-base lg:mx-0">
                If this sounds like you, this helps: you are chasing deposits,
                missing allergy notes, or double-checking headcount from old
                texts.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Button
                  onClick={openCalendlyPopup}
                  size="lg"
                  className="bg-primary px-8 text-base text-primary-foreground shadow-sm shadow-black/5 hover:bg-accent-hover hover:shadow-md focus-visible:ring-offset-2 sm:text-lg"
                >
                  Get a walkthrough
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-border/90 bg-transparent px-8 text-base sm:text-lg"
                >
                  <a
                    href={DEMO_STOREFRONT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See the booking link demo
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground sm:text-base lg:text-left">
                <a
                  href={DEMO_STOREFRONT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  View live demo storefront
                </a>
                . This is what your client sees before they book.
              </p>
            </FadeInUp>
          </div>

          {/* Right Content - Hero Image */}
          <FadeInUp delay={0.3}>
            <div className="relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-black/5 ring-1 ring-black/5 lg:mx-0">
              <img
                src="/images/hero-chef.jpg"
                alt="Professional private chef plating an elegant dish"
                className="h-full w-full object-cover contrast-[1.03] saturate-[1.02]"
                loading="eager"
                decoding="async"
              />
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
