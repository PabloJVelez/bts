import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useEffect, useState } from "react";
import { X, Menu, ChefHat, CreditCard, Sparkles, UtensilsCrossed, CalendarCheck, CheckCircle, Store, BookOpen, ClipboardList, ShieldCheck, Ticket, Share2, Wallet, Mail, Wrench, XCircle, CheckCircle2, User, ChevronDownIcon } from "lucide-react";
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
    title: "Behind the Sauté | Branded Websites & Booking for Private Chefs"
  }, {
    name: "description",
    content: "Turn chef inquiries into paid bookings. Give your clients a real website with menus, experiences, and per-seat checkout. Built for private chefs."
  }, {
    property: "og:title",
    content: "Behind the Sauté | Booking & Payments for Private Chefs"
  }, {
    property: "og:description",
    content: "Your own branded website where clients browse menus, request events, and pay per seat. You just approve."
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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-accent-hover",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-border bg-background shadow-xs hover:bg-secondary hover:text-foreground",
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
const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  // { href: "#pricing", label: "Pricing" }, // Re-enable with <Pricing /> on home
  { href: "#faq", label: "FAQ" }
];
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("span", { className: "font-serif text-xl font-semibold tracking-tight text-foreground", children: [
        "Behind the ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Sauté" })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-8 md:flex", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
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
          children: "Book a Demo"
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
          children: "Book a Demo"
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
const trustIndicators = [
  { icon: ChefHat, label: "Built for private chefs" },
  { icon: CreditCard, label: "Stripe payments" },
  { icon: Sparkles, label: "Done-for-you setup" }
];
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-background py-16 md:py-24", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" }),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
        /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance", children: "Turn chef inquiries into paid bookings, without the back-and-forth." }) }),
        /* @__PURE__ */ jsx(FadeInUp, { delay: 0.1, children: /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty", children: "Your own branded website where clients browse menus, request events, and pay per seat. You just approve." }) }),
        /* @__PURE__ */ jsx(FadeInUp, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: openCalendlyPopup,
              size: "lg",
              className: "bg-primary px-8 text-lg text-primary-foreground hover:bg-accent-hover",
              children: "Book a Demo"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "lg",
              asChild: true,
              className: "border-border px-8 text-lg",
              children: /* @__PURE__ */ jsx("a", { href: "#how-it-works", children: "See How It Works" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center lg:justify-start", children: trustIndicators.map((item) => /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ] }) }, item.label)) })
      ] }),
      /* @__PURE__ */ jsx(FadeInUp, { delay: 0.3, children: /* @__PURE__ */ jsx("div", { className: "relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-border shadow-xl lg:mx-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/hero-chef.jpg",
          alt: "Professional private chef plating an elegant dish",
          className: "h-full w-full object-cover"
        }
      ) }) })
    ] }) })
  ] });
}
const steps = [
  {
    number: 1,
    icon: UtensilsCrossed,
    title: "Clients browse your menus & experiences",
    description: "Your website showcases your full menu catalog with courses, dishes, and pricing, plus the experience types you create and manage. No more PDF attachments.",
    previewSrc: "/chefevethub-menus.png",
    previewAlt: "Example storefront menus page showing catalog cards with images, course counts, and pricing."
  },
  {
    number: 2,
    icon: CalendarCheck,
    title: "They submit one structured request",
    description: "Date, time, party size, location, dietary needs, special requests: everything captured in a single guided form. No more back-and-forth DMs.",
    previewSrc: "/chefeventhub-request.png",
    previewAlt: "Example multi-step request form for choosing experience type, menu, and guest count."
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "You review and approve from your dashboard",
    description: "See every request in your admin panel. Accept with one click or decline with a reason. You stay in full control of your calendar.",
    previewSrc: "/chefeventhub-admin-request.png",
    previewAlt: "Example admin screen for reviewing an event request with accept and reject actions."
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Guests pay per seat via a shareable link",
    description: "Once you approve, tickets for the event become purchasable. Share the link with the host: they can pay for everyone, or each guest pays for their own seat."
  }
];
function HowItWorks() {
  return /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "How It Works" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "From inquiry to paid booking in four simple steps." })
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
                className: hasPreview ? "flex min-w-0 flex-1 flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40 md:p-8" : "w-full max-w-3xl rounded-xl border border-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40 md:p-8",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground", children: step.number }),
                  /* @__PURE__ */ jsx(step.icon, { className: "mb-4 h-8 w-8 shrink-0 text-primary", "aria-hidden": true }),
                  /* @__PURE__ */ jsx("h3", { className: "mb-2 font-serif text-xl font-semibold text-foreground sm:text-2xl", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground sm:text-base", children: step.description })
                ]
              }
            ),
            hasPreview && step.previewSrc && step.previewAlt ? /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 lg:max-w-none", children: /* @__PURE__ */ jsx("figure", { className: "overflow-hidden rounded-xl border border-border bg-muted/30 shadow-md ring-1 ring-black/5 dark:ring-white/10", children: /* @__PURE__ */ jsx(
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
    }) })
  ] }) });
}
const features = [
  {
    icon: Store,
    title: "Branded Website",
    description: "Your own website with your name, bio, photos, and branding. SEO-ready so clients find you on Google."
  },
  {
    icon: BookOpen,
    title: "Full Menu Catalog",
    description: "Organize menus by course with dishes, ingredients, and pricing. Clients browse instead of downloading a PDF."
  },
  {
    icon: ChefHat,
    title: "Experiences you define",
    description: "Create and manage your own experience types, pricing, and structure, so your site matches how you actually work, not a fixed template."
  },
  {
    icon: ClipboardList,
    title: "Structured Request Form",
    description: "One multi-step form captures date, time, party size, address, dietary needs, and special requests."
  },
  {
    icon: ShieldCheck,
    title: "Your Decision",
    description: "Every request lands in your dashboard. You decide what gets booked: accept or decline, add chef notes, or send a clear decline reason."
  },
  {
    icon: Ticket,
    title: "Per-Seat Ticketed Checkout",
    description: "Once you approve, tickets for that event become purchasable for your customers. Guests pay per seat."
  },
  {
    icon: Share2,
    title: "Shareable Booking Links",
    description: "Share your event link via text, email, Facebook, or Twitter. Hosts or guests can each pay individually."
  },
  {
    icon: Wallet,
    title: "Secure Stripe Checkout",
    description: "Payments run through Stripe so clients check out safely and you get paid reliably."
  },
  {
    icon: Mail,
    title: "Automated Email Notifications",
    description: "Clients get instant confirmations, acceptance emails with booking links, or polite decline notices."
  },
  {
    icon: Wrench,
    title: "Done-for-You Setup",
    description: "We build your website, upload your menus, and configure your admin. You provide content; we handle the rest."
  }
];
function Features() {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "bg-secondary/30 py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Everything you need to run your business" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Less admin. More cooking." })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-16", children: /* @__PURE__ */ jsx("div", { className: "grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: features.map((feature, index) => /* @__PURE__ */ jsx(
      StaggerItem,
      {
        className: cn(
          "h-full min-h-0",
          /* center last row when the grid has empty slots */
          index === 8 && "xl:col-start-2",
          index === 9 && "lg:col-start-2 xl:col-start-auto"
        ),
        children: /* @__PURE__ */ jsx(HoverScale, { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md", children: [
          /* @__PURE__ */ jsx(feature.icon, { className: "mb-4 h-8 w-8 shrink-0 text-primary" }),
          /* @__PURE__ */ jsx("h3", { className: "mb-2 font-serif text-lg font-semibold text-foreground", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground", children: feature.description })
        ] }) })
      },
      feature.title
    )) }) })
  ] }) });
}
const painPoints = [
  {
    pain: "You're copy-pasting menus into DMs and losing track of inquiries",
    solution: "Clients browse your full menu catalog with courses, dishes, and pricing, then submit one clean request."
  },
  {
    pain: "You spend hours going back and forth on dates, sizes, and dietary needs",
    solution: "One structured form captures everything upfront. You review a complete request, not a thread of messages."
  },
  {
    pain: "You chase deposits and lose bookings to no-shows",
    solution: "Approved events auto-generate a pay link. Guests pay per seat before the event, not after."
  }
];
function WhyChefsLoveIt() {
  return /* @__PURE__ */ jsx("section", { className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Built for how private chefs actually work" }) }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-16", children: /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: painPoints.map((item, index) => /* @__PURE__ */ jsx(StaggerItem, { children: /* @__PURE__ */ jsxs("div", { className: "h-full overflow-hidden rounded-xl border border-border bg-card", children: [
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
    name: "The Solo Chef",
    description: "You do 3-8 events a month, manage everything yourself, and lose leads in your inbox. You need a system, not more apps."
  },
  {
    name: "The Growing Operation",
    description: "You're booking 10-20 events a month and need to stop being the bottleneck. You want clients to self-serve and pay upfront."
  }
];
function SocialProof() {
  return /* @__PURE__ */ jsx("section", { className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Built for chefs like you" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Here's who we're building this for." })
    ] }) }),
    /* @__PURE__ */ jsx(StaggerContainer, { className: "mt-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-4xl gap-8 sm:grid-cols-2", children: personas.map((persona) => /* @__PURE__ */ jsx(StaggerItem, { className: "h-full min-h-0", children: /* @__PURE__ */ jsx(HoverScale, { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-md", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsx(User, { className: "h-8 w-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg font-semibold text-foreground", children: persona.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground", children: persona.description })
    ] }) }) }, persona.name)) }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-muted-foreground", children: "Join the early access waitlist" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: openCalendlyPopup,
          className: "bg-primary px-8 text-primary-foreground hover:bg-accent-hover",
          children: "Book a Demo"
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
    answer: "Absolutely. Every request goes to your admin dashboard. You review the details (date, party size, menu, location) and accept or decline with one click. Nothing gets booked without your approval."
  },
  {
    question: "How do guests pay per seat?",
    answer: "When you accept a request, tickets for that event become purchasable. You share the link with the host, and they can either pay for all seats or forward the link so each guest pays individually."
  },
  {
    question: "Do you support deposits?",
    answer: "Yes. For larger parties, the system supports partial deposits with a deadline for the remaining balance. For smaller events, full payment is collected upfront. The exact rules are configurable per chef."
  },
  {
    question: "What payment processor do you use?",
    answer: "All payments are processed securely through Stripe."
  },
  {
    question: "Can I customize my menus and experiences?",
    answer: "Yes. You get a full menu management system: organize by course, add dishes with ingredients and descriptions, set pricing, and upload photos. You can offer plated dinners, cooking classes, buffets, or any combination."
  },
  {
    question: "What if I already have a website?",
    answer: "That's very common. We handle the technical setup so you can keep the domain your clients already know, and your website becomes where they browse menus and book."
  },
  {
    question: "How long does setup take?",
    answer: "We handle the technical setup while you provide menus, photos, and branding preferences. How fast you go live depends on your content and availability, and we work with you on a realistic timeline."
  },
  {
    question: "Do I need any technical skills?",
    answer: "None. We do the setup for you. Your day-to-day is reviewing requests and clicking approve. That's it."
  }
];
function FAQ() {
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "bg-secondary/30 py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Frequently Asked Questions" }) }) }),
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
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-secondary to-background py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(FadeInUp, { children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance", children: "Ready to stop chasing leads and start getting paid?" }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.1, children: /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty", children: "Book a 15-minute demo and we'll show you how it works for your business." }) }),
    /* @__PURE__ */ jsx(FadeInUp, { delay: 0.2, children: /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: openCalendlyPopup,
          size: "lg",
          className: "bg-primary px-8 text-lg text-primary-foreground hover:bg-accent-hover",
          children: "Book a Demo"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "lg",
          asChild: true,
          className: "border-border px-8 text-lg",
          children: /* @__PURE__ */ jsxs("a", { href: "mailto:pmltechpile@gmail.com", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
            "Email Us"
          ] })
        }
      )
    ] }) })
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
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-8 text-center text-xs text-footer-foreground/50", children: "Built with love for private chefs everywhere." })
  ] }) });
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex min-h-screen flex-col",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(HowItWorks, {}), /* @__PURE__ */ jsx(Features, {}), /* @__PURE__ */ jsx(WhyChefsLoveIt, {}), /* @__PURE__ */ jsx(SocialProof, {}), /* @__PURE__ */ jsx(FAQ, {}), /* @__PURE__ */ jsx(FinalCTA, {})]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-UUx4C3gi.js", "imports": ["/assets/chunk-LFPYN7LY-BwAHFOGz.js", "/assets/index-BaexvpaO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-BFQUzEk5.js", "imports": ["/assets/chunk-LFPYN7LY-BwAHFOGz.js", "/assets/index-BaexvpaO.js", "/assets/calendly-badge-8JLwNPOE.js"], "css": ["/assets/root-9uDnDwZS.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-3rLFNoHY.js", "imports": ["/assets/chunk-LFPYN7LY-BwAHFOGz.js", "/assets/calendly-badge-8JLwNPOE.js", "/assets/index-BaexvpaO.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-d5ecdaa1.js", "version": "d5ecdaa1", "sri": void 0 };
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
