"use client";

import { ChefHat, CreditCard, Sparkles, Clock } from "lucide-react";
// ChefHat is used in trust indicators
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { FadeInUp, StaggerContainer, StaggerItem } from "~/components/motion-wrapper";

const trustIndicators = [
  { icon: ChefHat, label: "Built for private chefs" },
  { icon: CreditCard, label: "Stripe payments" },
  { icon: Sparkles, label: "Done-for-you setup" },
  { icon: Clock, label: "Live in 48 hours" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <FadeInUp>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Turn chef inquiries into paid bookings, without the back-and-forth.
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
                Your own branded storefront where clients browse menus, request events, and pay per seat. You just approve.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
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
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </FadeInUp>

            {/* Trust Indicators */}
            <StaggerContainer className="mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
              {trustIndicators.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span>{item.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Content - Hero Image */}
          <FadeInUp delay={0.3}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-border shadow-xl lg:mx-0">
              <img
                src="/images/hero-chef.jpg"
                alt="Professional private chef plating an elegant dish"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
