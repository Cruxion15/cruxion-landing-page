"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { Crux } from "./Crux";
import { STOPS } from "./tour";
import { CTA, DISPLAY, EASE, Typewriter, cx } from "./ui";

/**
 * Page chrome for the tour: a quiet nav (logo left; "For colleges" and the
 * sign-up on the right), a thin progress line, and Crux walking the visitor through
 * each stop. Sections mark themselves with data-stop (a STOPS id, or
 * "tour"/"finale", which have their own big Crux and hide the guide).
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>("tour");
  const [open, setOpen] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.stop!);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-stop]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Crux speaks up at each new stop, then tucks the bubble away so it never
  // sits on top of the content; hovering Crux brings it back.
  useEffect(() => {
    setOpen(true);
    const t = setTimeout(() => setOpen(false), 7000);
    return () => clearTimeout(t);
  }, [active]);

  const i = STOPS.findIndex((s) => s.id === active);
  const stop = i >= 0 ? STOPS[i] : null;
  const next = i >= 0 ? STOPS[i + 1]?.id ?? "finale" : "learn";

  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-[-20%] h-[42rem] w-[42rem] rounded-full bg-primary-blue/[0.12] blur-[140px]" />
        <div className="absolute -right-40 bottom-[-15%] h-[34rem] w-[34rem] rounded-full bg-accent-amber/[0.06] blur-[140px]" />
      </div>

      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent-amber" />

      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="fixed inset-x-3 top-4 z-40 mx-auto flex max-w-7xl items-center justify-between rounded-full bg-surface-bg/70 py-1.5 pl-5 pr-1.5 ring-1 ring-white/10 backdrop-blur-xl sm:inset-x-6 sm:top-5"
        aria-label="Main"
      >
        <a href="#tour" className={`${DISPLAY} text-lg font-bold tracking-tight`}>
          Crux<span className="text-primary-blue">ion</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-3">
          <Link href="/verify" className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:block">
            Verify a certificate
          </Link>
          <Link href="/college" className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            For colleges
          </Link>
          <CTA>Get started</CTA>
        </div>
      </motion.nav>

      {children}

      {/* Crux, the tour guide. */}
      <div className="pointer-events-none fixed bottom-3 right-3 z-30 flex items-end gap-2 sm:bottom-6 sm:right-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {stop && (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-end gap-2"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, x: 16, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 16, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="pointer-events-auto mb-8 hidden w-[260px] rounded-2xl rounded-br-sm bg-surface-card/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 backdrop-blur-xl sm:block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                        Stop {i + 1} of {STOPS.length}
                      </span>
                      <span className="flex gap-1">
                        {STOPS.map((s, j) => (
                          <span key={s.id} className={cx("h-1 rounded-full transition-all duration-500", j === i ? "w-4 bg-accent-amber" : j < i ? "w-1.5 bg-white/40" : "w-1.5 bg-white/10")} />
                        ))}
                      </span>
                    </div>
                    <Typewriter text={stop.line} className="mt-2 block min-h-[3.8em] text-[13px] leading-snug text-text-secondary" />
                    <a href={`#${next}`} className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent-amber transition-transform hover:translate-x-0.5">
                      {next === "finale" ? "Finish the tour" : `Next: ${STOPS[i + 1].label}`} <span aria-hidden="true">→</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="pointer-events-auto mb-2 rounded-full bg-surface-card/95 px-2.5 py-1 text-[11px] font-semibold text-text-secondary ring-1 ring-white/10 sm:hidden">
                {i + 1}/{STOPS.length} · {stop.label}
              </span>
              <motion.a href={`#${next}`} aria-label="Next stop" whileHover={{ y: -6, rotate: -4 }} whileTap={{ scale: 0.9 }} className="pointer-events-auto block">
                <Crux pose={stop.pose} mood="happy" size={96} className="h-16 w-16 drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)] sm:h-24 sm:w-24" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
