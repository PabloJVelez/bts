"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const storyBeats = [
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

  return (
    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
      {beat.copy}
    </p>
  );
}

function ActiveBeat({ index }: { index: number }) {
  const beat = storyBeats[index];

  return (
    <motion.div
      key={beat.title}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      transition={{ duration: 0.46, ease: [0.22, 0.68, 0.35, 1] }}
      className="mx-auto max-w-5xl text-center"
    >
      <p className="text-xs font-medium uppercase text-primary/90">
        {beat.kind}
      </p>
      <h3 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl lg:text-7xl">
        {beat.title}
      </h3>
      <BeatCopy beat={beat} />
    </motion.div>
  );
}

function StoryIntro() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 pt-20 text-center sm:px-6 lg:px-8 lg:pb-0 lg:pt-0">
      <p className="text-xs font-medium uppercase text-primary/90">
        Why a good booking flow matters
      </p>
      <h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
        The right flow turns an inquiry into a paid deposit before the lead cools.
      </h2>
    </div>
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
    <div ref={target} className="relative hidden h-[560svh] lg:block">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <StoryIntro />
        <div className="mt-14 min-h-[48svh] w-full">
          <ActiveBeat index={activeIndex} />
        </div>
        <div className="mt-10 flex gap-2">
          {storyBeats.map((beat, index) => (
            <span
              key={beat.title}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                index === activeIndex ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileStory() {
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
    <div ref={target} className="relative h-[560svh] lg:hidden">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-4 pb-12 pt-28">
        <StoryIntro />
        <div className="mt-12 min-h-[48svh] w-full">
          <ActiveBeat index={activeIndex} />
        </div>
        <div className="mt-8 flex gap-2">
          {storyBeats.map((beat, index) => (
            <span
              key={beat.title}
              className={`h-1.5 w-7 rounded-full transition-colors ${
                index === activeIndex ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SpeedToLead() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section className="bg-background py-16 md:py-24">
        <StoryIntro />
        <div className="mx-auto mt-12 grid max-w-5xl gap-14 px-4 sm:px-6 lg:px-8">
          {storyBeats.map((_, index) => (
            <ActiveBeat key={storyBeats[index].title} index={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <div className="sr-only">
        {storyBeats.map((beat) => (
          <p key={beat.title}>
            {beat.kind} {beat.title}{" "}
            {"emphasis" in beat
              ? `${beat.copyBefore}${beat.emphasis}${beat.copyAfter}`
              : beat.copy}
          </p>
        ))}
      </div>
      <MobileStory />
      <DesktopScrollStory />
    </section>
  );
}
