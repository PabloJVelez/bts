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
import { Check, Clock3, CreditCard, MessageSquareText, Send } from "lucide-react";

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
  { text: "Are you available Saturday?", side: "left", range: [0.11, 0.18, 0.8] },
  { text: "How many guests can you do?", side: "right", range: [0.2, 0.27, 0.82] },
  { text: "Can you send menu options?", side: "left", range: [0.37, 0.45, 0.84] },
  { text: "What is the deposit?", side: "right", range: [0.48, 0.56, 0.86] },
  { text: "Do you travel to West Austin?", side: "left", range: [0.62, 0.7, 0.88] },
  { text: "Following up here...", side: "right", range: [0.72, 0.78, 0.9] },
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
  index,
  progress,
  compact,
}: {
  bubble: (typeof dmBubbles)[number];
  index: number;
  progress: MotionValue<number>;
  compact?: boolean;
}) {
  const opacity = useTransform(progress, [bubble.range[0], bubble.range[1], bubble.range[2], 0.98], [0, 1, 1, 0.18]);
  const y = useTransform(progress, [bubble.range[0], bubble.range[1], 0.98], compact ? [20, 0, -24] : [28, 0, -36]);
  const x = useTransform(
    progress,
    [bubble.range[0], bubble.range[1], 0.98],
    bubble.side === "left" ? [-18, 0, -28] : [18, 0, 28],
  );
  const top = compact ? 70 + index * 34 : 74 + index * 42;
  const rotate = bubble.side === "left" ? -1.5 + index * 0.25 : 1.5 - index * 0.25;
  const horizontal = compact
    ? bubble.side === "left"
      ? "left-5"
      : "right-5"
    : bubble.side === "left"
      ? "left-10"
      : "right-10";

  return (
    <motion.div
      style={{ opacity, y, x, rotate, top }}
      className={`absolute ${horizontal} z-10 max-w-[76%] rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-medium text-[#111114] shadow-2xl shadow-black/20 sm:text-base ${
        compact ? "" : "max-w-[300px]"
      }`}
      aria-hidden
    >
      {bubble.text}
    </motion.div>
  );
}

function BookingFlowStage({ progress, compact = false }: { progress: MotionValue<number>; compact?: boolean }) {
  const stageScale = useTransform(progress, [0, 0.12, 0.9, 1], compact ? [0.9, 1, 1, 0.96] : [0.84, 1, 1, 0.94]);
  const stageY = useTransform(progress, [0, 0.12, 0.9, 1], compact ? [28, 0, 0, -20] : [42, 0, 0, -32]);
  const dmDimOpacity = useTransform(progress, [0.74, 0.9, 1], [1, 0.34, 0.08]);
  const inquiryOpacity = useTransform(progress, [0.08, 0.16, 0.28, 0.36], [0, 1, 1, 0]);
  const responseOpacity = useTransform(progress, [0.26, 0.33, 0.4, 0.47], [0, 1, 1, 0]);
  const detailsOpacity = useTransform(progress, [0.55, 0.63, 0.7, 0.77], [0, 1, 1, 0]);
  const depositOpacity = useTransform(progress, compact ? [0.72, 0.8, 0.84, 0.88] : [0.82, 0.9, 1], compact ? [0, 1, 0.2, 0] : [0, 1, 1]);
  const inquiryX = useTransform(progress, [0.08, 0.2, 0.32, 0.36], compact ? [0, 0, -42, -70] : [0, 0, -80, -150]);
  const responseX = useTransform(progress, [0.26, 0.35, 0.43, 0.47], compact ? [96, 0, -28, -58] : [270, 0, -48, -120]);
  const detailsX = useTransform(progress, [0.55, 0.65, 0.73, 0.77], compact ? [96, 0, -16, -44] : [290, 52, 0, -50]);
  const depositX = useTransform(progress, [0.77, 0.88, 1], compact ? [96, 0, 0] : [270, 42, 0]);
  const connectorScale = useTransform(progress, [0.18, 0.86], [0, 1]);

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

      <div className="absolute inset-x-8 top-1/2 hidden h-px origin-left bg-[#f2a96f]/35 lg:block">
        <motion.span style={{ scaleX: connectorScale }} className="block h-px origin-left bg-[#f2a96f]" />
      </div>

      <motion.div style={{ opacity: dmDimOpacity }} className="absolute inset-0">
        {dmBubbles.map((bubble, index) => (
          <DmBubble key={bubble.text} bubble={bubble} index={index} progress={progress} compact={compact} />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: inquiryOpacity, x: inquiryX }}
        className={`${compact ? "left-5 top-16 w-[82%]" : "left-8 top-20 w-[42%]"} absolute z-20 rounded-2xl border border-white/12 bg-white p-5 text-[#111114] shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2a96f]/18 text-[#c97c45]">
            <MessageSquareText className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase text-[#c97c45]">New private event inquiry</p>
            <p className="mt-1 text-sm text-black/55">Dinner for 14 · Saturday · Austin</p>
          </div>
        </div>
        <p className="mt-5 font-serif text-2xl font-semibold">“Are you available?”</p>
        <div className="mt-5 space-y-2">
          <span className="block h-2 rounded-full bg-black/10" />
          <span className="block h-2 w-3/4 rounded-full bg-black/10" />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: responseOpacity, x: responseX }}
        className={`${compact ? "left-8 top-[28%] w-[80%]" : "left-[28%] top-[24%] w-[42%]"} absolute z-20 rounded-2xl border border-[#f2a96f]/35 bg-[#f2a96f] p-5 text-[#111114] shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5" aria-hidden />
          <p className="text-xs font-semibold uppercase">Reply while intent is highest</p>
        </div>
        <p className="mt-5 font-serif text-5xl font-semibold leading-none">7x</p>
        <p className="mt-2 text-sm font-medium">more likely to be booked for the event</p>
      </motion.div>

      <motion.div
        style={{ opacity: detailsOpacity, x: detailsX }}
        className={`${compact ? "left-5 top-[39%] w-[84%]" : "left-[47%] top-[18%] w-[40%]"} absolute z-20 rounded-2xl border border-white/12 bg-white p-5 text-[#111114] shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <Send className="h-5 w-5 text-[#c97c45]" aria-hidden />
          <p className="text-xs font-semibold uppercase text-[#c97c45]">Guided request</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {["Date", "Guests", "Menu", "Location"].map((item) => (
            <span key={item} className="rounded-xl bg-[#f6f1ec] px-3 py-2 font-medium">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-black/55">The first 5 minutes collect what usually gets chased later.</p>
      </motion.div>

      <motion.div
        style={{ opacity: depositOpacity, x: depositX }}
        className={`${compact ? "left-9 top-[52%] w-[78%]" : "left-[60%] top-[38%] w-[34%]"} absolute z-20 rounded-2xl border border-white/12 bg-[#111114] p-5 text-white shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-[#f2a96f]" aria-hidden />
          <p className="text-xs font-semibold uppercase text-[#f2a96f]">Deposit ready</p>
        </div>
        <p className="mt-5 font-serif text-3xl font-semibold">Paid deposit ready</p>
        <p className="mt-3 text-sm text-white/58">Keep the conversation personal, but make the next step payable.</p>
        <div className="mt-5 flex items-center gap-2 text-sm text-white">
          <Check className="h-4 w-4 text-emerald-400" aria-hidden />
          Request approved
        </div>
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
