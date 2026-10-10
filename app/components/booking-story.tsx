"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, CalendarDays, Check, Clock3, FileCheck2, Link2, MessageSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

type StoryScene = {
  id: string;
  eyebrow: string;
  title: string;
  line: string;
  image: string;
  imageAlt: string;
  chip: string;
  icon: typeof Clock3;
  range: [number, number, number];
};

const scenes: StoryScene[] = [
  {
    id: "hot-inquiry",
    eyebrow: "01",
    title: "The lead is hot.",
    line: "A private-event inquiry starts while intent is highest.",
    image: "/chefevethub-menus.png",
    imageAlt: "Chef menu storefront preview",
    chip: "New inquiry",
    icon: Clock3,
    range: [0, 0.08, 0.25],
  },
  {
    id: "request",
    eyebrow: "02",
    title: "Your page captures the event details.",
    line: "Menu, date, guests, location, and notes land in one request.",
    image: "/chefeventhub-request.png",
    imageAlt: "Guided event request flow preview",
    chip: "Details captured",
    icon: MessageSquare,
    range: [0.22, 0.36, 0.52],
  },
  {
    id: "approval",
    eyebrow: "03",
    title: "You approve the fit.",
    line: "Once the event is accepted, the client gets a clear payment link to secure the date.",
    image: "/chefeventhub-admin-request.png",
    imageAlt: "Chef admin request approval preview",
    chip: "Payment link sent",
    icon: FileCheck2,
    range: [0.44, 0.56, 0.68],
  },
  {
    id: "payment",
    eyebrow: "04",
    title: "The date gets secured.",
    line: "The client pays the deposit from the link instead of sending another loose DM.",
    image: "/chefeventhub-request-accepted.png",
    imageAlt: "Accepted request payment handoff preview",
    chip: "Deposit paid",
    icon: Link2,
    range: [0.62, 0.74, 0.86],
  },
  {
    id: "admin-calendar",
    eyebrow: "05",
    title: "Then you run the event from one place.",
    line: "Keep the date, client, menu, payment status, and prep notes visible from the admin calendar.",
    image: "",
    imageAlt: "Chef admin event calendar preview",
    chip: "Event on calendar",
    icon: CalendarDays,
    range: [0.8, 0.92, 1],
  },
];

function useSpaceLikeScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enabled]);
}

function useSceneOpacity(progress: MotionValue<number>, range: StoryScene["range"]) {
  return useTransform(progress, range, [0, 1, 0]);
}

function ActiveSceneCaption({ scene, compact = false }: { scene: StoryScene; compact?: boolean }) {
  return (
    <motion.div
      key={scene.id}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 0.68, 0.35, 1] }}
      className={`absolute left-0 right-0 z-30 ${compact ? "bottom-16 px-5" : "bottom-10 px-8 md:px-10"}`}
    >
      <div className="max-w-md rounded-2xl border border-white/12 bg-[#111114] p-4 text-white shadow-2xl shadow-black/30 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2a96f] text-[#111114]">
            <scene.icon className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-xs font-medium uppercase text-[#f2a96f]">
            {scene.eyebrow}
          </span>
        </div>
        <h3 className={`${compact ? "mt-4 text-2xl" : "mt-5 text-3xl sm:text-4xl"} font-serif font-semibold leading-tight text-white`}>
          {scene.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/68 sm:text-base">
          {scene.line}
        </p>
      </div>
    </motion.div>
  );
}

function getActiveSceneIndex(value: number) {
  if (value < 0.25) return 0;
  if (value < 0.5) return 1;
  if (value < 0.68) return 2;
  if (value < 0.86) return 3;
  return 4;
}

function AdminCalendarPanel() {
  return (
    <div className="aspect-[16/10] w-full bg-[#f7f2ed] p-4 text-[#111114]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-[#c97c45]">Admin calendar</p>
          <p className="mt-1 font-serif text-2xl font-semibold">October events</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Deposit paid
        </span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-medium text-black/45">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {Array.from({ length: 21 }, (_, index) => {
          const day = index + 7;
          const isEvent = day === 18;
          return (
            <div
              key={day}
              className={`min-h-14 rounded-xl border p-2 text-sm ${
                isEvent ? "border-[#c97c45]/40 bg-white shadow-sm" : "border-black/5 bg-white/55 text-black/45"
              }`}
            >
              <span className="font-semibold">{day}</span>
              {isEvent ? (
                <div className="mt-2 rounded-lg bg-[#111114] px-2 py-1 text-left text-[11px] leading-tight text-white">
                  Sushi dinner
                  <span className="mt-1 block text-[#f2a96f]">14 guests · Austin</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductPanels({ progress, compact = false }: { progress: MotionValue<number>; compact?: boolean }) {
  const stageScale = useTransform(progress, [0, 0.16, 0.88, 1], compact ? [0.92, 1, 1, 0.96] : [0.86, 1, 1, 0.94]);
  const stageY = useTransform(progress, [0, 0.18, 0.9, 1], compact ? [32, 0, 0, -24] : [42, 0, 0, -36]);
  const inquiryX = useTransform(progress, [0, 0.18, 0.38, 1], compact ? [0, 0, -130, -170] : [0, -18, -250, -330]);
  const requestX = useTransform(progress, [0.18, 0.36, 0.54, 1], compact ? [140, 0, -82, -145] : [310, 0, -150, -250]);
  const adminX = useTransform(progress, [0.42, 0.56, 0.7, 1], compact ? [150, 0, -42, -88] : [330, 70, 0, -100]);
  const paymentX = useTransform(progress, [0.58, 0.74, 0.88, 1], compact ? [140, 0, -22, -62] : [300, 72, 0, -80]);
  const calendarX = useTransform(progress, [0.78, 0.92, 1], compact ? [150, 0, 0] : [320, 68, 0]);
  const inquiryOpacity = useTransform(progress, [0, 0.06, 0.28, 0.42], [0, 1, 1, 0.22]);
  const requestOpacity = useTransform(progress, [0.2, 0.34, 0.54, 0.68], [0, 1, 1, 0.28]);
  const adminOpacity = useTransform(progress, [0.42, 0.54, 0.7, 0.84], [0, 1, 1, 0.34]);
  const paymentOpacity = useTransform(progress, [0.6, 0.72, 0.88, 0.96], [0, 1, 1, 0.28]);
  const calendarOpacity = useTransform(progress, [0.78, 0.9, 1], [0, 1, 1]);
  const connectorScale = useTransform(progress, [0.16, 0.86], [0, 1]);
  const approveOpacity = useTransform(progress, [0.52, 0.62, 0.74], [0, 1, 0]);

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
        <span className="text-xs font-medium text-white/45">BTS booking system</span>
      </div>

      <div className="absolute inset-x-8 top-1/2 hidden h-px origin-left bg-[#f2a96f]/45 lg:block">
        <motion.span
          style={{ scaleX: connectorScale }}
          className="block h-px origin-left bg-[#f2a96f]"
        />
      </div>

      <motion.div
        style={{ opacity: inquiryOpacity, x: inquiryX }}
        className={`${compact ? "left-5 top-16 w-[78%]" : "left-8 top-20 w-[46%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <img src={scenes[0].image} alt={scenes[0].imageAlt} className="aspect-[16/10] w-full object-cover" loading="eager" decoding="async" />
      </motion.div>

      <motion.div
        style={{ opacity: requestOpacity, x: requestX }}
        className={`${compact ? "left-9 top-[24%] w-[78%]" : "left-[27%] top-[22%] w-[48%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <img src={scenes[1].image} alt={scenes[1].imageAlt} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
      </motion.div>

      <motion.div
        style={{ opacity: adminOpacity, x: adminX }}
        className={`${compact ? "left-6 top-[34%] w-[82%]" : "left-[45%] top-[17%] w-[46%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <img src={scenes[2].image} alt={scenes[2].imageAlt} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
      </motion.div>

      <motion.div
        style={{ opacity: paymentOpacity, x: paymentX }}
        className={`${compact ? "left-10 top-[45%] w-[78%]" : "left-[58%] top-[33%] w-[36%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <img src={scenes[3].image} alt={scenes[3].imageAlt} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
      </motion.div>

      <motion.div
        style={{ opacity: calendarOpacity, x: calendarX }}
        className={`${compact ? "left-5 top-[39%] w-[86%]" : "left-[50%] top-[19%] w-[44%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <AdminCalendarPanel />
      </motion.div>

      <motion.div
        style={{ opacity: approveOpacity }}
        className="absolute bottom-28 left-5 rounded-2xl border border-white/12 bg-white/92 p-4 text-[#111114] shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Check className="h-4 w-4 text-emerald-600" aria-hidden />
          Request approved
        </div>
        <p className="mt-1 text-xs text-black/55">Fit checked before the booking is confirmed.</p>
      </motion.div>

    </motion.div>
  );
}

function ProgressPill({ progress, range }: { progress: MotionValue<number>; range: StoryScene["range"] }) {
  const opacity = useSceneOpacity(progress, range);
  return (
    <motion.span
      style={{ opacity }}
      className="h-1.5 w-8 rounded-full bg-[#f2a96f]"
    />
  );
}

function TimelineStage({ compact = false }: { compact?: boolean }) {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
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
    setActiveSceneIndex((current) => {
      const next = getActiveSceneIndex(value);
      return current === next ? current : next;
    });
  });

  if (reduceMotion) {
    return <ReducedMotionStory />;
  }

  return (
    <div ref={target} className={`relative ${compact ? "h-[260svh]" : "h-[310svh]"}`}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
          <ProductPanels progress={progress} compact={compact} />

          <ActiveSceneCaption scene={scenes[activeSceneIndex]} compact={compact} />

          <div className={`${compact ? "bottom-5" : "bottom-5"} pointer-events-none absolute left-1/2 z-40 flex -translate-x-1/2 gap-2`}>
            {scenes.map((scene) => (
              <ProgressPill key={scene.id} progress={progress} range={scene.range} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReducedMotionStory() {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
      {scenes.map((scene) => (
        <article key={scene.id} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2a96f] text-[#111114]">
              <scene.icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-xs font-medium uppercase text-[#f2a96f]">{scene.eyebrow}</span>
          </div>
          <h3 className="mt-5 font-serif text-2xl font-semibold text-white">{scene.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{scene.line}</p>
          {scene.image ? (
            <img
              src={scene.image}
              alt={scene.imageAlt}
              className="mt-5 aspect-[16/10] rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="mt-5 overflow-hidden rounded-xl">
              <AdminCalendarPanel />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export function BookingStory() {
  const reduceMotion = useReducedMotion();
  useSpaceLikeScroll(!reduceMotion);

  return (
    <section id="story" className="relative bg-[#111114] text-white">
      <div className="sr-only">
        {scenes.map((scene) => (
          <p key={scene.id}>
            {scene.title} {scene.line}
          </p>
        ))}
      </div>

      <div className="px-4 pt-20 text-center sm:px-6 lg:px-8 lg:pt-28">
        <p className="text-xs font-medium uppercase text-[#f2a96f]">
          So how does BTS solve this?
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
          From warm inquiry to paid event.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/62 sm:text-lg">
          BTS turns urgency into a clear path from request, to approval, to payment.
        </p>
      </div>

      <div className="lg:hidden">
        <TimelineStage compact />
      </div>
      <div className="hidden lg:block">
        <TimelineStage />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-20 sm:flex-row sm:justify-center sm:px-6 lg:px-8 lg:pb-28">
        <Button
          onClick={openCalendlyPopup}
          className="bg-[#f2a96f] text-[#111114] hover:bg-[#e39455]"
        >
          Build this for my chef business
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          variant="outline"
          asChild
          className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          <a href={DEMO_STOREFRONT_URL} target="_blank" rel="noopener noreferrer">
            Open live demo
          </a>
        </Button>
      </div>
    </section>
  );
}
