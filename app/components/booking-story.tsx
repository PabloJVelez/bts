"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clock3, FileCheck2, MessageSquare, Wallet } from "lucide-react";
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
};

const scenes: StoryScene[] = [
  {
    id: "hot-inquiry",
    eyebrow: "01",
    title: "They are ready now.",
    line: "A private-event inquiry starts hot. Do not make it wait in a DM thread.",
    image: "/chefevethub-menus.png",
    imageAlt: "Chef menu storefront preview",
    chip: "Inquiry is hot",
    icon: Clock3,
  },
  {
    id: "request",
    eyebrow: "02",
    title: "The link gets the details.",
    line: "Menu, date, guests, location, and notes land in one guided request.",
    image: "/chefeventhub-request.png",
    imageAlt: "Guided event request flow preview",
    chip: "Details captured",
    icon: MessageSquare,
  },
  {
    id: "approval",
    eyebrow: "03",
    title: "You approve the fit.",
    line: "The chef sees the request before anything becomes a real booking.",
    image: "/chefeventhub-admin-request.png",
    imageAlt: "Chef admin request approval preview",
    chip: "Chef in control",
    icon: FileCheck2,
  },
  {
    id: "payment",
    eyebrow: "04",
    title: "Payment is the next step.",
    line: "Approval turns into a clean deposit or payment handoff.",
    image: "/chefeventhub-request-accepted.png",
    imageAlt: "Accepted request payment handoff preview",
    chip: "Deposit ready",
    icon: Wallet,
  },
];

export function BookingStory() {
  const [activeId, setActiveId] = useState(scenes[0].id);
  const sceneRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeId));
  const activeScene = scenes[activeIndex] ?? scenes[0];

  useEffect(() => {
    let frame = 0;

    const updateActiveScene = () => {
      const viewportCenter = window.innerHeight * 0.48;
      let closest = scenes[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const scene of scenes) {
        const node = sceneRefs.current[scene.id];
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        const sceneCenter = rect.top + rect.height * 0.42;
        const distance = Math.abs(sceneCenter - viewportCenter);

        if (distance < closestDistance) {
          closest = scene.id;
          closestDistance = distance;
        }
      }

      setActiveId(closest);
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveScene);
    };

    updateActiveScene();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section id="story" className="bg-[#111114] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f2a96f]">
            The booking story
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            From warm inquiry to paid event.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg">
            Less explanation. More proof. Show the chef exactly what happens after a lead raises their hand.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100svh-7rem)]">
            <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1f] shadow-2xl shadow-black/35 contain-layout">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-medium text-white/42">BTS booking flow</span>
              </div>

              <div className="relative min-h-0 flex-1 p-4 sm:p-5">
                <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl shadow-black/20">
                  {scenes.map((scene, index) => (
                    <img
                      key={scene.id}
                      src={scene.image}
                      alt={scene.imageAlt}
                      className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out will-change-transform ${
                        scene.id === activeId
                          ? "scale-100 opacity-100"
                          : index < activeIndex
                            ? "scale-[0.985] opacity-0"
                            : "scale-[1.015] opacity-0"
                      }`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ))}

                  <div className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-medium text-[#111114] shadow-sm backdrop-blur">
                    {activeScene.chip}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:p-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="font-serif text-4xl font-semibold tracking-tight text-[#f2a96f]">
                    {activeScene.eyebrow}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-white/42">
                    Scene
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="font-serif text-xl font-semibold leading-tight text-white">
                    {activeScene.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {activeScene.line}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 px-4 pb-4 sm:px-5 sm:pb-5">
                <div className="grid grid-cols-4 gap-2 pt-4">
                  {scenes.map((scene) => (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => {
                        setActiveId(scene.id);
                        sceneRefs.current[scene.id]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={`h-1.5 rounded-full transition-colors ${
                        scene.id === activeId ? "bg-[#f2a96f]" : "bg-white/15"
                      }`}
                      aria-label={`Jump to ${scene.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-8">
            {scenes.map((scene, index) => (
              <div
                key={scene.id}
                ref={(node) => {
                  sceneRefs.current[scene.id] = node;
                }}
                data-scene-id={scene.id}
                className={`rounded-2xl border p-5 transition duration-300 sm:p-6 lg:min-h-[50svh] lg:p-8 ${
                  scene.id === activeId
                    ? "border-[#f2a96f]/55 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2a96f] text-[#111114]">
                    <scene.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#f2a96f]">
                    {scene.eyebrow}
                  </p>
                </div>

                <h3 className="mt-6 max-w-xl font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                  {scene.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/64 sm:text-lg">
                  {scene.line}
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white lg:hidden">
                  <img
                    src={scene.image}
                    alt={scene.imageAlt}
                    className="aspect-[16/10] w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Check className="h-4 w-4 text-[#f2a96f]" aria-hidden />
                  <span>{scene.chip}</span>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
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
          </div>
        </div>
      </div>
    </section>
  );
}
