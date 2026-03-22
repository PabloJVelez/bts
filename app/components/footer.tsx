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
              © 2025 Behind the Sauté. All rights reserved.
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
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-8 text-center text-xs text-footer-foreground/50">
          Built with love for private chefs everywhere.
        </p>
      </div>
    </footer>
  );
}
