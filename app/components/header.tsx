"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { openCalendlyPopup } from "~/components/calendly-badge";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Behind the <span className="text-primary">Sauté</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            onClick={openCalendlyPopup}
            className="bg-primary text-primary-foreground hover:bg-accent-hover"
          >
            Book a Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setIsOpen(false);
                openCalendlyPopup();
              }}
              className="mt-2 w-full bg-primary text-primary-foreground hover:bg-accent-hover"
            >
              Book a Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
