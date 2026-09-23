"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crux } from "./Crux";
import { Bezel, DISPLAY, EASE, Reveal, StopHead, cx } from "./ui";

// A pocket version of the track's "The Sampling Dial" lesson.
const PROMPT = "The interview went";
const LOGITS: [string, number][] = [["well", 2.4], ["fine", 1.7], ["badly", 0.8], ["long", 0.4], ["viral", -0.4]];

// The real curriculum (content/crucible/llm-engineer/track.json).
const TIERS = [
  { name: "Apprentice", note: "How the model actually works", modules: ["How LLMs actually think", "Embeddings as a coordinate system for meaning", "Prompts as programs"] },
  { name: "Engineer", note: "Make it know your data", modules: ["Retrieval-augmented generation, done right", "Supervised fine-tuning with LoRA and QLoRA", "Preference alignment: RLHF and DPO"] },
  { name: "Architect", note: "Ship it and keep it honest", modules: ["Evaluation, and LLM-as-judge", "Inference at scale: KV cache, quantization", "LLMOps: from a script to a live service"] },
];

function softmax(t: number) {
  const e = LOGITS.map(([, l]) => Math.exp(l / t));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / s);
}

export default function AiTrack() {
  const [temp, setTemp] = useState(0.8);
  const [out, setOut] = useState<{ w: string; id: number }[]>([]);
  const probs = useMemo(() => softmax(temp), [temp]);

  const sample = () => {
    let r = Math.random();
    let k = 0;
    while (k < probs.length - 1 && (r -= probs[k]) > 0) k++;
    setOut((o) => [{ w: LOGITS[k][0], id: Date.now() + Math.random() }, ...o].slice(0, 8));
  };

  const note = temp < 0.45
    ? "Cold. It says “well” almost every time. Safe, predictable, a little boring."
    : temp > 1.3
      ? "Hot. “viral” starts showing up. More creative, much riskier."
      : "The usual range. Mostly sensible, with a little variety.";

  return (
    <section id="ai" data-stop="ai" className="scroll-mt-20 relative px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <StopHead
          n={3}
          label="AI & LLMs"
          title="Understand LLMs from the *token* *up,* not the tutorial down."
          sub="The LLM Engineer track takes a model from “it works in a notebook” to “it serves users at 3am without paging anyone.” Every idea comes with a live demo, like this one."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Bezel core="relative overflow-hidden p-6 sm:p-8" className="h-full">
              <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300">Live demo · The sampling dial</p>
                <span className="rounded-full bg-blue-400/10 px-2.5 py-1 font-mono text-[11px] text-blue-200 ring-1 ring-blue-400/20">next-token probabilities</span>
              </div>

              <p className="relative mt-5 font-mono text-lg sm:text-xl">
                <span className="text-text-secondary">{PROMPT}</span>{" "}
                <AnimatePresence mode="popLayout">
                  <motion.span key={out[0]?.id ?? "blank"} initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="inline-block rounded-md bg-blue-400/15 px-2 text-blue-200">
                    {out[0]?.w ?? "___"}
                  </motion.span>
                </AnimatePresence>
              </p>

              <div className="relative mt-6 space-y-2.5">
                {LOGITS.map(([w], i) => (
                  <div key={w} className="grid grid-cols-[64px_1fr_48px] items-center gap-3 font-mono text-sm">
                    <span className="text-text-secondary">{w}</span>
                    <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                        animate={{ scaleX: probs[i] }}
                        transition={{ type: "spring", stiffness: 140, damping: 20 }}
                      />
                    </div>
                    <span className="text-right text-text-tertiary">{Math.round(probs[i] * 100)}%</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-7">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="temp" className="font-medium text-text-secondary">Temperature</label>
                  <span className="font-mono text-blue-200">{temp.toFixed(2)}</span>
                </div>
                <input
                  id="temp"
                  type="range"
                  min={0.1}
                  max={2}
                  step={0.05}
                  value={temp}
                  onChange={(e) => setTemp(+e.target.value)}
                  className="mt-2 w-full accent-blue-400"
                />
                <div className="flex justify-between text-[11px] text-text-tertiary"><span>precise</span><span>creative</span></div>
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={sample}
                  className="rounded-full bg-blue-400 px-5 py-2.5 text-sm font-bold text-surface-bg shadow-[0_12px_40px_-12px_rgba(96,165,250,0.8)] transition-transform active:scale-95">
                  Sample the next word
                </button>
                <div className="flex flex-wrap gap-1.5">
                  <AnimatePresence initial={false}>
                    {out.slice(1).map((o) => (
                      <motion.span key={o.id} layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[12px] text-text-tertiary">
                        {o.w}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
                <Crux pose={temp > 1.3 ? "cheer" : temp < 0.45 ? "mug" : "laptop"} mood="happy" size={56} className="shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.p key={note} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="text-[14px] leading-snug text-text-secondary">
                    {note}
                  </motion.p>
                </AnimatePresence>
              </div>
            </Bezel>
          </Reveal>

          <Reveal delay={0.1}>
            <Bezel core="p-6 sm:p-8" className="h-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/25">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" /> Live now
                </span>
                {["27 lessons", "About 4 hours", "3 tiers"].map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-text-tertiary ring-1 ring-white/10">{t}</span>
                ))}
              </div>
              <p className={`${DISPLAY} mt-4 text-2xl font-bold`}>The LLM Engineer</p>

              <ol className="relative mt-6 space-y-5 border-l border-blue-400/20 pl-5">
                {TIERS.map((t, i) => (
                  <motion.li key={t.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.15, duration: 0.7, ease: EASE }} className="relative">
                    <span className={cx("absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-surface-card", ["bg-blue-300", "bg-blue-400", "bg-blue-400"][i])} />
                    <p className="text-sm font-semibold text-text-primary">{t.name} <span className="font-normal text-text-tertiary">· {t.note}</span></p>
                    <ul className="mt-2 space-y-1.5">
                      {t.modules.map((m) => (
                        <li key={m} className="text-[14px] leading-snug text-text-secondary">{m}</li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ol>
            </Bezel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
