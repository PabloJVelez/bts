"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding?: boolean;
      }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyBadge() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/pmltechpile",
          text: "Schedule time with me",
          color: "#c67d4a",
          textColor: "#ffffff",
          branding: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
      // Clean up Calendly badge widget
      const badge = document.querySelector(".calendly-badge-widget");
      if (badge) badge.remove();
    };
  }, []);

  return null;
}

export function openCalendlyPopup() {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: "https://calendly.com/pmltechpile" });
  } else {
    window.open("https://calendly.com/pmltechpile", "_blank");
  }
}
