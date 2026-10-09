"use client";

import { useRef, useState } from "react";
import {
  Clock3,
  HelpCircle,
  MessageCircle,
  MousePointerClick,
  Wallet,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const beats = [
  {
    type: "question",
    eyebrow: "Question 01",
    title: "What happens when a ready-to-book client has to wait?",
    copy:
      "They keep searching, ask another chef, or let the event planning energy fade before you ever send a quote.",
    icon: HelpCircle,
  },
  {
    type: "question",
    eyebrow: "Question 02",
    title: "What should your website do after someone raises their hand?",
    copy:
      "It should not just collect a name and email. It should give the client a useful next step while the request is still warm.",
    icon: MousePointerClick,
  },
  {
    type: "question",
    eyebrow: "Question 03",
    title: "What makes a booking flow better than another message thread?",
    copy:
      "The client knows what to do. You get the details you need. Payment becomes part of the path instead of another chase.",
    icon: MessageCircle,
  },
  {
    type: "answer",
    eyebrow: "Answer 01",
    title: "Fast follow-up keeps the lead alive.",
    copy:
      "The first clear next step matters most while the client is still comparing options and imagining the event.",
    stat: "7x",
    icon: Clock3,
  },
  {
    type: "answer",
    eyebrow: "Answer 02",
    title: "A vague form creates delay.",
    copy:
      "A good flow asks for menu interest, date, guests, timing, location, and notes before the conversation gets scattered.",
    stat: "5 min",
    icon: MessageCircle,
  },
  {
    type: "answer",
    eyebrow: "Answer 03",
    title: "The next step should move toward payment.",
    copy:
      "Once the request is a fit, approval should lead naturally into a deposit or payment handoff.",
    stat: "$",
    icon: Wallet,
  },
];

function getActiveBeatIndex(value: number) {
  return Math.min(beats.length - 1, Math.max(0, Math.floor(value * beats.length)));
}

function ActiveBeat({ index }: { index: number }) {
  const beat = beats[index];

  return (
    <motion.div
      key={beat.title}
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: [0.22, 0.68, 0.35, 1] }}
      className="rounded-[28px] border border-border/80 bg-card p-5 shadow-2xl shadow-black/10 ring-1 ring-black/5 sm:p-7"
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
            <beat.icon className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-primary/85">
              {beat.eyebrow}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {beat.type === "question" ? "What the chef is up against" : "What the flow needs to do"}
            </p>
          </div>
        </div>
        {"stat" in beat ? (
          <span className="font-serif text-4xl font-semibold text-primary">
            {beat.stat}
          </span>
        ) : null}
      </div>

      <h3 className="mt-7 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {beat.title}
      </h3>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {beat.copy}
      </p>
    </motion.div>
  );
}

function DesktopScrollStory() {
  const target = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
      const next = getActiveBeatIndex(value);
      return current === next ? current : next;
    });
  });

  return (
    <div ref={target} className="relative hidden h-[430svh] lg:block">
      <div className="sticky top-0 flex h-svh items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-medium uppercase text-primary/90">
              Why a good booking flow matters
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-5xl font-semibold leading-tight text-foreground">
              The right flow answers the question before the lead cools.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A strong booking page catches intent, gathers the right details, and makes the next step obvious.
            </p>
            <div className="mt-8 flex gap-2">
              {beats.map((beat, index) => (
                <span
                  key={beat.title}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    index === activeIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <ActiveBeat index={activeIndex} />
        </div>
      </div>
    </div>
  );
}

function MobileStory() {
  return (
    <div className="lg:hidden">
      <div className="px-4 pb-3 pt-16">
        <div className="mx-auto max-w-md">
          <p className="text-xs font-medium uppercase text-primary/90">
            Why a good booking flow matters
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground">
            The right flow answers the question before the lead cools.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A strong booking page catches intent, gathers the right details, and makes the next step obvious.
          </p>
        </div>
      </div>
      {beats.map((beat, index) => (
        <article
          key={beat.title}
          className="flex min-h-[82svh] items-center border-b border-border/70 px-4 py-16"
        >
          <div className="mx-auto max-w-md">
            <ActiveBeat index={index} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function SpeedToLead() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase text-primary/90">
              Why a good booking flow matters
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-foreground">
              The right flow answers the question before the lead cools.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              A strong booking page catches intent, gathers the right details, and makes the next step obvious.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {beats.map((_, index) => (
              <ActiveBeat key={beats[index].title} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <MobileStory />
      <DesktopScrollStory />
    </section>
  );
}
