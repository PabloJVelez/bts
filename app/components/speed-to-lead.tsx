"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const storyBeats = [
  {
    kind: "Why a good booking flow matters",
    title: "The right flow turns an inquiry into a paid deposit before the lead cools.",
  },
  {
    kind: "Question 01",
    title: "What happens when a ready-to-book client has to wait?",
    copy:
      "They keep searching, ask another chef, or let the event planning energy fade before you ever send a quote.",
  },
  {
    kind: "Answer 01",
    title: "Fast follow-up keeps the lead alive.",
    copyBefore: "Responding quickly can make a chef ",
    emphasis: "7x more likely",
    copyAfter:
      " to qualify the inquiry while the client is still comparing options and imagining the event.",
  },
  {
    kind: "Question 02",
    title: "What should your website do after someone raises their hand?",
    copy:
      "It should not just collect a name and email. It should give the client a useful next step while the request is still warm.",
  },
  {
    kind: "Answer 02",
    title: "A vague form creates delay.",
    copyBefore: "The first ",
    emphasis: "5 minutes",
    copyAfter:
      " matter. A strong flow gathers menu interest, date, guests, timing, location, and notes before the conversation gets scattered.",
  },
  {
    kind: "Question 03",
    title: "What makes a booking flow better than another message thread?",
    copy:
      "The client knows what to do. You get the details you need. The next step feels obvious instead of becoming another follow-up.",
  },
  {
    kind: "Answer 03",
    title: "The path should end closer to a deposit.",
    copyBefore: "Once the request is a fit, the flow should move from interest to ",
    emphasis: "paid deposit",
    copyAfter:
      " without making the chef chase details, approval, and payment across separate threads.",
  },
];

function getActiveBeatIndex(value: number) {
  return Math.min(
    storyBeats.length - 1,
    Math.max(0, Math.floor(value * storyBeats.length)),
  );
}

function BeatCopy({ beat }: { beat: (typeof storyBeats)[number] }) {
  if ("emphasis" in beat) {
    return (
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
        {beat.copyBefore}
        <span className="font-serif text-2xl font-semibold leading-none text-primary sm:text-5xl">
          {beat.emphasis}
        </span>
        {beat.copyAfter}
      </p>
    );
  }

  if ("copy" in beat) {
    return (
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
        {beat.copy}
      </p>
    );
  }

  return null;
}

function BeatLayer({
  beat,
  active,
}: {
  beat: (typeof storyBeats)[number];
  active: boolean;
}) {
  return (
    <motion.div
      key={beat.title}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 18,
        scale: active ? 1 : 0.992,
      }}
      transition={{ duration: 0.24, ease: [0.22, 0.68, 0.35, 1] }}
      className="pointer-events-none absolute inset-0 flex will-change-transform items-center justify-center px-4 text-center"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase text-primary/90">
          {beat.kind}
        </p>
        <h3 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl lg:text-7xl">
          {beat.title}
        </h3>
        <BeatCopy beat={beat} />
      </div>
    </motion.div>
  );
}

function ScrollStory({ compact = false }: { compact?: boolean }) {
  const target = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex((current) => {
      const next = getActiveBeatIndex(value);
      return current === next ? current : next;
    });
  });

  return (
    <div ref={target} className={compact ? "relative h-[650svh]" : "relative h-[650svh]"}>
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative h-[64svh] w-full max-w-7xl">
          {storyBeats.map((beat, index) => (
            <BeatLayer
              key={beat.title}
              beat={beat}
              active={index === activeIndex}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {storyBeats.map((beat, index) => (
            <span
              key={beat.title}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                index === activeIndex ? "w-9 bg-primary" : "w-7 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticStory() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-14 px-4 sm:px-6 lg:px-8">
        {storyBeats.map((beat, index) => (
          <div key={beat.title} className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-medium uppercase text-primary/90">
              {beat.kind}
            </p>
            <h3 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              {beat.title}
            </h3>
            <BeatCopy beat={beat} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function SpeedToLead() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <StaticStory />;
  }

  return (
    <section className="bg-background">
      <div className="sr-only">
        {storyBeats.map((beat) => (
          <p key={beat.title}>
            {beat.kind} {beat.title}{" "}
            {"emphasis" in beat
              ? `${beat.copyBefore}${beat.emphasis}${beat.copyAfter}`
              : "copy" in beat
                ? beat.copy
                : ""}
          </p>
        ))}
      </div>
      <div className="lg:hidden">
        <ScrollStory compact />
      </div>
      <div className="hidden lg:block">
        <ScrollStory />
      </div>
    </section>
  );
}
