"use client";

import { FadeInUp } from "~/components/motion-wrapper";

const beforeItems = [
  "You answer the same 20 questions in DMs and email threads.",
  "Headcount changes twice, then allergy notes get buried.",
  "You are on a grocery run and still chasing the kitchen address and deposit.",
];

const afterItems = [
  "You send one link and the client picks a menu and date.",
  "They fill in headcount, allergies, timing, and kitchen address in one form.",
  "You approve or decline, payment is collected, and event details stay in one place.",
];

export function BeforeVsAfter() {
  return (
    <section className="bg-secondary/20 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The DM spiral vs one booking link
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Keep texting if you want. This just gives you one link for details and payment.
            </p>
          </div>
        </FadeInUp>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <FadeInUp delay={0.1}>
            <div className="h-full rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">Before</h3>
              <ul className="mt-4 space-y-3">
                {beforeItems.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="h-full rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">After</h3>
              <ul className="mt-4 space-y-3">
                {afterItems.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
