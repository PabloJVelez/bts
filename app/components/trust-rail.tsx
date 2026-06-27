"use client";

import {
  BadgeCheck,
  ChefHat,
  CreditCard,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { FadeInUp } from "~/components/motion-wrapper";

const items = [
  { icon: ChefHat, label: "Built for private chefs" },
  { icon: Sparkles, label: "Done-for-you setup" },
  { icon: BadgeCheck, label: "You approve every booking" },
  { icon: CreditCard, label: "Collect deposits or full payment" },
  { icon: MousePointerClick, label: "Live booking demo available" },
];

export function TrustRail() {
  return (
    <section aria-label="Trust and proof" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="border-y border-border/70 py-6 md:py-7">
            <ul className="grid gap-y-3 gap-x-6 sm:grid-cols-2 sm:gap-y-4 lg:grid-cols-5">
              {items.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/70 ring-1 ring-black/5">
                    <item.icon className="h-4 w-4 text-primary" aria-hidden />
                  </div>
                  <span className="text-sm font-medium text-foreground/85">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
