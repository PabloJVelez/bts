import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useEffect, useState } from "react";
import { X, Menu, ChefHat, CreditCard, Sparkles, UtensilsCrossed, CalendarCheck, CheckCircle, Wallet, Mail, ClipboardList, ShieldCheck, Store, BookOpen, Wrench, XCircle, CheckCircle2, User, ChevronDownIcon, ExternalLink } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const CALENDLY_URL = "https://calendly.com/pmltechpile";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
let scriptLoad = null;
function loadCalendlyScript() {
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
function CalendlyScriptLoader() {
  useEffect(() => {
    loadCalendlyScript().catch(() => {
    });
  }, []);
  return null;
}
function openCalendlyPopup() {
  if (typeof window === "undefined") return;
  loadCalendlyScript().then(() => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  }).catch(() => {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  });
}
const links = () => [{
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
}, {
  rel: "stylesheet",
  href: "https://assets.calendly.com/assets/external/widget.css"
}];
const meta = () => {
  return [{
    title: "Behind the Sauté | Booking and Payments Page for Private Chefs"
  }, {
    name: "description",
    content: "Behind the Sauté gives private chefs a branded booking page where clients pick menus, send event details, and pay deposits or full payment. You approve or decline each request."
  }, {
    property: "og:title",
    content: "Behind the Sauté | One Booking Link for Private Chefs"
  }, {
    property: "og:description",
    content: "Send one link. Clients pick a menu, share event details, and pay online. You stay in control by approving each request."
  }, {
    property: "og:url",
    content: "https://behindthesaute.com"
  }, {
    name: "twitter:card",
    content: "summary_large_image"
  }];
};
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(CalendlyScriptLoader, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-accent-hover hover:shadow-md",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-border/80 bg-transparent text-foreground/90 hover:bg-secondary/50 hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const DEMO_STOREFRONT_URL = "https://store.chefeventhub.com/";
const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "What You Get" },
  // { href: "#pricing", label: "Pricing" }, // Re-enable with <Pricing /> on home
  { href: DEMO_STOREFRONT_URL, label: "Live Demo Storefront", external: true },
  { href: "#faq", label: "FAQ" }
];
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl font-semibold tracking-tight text-foreground", children: [
        "Behind the ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Sauté" })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-8 md:flex", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          ..."external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {},
          className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
          children: link.label
        },
        link.href
      )) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: openCalendlyPopup,
          className: "bg-primary text-primary-foreground hover:bg-accent-hover",
          children: "Get a Walkthrough"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-md p-2 text-foreground md:hidden",
          onClick: () => setIsOpen(!isOpen),
          "aria-label": "Toggle menu",
          children: isOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background md:hidden", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 px-4 py-6", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          ..."external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {},
          className: "text-base font-medium text-muted-foreground transition-colors hover:text-foreground",
          onClick: () => setIsOpen(false),
          children: link.label
        },
        link.href
      )),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            setIsOpen(false);
            openCalendlyPopup();
          },
          className: "mt-2 w-full bg-primary text-primary-foreground hover:bg-accent-hover",
          children: "Get a Walkthrough"
        }
      )
    ] }) })
  ] });
}
function FadeInUp({ children, className, delay = 0 }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.6, delay, ease: "easeOut" },
      className,
      children
    }
  );
}
function StaggerContainer({
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-100px" },
      variants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      },
      className,
      children
    }
  );
}
function StaggerItem({
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      },
      className,
      children
    }
  );
}
function HoverScale({
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      whileHover: { scale: 1.02, y: -4 },
      transition: { duration: 0.2 },
      className,
      children
    }
  );
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-background pb-16 pt-28 sm:pt-24 md:pb-24 md:pt-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-b from-secondary/35 via-background to-background" }),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2 lg:gap-18", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
        /* @__PURE__ */ jsxs(FadeInUp, { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs font-medium uppercase tracking-[0.14em] text-primary/90", children: "Behind the Sauté is a booking and payment page for private chefs." }),
          /* @__PURE__ */ jsx("h1", { className: "mx-auto max-w-xl font-serif text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl lg:mx-0 lg:max-w-none lg:text-6xl text-balance", children: "Send one link. Get booking details. Get paid." })
        ] }),
        /* @__PURE__ */ jsxs(FadeInUp, { delay: 0.1, children: [
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty lg:mx-0", children: "Your client picks a menu, fills out a short request, pays a deposit or full amount, and you approve or decline from one dashboard." }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/90 sm:text-base lg:mx-0", children: "If this sounds like you, this helps: you are chasing deposits, missing allergy notes, or double-checking headcount from old texts." })
        ] }),
        /* @__PURE__ */ jsxs(FadeInUp, { delay: 0.2, children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: openCalendlyPopup,
                size: "lg",
                className: "bg-primary px-8 text-base text-primary-foreground shadow-sm shadow-black/5 hover:bg-accent-hover hover:shadow-md focus-visible:ring-offset-2 sm:text-lg",
                children: "Get a walkthrough"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "lg",
                asChild: true,
                className: "border-border/90 bg-transparent px-8 text-base sm:text-lg",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: DEMO_STOREFRONT_URL,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "See the booking link demo"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 text-center text-sm text-muted-foreground sm:text-base lg:text-left", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: DEMO_STOREFRONT_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                children: "View live demo storefront"
              }
            ),
            ". This is what your client sees before they book."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(FadeInUp, { delay: 0.3, children: /* @__PURE__ */ jsx("div", { className: "relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-black/5 ring-1 ring-black/5 lg:mx-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/hero-chef.jpg",
          alt: "Professional private chef plating an elegant dish",
          className: "h-full w-full object-cover contrast-[1.03] saturate-[1.02]",
          loading: "eager",
          decoding: "async"
        }
      ) }) })
    ] }) })
  ] });
}
const items = [
  { icon: ChefHat, label: "Made for private chefs" },
  { icon: CreditCard, label: "Collect payments online" },
  { icon: Sparkles, label: "We set it up for you" }
];
function TrustRail() {
  return /* @__PURE__ */ jsx("section", { "aria-label": "Trust and proof", className: "bg-background", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("div", { className: "border-y border-border/70 py-6 md:py-7", children: /* @__PURE__ */ jsx("ul", { className: "grid gap-y-3 gap-x-6 sm:grid-cols-3 sm:gap-y-2", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-secondary/70 ring-1 ring-black/5", children: /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4 text-primary", "aria-hidden": true }) }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground/85", children: item.label })
  ] }, item.label)) }) }) }) }) });
}
const beforeItems = [
  "You answer the same 20 questions in DMs and email threads.",
  "Headcount changes twice, then allergy notes get buried.",
  "You are on a grocery run and still chasing the kitchen address and deposit."
];
const afterItems = [
  "You send one link and the client picks a menu and date.",
  "They fill in headcount, allergies, timing, and kitchen address in one form.",
  "You approve or decline, payment is collected, and event details stay in one place."
];
function BeforeVsAfter() {
  return /* @__PURE__ */ jsx("section", { className: "bg-secondary/20 py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "The DM spiral vs one booking link" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base text-muted-foreground sm:text-lg", children: "Keep texting if you want. This just gives you one link for details and payment." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(FadeInUp, { delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 md:p-7", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold text-foreground", children: "Before" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: beforeItems.map((item) => /* @__PURE__ */ jsx("li", { className: "text-sm leading-relaxed text-muted-foreground sm:text-base", children: item }, item)) })
      ] }) }),
      /* @__PURE__ */ jsx(FadeInUp, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-xl border border-border/80 bg-primary/5 p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 md:p-7", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold text-foreground", children: "After" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: afterItems.map((item) => /* @__PURE__ */ jsx("li", { className: "text-sm leading-relaxed text-muted-foreground sm:text-base", children: item }, item)) })
      ] }) })
    ] })
  ] }) });
}
const steps = [
  {
    number: 1,
    icon: UtensilsCrossed,
    title: "Share your link",
    description: "Send your booking page in a text, email, or Instagram DM. Clients can see your menus and experiences without asking for screenshots.",
    previewSrc: "/chefevethub-menus.png",
    previewAlt: "Example storefront menus page showing catalog cards with images, course counts, and pricing."
  },
  {
    number: 2,
    icon: CalendarCheck,
    title: "Client answers the questions you always ask",
    description: "They add date, timing, headcount, kitchen address, allergies, and notes in one guided form.",
    previewSrc: "/chefeventhub-request.png",
    previewAlt: "Example multi-step request form for choosing experience type, menu, and guest count."
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "You approve or decline",
    description: "Every request lands in your dashboard. Accept the ones you want and decline the ones that do not fit your calendar.",
    previewSrc: "/chefeventhub-admin-request.png",
    previewAlt: "Example admin screen for reviewing an event request with accept and reject actions."
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Payment happens and details stay in one place",
    description: "After approval, they get a payment link by email. You can collect a deposit, full payment, or let guests chip in.",
    previewSrc: "/chefeventhub-request-accepted.png",
    previewAlt: "Example email confirmation with event details, payment summary, and a purchase tickets link."
  }
];
function HowItWorks() {
  return /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "How It Works" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "From first message to confirmed booking in four steps." })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-16 flex flex-col gap-16 md:gap-20 lg:gap-24", children: steps.map((step, index) => {
      const hasPreview = Boolean(step.previewSrc);
      const reverseOnLarge = index % 2 === 1;
      return /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: hasPreview ? `flex flex-col gap-8 lg:items-center lg:gap-12 ${reverseOnLarge ? "lg:flex-row-reverse" : "lg:flex-row"}` : "flex justify-center",
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: hasPreview ? "flex min-w-0 flex-1 flex-col rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-200 hover:border-primary/35 hover:shadow-md md:p-8" : "w-full max-w-3xl rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-200 hover:border-primary/35 hover:shadow-md md:p-8",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground", children: step.number }),
                  /* @__PURE__ */ jsx(
                    step.icon,
                    {
                      className: "mb-4 h-7 w-7 shrink-0 text-primary",
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ jsx("h3", { className: "mb-2 font-serif text-xl font-semibold text-foreground sm:text-2xl", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground/90 sm:text-base", children: step.description })
                ]
              }
            ),
            hasPreview && step.previewSrc && step.previewAlt ? /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 lg:max-w-none", children: /* @__PURE__ */ jsx("figure", { className: "overflow-hidden rounded-xl border border-border/80 bg-muted/30 shadow-sm shadow-black/5 ring-1 ring-black/5", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: step.previewSrc,
                alt: step.previewAlt,
                className: "aspect-16/10 w-full object-cover object-top",
                loading: index === 0 ? "eager" : "lazy",
                decoding: "async"
              }
            ) }) }) : null
          ]
        }
      ) }, step.number);
    }) }),
    /* @__PURE__ */ jsx(FadeInUp, { className: "mt-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl rounded-xl border border-border/80 bg-card px-6 py-8 text-center shadow-sm shadow-black/5 ring-1 ring-black/5 md:px-10", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-lg font-semibold text-foreground", children: "Want to click through a real booking page?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: "Open the live demo. It is the same flow your clients use." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: DEMO_STOREFRONT_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base",
          children: "Open live demo"
        }
      )
    ] }) })
  ] }) });
}
const featureBuckets = [
  {
    heading: "Get paid upfront",
    items: [
      {
        icon: Wallet,
        title: "Collect deposits or full payment online",
        description: "Take a deposit, charge in full, or split it so guests can each pay their part online."
      },
      {
        icon: Mail,
        title: "Send payment links and confirmations automatically",
        description: "After you approve, clients get a clear email with next steps and payment details so you are not chasing money."
      }
    ]
  },
  {
    heading: "Keep event details in one place",
    items: [
      {
        icon: ClipboardList,
        title: "Collect the details you need to cook",
        description: "Date, headcount, timing, kitchen address, allergies, and notes are all captured in one guided form."
      },
      {
        icon: ShieldCheck,
        title: "Approve or decline from your dashboard",
        description: "See each request in one view. Stay in control of your calendar and avoid accidental double-booking."
      }
    ]
  },
  {
    heading: "Look professional without extra work",
    items: [
      {
        icon: Store,
        title: "Get your own branded chef website",
        description: "Your name, photos, menus, and experiences all live on one page you can send to anyone who asks, 'Are you free?'"
      },
      {
        icon: BookOpen,
        title: "Show menus clearly",
        description: "Clients browse your dishes and pricing on your site instead of asking for menu screenshots or old PDFs."
      },
      {
        icon: ChefHat,
        title: "Set up experiences your way",
        description: "Offer the event types you actually run, from tasting menus to family-style dinners, with the pricing you choose."
      },
      {
        icon: Wrench,
        title: "Let us set everything up",
        description: "Send us your menu, photos, and branding. We build the site and booking flow for you."
      }
    ]
  }
];
function Features() {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Built to solve real booking problems" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl", children: "Keep texting clients if you want. Use one link when it is time to collect details and payment." }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-muted-foreground sm:text-base", children: [
        "Want to see it in action?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: DEMO_STOREFRONT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            children: "Browse our live demo storefront"
          }
        ),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-14", children: /* @__PURE__ */ jsx("div", { className: "space-y-12 md:space-y-14", children: featureBuckets.map((bucket) => /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-5 font-serif text-2xl font-semibold tracking-tight text-foreground", children: bucket.heading }),
      /* @__PURE__ */ jsx("div", { className: "grid auto-rows-fr gap-5 sm:grid-cols-2 lg:gap-6", children: bucket.items.map((feature) => /* @__PURE__ */ jsx(HoverScale, { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:border-primary/35 hover:shadow-md", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex items-center gap-3", children: /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-background/70 ring-1 ring-black/5", children: /* @__PURE__ */ jsx(feature.icon, { className: "h-5 w-5 text-primary", "aria-hidden": true }) }) }),
        /* @__PURE__ */ jsx("h4", { className: "mb-2 max-w-[28ch] font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl", children: feature.title }),
        /* @__PURE__ */ jsx("p", { className: "min-h-0 flex-1 max-w-prose text-sm leading-relaxed text-muted-foreground/90 sm:text-base", children: feature.description })
      ] }) }, feature.title)) })
    ] }) }, bucket.heading)) }) })
  ] }) });
}
const painPoints = [
  {
    pain: "I got three booking requests today and each one is buried in a different text thread.",
    solution: "Send one link. People pick a menu and submit details in one place, so you stop hunting through old messages."
  },
  {
    pain: "I am still asking for headcount, allergies, and the kitchen address the day before the event.",
    solution: "The form collects those details up front. You get one clean request before you start prep or grocery shopping."
  },
  {
    pain: "I spend too much time chasing deposits, then people ghost.",
    solution: "After you approve, the payment link goes out right away. You can collect a deposit or full payment."
  }
];
function WhyChefsLoveIt() {
  return /* @__PURE__ */ jsx("section", { className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Why chefs stick with it" }) }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-16", children: /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: painPoints.map((item, index) => /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs("div", { className: "h-full overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm shadow-black/5 ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-border bg-destructive/5 p-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(XCircle, { className: "mt-0.5 h-5 w-5 shrink-0 text-destructive/70" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-foreground", children: item.pain })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-primary/5 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: item.solution })
      ] }) })
    ] }) }, index)) }) })
  ] }) });
}
const personas = [
  {
    name: "Private chefs doing regular events",
    description: "You book a few events every month, handle client messages yourself, and want one clean way to collect details and payment."
  },
  {
    name: "Chefs growing a small team",
    description: "You are juggling more dates, trying to avoid double-booking, and need requests, payments, and confirmations in one place."
  }
];
function SocialProof() {
  return /* @__PURE__ */ jsx("section", { className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Who this is for" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "If booking work comes through texts and email, this will feel familiar." })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-4xl gap-8 sm:grid-cols-2", children: personas.map((persona) => /* @__PURE__ */ jsx(StaggerItem, { className: "h-full min-h-0", children: /* @__PURE__ */ jsx(HoverScale, { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-6 text-center shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-200 hover:border-primary/35 hover:shadow-md", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary/70 ring-1 ring-black/5", children: /* @__PURE__ */ jsx(User, { className: "h-7 w-7 text-muted-foreground" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg font-semibold text-foreground", children: persona.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground/90 sm:text-base", children: persona.description })
    ] }) }) }, persona.name)) }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.25, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-8 max-w-3xl rounded-xl border border-border/80 bg-secondary/20 p-6 shadow-sm shadow-black/5 ring-1 ring-black/5 text-left md:p-7", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold text-foreground", children: "Who this is not for" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base", children: "Chefs who only do one event every few months and do not care about deposits or keeping event details organized." })
    ] }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-muted-foreground", children: "Want to see if it fits your workflow?" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: openCalendlyPopup,
          className: "bg-primary px-8 text-primary-foreground hover:bg-accent-hover",
          children: "Get a walkthrough"
        }
      )
    ] }) })
  ] }) });
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
const faqs = [
  {
    question: "Do I still control which events I accept?",
    answer: "Yes. Every request lands in your dashboard first. You review it, then accept or decline. Nothing is booked without your approval."
  },
  {
    question: "Can I collect deposits?",
    answer: "Yes. You can collect a deposit or full payment online."
  },
  {
    question: "Can guests split the payment?",
    answer: "Yes. The host can pay for everyone, or share the link so guests can chip in."
  },
  {
    question: "What payment processor do you use?",
    answer: "Payments go through a normal online checkout your clients can use on their phone."
  },
  {
    question: "What if I want to keep texting my clients?",
    answer: "Keep texting. This gives you one link for details and payment, so you stop losing info and chasing money in long threads."
  },
  {
    question: "What if I already have a website?",
    answer: "That is common. We handle setup and can work with the domain your clients already know."
  },
  {
    question: "How long does setup take?",
    answer: "You send your menu, photos, and branding. We do the build. Timeline depends on how fast content is ready."
  },
  {
    question: "Do I need any technical skills?",
    answer: "No. We set it up for you. Your day to day is reviewing requests and clicking approve."
  }
];
function FAQ() {
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "bg-secondary/30 py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Questions chefs ask" }) }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.2, children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-12", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
      AccordionItem,
      {
        value: `item-${index}`,
        className: "border-border",
        children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-serif text-base font-semibold text-foreground hover:text-primary hover:no-underline", children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-muted-foreground leading-relaxed", children: faq.answer })
        ]
      },
      index
    )) }) })
  ] }) });
}
function FinalCTA() {
  return /* @__PURE__ */ jsx("section", { className: "bg-linear-to-b from-secondary to-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance", children: "Want us to build your booking page?" }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.1, children: /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty", children: "Send us your menu. We will set up the rest and walk you through it." }) }),
    /* @__PURE__ */ jsxs(FadeInUp, { delay: 0.2, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: openCalendlyPopup,
            size: "lg",
            className: "px-8 text-lg",
            children: "Get a walkthrough"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "lg",
            asChild: true,
            className: "px-8 text-lg",
            children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: DEMO_STOREFRONT_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5" }),
                  "Open live demo storefront"
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-muted-foreground", children: [
        "Prefer email?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:pmltechpile@gmail.com",
            className: "font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            children: "Send us your menu"
          }
        ),
        "."
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-footer-bg py-12 text-footer-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 md:flex-row md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl font-semibold tracking-tight", children: [
          "Behind the ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Sauté" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-footer-foreground/70", children: "© 2025 Behind the Sauté. All rights reserved." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center md:text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-footer-foreground/70", children: "Contact:" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:pmltechpile@gmail.com",
            className: "text-sm text-footer-foreground transition-colors hover:text-primary",
            children: "pmltechpile@gmail.com"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: DEMO_STOREFRONT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-2 block text-sm text-footer-foreground/70 transition-colors hover:text-primary",
            children: "Demo chef storefront"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-8 text-center text-xs text-footer-foreground/50", children: "Booking details and payments in one place for private chefs." })
  ] }) });
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex min-h-screen flex-col",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(TrustRail, {}), /* @__PURE__ */ jsx(BeforeVsAfter, {}), /* @__PURE__ */ jsx(HowItWorks, {}), /* @__PURE__ */ jsx(Features, {}), /* @__PURE__ */ jsx(WhyChefsLoveIt, {}), /* @__PURE__ */ jsx(SocialProof, {}), /* @__PURE__ */ jsx(FAQ, {}), /* @__PURE__ */ jsx(FinalCTA, {})]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-UUx4C3gi.js", "imports": ["/assets/chunk-LFPYN7LY-BwAHFOGz.js", "/assets/index-BaexvpaO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-B8lb-l_h.js", "imports": ["/assets/chunk-LFPYN7LY-BwAHFOGz.js", "/assets/index-BaexvpaO.js", "/assets/calendly-badge-8JLwNPOE.js"], "css": ["/assets/root-D6CcXvYG.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-CLrHADJq.js", "imports": ["/assets/chunk-LFPYN7LY-BwAHFOGz.js", "/assets/calendly-badge-8JLwNPOE.js", "/assets/index-BaexvpaO.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-b3c3a89f.js", "version": "b3c3a89f", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
