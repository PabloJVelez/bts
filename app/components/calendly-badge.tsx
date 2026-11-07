"use client";

import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/pmltechpile/30min";
const PREPARE_EVENT = "bts:prepare-booking";
const OPEN_EVENT = "bts:open-booking";

/** Warm the actual scheduler on booking intent, without competing with page load. */
export function prepareCalendly() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(PREPARE_EVENT));
}

export function openCalendlyPopup() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

/** One persistent scheduler, with an immediate, first-party loading/fallback UI. */
export function CalendlyBookingDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string>();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const prepare = () => {
      const url = new URL(CALENDLY_URL);
      url.searchParams.set("embed_domain", window.location.hostname);
      url.searchParams.set("embed_type", "Inline");
      setSrc(url.toString());
    };
    const show = () => { prepare(); setOpen(true); };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com" || event.source !== frame.current?.contentWindow) return;
      if (["calendly.profile_page_viewed", "calendly.event_type_viewed", "calendly.date_and_time_selected", "calendly.event_scheduled"].includes(event.data?.event)) {
        setReady(true);
      }
    };
    window.addEventListener(PREPARE_EVENT, prepare);
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener(PREPARE_EVENT, prepare);
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    if (!open || ready) return;
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [open, ready]);

  return (
    <dialog
      ref={dialog}
      className="booking-dialog"
      aria-labelledby="booking-title"
      onClose={() => setOpen(false)}
      onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}
    >
      <div className="booking-panel">
        <div className="booking-header">
          <div>
            <h2 id="booking-title">Let’s talk about your booking page</h2>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Open directly in Calendly ↗</a>
          </div>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close booking">✕</button>
        </div>
        {!ready && (
          <p className="booking-status" role="status">
            {slow ? "Calendly is taking longer than usual. You can use the direct link above." : "Loading available times…"}
          </p>
        )}
        {src && <iframe ref={frame} src={src} title="Schedule a call with Behind the Sauté" className="booking-frame" loading="eager" />}
      </div>
    </dialog>
  );
}
