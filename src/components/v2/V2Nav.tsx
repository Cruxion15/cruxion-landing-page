"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function V2Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-surface-bg/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Crux<span className="text-primary-blue">ion</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 text-xs sm:flex">
          <Link
            href="/team"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            Team
          </Link>
          <Link
            href="/verify"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            Verify a certificate
          </Link>
          <a
            href="https://app.cruxion.in"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-surface-bg transition-transform hover:scale-[1.02]"
          >
            Request a pilot
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-9 w-9 items-center justify-center sm:hidden"
        >
          <span className="relative block h-4 w-5">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 h-[1.5px] w-5 origin-center bg-text-primary"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 bg-text-primary"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 h-[1.5px] w-5 origin-center bg-text-primary"
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border-subtle bg-surface-bg/95 backdrop-blur-xl sm:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              <Link
                href="/team"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-card hover:text-text-primary"
              >
                Team
              </Link>
              <Link
                href="/verify"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-card hover:text-text-primary"
              >
                Verify a certificate
              </Link>
              <a
                href="https://app.cruxion.in"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-card hover:text-text-primary"
              >
                Sign in
              </a>
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-surface-bg transition-transform hover:scale-[1.02]"
              >
                Request a pilot
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
