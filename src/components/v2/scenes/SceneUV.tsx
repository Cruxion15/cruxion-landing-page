"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const QUESTIONS = [
  {
    n: 1, at: 0.1,
    q: "On line 2, you wrote `if n < 2: return n`. How would your function behave if `n = -1` was passed in?",
    answer: "", placeholder: "Write your answer (min 10 characters)...",
  },
  {
    n: 2, at: 0.35,
    q: "Your recurrence calls `fib(n-1) + fib(n-2)` without storing results. For `n = 30`, roughly how many total calls will be made?",
    answer: "each call branches into 2 more so it grows as 2^n. for n=30 thats around a billion calls. same subproblems get computed again and again.",
    placeholder: "",
  },
  {
    n: 3, at: 0.6,
    q: "If you wanted to compute `fib(100)`, what's the practical problem? What single line could bring this down to O(n)?",
    answer: "fib(100) wont finish in any reasonable time. i can add memoization using a dict to cache fib(k) the first time and return from cache after that.",
    placeholder: "",
  },
];

function Question({ local, qa }: { local: MotionValue<number>; qa: (typeof QUESTIONS)[number] }) {
  const qOp = useTransform(local, [qa.at, qa.at + 0.05], [0, 1]);
  const qY  = useTransform(local, [qa.at, qa.at + 0.05], [12, 0]);
  const aOp = useTransform(local, [qa.at + 0.08, qa.at + 0.14], [0, 1]);
  return (
    <div className="space-y-2">
      <motion.div style={{ opacity: qOp, y: qY }}>
        <div className="text-[13px] font-medium leading-relaxed text-white">
          <span className="font-bold text-primary-light">Q{qa.n}.</span> {qa.q}
        </div>
      </motion.div>
      <motion.div style={{ opacity: aOp }}
        className={`min-h-[44px] rounded-xl border px-3 py-2.5 ${
          qa.answer
            ? "border-[#2E4A6E] bg-[#1C3050]"
            : "border-primary-blue/60 bg-primary-blue/10 ring-1 ring-primary-blue/30"
        }`}>
        {qa.answer
          ? <div className="text-[12px] font-medium leading-relaxed text-white">{qa.answer}</div>
          : <div className="flex items-center gap-1 text-[12px] font-medium text-[#4B6FA8]">
              <span>{qa.placeholder}</span>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                className="ml-0.5 inline-block h-3 w-[1px] bg-primary-light" />
            </div>
        }
      </motion.div>
    </div>
  );
}

export default function SceneUV({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local    = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.08], [0, 1]);
  const headerY  = useTransform(local, [0, 0.12], [12, 0]);
  const submitOp = useTransform(local, [0.88, 0.96], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col px-4 sm:px-6 py-4 sm:py-5">
        <motion.div style={{ opacity: headerOp, y: headerY }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <span className="text-base font-bold text-white">Understanding Verification</span>
          </div>
          <div className="mt-1 text-xs font-medium text-white">
            Answer these questions to earn marks for this problem.
          </div>
        </motion.div>
        <div className="mt-4 flex-1 space-y-4 overflow-hidden">
          {QUESTIONS.map((qa) => <Question key={qa.n} local={local} qa={qa} />)}
        </div>
        <motion.button style={{ opacity: submitOp }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2E4A6E] bg-[#1C3050] px-4 py-2.5 text-[12px] font-bold text-white hover:bg-primary-blue">
          ▷ Submit Answers
        </motion.button>
      </div>
    </SceneFrame>
  );
}
