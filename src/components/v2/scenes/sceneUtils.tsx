"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

export function useSceneOpacity(
  progress: MotionValue<number>,
  start: number,
  end: number,
  fade = 0.035
) {
  return useTransform(
    progress,
    [start - fade, start, end, end + fade],
    [0, 1, 1, 0]
  );
}

/* Local progress 0→1 within the scene's range */
export function useLocalProgress(
  progress: MotionValue<number>,
  start: number,
  end: number
) {
  return useTransform(progress, [start, end], [0, 1]);
}

/* Hard step function: scene is ON exactly when scroll is in [start, end), OFF otherwise.
   Guarantees zero overlap between adjacent scenes. */
export function SceneFrame({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const opacity = useTransform(progress, (v) => {
    return v >= range[0] && v < range[1] ? 1 : 0;
  });
  const visibility = useTransform(opacity, (v) => (v > 0 ? "visible" : "hidden"));
  return (
    <motion.div
      style={{ opacity, visibility }}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
