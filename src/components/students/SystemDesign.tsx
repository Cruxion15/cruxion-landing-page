"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crux, type Pose } from "./Crux";
import { Bezel, EASE, Reveal, StopHead, cx } from "./ui";

// Columns of the diagram; request dots travel between neighbouring centres.
const COLS = ["Users", "Load balancer", "App servers", "Cache", "Database"];
const CENTER = (c: number) => 10 + c * 20; // % across the diagram

type Mode = "calm" | "surge" | "nocache" | "fire";
const MODE: Record<Mode, { p99: string; db: number; pose: Pose; line: string }> = {
  calm: { p99: "38ms", db: 22, pose: "wave", line: "All green. The cache is answering nine reads out of ten." },
  surge: { p99: "64ms", db: 45, pose: "laptop", line: "Ten times the users. The cache soaks most of it up. Now try killing it." },
  nocache: { p99: "420ms", db: 96, pose: "mug", line: "Every read now hits the database. That's the lesson: at scale, the cache isn't optional." },
  fire: { p99: "2.1s", db: 100, pose: "mug", line: "Surge plus no cache, and the database is on fire. Predicting this is what a design interview tests." },
};

function Dots({ hop, n, dur, hot }: { hop: number; n: number; dur: number; hot?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-y-0" style={{ left: `${CENTER(hop)}%`, width: "20%" }}>
      {Array.from({ length: n }, (_, i) => (
        <motion.div
          key={`${hop}-${n}-${i}-${hot}`}
          className="absolute inset-y-0 left-0 w-full"
          style={{ top: `${(i % 3) * 8 - 8}px` }}
          initial={{ x: "0%", opacity: 0 }}
          animate={{ x: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: dur, delay: (i * dur) / n, repeat: Infinity, ease: "linear" }}
        >
          <span className={cx("absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full", hot ? "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.9)]" : "bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.9)]")} />
        </motion.div>
      ))}
    </div>
  );
}

export default function SystemDesign() {
  const [surge, setSurge] = useState(false);
  const [noCache, setNoCache] = useState(false);
  const mode: Mode = surge && noCache ? "fire" : noCache ? "nocache" : surge ? "surge" : "calm";
  const m = MODE[mode];
  const base = surge ? 7 : 3;
  const dur = surge ? 1.1 : 1.9;

  return (
    <section id="system-design" data-stop="system-design" className="scroll-mt-20 relative px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <StopHead
          n={4}
          label="System design"
          title="Learn system design by *breaking* *things* on purpose."
          sub="Scaling, caching, queues and consistency, on request-flow diagrams you can break and fix. This track is coming next. Here's a taste."
        />

        <Reveal className="mt-12">
          <Bezel core="relative overflow-hidden p-5 sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300 ring-1 ring-blue-400/25">Coming next</span>
                <span className="text-[12px] text-text-tertiary">Preview · numbers are illustrative</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Toggle on={surge} onClick={() => setSurge((v) => !v)} label="10x traffic" />
                <Toggle on={noCache} onClick={() => setNoCache((v) => !v)} label="Kill the cache" danger />
              </div>
            </div>

            {/* The diagram */}
            <div className="relative -mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <div className="relative h-[150px] min-w-[640px]">
                <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-1/2 h-px bg-white/10" />
                {[0, 1, 2, 3].map((h) => (
                  <Dots key={h} hop={h} n={h === 3 ? (noCache ? base : 1) : base} dur={dur} hot={noCache && h >= 2} />
                ))}
                {COLS.map((c, i) => (
                  <div key={c} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${CENTER(i)}%` }}>
                    <Node i={i} label={c} noCache={noCache} db={m.db} />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-6 grid gap-4 md:grid-cols-[auto_auto_1fr] md:items-center">
              <Metric label="p99 latency" value={m.p99} bad={noCache} />
              <div className="min-w-[180px]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-text-tertiary">Database load</p>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div className={cx("h-full origin-left rounded-full", m.db > 80 ? "bg-rose-400" : "bg-blue-400")} animate={{ scaleX: m.db / 100 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} />
                </div>
                <p className="mt-1 font-mono text-sm text-text-secondary">{m.db}%</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
                <Crux pose={m.pose} mood={mode === "fire" ? "concerned" : "happy"} size={56} className="shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.p key={mode} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="text-[14px] leading-snug text-text-secondary">
                    {m.line}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </Bezel>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[
            { t: "High-level design", d: "Scaling, caching, queues and consistency on request-flow diagrams you can break and fix." },
            { t: "Low-level design", d: "Classes, interfaces and patterns, taught by extending real code until the design holds or cracks." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div className="h-full rounded-[1.6rem] bg-blue-400/[0.04] p-6 ring-1 ring-blue-400/15">
                <p className="text-lg font-semibold text-blue-100">{c.t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}><p className="mt-4 text-sm text-text-tertiary">What you master in DSA carries straight into both.</p></Reveal>
      </div>
    </section>
  );
}

function Toggle({ on, onClick, label, danger }: { on: boolean; onClick: () => void; label: string; danger?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on}
      className={cx("rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-all duration-300 active:scale-95",
        on ? (danger ? "bg-rose-400 text-surface-bg ring-rose-300" : "bg-blue-400 text-surface-bg ring-blue-300") : "bg-white/[0.03] text-text-secondary ring-white/15 hover:text-text-primary")}>
      {on ? (danger ? "Cache is down" : "Traffic x10") : label}
    </button>
  );
}

function Node({ i, label, noCache, db }: { i: number; label: string; noCache: boolean; db: number }) {
  const dead = i === 3 && noCache;
  const fire = i === 4 && db > 80;
  return (
    <motion.div
      animate={fire ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.8, repeat: fire ? Infinity : 0 }}
      className={cx("flex flex-col items-center gap-2 rounded-2xl px-3 py-3 text-center ring-1 backdrop-blur",
        dead ? "bg-white/[0.02] text-white/30 ring-white/10" : fire ? "bg-rose-500/15 text-rose-100 ring-rose-400/60 shadow-[0_0_40px_rgba(251,113,133,0.35)]" : "bg-surface-card text-text-primary ring-blue-400/25")}
    >
      {i === 2 ? (
        <span className="flex gap-1">{[0, 1, 2].map((k) => <span key={k} className="h-7 w-5 rounded-md bg-blue-400/20 ring-1 ring-blue-400/40" />)}</span>
      ) : (
        <span className={cx("flex h-8 w-8 items-center justify-center rounded-lg text-sm", dead ? "bg-white/5" : fire ? "bg-rose-400/30" : "bg-blue-400/15 text-blue-200")}>
          {["◎", "⇄", "", "⚡", "▤"][i]}
        </span>
      )}
      <span className="whitespace-nowrap text-[12px] font-medium">{dead ? "Cache (down)" : label}</span>
    </motion.div>
  );
}

function Metric({ label, value, bad }: { label: string; value: string; bad: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-text-tertiary">{label}</p>
      <AnimatePresence mode="wait">
        <motion.p key={value} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}
          className={cx("mt-1 font-mono text-3xl font-bold", bad ? "text-rose-300" : "text-blue-200")}>
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
