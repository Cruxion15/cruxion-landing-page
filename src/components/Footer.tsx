"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "./AnimationUtils";

const links = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export default function Footer() {
  return (
    <RevealOnScroll>
      <footer className="border-t border-border-subtle" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {/* Logo */}
            <div className="flex justify-center sm:justify-start">
              <motion.div
                className="flex items-center gap-0 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg font-bold tracking-tight text-text-primary">Crux</span>
                <span className="text-lg font-bold tracking-tight text-primary-blue">ion</span>
              </motion.div>
            </div>

            {/* Links */}
            <nav
              className="flex flex-col items-center gap-4 sm:gap-6"
              aria-label="Footer navigation"
            >
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-tertiary transition-colors duration-300 hover:text-primary-blue"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Copyright */}
            <div className="flex justify-center sm:justify-end">
              <p className="text-sm text-text-tertiary">© 2026 Cruxion. All rights reserved.</p>
            </div>
          </div>

          {/* Bottom divider & tagline */}
          <div className="mt-12 border-t border-border-subtle/40 pt-8 text-center">
            <p className="text-xs text-text-tertiary">Made in Bengaluru</p>
          </div>
        </div>
      </footer>
    </RevealOnScroll>
  );
}
