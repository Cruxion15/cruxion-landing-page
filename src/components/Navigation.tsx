"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "For Faculty", href: "#faculty" },
  { label: "For Students", href: "#students" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Curriculum", href: "#curriculum" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-surface-bg/80 backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" aria-label="Cruxion home">
            <img src="/icon.svg" alt="Cruxion icon" className="h-7 w-7 rounded-md" />
            <span className="text-xl font-bold tracking-tight text-text-primary">
              Crux
            </span>
            <span className="-ml-[0.35rem] text-xl font-bold tracking-tight text-primary-blue">
              ion
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://app.cruxion.in/login"
              className="inline-flex items-center rounded-lg border border-border-subtle px-4 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-primary-blue/40 hover:text-text-primary"
              aria-label="Sign in to your account"
            >
              Sign in
            </a>
            <a
              href="#cta"
              className="inline-flex items-center rounded-lg bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-blue/90 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              aria-label="Request a pilot program"
            >
              Request pilot
              <span className="ml-1" aria-hidden="true">&rarr;</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border-subtle bg-surface-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface-card hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://app.cruxion.in/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-lg border border-border-subtle px-5 py-3 text-sm font-medium text-text-secondary"
                aria-label="Sign in to your account"
              >
                Sign in
              </a>
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-lg bg-primary-blue px-5 py-3 text-sm font-semibold text-white"
                aria-label="Request a pilot program"
              >
                Request pilot &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
