"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

// Value system: content=#0A1525 | panel=#1C3050 | editor=#060E1A | border=#2E4A6E

const CHAT = [
  { from: "mentor", text: "Hi! I'm your AI mentor. Ask for a hint when stuck, I won't give the answer, I'll help you think through it.", at: 0.02 },
  { from: "user",   text: "hi my fibonacci is wrong for n=0", at: 0.06 },
  { from: "mentor", text: "What does your function return when n is 0? Walk me through the first two lines.", at: 0.10 },
  { from: "user",   text: "oh i didn't handle the base case", at: 0.14 },
  { from: "mentor", text: "Right, what's the smallest valid input you need to define explicitly?", at: 0.18 },
];

const CODE_LINES = [
  { l: 1, text: "def fib(n):",                   at: 0.04 },
  { l: 2, text: "    if n < 2:",                  at: 0.07 },
  { l: 3, text: "        return n",               at: 0.10 },
  { l: 4, text: "    return fib(n-1) + fib(n-2)", at: 0.13 },
];

function CodeLine({ local, line }: { local: MotionValue<number>; line: (typeof CODE_LINES)[number] }) {
  const op = useTransform(local, [line.at, line.at + 0.06], [0, 1]);
  return (
    <motion.div style={{ opacity: op }} className="flex font-mono text-[11px] sm:text-[13px] leading-7">
      <span className="w-5 sm:w-6 select-none text-right text-[#4B6FA8] tabular-nums">{line.l}</span>
      <span className="ml-3 sm:ml-4 font-semibold text-white">{line.text}</span>
    </motion.div>
  );
}

function Bubble({ local, msg }: { local: MotionValue<number>; msg: (typeof CHAT)[number] }) {
  const op = useTransform(local, [msg.at, msg.at + 0.08], [0, 1]);
  const y  = useTransform(local, [msg.at, msg.at + 0.08], [10, 0]);
  const isUser = msg.from === "user";
  return (
    <motion.div style={{ opacity: op, y }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[90%] rounded-2xl px-3 py-2 text-[11px] sm:text-[12px] font-medium leading-relaxed ${
        isUser
          ? "bg-primary-blue text-white"
          : "border border-[#2E4A6E] bg-[#243A5A] text-white"
      }`}>
        {msg.text}
      </div>
    </motion.div>
  );
}

export default function SceneEngineer({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local    = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const headerY  = useTransform(local, [0, 0.20], [16, 0]);
  const tokensN  = useTransform(local, [0.1, 0.9], [19536, 18840]);
  const tokens   = useTransform(tokensN, (v) => Math.round(v).toLocaleString());

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col px-3 sm:px-4 py-3 sm:py-4">
        <motion.div style={{ opacity: headerOp, y: headerY }} className="flex items-center justify-between">
          <div className="text-xs sm:text-sm font-bold text-white">← Python Lab: Fibonacci</div>
          <div className="flex gap-1.5 sm:gap-2">
            <span className="rounded-full bg-accent-green/20 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-accent-green">easy</span>
            <span className="hidden sm:inline rounded-full bg-primary-blue/20 px-3 py-1 text-xs font-bold text-primary-light">🪄 Mentor</span>
          </div>
        </motion.div>

        {/*
          Mobile (< sm): 2-pane: editor (4/7) + mentor (3/7), problem pane hidden
          Desktop (sm+): 3-pane 12-col grid: problem (3) + editor (5) + mentor (4)
        */}
        <div className="mt-2 sm:mt-3 grid flex-1 grid-cols-7 sm:grid-cols-12 gap-2 overflow-hidden">

          {/* ── Problem pane: desktop only ── */}
          <div className="hidden sm:flex sm:col-span-3 flex-col overflow-hidden rounded-xl border border-[#2E4A6E] bg-[#1C3050]">
            <div className="border-b border-[#2E4A6E] px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white">
              Problem
            </div>
            <div className="flex-1 overflow-hidden p-3 text-[12px] font-medium leading-relaxed text-white">
              <div className="mb-2 text-[13px] font-bold">Fibonacci Sequence</div>
              <p>Write <span className="font-mono font-bold text-primary-light">fib(n)</span>: return the n-th Fibonacci number.</p>
              <div className="mt-3 rounded-lg bg-[#060E1A] p-2.5 font-mono text-[11px] leading-5">
                <div className="text-[#4B6FA8]">Input:</div>
                <div className="font-bold text-white">n = 6</div>
                <div className="mt-1 text-[#4B6FA8]">Output:</div>
                <div className="font-bold text-white">8</div>
              </div>
              <div className="mt-3 font-semibold">Constraints: 0 ≤ n ≤ 30</div>
            </div>
          </div>

          {/* ── Editor pane ── */}
          <div className="col-span-4 sm:col-span-5 flex flex-col overflow-hidden rounded-xl border border-[#2E4A6E] bg-[#1C3050]">
            <div className="flex items-center justify-between border-b border-[#2E4A6E] px-2 sm:px-3 py-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-white">Python 3</span>
              <div className="flex gap-1 sm:gap-1.5">
                <span className="hidden sm:inline rounded px-2 py-0.5 text-[11px] font-medium text-[#7B9EC8]">Reset</span>
                <span className="rounded bg-accent-green/25 px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-accent-green">▶ Run</span>
                <span className="rounded bg-primary-blue px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white">Submit</span>
              </div>
            </div>
            <div className="flex-1 bg-[#060E1A] p-2 sm:p-4">
              {CODE_LINES.map((line, i) => <CodeLine key={i} local={local} line={line} />)}
            </div>
          </div>

          {/* ── AI Mentor pane ── */}
          <div className="col-span-3 sm:col-span-4 flex flex-col overflow-hidden rounded-xl border border-primary-blue/60 bg-[#1C3050]">
            <div className="flex items-center justify-between border-b border-[#2E4A6E] px-2 sm:px-3 py-2">
              <span className="text-[10px] sm:text-[12px] font-bold text-primary-light">🪄 Mentor</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-white">
                <motion.span>{tokens}</motion.span>
              </span>
            </div>
            <div className="flex-1 space-y-1.5 sm:space-y-2 overflow-y-auto p-2 sm:p-3">
              {CHAT.map((msg, i) => <Bubble key={i} local={local} msg={msg} />)}
            </div>
            <div className="border-t border-[#2E4A6E] p-1.5 sm:p-2">
              <div className="rounded-lg bg-[#060E1A] px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-medium text-[#4B6FA8]">
                Ask for a hint…
              </div>
            </div>
          </div>

        </div>
      </div>
    </SceneFrame>
  );
}
