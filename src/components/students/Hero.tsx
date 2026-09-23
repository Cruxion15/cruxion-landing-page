"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Crux, type Pose } from "./Crux";
import { CTA, DISPLAY, EASE, SplitWords, Typewriter, cx } from "./ui";

const WHO = [
  {
    id: "student",
    label: "I'm a student",
    pitch: "Placements are coming. Learn the patterns interviewers actually test, and prove you understand them instead of memorising them.",
    crux: "Hi, I'm Crux. Placement season? Let me show you how we'll get you ready.",
  },
  {
    id: "pro",
    label: "I'm a working engineer",
    pitch: "You ship code every day. Sharpen the fundamentals, get fluent with LLMs, and be ready when the next role opens up. Most lessons take under twenty minutes.",
    crux: "Hi, I'm Crux. Busy week? One short lesson at a time. I'll keep your place.",
  },
  {
    id: "ai",
    label: "I'm moving into AI",
    pitch: "Tokens, embeddings, RAG, fine-tuning, evals, serving. Learn how LLM systems really work, with a live demo for every idea.",
    crux: "Hi, I'm Crux. Moving into AI? Start from the token and work up. I'll show you.",
  },
];

const POKE: Pose[] = ["wave", "cheer", "laptop", "pencil", "mug"];

export default function Hero() {
  const [who, setWho] = useState(0);
  const [pose, setPose] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cruxY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cruxScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="tour" data-stop="tour" className="relative isolate px-4 pb-20 pt-28 sm:px-6 md:min-h-[100dvh] md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-text-tertiary ring-1 ring-white/10"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-amber" /> For students and working engineers
          </motion.p>

          <SplitWords
            as="h1"
            text="Stop watching tutorials. *Start* *getting* *good.*"
            accent="text-accent-amber"
            delay={0.15}
            className={`${DISPLAY} mt-5 text-[clamp(2.6rem,6.4vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]`}
          />

          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Who are you?">
            {WHO.map((w, i) => (
              <button
                key={w.id}
                type="button"
                role="tab"
                aria-selected={who === i}
                onClick={() => { setWho(i); setPose((p) => (p + 1) % POKE.length); }}
                className={cx("relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300", who === i ? "text-surface-bg" : "text-text-tertiary ring-1 ring-white/10 hover:text-text-primary")}
              >
                {who === i && <motion.span layoutId="who" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{w.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 min-h-[88px] max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={who}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="text-lg leading-relaxed text-text-secondary"
              >
                {WHO[who].pitch}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-5"
          >
            <CTA size="lg">Get started free</CTA>
            <a href="#learn" className="group inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary">
              Or take the tour with Crux
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }} aria-hidden="true">↓</motion.span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-8 max-w-md text-[13px] leading-relaxed text-text-tertiary"
          >
            Here through your college? Tap <span className="font-semibold text-text-secondary">For colleges</span> at the top to get back to Cruxion for your college.
          </motion.p>
        </motion.div>

        {/* Crux, big, with its line typing out and a few live cards orbiting. */}
        <motion.div style={{ y: cruxY, scale: cruxScale }} className="relative mx-auto aspect-square w-full max-w-[460px]">
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-dashed border-white/10"
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button type="button" onClick={() => setPose((p) => (p + 1) % POKE.length)} aria-label="Poke Crux" className="cursor-pointer">
              <Crux pose={POKE[pose]} mood="happy" level={3} size={300} className="h-56 w-56 sm:h-[300px] sm:w-[300px]" />
            </button>
          </motion.div>

          <div className="absolute -top-2 left-0 right-6 sm:left-4">
            <div className="relative rounded-2xl rounded-bl-sm bg-surface-card/95 px-4 py-3 text-[14px] leading-snug text-text-primary shadow-[0_20px_60px_-25px_rgba(59,130,246,0.6)] ring-1 ring-white/10">
              <Typewriter key={who} text={WHO[who].crux} />
            </div>
          </div>

          <Float className="bottom-16 -left-2 sm:-left-6" delay={0.9} dur={5}>
            <span className="text-amber-300">●</span> 6 day streak
          </Float>
          <Float className="bottom-2 right-0" delay={1.1} dur={6}>
            <span className="text-accent-amber">✓</span> Two Sum mastered
          </Float>
          <Float className="right-[-4px] top-1/2" delay={1.3} dur={7}>
            <span className="text-primary-light">◆</span> LLMs: lesson 3 of 27
          </Float>
        </motion.div>
      </div>
    </section>
  );
}

function Float({ children, className, delay, dur }: { children: React.ReactNode; className: string; delay: number; dur: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, scale: { delay, duration: 0.6 }, y: { delay, duration: dur, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-10 whitespace-nowrap rounded-full bg-surface-card/90 px-3.5 py-2 text-[13px] font-medium text-text-secondary shadow-[0_16px_40px_-18px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  );
}
