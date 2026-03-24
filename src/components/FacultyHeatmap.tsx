"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, SplitText } from "./AnimationUtils";

type CellStatus = "green" | "amber" | "red" | "blue" | "gray";

const statusColors: Record<CellStatus, string> = {
  green: "bg-accent-green",
  amber: "bg-accent-amber",
  red: "bg-red-500",
  blue: "bg-primary-blue",
  gray: "bg-text-tertiary/30",
};

const statusLabels: Record<CellStatus, string> = {
  green: "UV complete",
  amber: "In progress",
  red: "Struggling",
  blue: "UV pending",
  gray: "Not started",
};

const headers = ["W3·P1", "W3·P2", "W3·P3", "W3·P4", "W3·P5"];

const students: { name: string; flag?: boolean; scores: CellStatus[] }[] = [
  { name: "Aarav K", scores: ["green", "green", "green", "amber", "gray"] },
  { name: "Priya R", scores: ["green", "green", "green", "green", "blue"] },
  { name: "Rahul S", flag: true, scores: ["green", "amber", "red", "gray", "gray"] },
  { name: "Sneha M", scores: ["green", "green", "amber", "gray", "gray"] },
  { name: "Deepak T", flag: true, scores: ["gray", "gray", "gray", "gray", "gray"] },
];

const atRisk = [
  { name: "Deepak T", detail: "No activity in 54 hours · Has not opened any Week 3 problem" },
  { name: "Rahul S", detail: "Failed Problem 3 seven times · UV score on P2 was 28/100" },
];

export default function FacultyHeatmap() {
  return (
    <section className="relative py-32" aria-labelledby="heatmap-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-4 flex justify-center">
            <motion.span
              className="inline-flex items-center rounded-full border border-border-subtle bg-surface-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(15,23,42,0.8)" }}
              transition={{ duration: 0.3 }}
            >
              For faculty — live visibility
            </motion.span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 id="heatmap-heading" className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            <SplitText>See every student&apos;s understanding</SplitText>{" "}
            <SplitText className="gradient-text-blue" delay={0.3}>at a glance.</SplitText>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-secondary sm:text-lg">
            The live heatmap updates in real time as students work. Green means
            understood and verified. Amber means in progress. Red means
            struggling. You see 80 students in one view and know exactly who needs
            a conversation before the next lab session.
          </p>
        </RevealOnScroll>

        {/* Heatmap */}
        <RevealOnScroll delay={0.15} scale>
          <div className="mt-12 overflow-x-auto">
            <motion.div
              className="mx-auto max-w-2xl rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8"
              whileHover={{
                borderColor: "rgba(255,255,255,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                transition: { duration: 0.4 },
              }}
            >
              <table className="w-full" role="grid" aria-label="Student understanding heatmap">
                <thead>
                  <tr>
                    <th className="pb-4 text-left text-xs font-medium text-text-tertiary">Student</th>
                    {headers.map((h) => (
                      <th key={h} className="pb-4 text-center text-xs font-mono font-medium text-text-tertiary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, si) => (
                    <motion.tr
                      key={student.name}
                      initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: si * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-border-subtle"
                    >
                      <td className="py-3 pr-4 text-sm text-text-primary">
                        {student.name}
                        {student.flag && <span className="ml-1 text-accent-amber" aria-label="At risk">&#9873;</span>}
                      </td>
                      {student.scores.map((status, pi) => (
                        <td key={pi} className="py-3 text-center">
                          <motion.div
                            initial={{ scale: 0, borderRadius: "50%" }}
                            whileInView={{ scale: 1, borderRadius: "8px" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: si * 0.12 + pi * 0.08,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                            className={`mx-auto h-8 w-8 ${statusColors[status]}`}
                            aria-label={`${student.name} ${headers[pi]}: ${statusLabels[status]}`}
                            role="gridcell"
                          />
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border-subtle pt-4">
                {(Object.keys(statusLabels) as CellStatus[]).map((status) => (
                  <div key={status} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded ${statusColors[status]}`} aria-hidden="true" />
                    <span className="text-xs text-text-tertiary">{statusLabels[status]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </RevealOnScroll>

        {/* At-risk panel */}
        <RevealOnScroll delay={0.2} direction="up">
          <div className="mx-auto mt-6 max-w-2xl">
            <motion.div
              className="rounded-2xl border border-accent-amber/20 bg-accent-amber/[0.04] p-6"
              whileHover={{
                borderColor: "rgba(245,158,11,0.35)",
                boxShadow: "0 20px 60px rgba(245,158,11,0.08)",
                transition: { duration: 0.4 },
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <motion.span
                  className="text-accent-amber"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  &#9873;
                </motion.span>
                <h3 className="text-sm font-bold text-accent-amber">At-risk students — auto-detected</h3>
              </div>
              <div className="space-y-3">
                {atRisk.map((student, i) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-1 rounded-xl border border-border-subtle bg-surface-card/60 px-4 py-3 transition-all duration-400 hover:border-accent-amber/25 hover:bg-surface-card/80 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-semibold text-text-primary">{student.name}</span>
                    <span className="text-xs text-text-tertiary">{student.detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
