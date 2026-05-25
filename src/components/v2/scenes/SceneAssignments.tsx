"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const ITEMS = [
  { title: "Week 4 — Recursion & Backtracking", sub: "12 problems · Python",      status: "open",     color: "amber" },
  { title: "Week 3 — Dynamic Programming I",    sub: "Verified · 8/10 understood", status: "verified", color: "green" },
  { title: "Week 2 — Sliding Window",           sub: "Re-attempt requested",        status: "review",   color: "blue"  },
  { title: "Week 1 — Arrays & Two Pointers",    sub: "Complete · 100% UV",          status: "complete", color: "green" },
];

function Card({ i, local, item }: { i: number; local: MotionValue<number>; item: (typeof ITEMS)[number] }) {
  const startAt = 0.15 + i * 0.12;
  const op = useTransform(local, [startAt, startAt + 0.15], [0, 1]);
  const x  = useTransform(local, [startAt, startAt + 0.15], [40, 0]);
  const badge =
    item.color === "amber" ? "border-accent-amber/50 bg-accent-amber/20 text-accent-amber" :
    item.color === "green" ? "border-accent-green/50 bg-accent-green/20 text-accent-green" :
                             "border-primary-blue/50 bg-primary-blue/20 text-primary-light";
  return (
    <motion.div style={{ opacity: op, x }}
      className="flex items-center justify-between rounded-xl border border-[#2E4A6E] bg-[#1C3050] px-3 sm:px-5 py-2.5 sm:py-3.5">
      <div>
        <div className="text-sm font-bold text-white">{item.title}</div>
        <div className="mt-0.5 text-xs font-medium text-white">{item.sub}</div>
      </div>
      <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${badge}`}>
        {item.status}
      </span>
    </motion.div>
  );
}

export default function SceneAssignments({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local    = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const headerY  = useTransform(local, [0, 0.20], [12, 0]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col px-4 sm:px-6 py-4 sm:py-6">
        <motion.div style={{ opacity: headerOp, y: headerY }}>
          <div className="text-xs sm:text-sm font-bold text-white">📖 Assignments</div>
          <div className="mt-1 flex items-center gap-3 flex-wrap">
            <span className="text-base sm:text-xl font-bold text-white">CS-3001 · Data Structures</span>
            <span className="rounded-full border border-accent-green/50 bg-accent-green/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-green">
              Section A
            </span>
          </div>
          <div className="mt-1 text-xs font-medium text-white">
            Week 4 is open · 3 previous submissions on record
          </div>
        </motion.div>
        <div className="mt-6 space-y-2.5">
          {ITEMS.map((item, i) => <Card key={item.title} i={i} local={local} item={item} />)}
        </div>
      </div>
    </SceneFrame>
  );
}
