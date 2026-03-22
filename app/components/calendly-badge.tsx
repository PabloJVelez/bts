"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/pmltechpile";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

let scriptLoad: Promise<void> | null = null;

/** Loads Calendly’s script so `initPopupWidget` works. Does not call `initBadgeWidget` (no floating button). */
function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();

  if (!scriptLoad) {
    scriptLoad = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptLoad = null;
        reject(new Error("Failed to load Calendly"));
      };
      document.body.appendChild(script);
    });
  }
  return scriptLoad;
}

/** Mount once in the root layout: preloads the widget for faster popups; still no badge UI. */
export function CalendlyScriptLoader() {
  useEffect(() => {
    loadCalendlyScript().catch(() => {});
  }, []);
  return null;
}

export function openCalendlyPopup() {
  if (typeof window === "undefined") return;
  loadCalendlyScript()
    .then(() => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else {
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      }
    })
    .catch(() => {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    });
}
