"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChefHat,
  CreditCard,
  MessageSquareText,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

const chapters = [
  {
    eyebrow: "The problem",
    title: "The lead should not land in another loose thread.",
    copy:
      "A serious client is trying to solve a dinner, birthday, client event, or anniversary. If the next step is vague, the moment cools off.",
    icon: MessageSquareText,
    detail: "Before: screenshots, DMs, missing addresses, late deposits.",
  },
  {
    eyebrow: "The setup",
    title: "Your menus, rules, photos, and event types become the path.",
    copy:
      "BTS turns what you already have into a guided booking page that feels like your brand and asks the questions you usually chase manually.",
    icon: ChefHat,
    detail: "Built from your real menu, photos, pricing logic, and booking preferences.",
  },
  {
    eyebrow: "The control",
    title: "Every request waits for your approval.",
    copy:
      "The client can move quickly, but you still decide which events fit. Date, guests, timing, address, menu, and notes stay attached to the request.",
    icon: BadgeCheck,
    detail: "No accidental commitments. No scattered context.",
  },
  {
    eyebrow: "The handoff",
    title: "Approval turns into payment momentum.",
    copy:
      "Once you accept the fit, the client gets a clean payment step so the event does not drift back into follow-up limbo.",
    icon: CreditCard,
    detail: "Deposit, full payment, or a custom payment path.",
  },
  {
    eyebrow: "The fit",
    title: "Built for chefs who book enough events for delay to cost money.",
    copy:
      "This is for private chefs who handle regular event inquiries and want the first response to feel polished, fast, and organized.",
    icon: UserRoundCheck,
    detail: "Not for chefs who rarely book events or do not care about deposits.",
  },
];

function ActiveChapterCard({ index }: { index: number }) {
  const chapter = chapters[index];

  return (
    <motion.div
      key={chapter.title}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: [0.22, 0.68, 0.35, 1] }}
      className="flex min-h-[52svh] items-center justify-center"
    >
      <div className="w-full max-w-lg rounded-[28px] border border-border/80 bg-card p-5 shadow-2xl shadow-black/10 ring-1 ring-black/5 sm:p-6">
        <div className="flex items-center justify-between border-b border-border/70 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
              <chapter.icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-primary/80">
                {chapter.eyebrow}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground/70">
                Chapter {index + 1} of {chapters.length}
              </p>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-primary/70" aria-hidden />
        </div>

        <div className="space-y-3 py-6">
          <div className="h-3 w-3/4 rounded-full bg-secondary" />
          <div className="h-3 w-full rounded-full bg-secondary" />
          <div className="h-3 w-2/3 rounded-full bg-secondary" />
        </div>

        <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4">
          <p className="text-sm font-medium leading-relaxed text-foreground">
            {chapter.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ActiveChapterCopy({ index }: { index: number }) {
  const chapter = chapters[index];

  return (
    <motion.div
      key={chapter.title}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 0.68, 0.35, 1] }}
      className="flex min-h-[58svh] flex-col justify-center"
    >
      <p className="text-xs font-medium uppercase text-primary/90">
        {chapter.eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        {chapter.title}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        {chapter.copy}
      </p>
    </motion.div>
  );
}

function getActiveChapterIndex(value: number) {
  return Math.min(chapters.length - 1, Math.max(0, Math.floor(value * chapters.length)));
}

export function StoryContinuation() {
  const target = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 34,
    restDelta: 0.0005,
  });

  useMotionValueEvent(progress, "change", (value) => {
    setActiveIndex((current) => {
      const next = getActiveChapterIndex(value);
      return current === next ? current : next;
    });
  });

  if (reduceMotion) {
    return (
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {chapters.map((chapter) => (
              <article key={chapter.title} className="rounded-2xl border border-border/80 bg-card p-6">
                <p className="text-xs font-medium uppercase text-primary/80">{chapter.eyebrow}</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground">{chapter.title}</h2>
                <p className="mt-3 text-muted-foreground">{chapter.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-background lg:hidden">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.title}
            className="flex min-h-[84svh] items-center border-b border-border/70 px-4 py-16"
          >
            <div className="mx-auto max-w-md">
              <div className="mb-8 rounded-[28px] border border-border/80 bg-card p-5 shadow-xl shadow-black/10 ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                    <chapter.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-primary/80">
                      {chapter.eyebrow}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground/70">
                      Chapter {index + 1} of {chapters.length}
                    </p>
                  </div>
                </div>
                <p className="mt-6 rounded-2xl border border-border/70 bg-secondary/30 p-4 text-sm font-medium leading-relaxed text-foreground">
                  {chapter.detail}
                </p>
              </div>

              <p className="text-xs font-medium uppercase text-primary/90">
                {chapter.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-foreground">
                {chapter.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {chapter.copy}
              </p>
            </div>
          </article>
        ))}
        <div className="px-4 py-16">
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border/80 bg-card p-5 text-center shadow-xl shadow-black/10">
            <CalendarCheck className="h-6 w-6 text-primary" aria-hidden />
            <p className="font-serif text-2xl font-semibold text-foreground">
              See the flow your clients would use.
            </p>
            <Button
              onClick={openCalendlyPopup}
              className="w-full bg-primary text-primary-foreground hover:bg-accent-hover"
            >
              Get my booking page built
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href={DEMO_STOREFRONT_URL} target="_blank" rel="noopener noreferrer">
                Open live demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section ref={target} className="relative hidden h-[430svh] bg-background lg:block">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <ActiveChapterCard index={activeIndex} />
            </div>

            <div>
              <ActiveChapterCopy index={activeIndex} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border/80 bg-card/95 p-5 text-center shadow-xl shadow-black/10 sm:p-6">
            <CalendarCheck className="h-6 w-6 text-primary" aria-hidden />
            <p className="font-serif text-2xl font-semibold text-foreground">
              See the flow your clients would use.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                onClick={openCalendlyPopup}
                className="bg-primary text-primary-foreground hover:bg-accent-hover"
              >
                Get my booking page built
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" asChild>
                <a href={DEMO_STOREFRONT_URL} target="_blank" rel="noopener noreferrer">
                  Open live demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
