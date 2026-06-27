"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";
import { FadeInUp } from "~/components/motion-wrapper";

export function FinalCTA() {
  return (
    <section className="bg-linear-to-b from-secondary to-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeInUp>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Want us to build your booking page?
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
            Send us your menu. We will set up the rest and walk you through it.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              onClick={openCalendlyPopup}
              size="lg"
              className="px-8 text-lg"
            >
              Get My Booking Page Built
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="px-8 text-lg"
            >
              <a
                href={DEMO_STOREFRONT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Open live demo storefront
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer email?{" "}
            <a
              href="mailto:pmltechpile@gmail.com"
              className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Send us your menu
            </a>
            .
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
