import { DEMO_STOREFRONT_URL } from "~/lib/demo-storefront";
import { legalNavItems } from "~/lib/legal-content";

export function Footer() {
  return (
    <footer className="bg-footer-bg py-12 text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <span className="font-serif text-xl font-semibold tracking-tight">
              Behind the <span className="text-primary">Sauté</span>
            </span>
            <p className="mt-2 text-sm text-footer-foreground/70">
              © 2026 Behind the Sauté. All rights reserved.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-sm text-footer-foreground/70">Contact:</p>
            <a
              href="mailto:pmltechpile@gmail.com"
              className="text-sm text-footer-foreground transition-colors hover:text-primary"
            >
              pmltechpile@gmail.com
            </a>
            <a
              href={DEMO_STOREFRONT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-footer-foreground/70 transition-colors hover:text-primary"
            >
              Demo chef storefront
            </a>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-8 text-center text-xs text-footer-foreground/50">
          Booking details and payments in one place for private chefs.
        </p>
        <nav
          aria-label="Legal"
          className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-footer-foreground/60"
        >
          {legalNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
