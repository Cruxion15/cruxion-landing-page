"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Crux, type Pose } from "./Crux";
import { Bezel, DISPLAY, EASE, Reveal, StopHead, cx } from "./ui";

// A scripted marketing replay of the product's Two Sum trace (packages/types/src/dsa/problems/two-sum.ts).
const NUMS = [3, 8, 11, 4, 6];
const TARGET = 10;
const CONSTRAINTS = ["2 ≤ n ≤ 10⁴", "−10⁹ ≤ nums[i] ≤ 10⁹", "Exactly one answer", "No reusing an element"];
const BRUTE_CHECKS = 10; // pairs tried before brute force reaches (3, 4) on this input

type Tone = "amber" | "violet" | "emerald";
interface Frame {
  label: string;
  narration: string;
  i?: number;
  hl: Record<number, Tone>;
  seen: [number, number][];
  fresh?: number;
  hit?: number;
  call?: "store" | "return";
  constraint?: number;
  lookups: number;
  result?: string;
}

function buildFrames(): Frame[] {
  const f: Frame[] = [
    { label: "Frame: read the constraints", constraint: 0, hl: {}, seen: [], lookups: 0,
      narration: "n can reach 10,000. Checking every pair is about 50 million checks. The constraint is quietly telling you: one pass." },
    { label: "Set up", hl: {}, seen: [], lookups: 0,
      narration: "Walk the list once, left to right. seen will remember every number already passed, and where it was." },
  ];
  const seen = new Map<number, number>();
  for (let i = 0; i < NUMS.length; i++) {
    const x = NUMS[i], c = TARGET - x, hit = seen.has(c);
    const snap = () => Array.from(seen);
    f.push({ label: "Compute the complement", i, hl: { [i]: "amber" }, seen: snap(), lookups: i, call: hit ? "return" : "store",
      narration: `To reach ${TARGET} from ${x}, the partner must be ${c}. Is ${c} in seen?` });
    if (hit) {
      const j = seen.get(c)!;
      f.push({ label: "Return the pair", i, hl: { [j]: "emerald", [i]: "emerald" }, seen: snap(), hit: c, lookups: i + 1, result: `[${j}, ${i}]`,
        narration: `${c} is in seen at index ${j}, and ${c} + ${x} = ${TARGET}. Return [${j}, ${i}].` });
      break;
    }
    seen.set(x, i);
    f.push({ label: "Store and move on", i, hl: { [i]: "violet" }, seen: snap(), fresh: x, lookups: i + 1,
      narration: `${c} hasn't appeared yet. Store ${x} at index ${i} so a later number that needs ${x} can find it.` });
  }
  return f;
}

const TONE: Record<Tone, string> = {
  amber: "bg-accent-amber/20 ring-accent-amber text-accent-amber",
  violet: "bg-blue-400/15 ring-blue-400 text-blue-300",
  emerald: "bg-accent-green/15 ring-accent-green text-accent-green",
};

export default function TwoSumDemo() {
  const frames = useMemo(buildFrames, []);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25%" });
  const [k, setK] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [guess, setGuess] = useState<Record<number, "store" | "return">>({});
  const fr = frames[k];
  const last = k === frames.length - 1;

  useEffect(() => {
    if (!inView || !playing || guess[k]) return; // a made call advances itself in pick()
    // Decision frames linger so there is time to make the call.
    const t = setTimeout(() => (last ? (setK(0), setGuess({})) : setK(k + 1)), last ? 6000 : fr.call ? 5200 : 3000);
    return () => clearTimeout(t);
  }, [inView, playing, k, last, fr.call, guess]);

  const pick = (g: "store" | "return") => {
    setGuess((s) => ({ ...s, [k]: g }));
    setTimeout(() => setK((x) => Math.min(x + 1, frames.length - 1)), 900);
  };

  const g = guess[k];
  const calls = Object.entries(guess);
  const right = calls.filter(([i, v]) => frames[+i].call === v).length;
  const pose: Pose = fr.result ? "cheer" : fr.call ? (g ? (g === fr.call ? "wave" : "mug") : "pencil") : "laptop";

  return (
    <section id="dsa" data-stop="dsa" className="scroll-mt-20 relative px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 lg:grid-cols-[1.3fr_1fr]">
          <StopHead
            n={2}
            label="DSA"
            title="The constraints are a hint. *We* *teach* *you* *to* *read* *them.*"
            sub="Interview patterns one at a time: hashing, two pointers, sliding window, binary search and more. Try the first one right here. When it asks, make the call yourself."
          />
          <Reveal delay={0.2} className="grid grid-cols-3 gap-2 lg:mb-2">
            {[["8", "stages to mastery"], ["3", "languages: Python, C++, Java"], ["0", "videos to sit through"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-amber-400/[0.06] p-3 ring-1 ring-amber-400/15">
                <p className={`${DISPLAY} text-3xl font-extrabold text-amber-300`}>{n}</p>
                <p className="mt-1 text-[12px] leading-snug text-text-tertiary">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div ref={ref}>
            <Bezel core="p-5 sm:p-8">
              {/* Problem header + constraints */}
              <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className={`${DISPLAY} text-2xl font-bold`}>Two Sum</p>
                  <p className="mt-1 text-sm text-text-tertiary">Return the indices of the two numbers that add up to target.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CONSTRAINTS.map((c, i) => (
                    <motion.span
                      key={c}
                      animate={fr.constraint === i ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                      transition={{ duration: 0.8, repeat: fr.constraint === i ? Infinity : 0 }}
                      className={cx("rounded-full px-3 py-1 font-mono text-xs ring-1 transition-colors duration-500", fr.constraint === i ? "bg-accent-amber/15 text-accent-amber ring-accent-amber/60" : "text-text-tertiary ring-white/10")}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                {/* Array + pointer */}
                <div>
                  <p className="font-mono text-xs text-text-tertiary">nums <span className="text-text-secondary">target = {TARGET}</span></p>
                  <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-3">
                    {NUMS.map((n, i) => (
                      <div key={i} className="relative">
                        {fr.i === i && (
                          <motion.span layoutId="ptr" transition={{ type: "spring", stiffness: 260, damping: 24 }} className="absolute inset-x-0 -top-7 text-center font-mono text-xs font-bold text-accent-amber">
                            i&#9662;
                          </motion.span>
                        )}
                        <motion.div
                          animate={{ scale: fr.hl[i] ? 1.08 : 1, y: fr.hl[i] ? -4 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={cx("flex aspect-square items-center justify-center rounded-2xl font-mono text-lg font-bold ring-1 transition-colors duration-500 sm:text-2xl", fr.hl[i] ? TONE[fr.hl[i]] : "bg-white/[0.03] text-text-secondary ring-white/10")}
                        >
                          {n}
                        </motion.div>
                        <p className="mt-2 text-center font-mono text-[11px] text-text-tertiary">{i}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
                    <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-text-secondary">lookups <b className="text-accent-green">{fr.lookups}</b></span>
                    <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-text-tertiary">brute force on this input <b className="text-text-secondary">{BRUTE_CHECKS}</b></span>
                    {fr.result && <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-lg bg-accent-green/15 px-3 py-2 font-bold text-accent-green">return {fr.result}</motion.span>}
                  </div>
                </div>

                {/* Hash map */}
                <div className="rounded-2xl bg-surface-bg/60 p-4 ring-1 ring-white/[0.06]">
                  <p className="font-mono text-xs text-text-tertiary">seen <span className="text-text-secondary">value &rarr; index</span></p>
                  <div className="mt-4 min-h-[96px] space-y-2 lg:min-h-[180px]">
                    <AnimatePresence initial={false}>
                      {fr.seen.map(([kk, v]) => (
                        <motion.div
                          key={kk}
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className={cx("flex justify-between rounded-xl px-4 py-2 font-mono text-sm ring-1 transition-colors duration-500",
                            fr.hit === kk ? TONE.emerald : fr.fresh === kk ? TONE.violet : "bg-white/[0.03] text-text-secondary ring-white/5")}
                        >
                          <span>{kk}</span><span className="opacity-60">&rarr;</span><span>{v}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {fr.seen.length === 0 && <p className="pt-6 text-center lg:pt-10 text-sm text-text-tertiary">empty</p>}
                  </div>
                </div>
              </div>

              {/* Narration + the call */}
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white/[0.03] p-4 sm:flex-nowrap sm:p-5">
                <Crux pose={pose} size={72} className="h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]" />
                <div className="min-w-0 flex-1 basis-48">
                  <AnimatePresence mode="wait">
                    <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-amber">{fr.label}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{fr.narration}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {fr.call && (
                  <div className="flex shrink-0 gap-2">
                    {(["store", "return"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        disabled={!!g}
                        onClick={() => pick(opt)}
                        className={cx("rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-all duration-300 active:scale-[0.97]",
                          !g ? "text-text-primary ring-white/20 hover:bg-white/10" : opt === fr.call ? TONE.emerald : opt === g ? "bg-red-500/15 text-red-300 ring-red-400" : "text-text-tertiary opacity-40 ring-white/10")}
                      >
                        {opt === "store" ? "Store it" : "Return pair"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Ctrl label="Previous step" onClick={() => { setPlaying(false); setK(Math.max(0, k - 1)); }} disabled={k === 0}>&larr;</Ctrl>
                  <Ctrl label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}>{playing ? "❚❚" : "▶"}</Ctrl>
                  <Ctrl label="Next step" onClick={() => { setPlaying(false); setK(Math.min(frames.length - 1, k + 1)); }} disabled={last}>&rarr;</Ctrl>
                  <Ctrl label="Restart" onClick={() => { setK(0); setGuess({}); setPlaying(true); }}>&#8634;</Ctrl>
                </div>
                <div className="flex items-center gap-1.5" aria-hidden>
                  {frames.map((_, i) => (
                    <span key={i} className={cx("h-1.5 rounded-full transition-all duration-500", i === k ? "w-6 bg-accent-amber" : i < k ? "w-1.5 bg-white/40" : "w-1.5 bg-white/10")} />
                  ))}
                </div>
                <p className="text-sm text-text-tertiary">{calls.length ? <>Your calls: <b className="text-text-primary">{right}/{calls.length}</b> right</> : `Step ${k + 1} of ${frames.length}`}</p>
              </div>
            </Bezel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Ctrl({ children, label, onClick, disabled }: { children: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-sm text-text-secondary ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 active:scale-[0.95] disabled:opacity-30">
      {children}
    </button>
  );
}
