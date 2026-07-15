"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "./AnimationUtils";

const links = [
  { label: "FAQ", href: "/faq" },
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
            <div className="flex flex-col items-center gap-4 sm:items-start">
              <motion.div
                className="flex items-center gap-0 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg font-bold tracking-tight text-text-primary">Crux</span>
                <span className="text-lg font-bold tracking-tight text-primary-blue">ion</span>
              </motion.div>
              <motion.a
                href="https://www.linkedin.com/company/cruxion/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cruxion on LinkedIn"
                className="text-text-tertiary transition-colors duration-300 hover:text-primary-blue"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </motion.a>
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
