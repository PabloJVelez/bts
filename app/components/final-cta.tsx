"use client";

import { Mail } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { FadeInUp } from "~/components/motion-wrapper";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeInUp>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ready to stop chasing leads and start getting paid?
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
            Book a 15-minute demo and we'll show you how it works for your business.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={openCalendlyPopup}
              size="lg"
              className="bg-primary px-8 text-lg text-primary-foreground hover:bg-accent-hover"
            >
              Book a Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-border px-8 text-lg"
            >
              <a href="mailto:pmltechpile@gmail.com" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
