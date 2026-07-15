"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const STATS = [
  { icon: "✓", label: "Submitted",   value: 28, color: "green"   },
  { icon: "⏱", label: "In Progress", value: 0,  color: "amber"   },
  { icon: "▢", label: "Not Started", value: 0,  color: "neutral" },
  { icon: "⚠", label: "Flagged",     value: 3,  color: "red"     },
];

const ROWS = [
  { name: "Dev Student", id: "1CX22CS001", flags: ["Tab ×3", "Resume ×3"], marks: 0,  tests: "6/6", uv: "Failed" },
  { name: "Aanya R.",    id: "1CX22CS014", flags: [],                       marks: 8,  tests: "6/6", uv: "Passed" },
  { name: "Karthik M.",  id: "1CX22CS027", flags: ["Paste ×1"],             marks: 6,  tests: "5/6", uv: "Verify" },
];

function Row({ i, local, r }: { i: number; local: MotionValue<number>; r: (typeof ROWS)[number] }) {
  const at = 0.25 + i * 0.12;
  const op = useTransform(local, [at, at + 0.08], [0, 1]);
  const y  = useTransform(local, [at, at + 0.08], [10, 0]);
  const flagCls = r.flags.some(f => f.includes("Tab"))
    ? "border-red-500/50 bg-red-500/15 text-red-400"
    : "border-accent-amber/50 bg-accent-amber/15 text-accent-amber";
  const uvCls =
    r.uv === "Passed" ? "text-accent-green" :
    r.uv === "Failed" ? "text-red-400" : "text-accent-amber";

  return (
    <motion.div style={{ opacity: op, y }} className="border-b border-[#1C3050]">
      {/* Mobile row: simplified 3-column */}
      <div className="sm:hidden flex items-center justify-between px-3 py-2.5 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {r.flags.length > 0 && <span className="shrink-0 text-[11px] text-red-400">⚠</span>}
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-white truncate">{r.name}</div>
            <div className="text-[10px] font-medium text-white">{r.id}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[11px] font-bold ${uvCls}`}>{r.uv}</span>
          <span className="text-[13px] font-bold text-white w-5 text-right">{r.marks}</span>
        </div>
      </div>

      {/* Desktop row: full 12-column grid */}
      <div className="hidden sm:grid grid-cols-12 items-center gap-2 px-3 py-2.5">
        <div className="col-span-4 flex items-center gap-2">
          {r.flags.length > 0 && <span className="text-[11px] text-red-400">⚠</span>}
          <div>
            <div className="text-[12px] font-bold text-white">{r.name}</div>
            <div className="text-[10px] font-medium text-white">{r.id}</div>
          </div>
        </div>
        <div className="col-span-2 text-[11px] font-bold text-accent-green">Submitted</div>
        <div className="col-span-1">
          <span className="inline-block h-2 w-2 rounded-full bg-accent-green" />
        </div>
        <div className="col-span-3 flex flex-wrap gap-1">
          {r.flags.map(f => (
            <span key={f} className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${flagCls}`}>{f}</span>
          ))}
        </div>
        <div className="col-span-2 text-right text-[13px] font-bold text-white">{r.marks}</div>
      </div>
    </motion.div>
  );
}

export default function SceneExam({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local    = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.10], [0, 1]);
  const headerY  = useTransform(local, [0, 0.15], [12, 0]);
  const statsOp  = useTransform(local, [0.05, 0.20], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col overflow-hidden px-3 sm:px-5 py-3 sm:py-4">
        <motion.div style={{ opacity: headerOp, y: headerY }}
          className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-white">← 1st Internal Exam</span>
              <span className="rounded border border-accent-green/50 bg-accent-green/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-green">Active</span>
            </div>
            <div className="mt-1 text-[10px] sm:text-xs font-medium text-white">CS-A · 24 May · 1 question · UV required</div>
          </div>
          <div className="flex gap-1 shrink-0">
            <span className="hidden sm:inline rounded border border-red-500/50 bg-red-500/15 px-2.5 py-1 text-[11px] font-bold text-red-400">⏹ End</span>
            <span className="rounded border border-[#2E4A6E] bg-[#1C3050] px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white">↻</span>
            <span className="rounded border border-primary-blue/50 bg-primary-blue/20 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-primary-light">↓ CSV</span>
          </div>
        </motion.div>

        <motion.div style={{ opacity: statsOp }} className="mt-2 sm:mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
          {STATS.map(s => (
            <div key={s.label} className="flex items-center gap-1.5 sm:gap-2.5 rounded-xl border border-[#2E4A6E] bg-[#1C3050] px-2 sm:px-3 py-2">
              <span className={`text-base sm:text-lg font-bold ${
                s.color === "green" ? "text-accent-green" :
                s.color === "amber" ? "text-accent-amber" :
                s.color === "red"   ? "text-red-400" : "text-white"
              }`}>{s.icon}</span>
              <div>
                <div className="text-[13px] sm:text-[15px] font-bold leading-none text-white">{s.value}</div>
                <div className="mt-0.5 text-[8px] sm:text-[10px] font-semibold text-white leading-none">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-2 sm:mt-3 border-b border-[#2E4A6E] px-1 text-[11px] uppercase tracking-wider">
          <span className="mr-4 border-b-2 border-primary-blue pb-1.5 font-bold text-primary-light">Live Monitor</span>
          <span className="font-medium text-white">Results</span>
        </div>

        {/* Desktop header row */}
        <div className="hidden sm:grid grid-cols-12 gap-2 border-b border-[#2E4A6E] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
          <div className="col-span-4">Student</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Q</div>
          <div className="col-span-3">Flags</div>
          <div className="col-span-2 text-right">Marks</div>
        </div>
        {/* Mobile header row */}
        <div className="sm:hidden flex justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white border-b border-[#2E4A6E]">
          <span>Student</span>
          <div className="flex gap-4">
            <span>UV</span>
            <span>Marks</span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {ROWS.map((r, i) => <Row key={r.id} i={i} local={local} r={r} />)}
        </div>
      </div>
    </SceneFrame>
  );
}
