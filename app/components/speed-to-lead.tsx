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
  eyebrow: string;
  role: "intro" | "chef" | "bts";
  title: string;
  copy?: string;
  metric?: string;
  range: [number, number, number];
};

const storyBeats: StoryBeat[] = [
  {
    eyebrow: "Why a good booking flow matters",
    role: "intro",
    title: "The right flow turns an inquiry into a paid deposit before the lead cools.",
    range: [0, 0.06, 0.15],
  },
  {
    eyebrow: "Chef asks",
    role: "chef",
    title: "What happens when a ready-to-book client has to wait?",
    range: [0.12, 0.19, 0.29],
  },
  {
    eyebrow: "BTS answers",
    role: "bts",
    title: "They keep looking. Speed helps you win the booking.",
    copy: "A fast, clear next step makes you",
    metric: "7x more likely to be booked",
    range: [0.24, 0.32, 0.43],
  },
  {
    eyebrow: "Chef asks",
    role: "chef",
    title: "What should happen after a client is interested in booking an event?",
    range: [0.39, 0.47, 0.57],
  },
  {
    eyebrow: "BTS answers",
    role: "bts",
    title: "The page should collect the event details immediately.",
    copy: "Date, guests, timing, menu interest, location, and notes should be captured in the first",
    metric: "5 minutes",
    range: [0.52, 0.61, 0.72],
  },
  {
    eyebrow: "Chef asks",
    role: "chef",
    title: "DMs are working just fine. How is this any better?",
    range: [0.68, 0.76, 0.86],
  },
  {
    eyebrow: "BTS answers",
    role: "bts",
    title: "DMs keep the conversation going. BTS moves the event forward.",
    copy: "A request can still feel personal while moving the client toward a",
    metric: "paid deposit",
    range: [0.81, 0.91, 1],
  },
];

function getActiveBeatIndex(value: number) {
  const next = storyBeats.findIndex((beat) => value <= beat.range[2]);
  return next === -1 ? storyBeats.length - 1 : next;
}

function useBeatOpacity(progress: MotionValue<number>, range: StoryBeat["range"]) {
  return useTransform(progress, range, [0, 1, 0]);
}

function ActiveCaption({ beat, compact = false }: { beat: StoryBeat; compact?: boolean }) {
  const isChef = beat.role === "chef";
  const isBts = beat.role === "bts";

  return (
    <motion.div
      key={beat.title}
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.34, ease: [0.22, 0.68, 0.35, 1] }}
      className={`absolute left-0 right-0 z-30 ${compact ? "bottom-14 px-4" : "bottom-10 px-8 md:px-10"}`}
    >
      <div className={`mx-auto max-w-2xl rounded-2xl border p-5 text-center text-white shadow-2xl shadow-black/30 sm:p-6 ${
        isChef
          ? "border-white/14 bg-white/[0.07]"
          : isBts
            ? "border-[#f2a96f]/35 bg-[#111114]"
            : "border-white/12 bg-[#111114]"
      }`}>
        <div className="flex items-center justify-center gap-3">
          <span className={`h-px w-9 ${isChef ? "bg-white/22" : "bg-[#f2a96f]/70"}`} />
          <p className={`text-xs font-medium uppercase ${isChef ? "text-white/62" : "text-[#f2a96f]"}`}>
            {beat.eyebrow}
          </p>
          <span className={`h-px w-9 ${isChef ? "bg-white/22" : "bg-[#f2a96f]/70"}`} />
        </div>
        <h3 className={`${compact ? "mt-4 text-3xl" : "mt-4 text-4xl sm:text-5xl"} font-serif font-semibold leading-tight text-white`}>
          {isChef ? `“${beat.title}”` : beat.title}
        </h3>
        {beat.copy ? (
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

function BookingFlowStage({ progress, compact = false }: { progress: MotionValue<number>; compact?: boolean }) {
  const stageScale = useTransform(progress, [0, 0.12, 0.9, 1], compact ? [0.9, 1, 1, 0.96] : [0.84, 1, 1, 0.94]);
  const stageY = useTransform(progress, [0, 0.12, 0.9, 1], compact ? [28, 0, 0, -20] : [42, 0, 0, -32]);
  const inquiryOpacity = useTransform(progress, [0.1, 0.18, 0.36, 0.5], [0, 1, 1, 0.25]);
  const responseOpacity = useTransform(progress, [0.25, 0.34, 0.58, 0.7], [0, 1, 1, 0.25]);
  const detailsOpacity = useTransform(progress, [0.42, 0.55, 0.76, 0.88], [0, 1, 1, 0.28]);
  const depositOpacity = useTransform(progress, [0.68, 0.84, 1], [0, 1, 1]);
  const inquiryX = useTransform(progress, [0.08, 0.22, 0.45, 1], compact ? [0, 0, -78, -110] : [0, -16, -210, -280]);
  const responseX = useTransform(progress, [0.24, 0.36, 0.62, 1], compact ? [120, 0, -34, -80] : [290, 0, -110, -170]);
  const detailsX = useTransform(progress, [0.42, 0.58, 0.78, 1], compact ? [120, 0, -16, -44] : [320, 70, 0, -50]);
  const depositX = useTransform(progress, [0.66, 0.84, 1], compact ? [120, 0, 0] : [300, 60, 0]);
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

      <motion.div
        style={{ opacity: inquiryOpacity, x: inquiryX }}
        className={`${compact ? "left-5 top-16 w-[82%]" : "left-8 top-20 w-[42%]"} absolute rounded-2xl border border-white/12 bg-white p-5 text-[#111114] shadow-2xl shadow-black/25`}
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
        className={`${compact ? "left-8 top-[28%] w-[80%]" : "left-[28%] top-[24%] w-[42%]"} absolute rounded-2xl border border-[#f2a96f]/35 bg-[#f2a96f] p-5 text-[#111114] shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5" aria-hidden />
          <p className="text-xs font-semibold uppercase">Reply while intent is highest</p>
        </div>
        <p className="mt-5 font-serif text-5xl font-semibold leading-none">7x</p>
        <p className="mt-2 text-sm font-medium">more likely to be booked with fast follow-up</p>
      </motion.div>

      <motion.div
        style={{ opacity: detailsOpacity, x: detailsX }}
        className={`${compact ? "left-5 top-[39%] w-[84%]" : "left-[47%] top-[18%] w-[40%]"} absolute rounded-2xl border border-white/12 bg-white p-5 text-[#111114] shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <Send className="h-5 w-5 text-[#c97c45]" aria-hidden />
          <p className="text-xs font-semibold uppercase text-[#c97c45]">Guided request</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {["Date", "Guests", "Menu", "Location"].map((item) => (
            <span key={item} className="rounded-xl bg-[#f6f1ec] px-3 py-2 font-medium">{item}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-black/55">The first 5 minutes collect what usually gets chased later.</p>
      </motion.div>

      <motion.div
        style={{ opacity: depositOpacity, x: depositX }}
        className={`${compact ? "left-9 top-[52%] w-[78%]" : "left-[60%] top-[38%] w-[34%]"} absolute rounded-2xl border border-white/12 bg-[#111114] p-5 text-white shadow-2xl shadow-black/25`}
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-[#f2a96f]" aria-hidden />
          <p className="text-xs font-semibold uppercase text-[#f2a96f]">Beyond DMs</p>
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
    stiffness: compact ? 130 : 170,
    damping: compact ? 32 : 38,
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
    <div ref={target} className={`relative ${compact ? "h-[350svh]" : "h-[330svh]"}`}>
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
            <p className="text-xs font-medium uppercase text-[#f2a96f]">{beat.eyebrow}</p>
            <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight">{beat.title}</h3>
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
            {beat.eyebrow} {beat.title} {beat.copy ?? ""} {beat.metric ?? ""}
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
