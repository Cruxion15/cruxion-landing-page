"use client";

import { motion } from "framer-motion";
import { Crux } from "./Crux";
import { Bezel, DISPLAY, EASE, Reveal, StopHead, Typewriter, cx } from "./ui";

const STAGES = ["Frame", "Observe", "Predict", "Control", "Implement", "Debug", "Defend", "Transfer"];
// A week: done, done, missed (a banked freeze covers it), done, done, today, tomorrow.
const WEEK = ["M", "T", "W", "T", "F", "S", "S"];
const DAY: ("done" | "freeze" | "today" | "future")[] = ["done", "done", "freeze", "done", "done", "today", "future"];
const ON = { initial: "off", whileInView: "on", viewport: { once: true, margin: "-80px" } } as const;

export default function Features() {
  return (
    <section id="habits" data-stop="habits" className="scroll-mt-20 relative px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <StopHead
          n={5}
          label="Habits"
          title="Everything a good mentor would do. *At* *1* *a.m.* *too.*"
          sub="Short daily lessons, a streak that forgives one bad day, and a companion that remembers exactly where you get stuck."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {/* Streak week */}
          <Reveal className="md:col-span-3">
            <Bezel core="p-6 sm:p-7" className="h-full">
              <p className="text-lg font-semibold">Streaks that forgive one bad day</p>
              <p className="mt-1.5 text-[15px] text-text-secondary">Miss a day and a banked freeze covers it automatically. No button, no guilt.</p>
              <motion.div {...ON} className="mt-6 grid grid-cols-7 gap-2">
                {WEEK.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div
                      variants={{
                        off: { scale: 0.4, opacity: 0, y: DAY[i] === "freeze" ? -40 : 0 },
                        on: { scale: 1, opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.16, type: "spring", stiffness: 300, damping: DAY[i] === "freeze" ? 9 : 16 } },
                      }}
                      className={cx("flex aspect-square w-full items-center justify-center rounded-xl text-lg ring-1",
                        DAY[i] === "done" && "bg-amber-400/15 ring-amber-400/40",
                        DAY[i] === "freeze" && "bg-blue-400/15 ring-blue-300/50",
                        DAY[i] === "today" && "bg-amber-400/5 ring-2 ring-amber-300 ring-offset-2 ring-offset-surface-card",
                        DAY[i] === "future" && "bg-white/[0.03] ring-white/10")}
                    >
                      {DAY[i] === "done" ? <Flame /> : DAY[i] === "freeze" ? <span className="text-blue-200">❄</span> : null}
                    </motion.div>
                    <span className="text-[11px] text-text-tertiary">{d}</span>
                  </div>
                ))}
              </motion.div>
              <p className="mt-4 text-[13px] text-blue-200/80">Wednesday: freeze used automatically. Streak: 6 days.</p>
            </Bezel>
          </Reveal>

          {/* Mastery */}
          <Reveal delay={0.1} className="md:col-span-3">
            <Bezel core="p-6 sm:p-7" className="h-full">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Mastery you actually earned</p>
                <motion.span {...ON} variants={{ off: { opacity: 0, scale: 0.5 }, on: { opacity: 1, scale: 1, transition: { delay: 1.9, type: "spring", stiffness: 300, damping: 12 } } }}
                  className="rounded-full bg-amber-400/15 px-2.5 py-1 text-[12px] font-bold text-amber-300 ring-1 ring-amber-400/30">
                  ✓ Mastered
                </motion.span>
              </div>
              <p className="mt-1.5 text-[15px] text-text-secondary">A problem counts only once all eight stages pass. So the tick means something.</p>
              <motion.div {...ON} className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-8">
                {STAGES.map((s, i) => (
                  <div key={s} className="text-center">
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div variants={{ off: { scaleX: 0 }, on: { scaleX: 1, transition: { delay: 0.2 + i * 0.2, duration: 0.4, ease: EASE } } }} className="h-full origin-left rounded-full bg-amber-400" />
                    </div>
                    <p className="mt-1.5 text-[10px] text-text-tertiary">{s}</p>
                  </div>
                ))}
              </motion.div>
              <p className="mt-4 text-[13px] text-text-tertiary">Two Sum · all eight stages cleared</p>
            </Bezel>
          </Reveal>

          {/* Crux notices */}
          <Reveal delay={0.05} className="md:col-span-4">
            <Bezel core="relative overflow-hidden p-6 sm:p-7" className="h-full">
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
              <p className="relative text-lg font-semibold">Crux notices the problem behind the problem</p>
              <p className="relative mt-1.5 text-[15px] text-text-secondary">Not &ldquo;time to practise!&rdquo; nudges. Crux tracks the kind of mistake you keep making and brings you back to it.</p>
              <div className="relative mt-6 flex items-end gap-3">
                <Crux pose="pencil" mood="thinking" size={72} className="shrink-0" />
                <div className="space-y-2">
                  <p className="rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3 text-[14px] leading-relaxed text-text-secondary">
                    <Typewriter text="That's the third off-by-one on a window this week. Want a 4-minute drill on loop bounds before your next problem?" speed={18} />
                  </p>
                  <motion.div {...ON} variants={{ off: { opacity: 0, y: 8 }, on: { opacity: 1, y: 0, transition: { delay: 2.8, duration: 0.5 } } }} className="flex gap-2">
                    <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[12px] font-bold text-surface-bg">Start the drill</span>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[12px] text-text-tertiary ring-1 ring-white/10">Later</span>
                  </motion.div>
                </div>
              </div>
            </Bezel>
          </Reveal>

          {/* Crux grows */}
          <Reveal delay={0.15} className="md:col-span-2">
            <Bezel core="flex h-full flex-col items-center justify-center p-6 text-center">
              <motion.div {...ON} variants={{ off: { scale: 0.7 }, on: { scale: 1, transition: { type: "spring", stiffness: 160, damping: 10, delay: 0.3 } } }}>
                <Crux pose="cheer" mood="celebrate" level={4} size={110} />
              </motion.div>
              <p className={`${DISPLAY} mt-2 text-lg font-bold`}>Crux grows with you</p>
              <p className="mt-1 text-[14px] text-text-secondary">Earn XP, level up, and watch your companion glow brighter.</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div {...ON} variants={{ off: { scaleX: 0 }, on: { scaleX: 0.72, transition: { delay: 0.6, duration: 1.4, ease: EASE } } }} className="h-full origin-left rounded-full bg-gradient-to-r from-blue-400 to-amber-400" />
              </div>
              <p className="mt-1.5 self-end font-mono text-[11px] text-text-tertiary">Level 3 → 4</p>
            </Bezel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Flame() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-300">
      <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2-4.6.3 1.6 1.2 2.6 2.2 2.6-.7-2.6-.2-5.4.8-8Z" fill="currentColor" />
    </svg>
  );
}
