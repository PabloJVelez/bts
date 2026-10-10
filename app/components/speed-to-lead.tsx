"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type StoryBeat = {
  role: "intro" | "question" | "answer";
  title: string;
  copy?: string;
  metric?: string;
  range: [number, number, number];
};

const storyBeats: StoryBeat[] = [
  {
    role: "intro",
    title: "The right flow turns an inquiry into a paid deposit before the lead cools.",
    range: [0, 0.06, 0.15],
  },
  {
    role: "question",
    title: "What happens when a ready-to-book client has to wait?",
    range: [0.13, 0.2, 0.3],
  },
  {
    role: "answer",
    title: "They keep looking. Speed helps you win the booking.",
    copy: "A fast, clear next step makes you",
    metric: "7x more likely to be booked for the event",
    range: [0.27, 0.35, 0.46],
  },
  {
    role: "question",
    title: "What should happen after a client is interested in booking an event?",
    range: [0.43, 0.5, 0.59],
  },
  {
    role: "answer",
    title: "The page should collect the event details immediately.",
    copy: "Date, guests, timing, menu interest, location, and notes should be captured in the first",
    metric: "5 minutes",
    range: [0.56, 0.64, 0.74],
  },
  {
    role: "question",
    title: "DMs are working just fine. How is this any better?",
    range: [0.71, 0.78, 0.87],
  },
  {
    role: "answer",
    title: "DMs keep the conversation going. BTS moves the event forward.",
    copy: "A request can still feel personal while moving the client toward a",
    metric: "paid deposit",
    range: [0.83, 0.92, 1],
  },
];

const dmBubbles = [
  { text: "Are you available Saturday?", x: 6, compactX: 4, y: 14, compactY: 14, width: 250, range: [0.1, 0.17, 0.82], rotate: -1.5 },
  { text: "How many guests can you do?", x: 62, compactX: 24, y: 20, compactY: 19, width: 300, range: [0.18, 0.25, 0.84], rotate: 1.4 },
  { text: "Can you send menu options?", x: 18, compactX: 6, y: 31, compactY: 27, width: 280, range: [0.28, 0.35, 0.86], rotate: -0.8 },
  { text: "What is the deposit?", x: 72, compactX: 50, y: 38, compactY: 36, width: 230, range: [0.4, 0.48, 0.88], rotate: 1.1 },
  { text: "Do you travel to West Austin?", x: 8, compactX: 8, y: 50, compactY: 45, width: 290, range: [0.52, 0.6, 0.9], rotate: -1.1 },
  { text: "Can I see plated menu examples?", x: 46, compactX: 18, y: 9, compactY: 53, width: 310, range: [0.58, 0.66, 0.9], rotate: 0.7 },
  { text: "Is service included?", x: 34, compactX: 46, y: 44, compactY: 62, width: 220, range: [0.64, 0.72, 0.92], rotate: -0.6 },
  { text: "Following up here...", x: 76, compactX: 34, y: 55, compactY: 70, width: 220, range: [0.72, 0.79, 0.94], rotate: 1.7 },
  { text: "Can you hold the date?", x: 25, compactX: 7, y: 20, compactY: 78, width: 240, range: [0.76, 0.83, 0.96], rotate: -1.8 },
  { text: "Ready to book if the date works.", x: 52, compactX: 35, y: 61, compactY: 86, width: 310, range: [0.8, 0.88, 0.98], rotate: 0.9 },
] as const;

function getActiveBeatIndex(value: number) {
  const next = storyBeats.findIndex((beat) => value <= beat.range[2]);
  return next === -1 ? storyBeats.length - 1 : next;
}

function useBeatOpacity(progress: MotionValue<number>, range: StoryBeat["range"]) {
  return useTransform(progress, range, [0, 1, 0]);
}

function ActiveCaption({ beat, compact = false }: { beat: StoryBeat; compact?: boolean }) {
  const isQuestion = beat.role === "question";
  const isAnswer = beat.role === "answer";
  const isIntro = beat.role === "intro";
  const titleSize = compact ? (isAnswer ? "text-2xl" : "text-3xl") : "text-4xl sm:text-5xl";

  return (
    <motion.div
      key={beat.title}
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.34, ease: [0.22, 0.68, 0.35, 1] }}
      className={`absolute left-0 right-0 z-[60] ${compact ? "bottom-14 px-4" : "bottom-10 px-8 md:px-10"}`}
    >
      <div
        className={`mx-auto rounded-2xl border p-5 text-center text-white shadow-2xl shadow-black/30 sm:p-6 ${
          isIntro
            ? "max-w-3xl border-white/10 bg-[#09090b]"
            : isQuestion
              ? "max-w-2xl border-white/14 bg-[#242428]"
              : "max-w-2xl border-[#f2a96f]/35 bg-[#09090b]"
        }`}
      >
        <h3 className={`${titleSize} font-serif font-semibold leading-tight text-white`}>
          {isQuestion ? `“${beat.title}”` : beat.title}
        </h3>
        {isAnswer ? (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/68 sm:text-lg">
            {beat.copy}{" "}
            <span className="font-serif text-2xl font-semibold text-[#f2a96f] sm:text-4xl">
              {beat.metric}
            </span>
            .
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

function DmBubble({
  bubble,
  progress,
  compact,
}: {
  bubble: (typeof dmBubbles)[number];
  progress: MotionValue<number>;
  compact?: boolean;
}) {
  const opacity = useTransform(progress, [bubble.range[0], bubble.range[1], bubble.range[2], 1], [0, 1, 1, 0.16]);
  const y = useTransform(progress, [bubble.range[0], bubble.range[1], 1], compact ? [-34, 0, 18] : [-46, 0, 26]);
  const scale = useTransform(progress, [bubble.range[0], bubble.range[1], 1], [0.96, 1, 0.98]);
  const left = `${compact ? bubble.compactX : bubble.x}%`;
  const top = `${compact ? bubble.compactY : bubble.y}%`;
  const width = compact ? "min(76vw, 300px)" : `${bubble.width}px`;

  return (
    <motion.div
      style={{ opacity, y, scale, rotate: bubble.rotate, left, top, width }}
      className="absolute z-10 rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-medium text-[#111114] shadow-2xl shadow-black/20 sm:text-base"
      aria-hidden
    >
      {bubble.text}
    </motion.div>
  );
}

function BookingFlowStage({ progress, compact = false }: { progress: MotionValue<number>; compact?: boolean }) {
  const stageScale = useTransform(progress, [0, 0.12, 0.9, 1], compact ? [0.9, 1, 1, 0.96] : [0.84, 1, 1, 0.94]);
  const stageY = useTransform(progress, [0, 0.12, 0.9, 1], compact ? [28, 0, 0, -20] : [42, 0, 0, -32]);
  const dmDimOpacity = useTransform(progress, compact ? [0.5, 0.7, 1] : [0.74, 0.9, 1], compact ? [1, 0.18, 0.06] : [1, 0.34, 0.08]);

  return (
    <motion.div
      style={{ scale: stageScale, y: stageY }}
      className="relative mx-auto h-[min(67svh,650px)] w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-white/12 bg-[#18181c] shadow-2xl shadow-black/40"
    >
      <div className="flex h-12 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-medium text-white/45">BTS lead flow</span>
      </div>

      <motion.div style={{ opacity: dmDimOpacity }} className="absolute inset-0">
        {dmBubbles.map((bubble) => (
          <DmBubble key={bubble.text} bubble={bubble} progress={progress} compact={compact} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ProgressPill({ progress, range }: { progress: MotionValue<number>; range: StoryBeat["range"] }) {
  const opacity = useBeatOpacity(progress, range);
  return <motion.span style={{ opacity }} className="h-1.5 w-8 rounded-full bg-[#f2a96f]" />;
}

function StoryStage({ compact = false }: { compact?: boolean }) {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: compact ? 140 : 180,
    damping: compact ? 34 : 40,
    restDelta: 0.0005,
  });

  useMotionValueEvent(progress, "change", (value) => {
    setActiveIndex((current) => {
      const next = getActiveBeatIndex(value);
      return current === next ? current : next;
    });
  });

  if (reduceMotion) {
    return <StaticStory />;
  }

  return (
    <div ref={target} className={`relative ${compact ? "h-[320svh]" : "h-[305svh]"}`}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
          <BookingFlowStage progress={progress} compact={compact} />
          <ActiveCaption beat={storyBeats[activeIndex]} compact={compact} />
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-2">
            {storyBeats.map((beat) => (
              <ProgressPill key={beat.title} progress={progress} range={beat.range} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticStory() {
  return (
    <section className="bg-[#111114] py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:px-6 lg:px-8">
        {storyBeats.map((beat) => (
          <article key={beat.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center text-white">
            <h3 className="font-serif text-3xl font-semibold leading-tight">{beat.title}</h3>
            {beat.copy ? (
              <p className="mx-auto mt-4 max-w-xl text-white/65">
                {beat.copy}{" "}
                <span className="font-serif text-2xl font-semibold text-[#f2a96f]">{beat.metric}</span>.
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function SpeedToLead() {
  return (
    <section className="bg-[#111114] text-white">
      <div className="sr-only">
        {storyBeats.map((beat) => (
          <p key={beat.title}>
            {beat.title} {beat.copy ?? ""} {beat.metric ?? ""}
          </p>
        ))}
      </div>
      <div className="lg:hidden">
        <StoryStage compact />
      </div>
      <div className="hidden lg:block">
        <StoryStage />
      </div>
    </section>
  );
}
