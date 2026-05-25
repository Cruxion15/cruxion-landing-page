"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const TRACKS = [
  {
    name: "Embedded Systems",
    tier: "Apprentice",
    icon: "⚡",
    progress: 3,
    total: 8,
    color: "#3B82F6",
    textClass: "text-primary-blue",
    borderClass: "border-primary-blue/40",
    bgClass: "bg-primary-blue/10",
  },
  {
    name: "IoT Engineering",
    tier: "Engineer",
    icon: "📡",
    progress: 0,
    total: 6,
    color: "#93C5FD",
    textClass: "text-primary-light",
    borderClass: "border-primary-light/30",
    bgClass: "bg-primary-light/5",
  },
  {
    name: "Cloud Hardware",
    tier: "Architect",
    icon: "☁",
    progress: 0,
    total: 5,
    color: "#F59E0B",
    textClass: "text-accent-amber",
    borderClass: "border-accent-amber/30",
    bgClass: "bg-accent-amber/5",
  },
];

const COMPONENTS = [
  { name: "Arduino Uno R3", qty: 12, available: 8 },
  { name: "Raspberry Pi 4B", qty: 6, available: 4 },
  { name: "HC-SR04 Ultrasonic", qty: 20, available: 17 },
  { name: "LED Kit — RGB", qty: 30, available: 28 },
];

function TrackCard({
  track,
  i,
  local,
}: {
  track: (typeof TRACKS)[number];
  i: number;
  local: MotionValue<number>;
}) {
  const at = 0.18 + i * 0.1;
  const op = useTransform(local, [at, at + 0.12], [0, 1]);
  const y = useTransform(local, [at, at + 0.12], [10, 0]);
  return (
    <motion.div
      style={{ opacity: op, y }}
      className={`rounded-xl border ${track.borderClass} ${track.bgClass} p-3`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{track.icon}</span>
          <div>
            <div className="text-[11px] font-bold text-white">{track.name}</div>
            <div
              className={`text-[9px] font-bold uppercase tracking-wider ${track.textClass}`}
            >
              {track.tier}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-bold ${track.textClass}`}>
            {track.progress}/{track.total}
          </div>
          <div className="text-[9px] text-text-tertiary">lessons</div>
        </div>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${(track.progress / track.total) * 100}%`,
            backgroundColor: track.color,
            boxShadow: `0 0 8px ${track.color}60`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SceneECWelcome({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const local = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const headerY = useTransform(local, [0, 0.2], [16, 0]);
  const compOp = useTransform(local, [0.55, 0.75], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-4 sm:px-5">
        {/* Header */}
        <motion.div style={{ opacity: headerOp, y: headerY }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-amber">
            EC · Hardware Tracks
          </span>
          <h2 className="mt-2 text-base font-bold text-white sm:text-lg">
            Welcome, Priya. Your lab is open.
          </h2>
          <p className="mt-0.5 text-[11px] text-text-secondary">
            Year 1 · Embedded Systems · 8 components available to check out
          </p>
        </motion.div>

        {/* Tracks */}
        <div className="space-y-2">
          {TRACKS.map((t, i) => (
            <TrackCard key={t.name} track={t} i={i} local={local} />
          ))}
        </div>

        {/* Component library */}
        <motion.div
          style={{ opacity: compOp }}
          className="rounded-xl border border-[#2E4A6E] bg-[#060E1A] p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[9px] font-bold uppercase tracking-wider text-text-tertiary">
              Component Library
            </div>
            <span className="rounded-full bg-accent-green/20 px-2 py-0.5 text-[9px] font-bold text-accent-green">
              24 available
            </span>
          </div>
          <div className="space-y-1.5">
            {COMPONENTS.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="text-[10px] text-text-secondary">{c.name}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-14 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-accent-green/60"
                      style={{ width: `${(c.available / c.qty) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[9px] text-text-tertiary">
                    {c.available}/{c.qty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming project */}
        <motion.div
          style={{ opacity: compOp }}
          className="rounded-xl border border-accent-amber/20 bg-accent-amber/5 p-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-accent-amber">
                Active Project
              </div>
              <div className="mt-0.5 text-[11px] font-semibold text-white">
                AI-Powered Smart Traffic Intersection System
              </div>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-amber/30 bg-accent-amber/10 text-sm">
              🚦
            </div>
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}
