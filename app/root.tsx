import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import "./globals.css";
import { CalendlyBadge } from "~/components/calendly-badge";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://assets.calendly.com/assets/external/widget.css",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Behind the Sauté | Branded Storefronts & Booking for Private Chefs" },
    { name: "description", content: "Turn chef inquiries into paid bookings. Give your clients a real storefront with menus, experiences, and per-seat checkout. Built for private chefs." },
    { property: "og:title", content: "Behind the Sauté | Booking & Payments for Private Chefs" },
    { property: "og:description", content: "Your own branded storefront where clients browse menus, request events, and pay per seat. You just approve." },
    { property: "og:url", content: "https://behindthesaute.com" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <CalendlyBadge />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
