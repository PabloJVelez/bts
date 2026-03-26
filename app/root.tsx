import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import "./globals.css";
import { CalendlyScriptLoader } from "~/components/calendly-badge";

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
    { title: "Behind the Sauté | Booking and Payments Page for Private Chefs" },
    {
      name: "description",
      content:
        "Behind the Sauté gives private chefs a branded booking page where clients pick menus, send event details, and pay deposits or full payment. You approve or decline each request.",
    },
    { property: "og:title", content: "Behind the Sauté | One Booking Link for Private Chefs" },
    {
      property: "og:description",
      content:
        "Send one link. Clients pick a menu, share event details, and pay online. You stay in control by approving each request.",
    },
    { property: "og:url", content: "https://behindthesaute.com" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

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
        <CalendlyScriptLoader />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
