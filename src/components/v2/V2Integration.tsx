"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "../AnimationUtils";

const STAYS = [
  "University curriculum & syllabus",
  "Faculty leadership & teaching",
  "Lab schedules & timetable",
  "Internal marks & examination cell",
  "Existing IT, LMS, attendance",
];

const ADDS = [
  "Cloud Engineering track — AWS · GCP · Azure",
  "AI mentor for every student",
  "Understanding Verification",
  "Proctored exam mode + CSV export",
  "On-site mentor visits + workshops",
];

const DISCIPLINES = [
  "Computer Science",
  "ECE",
  "AI / ML",
  "Embedded Systems",
  "Cloud Computing",
  "IoT",
  "System Design",
];

export default function V2Integration() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0.1, 0.5], [-24, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.5], [24, 0]);
  const seamOp = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05), transparent 55%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-blue/40 bg-primary-blue/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
            College ↔ Industry · The Bridge
          </div>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            <SplitText className="block text-text-primary">
              Built around your college.
            </SplitText>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block bg-gradient-to-r from-primary-blue to-accent-amber bg-clip-text text-transparent"
            >
              Connected to industry.
            </motion.span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            Your faculty teach the syllabus. Cruxion pipes in the workflows,
            tools, and expectations of the engineering industry — so students
            graduate fluent in both. <span className="text-text-primary">No
            curriculum changes. No new infrastructure. Faculty stay in
            command.</span>
          </p>
        </div>

        {/* Interlocking columns */}
        <div className="relative mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            style={{ x: leftX }}
            className="relative rounded-2xl border border-border-subtle bg-surface-card/40 p-7 backdrop-blur"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
              Your college — stays exactly as it is
            </div>
            <ul className="mt-5 space-y-3">
              {STAYS.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <span className="h-1 w-1 rounded-full bg-text-tertiary" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            style={{ x: rightX }}
            className="relative rounded-2xl border border-primary-blue/30 bg-gradient-to-br from-primary-blue/10 to-transparent p-7 backdrop-blur"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-primary-light">
              Cruxion — adds on top
            </div>
            <ul className="mt-5 space-y-3">
              {ADDS.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm text-text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary-blue" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Seam glow */}
          <motion.div
            style={{ opacity: seamOp }}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary-blue/60 to-transparent md:block"
          />
        </div>

        {/* Disciplines strip */}
        <div className="mt-24 text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
            Engineering-first · multi-discipline
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {DISCIPLINES.map((d, i) => (
              <motion.span
                key={d}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-full border border-border-subtle bg-surface-card/80 px-4 py-1.5 text-xs font-medium text-text-secondary"
              >
                {d}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
