"use client";

import { ArrowRight, Clock3, Flame, MessageCircle, Wallet } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "~/components/motion-wrapper";

const metrics = [
  {
    value: "7x",
    label: "more likely to qualify",
    detail:
      "Companies that contacted online leads within an hour were nearly seven times as likely to qualify them as companies that waited even one hour longer.",
  },
  {
    value: "60x",
    label: "the penalty for waiting",
    detail:
      "The same HBR research found one-hour responders were more than sixty times as likely to qualify a lead as companies that waited 24 hours or longer.",
  },
  {
    value: "5 min",
    label: "the hot window",
    detail:
      "Lead-response research shows the odds of reaching and qualifying a web lead fall hard when the first real response slips from five minutes to thirty.",
  },
];

const storySteps = [
  {
    icon: Flame,
    title: "They are ready right now",
    copy:
      "A client reaches out while they are imagining the dinner, checking dates, and trying to solve a real hosting problem.",
  },
  {
    icon: MessageCircle,
    title: "Slow follow-up cools the lead",
    copy:
      "If the next step is another text thread, a delayed quote, or a vague 'send me details,' the urgency fades before you can price the event.",
  },
  {
    icon: Wallet,
    title: "A booking flow captures the moment",
    copy:
      "BTS gives them a link where they can choose the experience, answer the important questions, and move toward approval and payment while interest is high.",
  },
];

export function SpeedToLead() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/90">
                Why speed matters
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The chef who makes the next step easiest usually wins the event.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              When someone asks about a private dinner, they are not casually browsing.
              They are trying to solve a party, anniversary, client dinner, or birthday
              problem. A fast, clear booking path keeps that intent from cooling off in
              a messy inbox.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-10 grid gap-4 lg:grid-cols-3">
          {metrics.map((metric) => (
            <StaggerItem key={metric.value}>
              <div className="h-full rounded-xl border border-border/80 bg-card p-5 shadow-sm shadow-black/5 ring-1 ring-black/5 sm:p-6">
                <p className="font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                  {metric.value}
                </p>
                <h3 className="mt-3 text-base font-semibold text-foreground sm:text-lg">
                  {metric.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {metric.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInUp className="mt-5">
          <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Source: Harvard Business Review,{" "}
            <a
              href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              The Short Life of Online Sales Leads
            </a>
            , and the Lead Response Management study. These studies measure lead
            contact and qualification, not guaranteed closed revenue.
          </p>
        </FadeInUp>

        <FadeInUp className="mt-12">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-secondary/25 shadow-sm shadow-black/5 ring-1 ring-black/5">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-border/70 bg-card p-6 sm:p-7 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Clock3 className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  The website should not just collect a lead. It should give the lead
                  something useful to do.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  BTS is built around that idea: reduce the delay between "I want this"
                  and "here is the dinner I want to book."
                </p>
                <Button
                  onClick={openCalendlyPopup}
                  className="mt-6 bg-primary text-primary-foreground hover:bg-accent-hover"
                >
                  Build my booking path
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>

              <div className="grid gap-0 sm:grid-cols-3 lg:grid-cols-1">
                {storySteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="border-b border-border/70 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border/80">
                        <step.icon className="h-4 w-4" aria-hidden />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
                        0{index + 1}
                      </p>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
