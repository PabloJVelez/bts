"use client";

import { XCircle, CheckCircle2 } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "~/components/motion-wrapper";

const painPoints = [
  {
    pain: "You're copy-pasting menus into DMs and losing track of inquiries",
    solution:
      "Clients browse your full menu catalog with courses, dishes, and pricing, then submit one clean request.",
  },
  {
    pain: "You spend hours going back and forth on dates, sizes, and dietary needs",
    solution:
      "One structured form captures everything upfront. You review a complete request, not a thread of messages.",
  },
  {
    pain: "You chase deposits and lose bookings to no-shows",
    solution:
      "Approved events auto-generate a pay link. Guests pay per seat before the event, not after.",
  },
];

export function WhyChefsLoveIt() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for how private chefs actually work
            </h2>
          </div>
        </FadeInUp>

        {/* Pain/Solution Cards */}
        <StaggerContainer className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            {painPoints.map((item, index) => (
              <StaggerItem key={index}>
                <div className="h-full overflow-hidden rounded-xl border border-border bg-card">
                  {/* Pain Section */}
                  <div className="border-b border-border bg-destructive/5 p-6">
                    <div className="mb-3 flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive/70" />
                      <p className="text-sm font-medium leading-relaxed text-foreground">
                        {item.pain}
                      </p>
                    </div>
                  </div>

                  {/* Solution Section */}
                  <div className="bg-primary/5 p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
