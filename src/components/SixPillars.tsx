"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "./AnimationUtils";

const pillars = [
  {
    title: "Progressive hint trees",
    desc: "Four depth levels of Socratic guidance. Curated by faculty who know where students get stuck. Never gives the answer.",
    icon: (<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v18M3 12h18M8 8l8 8M16 8l-8 8" /></svg>),
  },
  {
    title: "Aura points and streaks",
    desc: "Points, streaks, and section leaderboards that build daily coding habits from Semester 1.",
    icon: (<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
  },
  {
    title: "Aptitude CoT engine",
    desc: "150 curated aptitude questions with 5-stage chain-of-thought walkthroughs. Authored and verified by humans.",
    icon: (<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M9 9a3 3 0 115 2c0 2-3 3-3 3M12 17h.01" /></svg>),
  },
  {
    title: "AST plagiarism detection",
    desc: "Structural comparison not text matching. Catches renamed variables. Flags for faculty review, never auto-penalises.",
    icon: (<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  },
  {
    title: "One-click marks export",
    desc: "Excel with roll numbers, names, and marks in your department format. Zero manual data entry.",
    icon: (<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>),
  },
  {
    title: "Curriculum DAG map",
    desc: "Interactive progression from Week 1 to Semester 6. Nodes unlock when Understanding Score threshold is met.",
    icon: (<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="5" cy="6" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 6h3M14 6l3.5 10.5M12 8v8M5 8l5.5 8.5" /></svg>),
  },
];

export default function SixPillars() {
  return (
    <section className="relative py-32" aria-labelledby="pillars-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <RevealOnScroll key={pillar.title} delay={i * 0.1} scale>
              <motion.div
                className="glass-card group relative overflow-hidden p-6"
                whileHover={{
                  y: -8,
                  borderColor: "rgba(59,130,246,0.25)",
                  backgroundColor: "rgba(15,23,42,0.9)",
                  boxShadow: "0 20px 60px rgba(59,130,246,0.1)",
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary-blue/0 transition-all duration-700 group-hover:bg-primary-blue/[0.06] group-hover:blur-[60px]" aria-hidden="true" />

                <motion.div
                  className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-surface-card-secondary text-primary-light transition-all duration-500 group-hover:border-primary-blue/30 group-hover:bg-primary-blue/[0.12] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                  whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
                >
                  {pillar.icon}
                </motion.div>
                <h3 className="relative text-base font-bold text-text-primary">{pillar.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">{pillar.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
