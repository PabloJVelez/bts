"use client";

import { XCircle, CheckCircle2 } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "~/components/motion-wrapper";

const painPoints = [
  {
    pain: "I got three booking requests today and each one is buried in a different text thread.",
    solution:
      "Send one link. People pick a menu and submit details in one place, so you stop hunting through old messages.",
  },
  {
    pain: "I am still asking for headcount, allergies, and the kitchen address the day before the event.",
    solution:
      "The form collects those details up front. You get one clean request before you start prep or grocery shopping.",
  },
  {
    pain: "I spend too much time chasing deposits, then people ghost.",
    solution:
      "After you approve, the payment link goes out right away. You can collect a deposit or full payment.",
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
              Why chefs stick with it
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
