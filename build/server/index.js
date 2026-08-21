import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useEffect, useState } from "react";
import { X, Menu, ChefHat, Sparkles, BadgeCheck, CreditCard, MousePointerClick, ExternalLink, UtensilsCrossed, CalendarCheck, CheckCircle, Check, Store, ClipboardList, Wallet, ArrowRight, XCircle, CheckCircle2, User, ChevronDownIcon } from "lucide-react";
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
const meta$4 = () => {
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
  meta: meta$4
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
  { href: DEMO_STOREFRONT_URL, label: "Live Booking Flow", external: true },
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
          children: "Get My Booking Page Built"
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
          children: "Get My Booking Page Built"
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
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs font-medium uppercase tracking-[0.14em] text-primary/90", children: "Built for private chefs who book through DMs, texts, and email." }),
          /* @__PURE__ */ jsx("h1", { className: "mx-auto max-w-xl font-serif text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl lg:mx-0 lg:max-w-none lg:text-6xl text-balance", children: "Turn private chef inquiries into paid deposits." })
        ] }),
        /* @__PURE__ */ jsx(FadeInUp, { delay: 0.1, children: /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty lg:mx-0", children: "BTS builds you a branded booking page where clients choose a menu, submit event details, and pay after you approve. No more chasing DMs, texts, or deposit reminders." }) }),
        /* @__PURE__ */ jsxs(FadeInUp, { delay: 0.2, children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: openCalendlyPopup,
                size: "lg",
                className: "bg-primary px-8 text-base text-primary-foreground shadow-sm shadow-black/5 hover:bg-accent-hover hover:shadow-md focus-visible:ring-offset-2 sm:text-lg",
                children: "Get My Booking Page Built"
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
                    children: "See Live Booking Flow"
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
                children: "View the live demo storefront"
              }
            ),
            ". It shows the exact menu, request, approval, and payment flow."
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
  { icon: ChefHat, label: "Built for private chefs" },
  { icon: Sparkles, label: "Done-for-you setup" },
  { icon: BadgeCheck, label: "You approve every booking" },
  { icon: CreditCard, label: "Collect deposits or full payment" },
  { icon: MousePointerClick, label: "Live booking demo available" }
];
function TrustRail() {
  return /* @__PURE__ */ jsx("section", { "aria-label": "Trust and proof", className: "bg-background", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("div", { className: "border-y border-border/70 py-6 md:py-7", children: /* @__PURE__ */ jsx("ul", { className: "grid gap-y-3 gap-x-6 sm:grid-cols-2 sm:gap-y-4 lg:grid-cols-5", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
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
    eyebrow: "Client sees the menu"
  },
  {
    number: 2,
    icon: CalendarCheck,
    eyebrow: "Client submits the details"
  },
  {
    number: 3,
    icon: CheckCircle,
    eyebrow: "Chef stays in control"
  },
  {
    number: 4,
    icon: CreditCard,
    eyebrow: "Client gets the next step"
  }
];
function HowItWorks() {
  return /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "bg-secondary/25 py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl text-center lg:text-left", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-primary/90", children: "Live template demo" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "See the booking flow your clients would use." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-muted-foreground", children: "A short look at the working demo: clients choose a menu, send event details, wait for your approval, then get the payment handoff." })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          size: "lg",
          className: "mx-auto w-full bg-primary text-primary-foreground hover:bg-accent-hover sm:w-auto lg:mx-0",
          children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: DEMO_STOREFRONT_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              children: [
                "Open Live Demo",
                /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4", "aria-hidden": true })
              ]
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(FadeInUp, { className: "mt-12", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm shadow-black/5 ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-border/70 bg-muted/30 p-2 sm:p-3", children: /* @__PURE__ */ jsx(
        "video",
        {
          className: "aspect-video w-full rounded-lg bg-muted object-cover",
          autoPlay: true,
          loop: true,
          muted: true,
          playsInline: true,
          preload: "auto",
          poster: "/chefevethub-menus.png",
          "aria-label": "Demo loop showing the private chef booking flow from menu browsing to payment handoff.",
          children: /* @__PURE__ */ jsx(
            "source",
            {
              src: "/videos/chef-booking-flow.webm",
              type: "video/webm"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-serif text-xl font-semibold text-foreground sm:text-2xl", children: "One flow from first look to paid booking." }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base", children: "The demo keeps each next step clear, so serious inquiries do not disappear into screenshots, texts, and follow-up messages." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            className: "w-full bg-background sm:w-auto",
            children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: DEMO_STOREFRONT_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                children: [
                  "View demo storefront",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4", "aria-hidden": true })
                ]
              }
            )
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: steps.map((step) => /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center gap-3 rounded-lg border border-border/70 bg-background px-4 py-3 shadow-sm shadow-black/5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15", children: /* @__PURE__ */ jsx(step.icon, { className: "h-4 w-4", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-primary/80", children: [
          "Step ",
          step.number
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate text-sm font-medium text-foreground", children: step.eyebrow })
      ] })
    ] }) }, step.number)) })
  ] }) });
}
const bookingSystemGroups = [
  {
    icon: Store,
    title: "A branded booking page",
    description: "A polished page built from your real menus, photos, event types, and booking preferences.",
    items: [
      "Your brand, photos, menus, add-ons, pricing, and event types",
      "A simple path from browsing to starting a request",
      "A shareable link clients can open from any DM, email, or bio"
    ]
  },
  {
    icon: ClipboardList,
    title: "A guided request flow",
    description: "A guided form collects the details you usually have to chase manually before you quote.",
    items: [
      "Date, timing, headcount, address, allergies, notes, and event context",
      "Every request waits for your approval before anything is booked",
      "A dashboard where event details stay together instead of scattered across threads"
    ]
  },
  {
    icon: Wallet,
    title: "Payment and follow-up",
    description: "Approved clients get a clean next step for payment, confirmation, and booking details.",
    items: [
      "Deposit, full payment, or guest-split payment options",
      "Email confirmations with the booking details and next steps",
      "Done-for-you setup from your menu, photos, branding, and booking rules"
    ]
  }
];
const confidenceCues = [
  "Built from your existing menus and photos",
  "Reviewed with you before you send it to clients",
  "Live demo available before the walkthrough"
];
const setupSteps = [
  "You send your menu, photos, event types, and booking rules.",
  "We build your first booking page and request flow.",
  "You review the live flow before sending it to clients."
];
function Features() {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "scroll-mt-20 bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-primary/90", children: "What you get" }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Your private chef booking system, built for you." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl", children: "BTS turns your menus, request forms, approvals, payments, and client follow-up into one branded flow." }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-2 text-left sm:grid-cols-3", children: confidenceCues.map((cue) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start gap-2 rounded-lg border border-border/70 bg-card/70 px-3 py-3 text-sm leading-snug text-foreground/85 shadow-sm shadow-black/5",
          children: [
            /* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary", "aria-hidden": true }),
            /* @__PURE__ */ jsx("span", { children: cue })
          ]
        },
        cue
      )) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-muted-foreground sm:text-base", children: [
        "Want proof before a walkthrough?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: DEMO_STOREFRONT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            children: "Browse our live demo booking page"
          }
        ),
        "."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6", children: bookingSystemGroups.map((group, index) => /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsx(HoverScale, { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col rounded-xl border border-border/80 bg-card p-5 shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:border-primary/35 hover:shadow-md sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15", children: /* @__PURE__ */ jsx(group.icon, { className: "h-5 w-5 text-primary", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-primary/80", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl", children: group.title })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground/90 sm:text-base", children: group.description }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3 border-t border-border/70 pt-5", children: group.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-foreground/85 sm:text-base", children: [
        /* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary", "aria-hidden": true }),
        /* @__PURE__ */ jsx("span", { children: item })
      ] }, item)) })
    ] }) }) }, group.title)) }),
    /* @__PURE__ */ jsx(FadeInUp, { className: "mt-8", children: /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-primary/20 bg-primary/5 px-5 py-5 text-center shadow-sm shadow-black/5 sm:px-6", children: /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-base font-medium leading-relaxed text-foreground sm:text-lg", children: "The end result is simple: clients request a date, you approve the right fit, and payment happens before the event details get lost in messages." }) }) }),
    /* @__PURE__ */ jsx(FadeInUp, { className: "mt-14", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 border-y border-border/80 py-10 md:grid-cols-[1fr_1.1fr] md:items-center md:py-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "h-5 w-5", "aria-hidden": true }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl", children: "Built for you, then walked through with you." }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg", children: "You do not need to stitch together forms, payment links, menu PDFs, and follow-up emails. We turn your existing material into a working booking flow." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: setupSteps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground ring-1 ring-border/80", children: index + 1 }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground sm:text-base", children: step })
      ] }, step)) })
    ] }) }),
    /* @__PURE__ */ jsx(FadeInUp, { className: "mt-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between gap-5 rounded-xl border border-border/80 bg-secondary/35 px-5 py-6 text-center shadow-sm shadow-black/5 ring-1 ring-black/5 sm:px-6 md:flex-row md:text-left", children: [
      /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base font-medium leading-relaxed text-foreground sm:text-lg", children: "See exactly what your client would click through before we build yours." }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-3 sm:w-auto sm:flex-row", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: openCalendlyPopup,
            className: "w-full bg-primary text-primary-foreground hover:bg-accent-hover sm:w-auto",
            children: [
              "Get My Booking Page Built",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "w-full bg-background/70 sm:w-auto", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: DEMO_STOREFRONT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            children: "Open live demo"
          }
        ) })
      ] })
    ] }) })
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
          children: "Get My Booking Page Built"
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
            children: "Get My Booking Page Built"
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
const contactDetails = [
  "Behind the Sauté",
  "A product of PMLTECH PILE LLC",
  "Austin, Texas",
  "Email: pmltechpile@gmail.com"
];
const legalPages = {
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    eyebrow: "Legal",
    description: "Terms for chefs, culinary businesses, and booking guests who use Behind the Sauté pages, booking flows, and payment features.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. Who We Are",
        body: [
          "Behind the Sauté is a private-chef booking product operated by PMLTECH PILE LLC. In these Terms, Behind the Sauté, BTS, we, us, or our refers to PMLTECH PILE LLC. Chef, you, or your refers to the chef, culinary business, or customer using our services. Event client or booking guest refers to a person who submits an inquiry, booking request, deposit, or payment through a BTS-powered booking page.",
          "These Terms apply when you visit our website, use a BTS booking page, submit an inquiry, make or receive a payment, start onboarding, pay an invoice, or continue using the service."
        ]
      },
      {
        title: "2. What BTS Provides",
        body: [
          "BTS helps private chefs create and operate a branded booking experience for private events. The exact scope, pricing, commission, subscription level, setup work, and support level for each chef are confirmed separately in writing by invoice, order form, email, or signed agreement."
        ],
        bullets: [
          "Private-chef website or booking page setup",
          "Service, menu, and offer structure",
          "Event inquiry and booking request flows",
          "Chef and client notification flows",
          "Stripe Connect setup support",
          "Launch QA and test booking support",
          "Ongoing hosting, maintenance, and support"
        ]
      },
      {
        title: "3. Chef Responsibilities",
        body: [
          "Chefs are independent businesses. You are responsible for the food, hospitality services, staffing, event execution, customer communication, refunds, taxes, permits, licenses, insurance, and legal compliance related to your chef business.",
          "You are also responsible for reviewing and approving your page content, pricing, event policies, menu claims, allergy language, availability, and client communications before launch."
        ],
        bullets: [
          "Business name, service area, contact information, and event types",
          "Menus, sample menus, service descriptions, pricing, minimum spend, deposit rules, and payment rules",
          "Photos, logo, brand materials, reviews, and other content you want displayed",
          "Booking rules, availability guidance, cancellation/refund policy, allergy policy, travel policy, and event policy",
          "Any approvals needed before BTS publishes or updates your booking page"
        ]
      },
      {
        title: "4. Event Clients and Chef Policies",
        body: [
          "BTS provides booking infrastructure. BTS is not the chef, caterer, food provider, event operator, employer, agent, or guarantor of any chef or event client.",
          "The chef's own cancellation, refund, deposit, allergy, travel, event, and service policies control the chef-client relationship unless BTS expressly states otherwise in writing. Event clients should review the applicable chef policies before submitting a request or payment."
        ]
      },
      {
        title: "5. Payments Through Stripe Connect",
        body: [
          "BTS uses Stripe Connect to support online booking payments, deposits, platform fees, and related payment flows. During onboarding, BTS may help a chef create or connect a Stripe account.",
          "Client payments are processed by Stripe. Where configured, payments are associated with the chef's connected Stripe account, and BTS may collect agreed platform fees, subscription fees, commissions, setup fees, or other fees through Stripe Connect or by separate invoice.",
          "Stripe's own terms, account requirements, payout schedules, dispute processes, and fees may apply. Chefs are responsible for refunds, chargebacks, disputes, taxes, and payment obligations connected to their chef services unless BTS caused the issue through its own error."
        ]
      },
      {
        title: "6. Pricing and Billing",
        body: [
          "BTS pricing is determined after reviewing the chef's business, booking needs, setup complexity, and support requirements. In general, BTS charges a monthly or yearly maintenance subscription plus a commission percentage on bookings processed through the site. Any setup fees, customization fees, commission percentages, subscription amounts, or other fees will be confirmed before paid work begins."
        ]
      },
      {
        title: "7. Refunds for BTS Fees",
        body: [
          "If you pay a setup or launch fee to BTS, that fee is fully refundable before your site is launched. After launch, setup fees are non-refundable unless we agree otherwise in writing.",
          "Subscription fees and commissions are not refundable once the applicable billing period or processed booking has begun, unless required by law or agreed in writing."
        ]
      },
      {
        title: "8. Launch Timeline",
        body: [
          "If BTS commits to a 10-business-day launch timeline, that timeline begins only after BTS receives all required assets, business information, approvals, and onboarding inputs from the chef.",
          "If BTS does not launch your site within 10 business days after all required assets are received, your first month of maintenance is free. This is a delivery guarantee, not a guarantee of bookings, revenue, leads, sales, search ranking, ad performance, or business growth."
        ]
      },
      {
        title: "9. Ongoing Service and Cancellation",
        body: [
          "BTS may offer monthly or yearly subscriptions. You may cancel ongoing service with 30 days' written notice. Cancellation does not remove your obligation to pay fees already due, commissions on bookings already processed, or charges for work already approved.",
          "After cancellation, BTS may disable hosting, booking forms, payment flows, admin access, and related services after the notice period ends."
        ]
      },
      {
        title: "10. Ownership of Materials",
        body: [
          "Chefs retain ownership of their business name, brand, domain, photographs, menus, customer information, policies, and other materials they provide to BTS.",
          "BTS retains ownership of its templates, code, platform components, workflows, designs, processes, and reusable implementation materials. You grant BTS permission to use the materials you provide solely to build, operate, maintain, support, and promote your booking experience, unless you tell us otherwise in writing."
        ]
      },
      {
        title: "11. Domains and Account Access",
        body: [
          "Chefs own and control their own domains unless otherwise agreed in writing. BTS may help connect a domain to a booking site, but domain ownership remains with the chef.",
          "Do not send BTS passwords, full card numbers, bank credentials, or unnecessary access to unrelated systems. If account access is needed, provide only the access reasonably required through secure account invitations, delegated access, or setup flows whenever possible."
        ]
      },
      {
        title: "12. Data Export and Removal",
        body: [
          "Upon cancellation or written request, BTS can provide an export of submitted booking inquiry data, customer records collected through BTS, site content, and uploaded business materials, where reasonably available.",
          "BTS may delete or remove business materials and customer data after cancellation, subject to legal, tax, accounting, fraud-prevention, backup, security, and dispute-resolution retention requirements. Backup copies may remain for a limited time before being deleted through normal backup rotation."
        ]
      },
      {
        title: "13. Food Safety, Allergies, and Event Services",
        body: [
          "BTS is not responsible for food safety, allergen handling, ingredient sourcing, menu accuracy, kitchen conditions, health permits, insurance, event staffing, service quality, event execution, client refunds, or chef-client disputes. Chefs are responsible for their own services and for communicating accurate allergy, dietary, cancellation, refund, and event terms to clients."
        ]
      },
      {
        title: "14. No Professional Advice",
        body: [
          "BTS may provide operational, technical, copywriting, and setup support. BTS does not provide legal, tax, accounting, food safety, insurance, or regulatory advice. You should consult your own qualified professionals for those matters."
        ]
      },
      {
        title: "15. No Guarantee of Results",
        body: [
          "BTS does not guarantee bookings, revenue, conversion rates, client quality, repeat customers, search ranking, ad performance, or business growth. Your results depend on your offer, market, pricing, reputation, availability, client communication, and other factors outside our control."
        ]
      },
      {
        title: "16. Indemnity",
        body: [
          "To the maximum extent allowed by law, you agree to defend, indemnify, and hold harmless BTS, PMLTECH PILE LLC, and their owners, contractors, and service providers from claims, damages, liabilities, costs, and expenses arising from your chef services, event conduct, food, staff, policies, content, customer disputes, taxes, permits, insurance, legal compliance, misuse of the service, or breach of these Terms."
        ]
      },
      {
        title: "17. Limitation of Liability",
        body: [
          "To the maximum extent allowed by law, BTS is not liable for indirect, incidental, special, consequential, exemplary, punitive, or lost-profit damages. BTS's total liability for claims related to the service will not exceed the fees paid by you to BTS during the three months before the event giving rise to the claim, unless a different limit is required by law."
        ]
      },
      {
        title: "18. Service Changes and Termination",
        body: [
          "BTS may update, improve, suspend, or discontinue parts of the service over time. BTS may suspend or terminate service if invoices are unpaid, the service is used unlawfully, required onboarding information is false or incomplete, a Stripe or payment issue prevents safe operation, continued service creates legal/security/reputational/operational risk, or you materially breach these Terms."
        ]
      },
      {
        title: "19. Governing Law",
        body: [
          "These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law rules. Any dispute that cannot be resolved informally will be handled in the state or federal courts located in Texas, unless applicable law requires a different forum."
        ]
      },
      {
        title: "20. Updates and Contact",
        body: [
          "BTS may update these Terms from time to time. The updated version will be posted on this page with a new effective date.",
          ...contactDetails
        ]
      }
    ]
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    description: "How BTS handles chef business data, booking inquiry data, payment-related data, site analytics, and support information.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. Overview",
        body: [
          "This Privacy Policy explains how Behind the Sauté, a product of PMLTECH PILE LLC, collects, uses, shares, stores, exports, and removes information related to our website, chef onboarding, booking pages, payment flows, and support services."
        ]
      },
      {
        title: "2. Information We Collect",
        bullets: [
          "Chef business details such as name, email, phone, business name, service area, social links, policies, services, menus, pricing, and brand assets",
          "Booking inquiry details submitted by event clients, such as name, email, phone, event date, location, guest count, dietary notes, budget range, and event notes",
          "Payment-related records needed to operate Stripe Connect payment flows, invoices, subscriptions, commissions, refunds, and disputes",
          "Technical information such as device/browser data, logs, page interactions, form events, and analytics",
          "Support communications, emails, onboarding responses, and operational notes"
        ]
      },
      {
        title: "3. How We Use Information",
        bullets: [
          "Build, launch, host, maintain, and support chef booking pages",
          "Send inquiry, booking, payment, approval, rejection, and support notifications",
          "Support Stripe Connect setup and payment-related workflows",
          "Improve booking flows, site reliability, security, and customer support",
          "Prevent fraud, abuse, unauthorized access, or misuse",
          "Comply with tax, accounting, legal, security, and dispute-resolution obligations"
        ]
      },
      {
        title: "4. Payment Information",
        body: [
          "BTS uses Stripe Connect for payment processing. Stripe may collect and process payment details, identity information, bank account information, card information, tax information, and other data required for payment processing, payouts, compliance, fraud prevention, and dispute handling. BTS does not ask for or store full card numbers or bank credentials."
        ]
      },
      {
        title: "5. Sharing Information",
        body: [
          "BTS shares information only as needed to operate the service, support chefs and event clients, process payments, host the site, send emails, provide analytics, prevent abuse, comply with law, or handle disputes."
        ],
        bullets: [
          "Stripe for payment processing and connected-account flows",
          "Hosting, database, email, analytics, and infrastructure providers",
          "The applicable chef or culinary business for booking inquiries submitted through that chef's page",
          "Professional advisors, authorities, or counterparties when needed for legal, tax, accounting, safety, or dispute reasons"
        ]
      },
      {
        title: "6. Chef and Event Client Data",
        body: [
          "Booking inquiry data belongs to the relevant chef business and is used to support that chef's booking workflow. Event clients should expect their submitted booking details to be shared with the chef or culinary business they are trying to book."
        ]
      },
      {
        title: "7. Data Retention",
        body: [
          "BTS keeps information as long as reasonably needed to provide the service, support bookings, maintain business records, resolve disputes, comply with legal/tax/accounting/security requirements, and operate backups. We may delete or anonymize information when it is no longer needed, subject to retention requirements and backup rotation."
        ]
      },
      {
        title: "8. Export, Correction, and Removal",
        body: [
          "Chefs may request an export, correction, or removal of their business materials and booking data. Event clients may contact the applicable chef or BTS to request reasonable access, correction, or removal of submitted information. Some records may be retained where required for legal, tax, accounting, security, fraud-prevention, backup, or dispute reasons."
        ]
      },
      {
        title: "9. Security",
        body: [
          "BTS uses reasonable administrative, technical, and operational safeguards to protect information. No online system can be guaranteed perfectly secure. Chefs should use strong passwords, secure their own email, domain, Stripe, and social accounts, and avoid sending passwords, full card numbers, or bank credentials to BTS."
        ]
      },
      {
        title: "10. Children's Privacy",
        body: [
          "BTS is not intended for children under 13. We do not knowingly collect personal information from children under 13."
        ]
      },
      {
        title: "11. Updates and Contact",
        body: [
          "BTS may update this Privacy Policy from time to time. The updated version will be posted on this page with a new effective date.",
          ...contactDetails
        ]
      }
    ]
  },
  "cancellation-policy": {
    slug: "cancellation-policy",
    title: "Cancellation & Refund Policy",
    eyebrow: "Booking Policy",
    description: "How BTS handles its own fees, chef subscriptions, and the default relationship between chef event policies and client booking payments.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. BTS Setup and Launch Fees",
        body: [
          "If a chef pays a BTS setup or launch fee, that fee is fully refundable before the chef's booking site is launched. After launch, setup fees are non-refundable unless BTS agrees otherwise in writing."
        ]
      },
      {
        title: "2. Subscriptions",
        body: [
          "BTS may offer monthly or yearly subscriptions. Chefs may cancel ongoing service with 30 days' written notice. Cancellation does not remove the obligation to pay subscription fees already due, commissions on bookings already processed, or charges for work already approved."
        ]
      },
      {
        title: "3. Commission and Platform Fees",
        body: [
          "Commission percentages, platform fees, and payment-processing fees are confirmed in writing for each chef. Commissions on bookings already processed are not refundable unless required by law or agreed in writing."
        ]
      },
      {
        title: "4. Chef Event Cancellations",
        body: [
          "For private chef events, the chef's own cancellation, refund, deposit, rescheduling, travel, and event policies control the booking unless BTS expressly states otherwise in writing. BTS does not provide chef services and is not responsible for event performance, food, staffing, service quality, or chef-client disputes."
        ]
      },
      {
        title: "5. Event Client Refunds and Chargebacks",
        body: [
          "Event clients should contact the chef directly about event refunds, rescheduling, cancellation, service issues, dietary concerns, or disputes. Chefs are responsible for refunds, chargebacks, payment disputes, and customer issues connected to their chef services unless BTS caused the issue through its own error."
        ]
      },
      {
        title: "6. Payment Processor Rules",
        body: [
          "Payments may be processed through Stripe Connect. Stripe's own fees, refund rules, dispute procedures, payout schedules, and account requirements may apply. Payment processor fees may not always be refundable."
        ]
      },
      {
        title: "7. Contact",
        body: contactDetails
      }
    ]
  },
  security: {
    slug: "security",
    title: "Security & Data Handling",
    eyebrow: "Trust",
    description: "A plain-English overview of how BTS handles access, payments, chef materials, booking data, and account boundaries.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. Our Security Posture",
        body: [
          "BTS is built to collect booking details and support online payments without asking chefs to hand over unnecessary access. We use reasonable technical and operational safeguards, but no online service can guarantee perfect security."
        ]
      },
      {
        title: "2. What We Do Not Request",
        bullets: [
          "Bank account passwords",
          "Full card numbers",
          "Unrelated business-system credentials",
          "Social media passwords when delegated access or secure alternatives are available",
          "Client lists or private business materials that are not needed for setup"
        ]
      },
      {
        title: "3. Stripe Connect",
        body: [
          "BTS uses Stripe Connect for supported payment flows. Stripe handles payment processing, connected-account onboarding, compliance checks, payouts, disputes, and related payment data. Chefs should manage their own Stripe accounts and keep Stripe credentials secure."
        ]
      },
      {
        title: "4. Limited Access",
        body: [
          "If BTS needs access to a domain, email, Stripe, website, or other account for setup or support, chefs should provide the minimum access needed through secure invitations, delegated access, or setup flows where possible. Access should be removed when it is no longer needed."
        ]
      },
      {
        title: "5. Data Export and Removal",
        body: [
          "Upon cancellation or written request, BTS can provide an export of reasonably available booking data, site content, and uploaded business materials. BTS may remove data and materials from active systems, subject to legal, tax, accounting, fraud-prevention, backup, security, and dispute-resolution retention requirements."
        ]
      },
      {
        title: "6. Chef Responsibilities",
        bullets: [
          "Use strong passwords and multi-factor authentication where available",
          "Keep email, domain, Stripe, and social accounts secure",
          "Do not send passwords, full card numbers, bank credentials, or unnecessary client data by email",
          "Review booking page content and policies before launch",
          "Tell BTS promptly about suspected unauthorized access or inaccurate booking data"
        ]
      },
      {
        title: "7. Contact",
        body: contactDetails
      }
    ]
  }
};
const legalNavItems = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cancellation-policy", label: "Cancellation" },
  { href: "/security", label: "Security" }
];
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-footer-bg py-12 text-footer-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 md:flex-row md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl font-semibold tracking-tight", children: [
          "Behind the ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Sauté" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-footer-foreground/70", children: "© 2026 Behind the Sauté. All rights reserved." })
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
    /* @__PURE__ */ jsx("p", { className: "mt-8 text-center text-xs text-footer-foreground/50", children: "Booking details and payments in one place for private chefs." }),
    /* @__PURE__ */ jsx(
      "nav",
      {
        "aria-label": "Legal",
        className: "mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-footer-foreground/60",
        children: legalNavItems.map((item) => /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: "transition-colors hover:text-primary",
            children: item.label
          },
          item.href
        ))
      }
    )
  ] }) });
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex min-h-screen flex-col",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(TrustRail, {}), /* @__PURE__ */ jsx(HowItWorks, {}), /* @__PURE__ */ jsx(BeforeVsAfter, {}), /* @__PURE__ */ jsx(Features, {}), /* @__PURE__ */ jsx(WhyChefsLoveIt, {}), /* @__PURE__ */ jsx(SocialProof, {}), /* @__PURE__ */ jsx(FAQ, {}), /* @__PURE__ */ jsx(FinalCTA, {})]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
function LegalPage({ page: page2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-secondary/30 py-14 sm:py-18", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-primary/90", children: page2.eyebrow }),
        /* @__PURE__ */ jsx("h1", { className: "mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl", children: page2.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg", children: page2.description }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-muted-foreground", children: [
          "Effective date: ",
          page2.effectiveDate
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-background py-10 sm:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8", children: [
        /* @__PURE__ */ jsx("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxs(
          "nav",
          {
            "aria-label": "Legal pages",
            className: "rounded-xl border border-border/80 bg-card p-4 shadow-sm shadow-black/5",
            children: [
              /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground", children: "Legal" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 lg:flex-col", children: legalNavItems.map((item) => /* @__PURE__ */ jsx(
                Link,
                {
                  to: item.href,
                  className: [
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    item.href === `/${page2.slug}` ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  ].join(" "),
                  children: item.label
                },
                item.href
              )) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 sm:p-8 lg:p-10", children: /* @__PURE__ */ jsx("div", { className: "space-y-9", children: page2.sections.map((section) => {
          var _a;
          return /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl font-semibold tracking-tight text-foreground", children: section.title }),
            (_a = section.body) == null ? void 0 : _a.map((paragraph) => /* @__PURE__ */ jsx(
              "p",
              {
                className: "mt-4 text-sm leading-7 text-muted-foreground sm:text-base",
                children: paragraph
              },
              paragraph
            )),
            section.bullets ? /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm leading-7 text-muted-foreground sm:text-base", children: section.bullets.map((bullet) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }),
              /* @__PURE__ */ jsx("span", { children: bullet })
            ] }, bullet)) }) : null
          ] }, section.title);
        }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const page$3 = legalPages.terms;
const meta$3 = () => [{
  title: `${page$3.title} | Behind the Sauté`
}, {
  name: "description",
  content: page$3.description
}];
const terms = UNSAFE_withComponentProps(function TermsRoute() {
  return /* @__PURE__ */ jsx(LegalPage, {
    page: page$3
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: terms,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const page$2 = legalPages.privacy;
const meta$2 = () => [{
  title: `${page$2.title} | Behind the Sauté`
}, {
  name: "description",
  content: page$2.description
}];
const privacy = UNSAFE_withComponentProps(function PrivacyRoute() {
  return /* @__PURE__ */ jsx(LegalPage, {
    page: page$2
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: privacy,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const page$1 = legalPages["cancellation-policy"];
const meta$1 = () => [{
  title: `${page$1.title} | Behind the Sauté`
}, {
  name: "description",
  content: page$1.description
}];
const cancellationPolicy = UNSAFE_withComponentProps(function CancellationPolicyRoute() {
  return /* @__PURE__ */ jsx(LegalPage, {
    page: page$1
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cancellationPolicy,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const page = legalPages.security;
const meta = () => [{
  title: `${page.title} | Behind the Sauté`
}, {
  name: "description",
  content: page.description
}];
const security = UNSAFE_withComponentProps(function SecurityRoute() {
  return /* @__PURE__ */ jsx(LegalPage, {
    page
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: security,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C1tdEm4S.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/index-DeeLHr9e.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-BL0WoFGr.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/index-DeeLHr9e.js", "/assets/calendly-badge-CyR92gdK.js"], "css": ["/assets/root-D4E9_qOm.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-DSbhdwXu.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/footer-C0WFfMtY.js", "/assets/calendly-badge-CyR92gdK.js", "/assets/index-DeeLHr9e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/terms": { "id": "routes/terms", "parentId": "root", "path": "terms", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/terms-B39lwxhc.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/legal-page-4mZOFRdn.js", "/assets/footer-C0WFfMtY.js", "/assets/calendly-badge-CyR92gdK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privacy": { "id": "routes/privacy", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/privacy-C6BoJLWW.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/legal-page-4mZOFRdn.js", "/assets/footer-C0WFfMtY.js", "/assets/calendly-badge-CyR92gdK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/cancellation-policy": { "id": "routes/cancellation-policy", "parentId": "root", "path": "cancellation-policy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/cancellation-policy-CWMr-heW.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/legal-page-4mZOFRdn.js", "/assets/footer-C0WFfMtY.js", "/assets/calendly-badge-CyR92gdK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/security": { "id": "routes/security", "parentId": "root", "path": "security", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/security-iSUf_8DO.js", "imports": ["/assets/chunk-LFPYN7LY-ILpJT5Eq.js", "/assets/legal-page-4mZOFRdn.js", "/assets/footer-C0WFfMtY.js", "/assets/calendly-badge-CyR92gdK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-26667bb5.js", "version": "26667bb5", "sri": void 0 };
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
  },
  "routes/terms": {
    id: "routes/terms",
    parentId: "root",
    path: "terms",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/privacy": {
    id: "routes/privacy",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/cancellation-policy": {
    id: "routes/cancellation-policy",
    parentId: "root",
    path: "cancellation-policy",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/security": {
    id: "routes/security",
    parentId: "root",
    path: "security",
    index: void 0,
    caseSensitive: void 0,
    module: route5
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
