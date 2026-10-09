"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, MessageSquare, Wallet } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";
import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";

type StoryScene = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  metric: string;
  metricLabel: string;
  icon: typeof Clock3;
  bullets: string[];
};

const scenes: StoryScene[] = [
  {
    id: "hot-lead",
    eyebrow: "01 / Interest is highest at the start",
    title: "A private-event lead is not just browsing. They are trying to book a dinner.",
    copy:
      "The problem is timing. If the next step is a slow text exchange, their urgency cools before you ever quote the event.",
    image: "/chefevethub-menus.png",
    imageAlt: "Chef storefront menu page preview",
    metric: "Hot",
    metricLabel: "ready-to-act inquiry",
    icon: Clock3,
    bullets: [
      "Menu options are visible immediately",
      "The client can move forward without waiting for a reply",
      "Your brand feels polished before the first conversation",
    ],
  },
  {
    id: "guided-request",
    eyebrow: "02 / The link does the first pass",
    title: "Instead of chasing details, the booking path asks the important questions.",
    copy:
      "Guests, timing, menu preference, location, dietary notes, and event context land in one place before you spend time pricing or prepping.",
    image: "/chefeventhub-request.png",
    imageAlt: "Guided private chef request flow preview",
    metric: "1 link",
    metricLabel: "for details, timing, and menu fit",
    icon: MessageSquare,
    bullets: [
      "Simple enough to complete while interest is high",
      "Structured enough to protect your quoting process",
      "Cleaner than screenshots, voice notes, and scattered DMs",
    ],
  },
  {
    id: "chef-control",
    eyebrow: "03 / The chef stays in control",
    title: "Requests become a reviewable event, not a commitment you did not approve.",
    copy:
      "The chef can inspect the event, check the fit, accept or reject it, and keep all operational notes attached to the booking.",
    image: "/chefeventhub-admin-request.png",
    imageAlt: "Admin view showing a chef event request",
    metric: "Approve",
    metricLabel: "only the events that fit",
    icon: CheckCircle2,
    bullets: [
      "Review date, party size, location, menu, and notes",
      "Avoid accidental bookings and unclear expectations",
      "Keep client context connected to the event",
    ],
  },
  {
    id: "paid-handoff",
    eyebrow: "04 / Payment becomes the natural next step",
    title: "Once accepted, the client gets a clean payment handoff.",
    copy:
      "The booking system turns approval into momentum: deposit, confirmation, event details, and next steps without another manual back-and-forth.",
    image: "/chefeventhub-request-accepted.png",
    imageAlt: "Accepted booking and payment handoff preview",
    metric: "$",
    metricLabel: "deposit or payment path",
    icon: Wallet,
    bullets: [
      "Reduce ghosting after the quote",
      "Collect payment before event details get buried",
      "Give clients confidence that the booking is real",
    ],
  },
];

export function BookingStory() {
  const [activeId, setActiveId] = useState(scenes[0].id);
  const sceneRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeScene = scenes.find((scene) => scene.id === activeId) ?? scenes[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveId(visible.target.dataset.sceneId ?? scenes[0].id);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    Object.values(sceneRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="bg-[#111114] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100svh-7rem)]">
            <div className="flex h-full min-h-[620px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1f] shadow-2xl shadow-black/35">
              <div className="border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-xs font-medium text-white/45">
                    BTS booking system preview
                  </span>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 gap-5 p-4 sm:p-5">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl shadow-black/20">
                  <img
                    key={activeScene.image}
                    src={activeScene.image}
                    alt={activeScene.imageAlt}
                    className="aspect-[16/10] h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-[0.7fr_1fr]">
                  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="font-serif text-4xl font-semibold tracking-tight text-[#f2a96f]">
                      {activeScene.metric}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-white/70">
                      {activeScene.metricLabel}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#f2a96f]">
                      Current scene
                    </p>
                    <p className="mt-2 text-base font-medium leading-snug text-white">
                      {activeScene.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-4 sm:p-5">
                <div className="grid grid-cols-4 gap-2">
                  {scenes.map((scene, index) => (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => {
                        sceneRefs.current[scene.id]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={`h-1.5 rounded-full transition-colors ${
                        scene.id === activeId ? "bg-[#f2a96f]" : "bg-white/15"
                      }`}
                      aria-label={`Jump to story scene ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f2a96f]">
                The BTS story
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                From a warm inquiry to a paid private event.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                Space tells its story by showing the product doing the work. BTS should do the same: show chefs exactly how a messy inquiry becomes a structured request, an approval decision, and a payment path.
              </p>
            </div>

            <div className="mt-10 space-y-5 lg:mt-16 lg:space-y-10">
              {scenes.map((scene, index) => (
                <div
                  key={scene.id}
                  ref={(node) => {
                    sceneRefs.current[scene.id] = node;
                  }}
                  data-scene-id={scene.id}
                  className={`rounded-2xl border p-5 transition-colors sm:p-6 lg:min-h-[58svh] lg:p-8 ${
                    scene.id === activeId
                      ? "border-[#f2a96f]/50 bg-white/[0.08]"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2a96f] text-[#111114]">
                      <scene.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#f2a96f]">
                        {scene.eyebrow}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Scene {index + 1} of {scenes.length}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    {scene.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/68">
                    {scene.copy}
                  </p>

                  <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white lg:hidden">
                    <img
                      src={scene.image}
                      alt={scene.imageAlt}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <ul className="mt-6 space-y-3">
                    {scene.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f2a96f]" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                  Open the live demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
