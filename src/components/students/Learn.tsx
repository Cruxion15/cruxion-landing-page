"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Crux, type Pose } from "./Crux";
import { Bezel, EASE, Reveal, StopHead, Typewriter, cx } from "./ui";

// Stage names and verbs are the product's own (STAGE_META in @cruxion/types).
const LOOP: { label: string; verb: string; pose: Pose; line: string }[] = [
  { label: "Observe", verb: "Watch it fail, then find the idea", pose: "laptop", line: "Checking every pair works. At 10,000 numbers it's 50 million checks. What would you remember instead?" },
  { label: "Predict", verb: "Call the next move and say why", pose: "pencil", line: "i is on 4, target is 10. Is 6 already in seen? Call it before I show you." },
  { label: "Control", verb: "Drive the algorithm yourself", pose: "wave", line: "Your turn to hold the pointer. Step it, store it, find the pair." },
  { label: "Verify", verb: "Write it, fix a planted bug, defend it", pose: "cheer", line: "Clean run, bug found, and you explained why it's O(n). That's mastered, not watched." },
];
// Node positions around the wheel: top, right, bottom, left.
const SPOT = ["left-1/2 top-0 -translate-x-1/2 -translate-y-1/2", "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"];

const LECTURE = ["Someone else solves it while you watch.", "You never commit to a guess, so you're never wrong.", "“Completed” means you reached the end of the video."];

export default function Learn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25%" });
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || held) return;
    const t = setInterval(() => setStep((s) => (s + 1) % LOOP.length), 3400);
    return () => clearInterval(t);
  }, [inView, held]);

  return (
    <section id="learn" data-stop="learn" className="scroll-mt-20 relative px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <StopHead
          n={1}
          label="How it works"
          title="You nodded along for 40 hours. Then the interviewer said *“okay,* *code* *it.”*"
          sub="Every lesson here makes you commit to a guess before the answer shows up. Wrong guesses are the point. That's how it sticks."
        />

        <div ref={ref} className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          {/* The video course, flat and grey, its promises crossed out as you read them. */}
          <Reveal>
            <div className="h-full rounded-[2rem] bg-white/[0.02] p-6 ring-1 ring-white/5 grayscale sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">The video course</p>
              <div className="mt-4 rounded-2xl bg-white/[0.03] p-4">
                <p className="text-[13px] text-white/40">Lecture 14 of 212: Hashing, part 3</p>
                <div className="my-6 flex justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/30">▶</span>
                </div>
                <div className="h-1 rounded-full bg-white/10"><div className="h-full w-[38%] rounded-full bg-white/25" /></div>
                <div className="mt-2 flex justify-between text-[11px] text-white/30"><span>17:52 / 47:10</span><span>2x speed</span></div>
              </div>
              <ul className="mt-6 space-y-4">
                {LECTURE.map((l, i) => (
                  <li key={l} className="relative w-fit text-[15px] text-white/45">
                    {l}
                    <motion.span
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, delay: 0.6 + i * 0.45, ease: EASE }}
                      className="absolute left-0 right-0 top-1/2 h-[2px] origin-left bg-amber-400/70"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The Cruxion loop: Crux in the middle, the four stages around it. */}
          <Reveal delay={0.1}>
            <Bezel core="relative overflow-hidden p-6 sm:p-8" className="h-full">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
              <p className="relative text-[11px] uppercase tracking-[0.2em] text-blue-300">A Cruxion lesson</p>

              <div className="relative mt-6 grid items-center gap-10 md:grid-cols-[260px_1fr]">
                <div className="relative mx-auto aspect-square w-[220px] sm:w-[250px]">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 3" />
                    <motion.circle
                      cx="50" cy="50" r="46" fill="none" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round"
                      animate={{ pathLength: (step + 1) / LOOP.length }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div key={step} initial={{ scale: 0.7, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 240, damping: 16 }}>
                        <Crux pose={LOOP[step].pose} mood="happy" size={120} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {LOOP.map((s, i) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => { setStep(i); setHeld(true); }}
                      className={cx("absolute rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all duration-500", SPOT[i],
                        i === step ? "scale-110 bg-blue-400 text-surface-bg ring-blue-300 shadow-[0_0_30px_rgba(96,165,250,0.6)]" : i < step ? "bg-blue-400/20 text-blue-200 ring-blue-400/30" : "bg-surface-card text-text-tertiary ring-white/10 hover:text-text-primary")}
                    >
                      {i + 1}. {s.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.45, ease: EASE }}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">Step {step + 1} · {LOOP[step].label}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight">{LOOP[step].verb}</h3>
                      <p className="mt-4 rounded-2xl rounded-tl-sm bg-white/[0.05] px-4 py-3 text-[15px] leading-relaxed text-text-secondary">
                        <span className="mr-1 font-semibold text-blue-200">Crux:</span>
                        <Typewriter text={LOOP[step].line} speed={16} />
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <ul className="relative mt-8 grid gap-2 text-[14px] text-text-secondary sm:grid-cols-3">
                {["You make the call before the answer appears.", "Wrong guesses are the point. Crux notes them.", "“Mastered” means you wrote it, fixed it and defended it."].map((t, i) => (
                  <motion.li key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
                    className="rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/5">
                    <span className="mr-1.5 text-blue-300">+</span>{t}
                  </motion.li>
                ))}
              </ul>
            </Bezel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
