"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bezel, DISPLAY, EASE, Reveal, StopHead, cx } from "./ui";

// A slice of the in-product plan (packages/types/src/dsa/plan.ts), company tags as listed there.
const PROBLEMS: { t: string; level: "easy" | "medium" | "hard"; co: string[] }[] = [
  { t: "Two Sum", level: "easy", co: ["Amazon", "Google", "Microsoft", "Adobe"] },
  { t: "Two Sum on a Sorted Array", level: "medium", co: ["Amazon", "Meta", "Microsoft"] },
  { t: "Balanced Brackets", level: "easy", co: ["Amazon", "Microsoft", "Bloomberg", "Meta"] },
  { t: "Find the Target", level: "easy", co: ["Google", "Microsoft", "Amazon"] },
  { t: "Longest Run of Unique Characters", level: "medium", co: ["Amazon", "Google", "Bloomberg", "Microsoft"] },
  { t: "Majority Element", level: "easy", co: ["Amazon", "Google"] },
  { t: "Stock Buy & Sell", level: "easy", co: ["Walmart", "Swiggy", "Google"] },
  { t: "Kadane's Algorithm", level: "medium", co: ["Microsoft", "Meta"] },
  { t: "4Sum", level: "medium", co: ["Adobe", "OYO", "Uber"] },
  { t: "Next Permutation", level: "medium", co: ["Uber", "Goldman Sachs", "Adobe"] },
  { t: "Merge Overlapping Intervals", level: "medium", co: ["Google"] },
  { t: "Word Search", level: "medium", co: ["Ola", "Goldman Sachs", "Google"] },
  { t: "Count Inversions", level: "hard", co: ["Google", "Amazon", "Salesforce"] },
  { t: "Sliding Window Maximum", level: "hard", co: ["Flipkart", "Google", "Microsoft"] },
];
const FILTERS = ["All", "Google", "Amazon", "Microsoft", "Meta", "Adobe", "Uber", "Goldman Sachs"];
const MARQUEE = ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Uber", "Goldman Sachs", "Flipkart", "Bloomberg", "Walmart", "Swiggy", "Salesforce", "Morgan Stanley", "LinkedIn"];
const LEVEL = { easy: "text-accent-green bg-accent-green/10", medium: "text-accent-amber bg-accent-amber/10", hard: "text-red-300 bg-red-400/10" };

function Row({ reverse }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-12 pr-12"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...MARQUEE, ...MARQUEE].map((c, i) => (
          <span key={i} className={cx(`${DISPLAY} whitespace-nowrap text-3xl font-bold tracking-tight sm:text-5xl`, i % 3 === 1 ? "text-white/80" : "text-white/15")}>{c}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Companies() {
  const [f, setF] = useState("All");
  const list = f === "All" ? PROBLEMS : PROBLEMS.filter((p) => p.co.includes(f));

  return (
    <section id="companies" data-stop="companies" className="scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <StopHead
          n={6}
          label="Companies"
          title="Practise what they *actually* *ask.*"
          sub="Every problem is tagged with the companies known to ask it. Filter, then practise with a target in mind."
        />
      </div>

      <Reveal className="mt-10 space-y-4">
        <Row />
        <Row reverse />
      </Reveal>

      <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6">
        <Reveal>
          <Bezel core="p-5 sm:p-8">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {FILTERS.map((c) => (
                <button key={c} type="button" onClick={() => setF(c)}
                  className={cx("relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300", f === c ? "text-surface-bg" : "text-text-tertiary ring-1 ring-white/10 hover:text-text-primary")}>
                  {f === c && <motion.span layoutId="co-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <ul className="mt-6 min-h-[280px] divide-y divide-white/[0.06]">
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((p) => (
                  <motion.li key={p.t} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
                    className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className={cx("rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize", LEVEL[p.level])}>{p.level}</span>
                      <span className="text-text-secondary">{p.t}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.co.map((c) => (
                        <span key={c} className={cx("rounded-md px-2 py-0.5 text-[11px]", c === f ? "bg-primary-blue/20 text-primary-light" : "bg-white/[0.04] text-text-tertiary")}>{c}</span>
                      ))}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Bezel>
          <p className="mt-4 text-center text-xs text-text-tertiary">Company names are trademarks of their owners, shown only to indicate where a question has been reported. No affiliation implied.</p>
        </Reveal>
      </div>
    </section>
  );
}
