"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

export default function SceneWelcome({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const local       = useLocalProgress(progress, range[0], range[1]);
  const sparkleS    = useTransform(local, [0, 0.4],  [0.8, 1]);
  const titleY      = useTransform(local, [0, 0.5],  [12, 0]);
  const titleOp     = useTransform(local, [0.1, 0.4],[0, 1]);
  const subOp       = useTransform(local, [0.25, 0.55], [0, 1]);
  const captionOp   = useTransform(local, [0.55, 0.85], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <motion.div style={{ scale: sparkleS }}
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-blue/40 bg-primary-blue/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#93C5FD" />
          </svg>
        </motion.div>

        <motion.h2 style={{ y: titleY, opacity: titleOp }}
          className="text-3xl font-bold text-white sm:text-4xl">
          Welcome back, Dev
        </motion.h2>

        <motion.p style={{ opacity: subOp }}
          className="mt-3 max-w-sm text-sm font-medium text-white">
          Pick a section from the left to get started. Each section loads only when you open it.
        </motion.p>

        <motion.div style={{ opacity: captionOp }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#2E4A6E] bg-[#1C3050] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white">
          <span className="h-2 w-2 rounded-full bg-accent-green" />
          Let&apos;s take a tour
        </motion.div>
      </div>
    </SceneFrame>
  );
}
