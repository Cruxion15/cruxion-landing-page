"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Crux, type Pose } from "./Crux";
import { CTA, DISPLAY, EASE, JOIN_URL, Reveal, ScrollWords, SplitWords, Typewriter, WAITLIST_URL, WaitlistLink, cx } from "./ui";

/*
 * The learner pricing page. Crux walks the visitor through it: a two-question
 * plan finder, the plans with a length switch, a feature theatre that shows
 * what each Pro tool does, the full table, and questions answered in Crux's voice.
 * Prices and entitlements follow docs/b2c/PLANS_TOUR_AND_1500_DAU.md (monorepo), sections 1 and 3.
 */

type Len = 0 | 1 | 2 | 3;
const LENGTHS: { label: string; months: number; price: number; tag?: string; crux: string }[] = [
  { label: "1 month", months: 1, price: 299, crux: "One month is a sprint. Good if your interview already has a date." },
  { label: "3 months", months: 3, price: 799, crux: "Three months is enough to take a pattern from shaky to solid." },
  { label: "6 months", months: 6, price: 1499, tag: "Placement season", crux: "Six months covers a whole placement season, from first test to final offer." },
  { label: "12 months", months: 12, price: 1999, tag: "Best value", crux: "A full year for the price of about seven months. Under ₹170 a month." },
];

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/** A number that counts to its new value instead of jumping. */
function Count({ to, className }: { to: number; className?: string }) {
  const v = useMotionValue(to);
  const text = useTransform(v, inr);
  useEffect(() => {
    const c = animate(v, to, { duration: 0.7, ease: EASE });
    return c.stop;
  }, [to, v]);
  return <motion.span className={className}>{text}</motion.span>;
}

/** Crux with a speech bubble; the line retypes whenever it changes. */
function Says({ line, pose = "wave", size = 88, className }: { line: string; pose?: Pose; size?: number; className?: string }) {
  return (
    <div className={cx("flex items-end gap-3", className)}>
      <motion.div key={pose} initial={{ scale: 0.8, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} className="shrink-0">
        <Crux pose={pose} mood="happy" size={size} className="drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]" />
      </motion.div>
      <div className="mb-3 rounded-2xl rounded-bl-sm bg-surface-card/95 px-4 py-3 text-[14px] leading-snug text-text-secondary ring-1 ring-white/10">
        <Typewriter key={line} text={line} speed={16} />
      </div>
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative px-4 pb-10 pt-32 sm:px-6 md:pt-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.7 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 12 }}>
          <Crux pose="wave" mood="happy" level={2} size={150} />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-text-tertiary ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-amber" /> Pricing
        </motion.p>
        <SplitWords
          as="h1"
          text="Learning is free. *Proving* *you're* *ready* is Pro."
          delay={0.25}
          className={`${DISPLAY} mt-5 text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[1] tracking-[-0.04em]`}
        />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-6 max-w-2xl text-lg text-text-secondary">
          Every lesson, every problem and every visual is free, and so am I. Pro adds the tools that tell you, honestly, whether you would pass the interview.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: EASE }} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#finder" className="rounded-full px-5 py-3 text-sm font-semibold text-text-primary ring-1 ring-white/15 transition-colors hover:bg-white/5">
            Help me choose
          </a>
          <a href="#plans" className="text-sm font-semibold text-text-tertiary transition-colors hover:text-text-primary">
            Just show me the prices <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Plan finder ───────────────────────── */

const GOALS = [
  { id: "explore", label: "Just exploring", crux: "Then start free. Nothing is locked while you find your feet." },
  { id: "placements", label: "Placements or a job switch", crux: "Good. One more question so I can size this right." },
  { id: "ai", label: "Going deep into AI", crux: "Nice. How long do you want to stay on it?" },
] as const;

const WHEN = [
  { label: "Within a month", len: 0 as Len },
  { label: "In 1 to 3 months", len: 1 as Len },
  { label: "In 3 to 6 months", len: 2 as Len },
  { label: "No fixed date, I'm in for the year", len: 3 as Len },
];

function Finder({ onPick }: { onPick: (len: Len | "free") => void }) {
  const [goal, setGoal] = useState<(typeof GOALS)[number]["id"] | null>(null);
  const [when, setWhen] = useState<number | null>(null);

  const result: Len | "free" | null = goal === "explore" ? "free" : when !== null ? WHEN[when].len : null;
  const line =
    result === "free" ? GOALS[0].crux
    : result !== null ? `My pick: Pro for ${LENGTHS[result].label}. ${LENGTHS[result].crux}`
    : goal ? GOALS.find((g) => g.id === goal)!.crux
    : "Tell me two things and I'll pick the plan for you. No sign-up needed for this bit.";

  return (
    <section id="finder" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10">
        <div className="rounded-[calc(2rem-0.375rem)] bg-surface-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] sm:p-10">
          <Says line={line} pose={result === null ? (goal ? "pencil" : "wave") : "cheer"} />

          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">1. What brings you here?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <Chip key={g.id} group="goal" on={goal === g.id} onClick={() => { setGoal(g.id); setWhen(null); }}>{g.label}</Chip>
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {goal && goal !== "explore" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                  2. {goal === "ai" ? "How long do you want to go deep?" : "When is your first interview or drive?"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WHEN.map((w, i) => <Chip key={w.label} group="when" on={when === i} onClick={() => setWhen(i)}>{w.label}</Chip>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result !== null && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <button type="button" onClick={() => onPick(result)} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-surface-bg transition-transform active:scale-[0.97]">
                  {result === "free" ? "Show me the free plan" : `Show me Pro, ${LENGTHS[result].label}`}
                </button>
                <span className="text-sm text-text-tertiary">
                  {result === "free" ? "₹0, forever." : `${inr(LENGTHS[result].price)} once, GST included.`}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Chip({ on, onClick, group, children }: { on: boolean; onClick: () => void; group: string; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on}
      className={cx("relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300", on ? "text-surface-bg" : "text-text-tertiary ring-1 ring-white/10 hover:text-text-primary")}>
      {on && <motion.span layoutId={group} className="absolute inset-0 rounded-full bg-accent-amber" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
      <span className="relative">{children}</span>
    </button>
  );
}

/* ───────────────────────── Plans ───────────────────────── */

const FREE = [
  "Every DSA lesson, problem and visual",
  "Guided stages: Frame, Observe, Predict, Control",
  "Write and run code, 60 runs a day",
  "Defend questions, graded by rubric",
  "Crux, streaks, XP and your mastery map",
  "Mixed review and recall practice",
  "Notes, and the list of mistakes you repeat",
  "The AI engineering track, with 5,000 AI tokens a day",
];
const PRO = [
  "Everything in Free, with 300 runs a day",
  "Your explanations graded by AI, line by line",
  "Timed mock interview rounds with a report card",
  "Interview readiness for every pattern",
  "Cheat-sheets for each pattern",
  "Your mistake report, plus sessions that fix them",
  "Export your notebook as a PDF",
  "20,000 AI tokens a day",
];

function Plans({ len, setLen, highlight }: { len: Len; setLen: (l: Len) => void; highlight: "free" | "pro" | null }) {
  const L = LENGTHS[len];
  return (
    <section id="plans" className="scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollWords as="h2" text="Two plans. *Same* *Crux.*" className={`${DISPLAY} text-center text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.03em]`} />
        <Reveal y={16}>
          <p className="mx-auto mt-4 max-w-xl text-center text-text-secondary">Pro plans all unlock the same things. You only choose how long.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Free */}
          <Reveal>
            <Card glow={highlight === "free"}>
              <div className="flex items-center justify-between">
                <h3 className={`${DISPLAY} text-2xl font-bold`}>Free</h3>
                <Crux pose="laptop" mood="happy" size={56} />
              </div>
              <p className="mt-1 text-sm text-text-tertiary">For learning anything on Cruxion.</p>
              <p className={`${DISPLAY} mt-6 text-5xl font-extrabold tracking-tight`}>₹0</p>
              <p className="mt-1 text-sm text-text-tertiary">Forever. Sign in with Google, no card.</p>
              <List items={FREE} tone="blue" />
              <div className="mt-8"><CTA>Start free</CTA></div>
            </Card>
          </Reveal>

          {/* Pro */}
          <Reveal delay={0.12}>
            <Card glow={highlight === "pro"} pro>
              <div className="flex items-center justify-between">
                <h3 className={`${DISPLAY} text-2xl font-bold`}>Pro</h3>
                <Crux pose="cheer" mood="celebrate" level={3} size={56} />
              </div>
              <p className="mt-1 text-sm text-text-tertiary">For the stretch before an interview.</p>

              <div role="radiogroup" aria-label="Plan length" className="mt-6 grid grid-cols-2 gap-1 rounded-2xl bg-black/30 p-1 ring-1 ring-white/10 sm:grid-cols-4">
                {LENGTHS.map((l, i) => (
                  <button key={l.label} type="button" role="radio" aria-checked={len === i} onClick={() => setLen(i as Len)}
                    className={cx("relative rounded-xl px-2 py-2 text-sm font-medium transition-colors", len === i ? "text-surface-bg" : "text-text-tertiary hover:text-text-primary")}>
                    {len === i && <motion.span layoutId="len" className="absolute inset-0 rounded-xl bg-accent-amber" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                    <span className="relative">{l.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1">
                <Count to={L.price} className={`${DISPLAY} text-5xl font-extrabold tracking-tight`} />
                <span className="pb-1.5 text-sm text-text-tertiary">
                  once · <Count to={L.price / L.months} />/month · GST included
                </span>
                <AnimatePresence mode="wait">
                  {L.tag && (
                    <motion.span key={L.tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-2 rounded-full bg-accent-amber/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-amber ring-1 ring-accent-amber/30">
                      {L.tag}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-2 text-sm text-text-tertiary">No auto-renew. Pro is invite-only for now, so these prices apply once it opens to everyone. Until then, an invite code unlocks it.</p>

              <Says line={L.crux} pose={len === 3 ? "cheer" : len === 2 ? "pencil" : "mug"} size={56} className="mt-6" />

              <List items={PRO} tone="amber" />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTA href={WAITLIST_URL}>Join the Pro waitlist</CTA>
                <span className="text-xs text-text-tertiary">
                  Pro is invite-only right now. We open it a few people at a time. Have a code?{" "}
                  <a href={JOIN_URL} className="font-semibold text-accent-amber hover:underline">Use it here</a>
                </span>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({ children, glow, pro }: { children: ReactNode; glow?: boolean; pro?: boolean }) {
  return (
    <motion.div
      animate={glow ? { boxShadow: ["0 0 0 0 rgba(245,158,11,0)", "0 0 0 6px rgba(245,158,11,0.35)", "0 0 0 0 rgba(245,158,11,0)"] } : undefined}
      transition={{ duration: 1.6 }}
      className={cx("h-full rounded-[2rem] p-1.5 ring-1", pro ? "bg-gradient-to-b from-accent-amber/25 to-white/[0.03] ring-accent-amber/30" : "bg-white/[0.04] ring-white/10")}
    >
      <div className="h-full rounded-[calc(2rem-0.375rem)] bg-surface-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] sm:p-8">{children}</div>
    </motion.div>
  );
}

function List({ items, tone }: { items: string[]; tone: "blue" | "amber" }) {
  return (
    <motion.ul initial="off" whileInView="on" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }} className="mt-7 space-y-3">
      {items.map((t) => (
        <motion.li key={t} variants={{ off: { opacity: 0, x: -10 }, on: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }} className="flex gap-3 text-[15px] text-text-secondary">
          <svg className={cx("mt-1 h-4 w-4 shrink-0", tone === "amber" ? "text-accent-amber" : "text-primary-light")} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* ───────────────────────── Feature theatre ───────────────────────── */

const SHOWS: { id: string; title: string; pose: Pose; crux: string; body: string; demo: ReactNode }[] = [
  {
    id: "defend", title: "AI-graded explanations", pose: "pencil",
    crux: "Anyone can get code to pass. I check whether you can explain why it works.",
    body: "After you solve a problem, you explain your approach in your own words. On Free a rubric checks it. On Pro the AI reads every line and tells you exactly which part of your reasoning is missing.",
    demo: <DefendDemo />,
  },
  {
    id: "mock", title: "Mock interview rounds", pose: "laptop",
    crux: "Timed, no pasting, no hints. Just like the real thing, but I'm on your side.",
    body: "A problem you have not seen, a clock, and paste turned off. At the end you get a report card: correctness, speed, and how well you explained it.",
    demo: <MockDemo />,
  },
  {
    id: "ready", title: "Readiness and cheat-sheets", pose: "cheer",
    crux: "I'll tell you which patterns are interview-ready and which ones would fall over.",
    body: "Free shows your overall score. Pro breaks it down pattern by pattern, and gives you a one-page cheat-sheet for each pattern to revise the night before.",
    demo: <ReadyDemo />,
  },
  {
    id: "mistakes", title: "Mistake report and fixes", pose: "mug",
    crux: "You keep making the same few mistakes. Everyone does. Let's fix those, not everything.",
    body: "Your mistake report groups everything you got wrong by type. One tap starts a short session built only from the mistakes you keep repeating.",
    demo: <MistakeDemo />,
  },
  {
    id: "notebook", title: "Notebook PDF", pose: "wave",
    crux: "All your notes, one clean PDF. Revise on the bus.",
    body: "Everything you wrote while learning, exported as a single PDF you can print or keep on your phone.",
    demo: <NotebookDemo />,
  },
];

function Theatre() {
  const [i, setI] = useState(0);
  const s = SHOWS[i];
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollWords as="h2" text="What Pro *actually* gives you." className={`${DISPLAY} text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.03em]`} />
        <Reveal y={16}><p className="mt-4 max-w-2xl text-text-secondary">Tap each one. I&apos;ll show you what it looks like inside.</p></Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div role="tablist" aria-label="Pro features" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {SHOWS.map((x, j) => (
              <button key={x.id} type="button" role="tab" aria-selected={i === j} onClick={() => setI(j)}
                className={cx("relative shrink-0 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors lg:py-4 lg:text-base", i === j ? "text-text-primary" : "text-text-tertiary hover:text-text-primary")}>
                {i === j && <motion.span layoutId="show" className="absolute inset-0 rounded-2xl bg-white/[0.06] ring-1 ring-accent-amber/40" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative flex items-center gap-3">
                  <span className={cx("h-2 w-2 rounded-full transition-colors", i === j ? "bg-accent-amber" : "bg-white/20")} />
                  {x.title}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10">
            <div className="min-h-[460px] rounded-[calc(2rem-0.375rem)] bg-surface-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE }}>
                  <div className="rounded-2xl bg-black/30 p-5 ring-1 ring-white/10">{s.demo}</div>
                  <p className="mt-6 text-[15px] leading-relaxed text-text-secondary">{s.body}</p>
                  <Says line={s.crux} pose={s.pose} size={56} className="mt-5" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const stagger = (d = 0.35) => ({ initial: "off", animate: "on", transition: { staggerChildren: d } }) as const;
const pop = { off: { opacity: 0, y: 8 }, on: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };

function DefendDemo() {
  const rows = [
    { t: "Uses a hash map to store seen values", ok: true },
    { t: "Explains why lookup is O(1)", ok: true },
    { t: "Says what happens with duplicate values", ok: false },
  ];
  return (
    <div>
      <p className="font-mono text-[12px] text-text-tertiary">your explanation</p>
      <p className="mt-2 text-sm italic text-text-secondary">&ldquo;I store each number in a map, and for every new number I check if target minus it is already there…&rdquo;</p>
      <motion.ul {...stagger()} className="mt-4 space-y-2">
        {rows.map((r) => (
          <motion.li key={r.t} variants={pop} className="flex items-center gap-3 text-sm">
            <span className={cx("flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold", r.ok ? "bg-accent-green/20 text-accent-green" : "bg-accent-amber/20 text-accent-amber")}>{r.ok ? "✓" : "!"}</span>
            <span className={r.ok ? "text-text-secondary" : "text-text-primary"}>{r.t}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

function MockDemo() {
  const [s, setS] = useState(45 * 60);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const grades = [["Correct", 92], ["Speed", 74], ["Explanation", 81]] as const;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-semibold text-red-300 ring-1 ring-red-400/30">Paste off</span>
        <span className="font-mono text-2xl font-bold tabular-nums">{String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}</span>
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Report card</p>
      <div className="mt-3 space-y-3">
        {grades.map(([k, v], j) => (
          <div key={k}>
            <div className="flex justify-between text-sm"><span className="text-text-secondary">{k}</span><span className="font-mono">{v}</span></div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1, delay: 0.2 + j * 0.2, ease: EASE }} className="h-full rounded-full bg-accent-amber" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadyDemo() {
  const p = [["Two pointers", 88, true], ["Sliding window", 76, true], ["Binary search", 64, false], ["Graphs, BFS", 38, false]] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
      <div className="space-y-3">
        {p.map(([k, v, ok], j) => (
          <div key={k}>
            <div className="flex justify-between text-sm"><span className="text-text-secondary">{k}</span><span className={cx("text-xs font-semibold", ok ? "text-accent-green" : "text-accent-amber")}>{ok ? "Ready" : "Not yet"}</span></div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1, delay: j * 0.15, ease: EASE }} className={cx("h-full rounded-full", ok ? "bg-accent-green" : "bg-accent-amber")} />
            </div>
          </div>
        ))}
      </div>
      <motion.div initial={{ rotate: 6, opacity: 0, y: 20 }} animate={{ rotate: -2, opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 12 }}
        className="rounded-xl bg-[#f5efe1] p-3 font-mono text-[11px] leading-relaxed text-[#1a1a2e] shadow-xl">
        <p className="font-bold">Sliding window</p>
        <p className="mt-1">Signal: contiguous subarray + a limit</p>
        <p>Move right, shrink left while invalid</p>
        <p>Time O(n), space O(k)</p>
      </motion.div>
    </div>
  );
}

function MistakeDemo() {
  const m = [["Off-by-one at the boundary", 7], ["Forgot the empty input", 5], ["Wrong loop condition", 3]] as const;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">You keep making these</p>
      <div className="mt-3 space-y-3">
        {m.map(([k, v], j) => (
          <div key={k} className="flex items-center gap-3">
            <motion.span initial={{ width: 0 }} animate={{ width: v * 18 }} transition={{ duration: 0.8, delay: j * 0.15, ease: EASE }} className="h-6 shrink-0 rounded-md bg-accent-amber/70" />
            <span className="text-sm text-text-secondary">{k} <span className="font-mono text-text-tertiary">×{v}</span></span>
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}
        className="mt-5 inline-flex rounded-full bg-accent-amber px-4 py-2 text-sm font-semibold text-[#1a0d00]">
        Fix these in 10 minutes →
      </motion.div>
    </div>
  );
}

function NotebookDemo() {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <motion.div {...stagger(0.15)} className="relative h-40 w-32">
        {[0, 1, 2].map((k) => (
          <motion.div key={k} variants={{ off: { opacity: 0, y: 30, rotate: 0 }, on: { opacity: 1, y: 0, rotate: (k - 1) * 6, transition: { type: "spring", stiffness: 140, damping: 14 } } }}
            className="absolute inset-0 rounded-lg bg-white p-3 shadow-xl" style={{ zIndex: k }}>
            <div className="h-2 w-16 rounded bg-slate-300" />
            {[0, 1, 2, 3, 4].map((r) => <div key={r} className="mt-2 h-1.5 rounded bg-slate-200" style={{ width: `${90 - r * 12}%` }} />)}
          </motion.div>
        ))}
      </motion.div>
      <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="text-3xl text-accent-amber" aria-hidden="true">→</motion.span>
      <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 12 }}
        className="flex h-24 w-20 flex-col items-center justify-center rounded-lg bg-red-500/90 font-bold text-white shadow-xl">
        PDF
        <span className="mt-1 text-[10px] font-medium opacity-80">42 pages</span>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Full table ───────────────────────── */

const TABLE: [string, string, string][] = [
  ["All DSA lessons, problems and visuals", "✓", "✓"],
  ["Guided stages and hints", "✓", "✓"],
  ["Code runs a day", "60", "300"],
  ["Submits a day", "20", "100"],
  ["Defend questions", "✓", "✓"],
  ["Explanation grading", "Rubric", "AI, line by line"],
  ["Crux, streaks, XP, mastery map", "✓", "✓"],
  ["Mixed review and recall", "✓", "✓"],
  ["Targeted mistake fixes", "", "✓"],
  ["Mistake report", "", "✓"],
  ["Mock interview rounds", "", "5 a day"],
  ["Readiness per pattern", "Overall score", "Every pattern"],
  ["Cheat-sheets", "", "✓"],
  ["Notes", "✓", "✓"],
  ["Notebook PDF export", "", "✓"],
  ["AI engineering track lessons", "✓", "✓"],
  ["AI hints and tutor, tokens a day", "5,000", "20,000"],
];

/** "✓" = included, "" = not on Free (shown as a lock with words, never a bare mark), anything else = the value. */
function Cell({ v, pro }: { v: string; pro?: boolean }) {
  if (v === "✓") {
    return (
      <span className={cx("inline-flex items-center gap-2", pro ? "text-accent-amber" : "text-primary-light")}>
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="text-text-secondary">Included</span>
      </span>
    );
  }
  if (!v) {
    return (
      <span className="inline-flex items-center gap-2 text-text-tertiary/70">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" /></svg>
        Pro only
      </span>
    );
  }
  return <>{v}</>;
}

function Table() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollWords as="h2" text="Everything, *side* *by* *side.*" className={`${DISPLAY} text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.03em]`} />
        <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
              <tr><th className="px-4 py-3 font-semibold sm:px-6">Feature</th><th className="px-3 py-3 font-semibold">Free</th><th className="px-3 py-3 font-semibold text-accent-amber">Pro</th></tr>
            </thead>
            <motion.tbody initial="off" whileInView="on" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.035 }}>
              {TABLE.map(([f, a, b]) => (
                <motion.tr key={f} variants={{ off: { opacity: 0, x: -12 }, on: { opacity: 1, x: 0 } }} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3 text-text-secondary sm:px-6">{f}</td>
                  <td className="px-3 py-3 text-text-tertiary"><Cell v={a} /></td>
                  <td className="px-3 py-3 font-medium text-text-primary"><Cell v={b} pro /></td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Questions ───────────────────────── */

const FAQ = [
  { q: "How do I get Pro?", a: "Pro is invite-only right now. Join the waitlist and we open it a few people at a time, in the order of the line. Your personal code arrives by email. Everything on Free is open to you while you wait." },
  { q: "Do I need a card to start?", a: "No. Sign in with Google and you're on Free straight away. Pro is invite-only for now, and an invite code costs nothing." },
  { q: "What happens when my Pro time ends?", a: "You go back to Free and nothing is deleted. Your notes, mistakes, mastery, streak and past mock reports all stay. Only the Pro tools lock again." },
  { q: "Will it charge me again automatically?", a: "No. Nothing renews by itself. An invite code gives Pro for a fixed length, and when paid plans open each one will be a one-time payment for a fixed length." },
  { q: "Is GST included?", a: "Yes. When paid plans open, the price you see is the price you pay, and you get a GST invoice. While Pro is invite-only there is nothing to pay." },
  { q: "What are the daily limits for?", a: "They keep things fast for everyone. A normal study day uses 10 to 20 runs. If you ever hit a limit, your work is saved and it resets at midnight." },
  { q: "Which plan should I pick?", a: "If you're not sure, start free. When you start preparing for a specific interview, pick the length that covers it. Scroll up and I'll pick one for you." },
];

function Questions() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.6fr_1.4fr]">
        <div>
          <ScrollWords as="h2" text="You asked. *I* *answered.*" className={`${DISPLAY} text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.03em]`} />
          <Reveal className="mt-6 hidden lg:block"><Crux pose="mug" mood="happy" size={140} /></Reveal>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
                {f.q}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-xl text-accent-amber" aria-hidden="true">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                    <div className="flex gap-3 px-5 pb-5">
                      <Crux pose="wave" mood="happy" size={32} className="shrink-0" />
                      <p className="text-[15px] leading-relaxed text-text-secondary">{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <p className="pt-2 text-sm text-text-tertiary">
            More in our <Link href="/terms" className="underline underline-offset-4 hover:text-text-primary">terms</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function Pricing() {
  const [len, setLen] = useState<Len>(2);
  const [highlight, setHighlight] = useState<"free" | "pro" | null>(null);

  const pick = (r: Len | "free") => {
    if (r !== "free") setLen(r);
    setHighlight(null);
    requestAnimationFrame(() => setHighlight(r === "free" ? "free" : "pro"));
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="overflow-x-clip">
      <Hero />
      <Finder onPick={pick} />
      <Plans len={len} setLen={setLen} highlight={highlight} />
      <Theatre />
      <Table />
      <Questions />
      <section className="px-4 pb-28 pt-10 text-center sm:px-6">
        <Reveal><Crux pose="cheer" mood="celebrate" level={4} size={150} className="mx-auto" /></Reveal>
        <ScrollWords as="h2" text="Start free. *I'll* *be* *there.*" className={`${DISPLAY} mt-6 text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.03em]`} />
        <Reveal delay={0.2} y={16}><div className="mt-8 flex flex-wrap items-center justify-center gap-4"><CTA size="lg">Get started free</CTA><WaitlistLink /></div></Reveal>
      </section>
    </main>
  );
}
