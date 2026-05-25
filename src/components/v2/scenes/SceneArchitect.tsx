"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const NODES = [
  { id: "client",  x: 60,  y: 60,  label: "Client",           sub: "Web · Mobile"         },
  { id: "gateway", x: 280, y: 60,  label: "API Gateway",       sub: "Auth · Rate-limit"    },
  { id: "svc",     x: 500, y: 60,  label: "Inference Service", sub: "Stateless · Autoscale"},
  { id: "queue",   x: 280, y: 230, label: "Job Queue",         sub: "Retry · DLQ"          },
  { id: "cache",   x: 500, y: 230, label: "Vector Cache",      sub: "Redis · 200ms"        },
  { id: "db",      x: 720, y: 145, label: "Cloud Postgres",    sub: "Multi-region · WAL"   },
];

const EDGES = [
  { from: "client",  to: "gateway", at: 0.2 },
  { from: "gateway", to: "svc",     at: 0.3 },
  { from: "svc",     to: "cache",   at: 0.4 },
  { from: "svc",     to: "db",      at: 0.5 },
  { from: "gateway", to: "queue",   at: 0.6 },
  { from: "queue",   to: "svc",     at: 0.7 },
  { from: "cache",   to: "db",      at: 0.8 },
];

const NODE_W = 160; const NODE_H = 60;
const center = (id: string) => { const n = NODES.find(n => n.id === id)!; return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 }; };

function Edge({ e, local }: { e: (typeof EDGES)[number]; local: MotionValue<number> }) {
  const a = center(e.from); const b = center(e.to);
  const draw = useTransform(local, [e.at, e.at + 0.08], [0, 1]);
  const len  = Math.hypot(b.x - a.x, b.y - a.y);
  const dash = useTransform(draw, [0, 1], [len, 0]);
  return (
    <motion.line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
      stroke="#3B82F6" strokeWidth={2} strokeOpacity={0.8}
      strokeDasharray={len} style={{ strokeDashoffset: dash }} />
  );
}

function Node({ n, i, local }: { n: (typeof NODES)[number]; i: number; local: MotionValue<number> }) {
  const at    = 0.1 + i * 0.04;
  const op    = useTransform(local, [at, at + 0.08], [0, 1]);
  const scale = useTransform(local, [at, at + 0.08], [0.85, 1]);
  return (
    <motion.div style={{ opacity: op, scale, left: n.x, top: n.y }}
      className="absolute flex flex-col justify-center rounded-xl border border-[#2E4A6E] bg-[#1C3050] px-3 py-2">
      <div className="text-xs font-bold text-white">{n.label}</div>
      <div className="text-[11px] font-medium text-white">{n.sub}</div>
    </motion.div>
  );
}

/* Mobile node card — hooks must live at component level, not inside .map() */
function MobileNode({ n, i, local }: { n: (typeof NODES)[number]; i: number; local: MotionValue<number> }) {
  const at = 0.1 + i * 0.08;
  const op = useTransform(local, [at, at + 0.12], [0, 1]);
  const y  = useTransform(local, [at, at + 0.12], [8, 0]);
  return (
    <motion.div style={{ opacity: op, y }}
      className="rounded-xl border border-[#2E4A6E] bg-[#1C3050] px-3 py-2.5">
      <div className="text-[12px] font-bold text-white">{n.label}</div>
      <div className="text-[10px] font-medium text-white mt-0.5">{n.sub}</div>
    </motion.div>
  );
}

function MobileNodeList({ local }: { local: MotionValue<number> }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {NODES.map((n, i) => <MobileNode key={n.id} n={n} i={i} local={local} />)}
    </div>
  );
}

export default function SceneArchitect({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local    = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const headerY  = useTransform(local, [0, 0.20], [16, 0]);
  const captOp   = useTransform(local, [0.85, 1.0], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col px-4 sm:px-6 py-4 sm:py-5">
        <motion.div style={{ opacity: headerOp, y: headerY }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-blue/40 bg-primary-blue/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-light">
            Architect · System Design
          </span>
          <h2 className="mt-2 sm:mt-3 text-lg sm:text-xl font-bold text-white">Designs systems that scale.</h2>
          <p className="mt-1 text-xs sm:text-sm font-medium text-white">
            Cloud-native by default. AWS, GCP, Azure — the way real teams ship.
          </p>
        </motion.div>

        <div className="relative mt-3 sm:mt-4 flex-1 overflow-hidden rounded-xl border border-[#2E4A6E] bg-[#060E1A]">
          <div className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(#1C305022 1px,transparent 1px),linear-gradient(90deg,#1C305022 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

          {/* Mobile: 2-column node grid */}
          <div className="sm:hidden relative z-10 overflow-y-auto h-full">
            <MobileNodeList local={local} />
          </div>

          {/* Desktop: SVG canvas with positioned nodes */}
          <div className="hidden sm:block relative h-full w-full" style={{ minHeight: 320 }}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet">
              {EDGES.map((e, i) => <Edge key={i} e={e} local={local} />)}
            </svg>
            {NODES.map((n, i) => <Node key={n.id} n={n} i={i} local={local} />)}
          </div>

          <motion.div style={{ opacity: captOp }}
            className="absolute bottom-3 right-4 rounded-lg border border-[#2E4A6E] bg-[#1C3050] px-3 py-1.5 text-[11px] font-bold text-white">
            ☁ Cloud computing · deployed end-to-end
          </motion.div>
        </div>
      </div>
    </SceneFrame>
  );
}
