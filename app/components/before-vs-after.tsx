"use client";

import { FadeInUp } from "~/components/motion-wrapper";

const beforeItems = [
  "A lead asks about a dinner while they are ready to solve it, then waits hours for a clear next step.",
  "You answer the same 20 questions in DMs and email threads.",
  "You are on a grocery run and still chasing the kitchen address and deposit.",
];

const afterItems = [
  "You send one link while the inquiry is hot, and the client can take action immediately.",
  "They fill in headcount, allergies, timing, and kitchen address in one form.",
  "You approve or decline, payment is collected, and event details stay in one place.",
];

export function BeforeVsAfter() {
  return (
    <section className="bg-secondary/20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The slow DM spiral vs one fast booking path
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Keep texting if you want. This gives interested clients a clear next step before the moment passes.
            </p>
          </div>
        </FadeInUp>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <FadeInUp delay={0.1}>
            <div className="h-full rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 md:p-7">
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
            <div className="h-full rounded-xl border border-border/80 bg-primary/5 p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 md:p-7">
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
