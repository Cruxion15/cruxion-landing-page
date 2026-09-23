"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { GET_STARTED_URL } from "@/lib/appLinks";

/** Skips the login page — straight to Google, enrolled as a free individual learner. */
export const SIGNUP_URL = GET_STARTED_URL;
export const EASE = [0.32, 0.72, 0, 1] as const;
/** The page's display face (Bricolage Grotesque), loaded in app/students/page.tsx. */
export const DISPLAY = "font-[family-name:var(--font-display)]";

export function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Reveal({ children, delay = 0, className, y = 48 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Words rise out of a mask one after another when the line scrolls into view.
 * Wrap a word in *asterisks* to paint it with `accent`.
 */
export function SplitWords({ text, className, accent = "text-accent-amber", delay = 0, as = "span" }: {
  text: string; className?: string; accent?: string; delay?: number; as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((raw, i) => {
        const hot = raw.startsWith("*") && raw.replace(/[.,!?]$/, "").endsWith("*");
        const word = hot ? raw.replace(/\*/g, "") : raw;
        return (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={cx("inline-block", hot && accent)}
                variants={{
                  hidden: { y: "110%", rotate: 5, opacity: 0 },
                  shown: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}

/** Crux's voice: the line types itself out once it's on screen. */
export function Typewriter({ text, className, speed = 22 }: { text: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced) { setN(text.length); return; }
    setN(0);
    const t = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(t), v) : v + 1)), speed);
    return () => clearInterval(t);
  }, [text, seen, reduced, speed]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {n < text.length && <span aria-hidden="true" className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current" />}
    </span>
  );
}

/**
 * Scroll-scrubbed text: each word lights up as the line travels up the screen,
 * and dims again if you scroll back, like scrubbing a video. *Asterisked*
 * words take the accent.
 */
export function ScrollWords({ text, className, accent = "text-accent-amber", as = "p", dim = 0.12 }: {
  text: string; className?: string; accent?: string; as?: "p" | "h2" | "h3"; dim?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.42"] });
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag ref={ref as never} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((raw, i) => {
        const hot = raw.startsWith("*") && raw.replace(/[.,!?]$/, "").endsWith("*");
        return (
          <span key={i} aria-hidden="true">
            <ScrubWord p={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} dim={dim} className={hot ? accent : undefined}>
              {hot ? raw.replace(/\*/g, "") : raw}
            </ScrubWord>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}

function ScrubWord({ p, from, to, dim, className, children }: { p: MotionValue<number>; from: number; to: number; dim: number; className?: string; children: ReactNode }) {
  const opacity = useTransform(p, [from, to], [dim, 1]);
  const y = useTransform(p, [from, to], [10, 0]);
  return <motion.span style={{ opacity, y }} className={cx("inline-block", className)}>{children}</motion.span>;
}

/**
 * A scene in the reel: it rises and settles as it arrives, then eases back as
 * the next one takes over, so scrolling reads like continuous footage.
 */
export function Scene({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [0.94, 1, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.88, 1], [0.15, 1, 1, 0.35]);
  const y = useTransform(scrollYProgress, [0, 0.22], [70, 0]);
  if (reduced) return <div>{children}</div>;
  return <motion.div ref={ref} style={{ scale, opacity, y }} className="origin-top">{children}</motion.div>;
}

/** Each tour stop opens with its number drifting in, a quiet label, and a scroll-scrubbed headline. */
export function StopHead({ n, label, title, sub }: { n: number; label: string; title: string; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numX = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  return (
    <div ref={ref} className="relative">
      <motion.span
        aria-hidden="true"
        style={{ x: numX, WebkitTextStroke: "1px rgba(255,255,255,0.09)" }}
        className={`${DISPLAY} pointer-events-none absolute -left-2 -top-10 select-none text-[7rem] font-extrabold leading-none text-transparent sm:-top-16 sm:text-[11rem]`}
      >
        0{n}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-text-tertiary"
      >
        <span className="h-px w-8 bg-accent-amber" />
        Stop {n} · {label}
      </motion.span>
      <ScrollWords
        as="h2"
        text={title}
        className={`${DISPLAY} relative mt-4 max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.03em]`}
      />
      {sub && <ScrollWords text={sub} dim={0.2} className="relative mt-5 max-w-2xl text-[17px] leading-relaxed text-text-secondary" />}
    </div>
  );
}

/** Double-Bezel: an outer tray with a hairline, an inner core with its own top highlight. */
export function Bezel({ children, className, core }: { children: ReactNode; className?: string; core?: string }) {
  return (
    <div className={cx("rounded-[2rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10", className)}>
      <div className={cx("h-full rounded-[calc(2rem-0.375rem)] bg-surface-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]", core)}>{children}</div>
    </div>
  );
}

/** Pill CTA with a nested arrow and a light magnetic pull toward the cursor. */
export function CTA({ children, className, size = "md" }: { children: ReactNode; className?: string; size?: "md" | "lg" }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  return (
    <motion.a
      href={SIGNUP_URL}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.18);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      className={cx(
        "group inline-flex items-center gap-3 rounded-full bg-accent-amber font-semibold text-[#1a0d00] shadow-[0_18px_50px_-18px_rgba(245,158,11,0.7)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]",
        size === "lg" ? "py-2 pl-7 pr-2 text-base" : "py-1.5 pl-5 pr-1.5 text-sm",
        className,
      )}
    >
      {children}
      <span className={cx("flex items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105", size === "lg" ? "h-11 w-11" : "h-8 w-8")}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </motion.a>
  );
}
