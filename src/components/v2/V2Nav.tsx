"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function V2Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-surface-bg/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Crux<span className="text-primary-blue">ion</span>
        </Link>
        <div className="flex items-center gap-5 text-xs">
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
      </div>
    </motion.header>
  );
}
