"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, FileCheck2, Link2, MessageSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

type StoryScene = {
  id: string;
  eyebrow: string;
  title: string;
  line: string;
  image: string;
  video?: string;
  videoRange?: [number, number];
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
    video: "/videos/menu-browsing.mp4",
    videoRange: [0.11, 0.23],
    imageAlt: "Chef menu storefront preview",
    chip: "New inquiry",
    icon: Clock3,
    range: [0, 0.1, 0.23],
  },
  {
    id: "request",
    eyebrow: "02",
    title: "Your page captures the event details.",
    line: "Menu, date, guests, location, and notes land in one request.",
    image: "/chefeventhub-request.png",
    video: "/videos/event-request-scroll.mp4",
    videoRange: [0.35, 0.48],
    imageAlt: "Guided event request flow preview",
    chip: "Details captured",
    icon: MessageSquare,
    range: [0.22, 0.34, 0.48],
  },
  {
    id: "approval",
    eyebrow: "03",
    title: "You approve the fit.",
    line: "Once the event is accepted, the client gets a clear payment link to secure the date.",
    image: "/chefeventhub-admin-request.png",
    video: "/videos/accept-event-scroll.mp4",
    videoRange: [0.54, 0.72],
    imageAlt: "Chef admin request approval preview",
    chip: "Payment link sent",
    icon: FileCheck2,
    range: [0.46, 0.58, 0.72],
  },
  {
    id: "payment",
    eyebrow: "04",
    title: "The date is confirmed.",
    line: "Once confirmed, your client gets an email with a link to pay the deposit or purchase tickets instead of sending another loose DM.",
    image: "/chefeventhub-request-accepted.png",
    video: "/videos/accepted-email-scroll.mp4",
    videoRange: [0.78, 0.9],
    imageAlt: "Accepted request payment handoff preview",
    chip: "Deposit paid",
    icon: Link2,
    range: [0.72, 0.82, 0.91],
  },
  {
    id: "admin-calendar",
    eyebrow: "05",
    title: "Manage your events from one place.",
    line: "See requests, payments, event details, and prep notes from one clean admin overview.",
    image: "",
    video: "/videos/admin-overview-scroll.mp4",
    videoRange: [0.925, 1],
    imageAlt: "Chef admin overview preview",
    chip: "Admin overview",
    icon: CalendarDays,
    range: [0.88, 0.92, 1],
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
      className={`absolute left-0 right-0 z-30 ${compact ? "bottom-8 px-4" : "-bottom-4 px-8 md:px-10"}`}
    >
      <div className={`${compact ? "max-w-[min(92vw,360px)]" : "max-w-xs"} rounded-2xl border border-white/12 bg-[#111114]/92 p-3 text-white shadow-2xl shadow-black/30 backdrop-blur sm:p-4`}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2a96f] text-[#111114]">
            <scene.icon className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-xs font-medium uppercase text-[#f2a96f]">
            {scene.eyebrow}
          </span>
        </div>
        <h3 className={`${compact ? "mt-4 text-2xl" : "mt-4 text-2xl"} font-serif font-semibold leading-tight text-white`}>
          {scene.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/68">
          {scene.line}
        </p>
      </div>
    </motion.div>
  );
}

function getActiveSceneIndex(value: number) {
  if (value < 0.22) return 0;
  if (value < 0.46) return 1;
  if (value < 0.7) return 2;
  if (value < 0.88) return 3;
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

function ScrollScrubVideoPanel({
  progress,
  range,
  scrubRange,
  src,
  fallback,
  alt,
}: {
  progress: MotionValue<number>;
  range: StoryScene["range"];
  scrubRange?: StoryScene["videoRange"];
  src: string;
  fallback: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const [canScrub, setCanScrub] = useState(false);
  const scrubProgress = useTransform(progress, scrubRange ?? [range[0], range[2]], [0, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      durationRef.current = video.duration || 0;
      setCanScrub(Boolean(durationRef.current));
      setVideoTime(scrubProgress.get());
    };

    if (video.readyState >= 1 && video.duration) {
      markReady();
    }

    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("durationchange", markReady);

    return () => {
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("durationchange", markReady);
    };
  }, [src, scrubProgress]);

  const setVideoTime = (value: number) => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration) return;

    const localProgress = Math.min(1, Math.max(0, value));
    const targetTime = localProgress * duration;

    if (Number.isFinite(targetTime) && Math.abs(video.currentTime - targetTime) > 0.04) {
      video.currentTime = targetTime;
    }
  };

  useAnimationFrame(() => {
    setVideoTime(scrubProgress.get());
  });

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f6f1ec]">
      {fallback ? (
        <img
          src={fallback}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${canScrub ? "opacity-0" : "opacity-100"}`}
          loading="eager"
          decoding="async"
        />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        aria-label={alt}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${canScrub ? "opacity-100" : "opacity-0"}`}
        onLoadedMetadata={(event) => {
          durationRef.current = event.currentTarget.duration || 0;
          setCanScrub(true);
          setVideoTime(scrubProgress.get());
        }}
        onError={() => {
          durationRef.current = 0;
          setCanScrub(false);
        }}
      />
    </div>
  );
}

function StoryPanelMedia({
  scene,
  progress,
}: {
  scene: StoryScene;
  progress: MotionValue<number>;
}) {
  if (scene.video) {
    return (
      <ScrollScrubVideoPanel
        progress={progress}
        range={scene.range}
        scrubRange={scene.videoRange}
        src={scene.video}
        fallback={scene.image}
        alt={scene.imageAlt}
      />
    );
  }

  return (
    <img
      src={scene.image}
      alt={scene.imageAlt}
      className="aspect-[16/10] w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

function ProductPanels({ progress, compact = false }: { progress: MotionValue<number>; compact?: boolean }) {
  const stageScale = useTransform(progress, [0, 0.12, 0.92, 1], compact ? [0.94, 1, 1, 0.97] : [0.9, 1, 1, 0.96]);
  const stageY = useTransform(progress, [0, 0.16, 0.9, 1], compact ? [24, 0, 0, -18] : [28, 0, 0, -24]);
  const inquiryX = useTransform(progress, [0, 0.18, 0.34, 1], compact ? [0, 0, -92, -122] : [0, 0, -378, -438]);
  const inquiryY = useTransform(progress, [0, 0.26, 0.48, 1], compact ? [0, 0, -14, -34] : [0, 0, -70, -112]);
  const inquiryScale = useTransform(progress, [0, 0.26, 0.48, 1], [1, 1, 0.72, 0.58]);
  const requestX = useTransform(progress, [0.18, 0.31, 0.5, 1], compact ? [118, 0, -96, -126] : [438, 0, -390, -450]);
  const requestY = useTransform(progress, [0.18, 0.34, 0.58, 1], compact ? [18, 0, 4, -20] : [8, 0, -36, -76]);
  const requestScale = useTransform(progress, [0.18, 0.34, 0.58, 1], [0.98, 1, 0.72, 0.58]);
  const adminX = useTransform(progress, [0.44, 0.55, 0.74, 1], compact ? [118, 0, -92, -122] : [438, 0, -402, -462]);
  const adminY = useTransform(progress, [0.44, 0.58, 0.78, 1], compact ? [20, 0, 20, 0] : [8, 0, 0, -36]);
  const adminScale = useTransform(progress, [0.44, 0.58, 0.78, 1], [0.98, 1, 0.72, 0.58]);
  const paymentX = useTransform(progress, [0.7, 0.8, 0.92, 1], compact ? [116, 0, -78, -108] : [438, 0, -384, -444]);
  const paymentY = useTransform(progress, [0.7, 0.82, 0.92, 1], compact ? [22, 0, 32, 20] : [10, 0, 28, 0]);
  const paymentScale = useTransform(progress, [0.7, 0.82, 0.92, 1], [0.98, 1, 0.74, 0.62]);
  const calendarX = useTransform(progress, [0.86, 0.92, 1], compact ? [118, 0, 0] : [438, 0, 0]);
  const calendarY = useTransform(progress, [0.86, 0.92, 1], compact ? [24, 0, 0] : [10, 0, 0]);
  const calendarScale = useTransform(progress, [0.86, 0.92, 1], [0.98, 1, 1]);
  const inquiryOpacity = useTransform(progress, [0, 0.04, 0.23, 0.38, 1], [0, 1, 1, 0.24, 0.12]);
  const requestOpacity = useTransform(progress, [0.2, 0.28, 0.48, 0.62, 1], [0, 1, 1, 0.24, 0.12]);
  const adminOpacity = useTransform(progress, [0.44, 0.52, 0.72, 0.84, 1], [0, 1, 1, 0.24, 0.14]);
  const paymentOpacity = useTransform(progress, [0.7, 0.76, 0.9, 0.96, 1], [0, 1, 1, 0.28, 0.16]);
  const calendarOpacity = useTransform(progress, [0.86, 0.92, 1], [0, 1, 1]);
  const connectorScale = useTransform(progress, [0.12, 0.92], [0, 1]);

  return (
    <motion.div
      style={{ scale: stageScale, y: stageY }}
      className="relative mx-auto h-[min(74svh,740px)] w-full max-w-[1240px] overflow-hidden rounded-[28px] border border-white/12 bg-[#18181c] shadow-2xl shadow-black/40"
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
        style={{ opacity: inquiryOpacity, x: inquiryX, y: inquiryY, scale: inquiryScale }}
        className={`${compact ? "left-[4%] top-[17%] w-[92%]" : "left-[19%] top-[12%] w-[62%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <StoryPanelMedia scene={scenes[0]} progress={progress} />
      </motion.div>

      <motion.div
        style={{ opacity: requestOpacity, x: requestX, y: requestY, scale: requestScale }}
        className={`${compact ? "left-[4%] top-[17%] w-[92%]" : "left-[19%] top-[12%] w-[62%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <StoryPanelMedia scene={scenes[1]} progress={progress} />
      </motion.div>

      <motion.div
        style={{ opacity: adminOpacity, x: adminX, y: adminY, scale: adminScale }}
        className={`${compact ? "left-[4%] top-[17%] w-[92%]" : "left-[19%] top-[12%] w-[62%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <StoryPanelMedia scene={scenes[2]} progress={progress} />
      </motion.div>

      <motion.div
        style={{ opacity: paymentOpacity, x: paymentX, y: paymentY, scale: paymentScale }}
        className={`${compact ? "left-[4%] top-[17%] w-[92%]" : "left-[19%] top-[12%] w-[62%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <StoryPanelMedia scene={scenes[3]} progress={progress} />
      </motion.div>

      <motion.div
        style={{ opacity: calendarOpacity, x: calendarX, y: calendarY, scale: calendarScale }}
        className={`${compact ? "left-[4%] top-[17%] w-[92%]" : "left-[19%] top-[12%] w-[62%]"} absolute overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/25`}
      >
        <StoryPanelMedia scene={scenes[4]} progress={progress} />
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
    <div ref={target} className={`relative ${compact ? "h-[720svh]" : "h-[700svh]"}`}>
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
