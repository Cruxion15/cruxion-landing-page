"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const TRACKS = [
  {
    title: "The LLM Engineer",
    sub: "Take a model from notebook to production without paging anyone at 3am.",
    meta: "3 tiers · 27 lessons · ~4h",
    enrolled: true,
    accent: "amber",
  },
  {
    title: "Cloud Engineering",
    sub: "Build and ship on AWS, GCP, and Azure. Real deployments, not just diagrams.",
    meta: "3 tiers · 22 lessons · ~5h",
    enrolled: false,
    accent: "blue",
  },
  {
    title: "Distributed Systems",
    sub: "Consensus, queues, partitioning: the patterns behind every scale story.",
    meta: "Coming soon",
    enrolled: false,
    accent: "ghost",
  },
];

function TrackCard({
  i,
  local,
  t,
}: {
  i: number;
  local: MotionValue<number>;
  t: (typeof TRACKS)[number];
}) {
  const at = 0.2 + i * 0.15;
  const op = useTransform(local, [at, at + 0.18], [0, 1]);
  const y = useTransform(local, [at, at + 0.18], [30, 0]);
  const accent =
    t.accent === "amber"
      ? "border-accent-amber/40 bg-gradient-to-br from-accent-amber/20 to-accent-amber/5"
      : t.accent === "blue"
      ? "border-primary-blue/40 bg-gradient-to-br from-primary-blue/20 to-primary-blue/5"
      : "border-[#2E4A6E] bg-[#1C3050]";
  const btn =
    t.accent === "amber"
      ? "bg-accent-amber text-[#0A1525]"
      : t.accent === "blue"
      ? "bg-primary-blue text-white"
      : "bg-[#1C3050] text-white cursor-not-allowed";
  return (
    <motion.div
      style={{ opacity: op, y }}
      className={`flex flex-col justify-between rounded-2xl border p-5 ${accent}`}
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-base font-bold text-white">
            {t.title}
          </div>
          {t.enrolled && (
            <span className="rounded-full bg-accent-amber/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-amber">
              🔥 Enrolled
            </span>
          )}
        </div>
        <div className="text-xs font-medium leading-relaxed text-white">
          {t.sub}
        </div>
        <div className="mt-4 text-xs font-medium text-white">{t.meta}</div>
      </div>
      <button
        className={`mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium ${btn}`}
      >
        {t.accent === "ghost" ? "Coming soon" : "Start learning →"}
      </button>
    </motion.div>
  );
}

export default function SceneCrucibleCourses({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const local = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const headerY = useTransform(local, [0, 0.2], [16, 0]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col px-4 sm:px-6 py-4 sm:py-6">
        <motion.div style={{ opacity: headerOp, y: headerY }}>
          <div className="flex items-center gap-2 text-base font-semibold text-accent-amber">
            🔥 Crucible
          </div>
          <h2 className="mt-5 text-2xl font-bold text-white">
            Where engineering comes alive.
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium text-white">
            Not a content library, an engineering creation environment. Access
            is granted section-wide by your faculty.
          </p>
        </motion.div>

        <div className="mt-7 grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          {TRACKS.map((t, i) => (
            <TrackCard key={t.title} i={i} local={local} t={t} />
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
