"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const TOKENS = [
  { t: "The", id: 25268, type: "word" }, { t: " ",  id: 30160, type: "sub"    },
  { t: "c",   id: 7456,  type: "single"},{ t: "a",  id: 2220,  type: "single" },
  { t: "t",   id: 11268, type: "single"},{ t: " ",  id: 30160, type: "sub"    },
  { t: "s",   id: 49360, type: "single"},{ t: "a",  id: 2220,  type: "single" },
  { t: "t",   id: 11268, type: "single"},{ t: " ",  id: 30160, type: "sub"    },
  { t: "on",  id: 21018, type: "word"  },{ t: " ",  id: 30160, type: "sub"    },
  { t: "the", id: 25268, type: "word"  },
];

function Token({ i, local, tk }: { i: number; local: MotionValue<number>; tk: (typeof TOKENS)[number] }) {
  const at    = 0.35 + i * 0.04;
  const op    = useTransform(local, [at, at + 0.06], [0, 1]);
  const scale = useTransform(local, [at, at + 0.08], [0.6, 1]);
  const cls =
    tk.type === "word"   ? "border-primary-blue/60 bg-primary-blue/25 text-primary-light" :
    tk.type === "sub"    ? "border-accent-amber/60 bg-accent-amber/20 text-accent-amber"  :
                           "border-accent-green/60 bg-accent-green/20 text-accent-green";
  return (
    <motion.span style={{ opacity: op, scale }}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[12px] font-bold ${cls}`}>
      <span>{tk.t === " " ? "·" : tk.t}</span>
      <span className="text-[10px] font-medium opacity-70">{tk.id}</span>
    </motion.span>
  );
}

export default function SceneApprentice({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local    = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const headerY  = useTransform(local, [0, 0.20], [16, 0]);
  const s1Op     = useTransform(local, [0.15, 0.30], [0, 1]);
  const s2Op     = useTransform(local, [0.30, 0.45], [0, 1]);
  const s3Op     = useTransform(local, [0.85, 0.95], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full gap-3 sm:gap-5 px-3 sm:px-5 py-3 sm:py-5">

        {/* Lesson nav */}
        <div className="hidden w-44 shrink-0 border-r border-[#2E4A6E] pr-4 lg:block">
          <motion.div style={{ opacity: headerOp }} className="text-[11px] font-bold uppercase tracking-widest text-primary-blue">
            ▼ Apprentice
          </motion.div>
          <div className="mt-3 space-y-1 text-xs font-medium">
            <div className="font-semibold text-white">How LLMs Actually Think</div>
            <div className="rounded-lg bg-primary-blue/25 px-2.5 py-1.5 font-bold text-white">● Tokens Are Not Words</div>
            <div className="px-2.5 py-1.5 text-white">○ The Sampling Dial</div>
            <div className="px-2.5 py-1.5 text-white">○ Context Windows</div>
            <div className="mt-3 font-semibold text-white">› Engineer</div>
            <div className="font-semibold text-white">› Architect</div>
          </div>
        </div>

        {/* Lesson body */}
        <div className="flex-1 overflow-hidden">
          <motion.div style={{ opacity: headerOp, y: headerY }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-blue/40 bg-primary-blue/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-light">
              Try it · 2 of 8
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white">Watch text become integers</h2>
            <p className="mt-1.5 text-sm font-medium text-white">
              Type any text. The model sees it as numbered chunks — not letters, not words.
            </p>
          </motion.div>

          <motion.div style={{ opacity: s1Op }}
            className="mt-4 rounded-xl border border-[#2E4A6E] bg-[#1C3050] p-4">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-blue text-[10px] font-bold text-white">1</span>
              Type some text
            </div>
            <div className="rounded-lg bg-[#060E1A] px-4 py-2.5 font-mono text-sm font-semibold text-white">
              The cat sat on the mat.
            </div>
          </motion.div>

          <motion.div style={{ opacity: s2Op }}
            className="mt-3 rounded-xl border border-[#2E4A6E] bg-[#1C3050] p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-blue text-[10px] font-bold text-white">2</span>
              Split into {TOKENS.length} tokens
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TOKENS.map((tk, i) => <Token key={i} i={i} local={local} tk={tk} />)}
            </div>
          </motion.div>

          <motion.div style={{ opacity: s3Op }}
            className="mt-3 rounded-xl border border-[#2E4A6E] bg-[#1C3050] p-4">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-blue text-[10px] font-bold text-white">3</span>
              What the model sees
            </div>
            <div className="rounded-lg bg-[#060E1A] px-4 py-2.5 font-mono text-[12px] font-bold text-accent-amber">
              [ {TOKENS.map(t => t.id).join(", ")} ]
            </div>
          </motion.div>
        </div>

      </div>
    </SceneFrame>
  );
}
