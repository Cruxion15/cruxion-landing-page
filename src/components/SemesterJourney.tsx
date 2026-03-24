"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, SplitText } from "./AnimationUtils";

const semesters = [
  { label: "Sem 1–2", title: "Foundations", desc: "Variables, conditionals, loops, functions, arrays. Algorithmic thinking built from scratch.", highlight: false },
  { label: "Sem 3–4", title: "Core DSA", desc: "Linked lists, trees, graphs. Mini projects with real architecture decisions.", highlight: false },
  { label: "Sem 5–6", title: "Advanced + LLD", desc: "Advanced DSA, real projects, Low Level Design. Aptitude preparation at scale.", highlight: false },
  { label: "Sem 7–8", title: "Interview-ready", desc: "HLD, mock interviews, placement simulation. Understanding Score as a verified signal of ability.", highlight: true },
];

export default function SemesterJourney() {
  return (
    <section className="relative py-32" aria-labelledby="semester-heading" id="curriculum">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-4 flex justify-center">
            <motion.span
              className="inline-flex items-center rounded-full border border-border-subtle bg-surface-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(15,23,42,0.8)" }}
              transition={{ duration: 0.3 }}
            >
              The semester journey
            </motion.span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 id="semester-heading" className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            <SplitText>From Day 1 to</SplitText>{" "}
            <SplitText className="gradient-text-blue" delay={0.2}>placement-ready.</SplitText>
          </h2>
        </RevealOnScroll>

        {/* Connecting line behind cards */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-1/2 hidden h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent lg:block" aria-hidden="true" />

          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {semesters.map((sem, i) => (
              <RevealOnScroll key={sem.label} delay={i * 0.15} scale>
                <motion.div
                  className={`relative overflow-hidden rounded-2xl border p-6 ${
                    sem.highlight
                      ? "border-primary-blue/30 bg-primary-blue/[0.06]"
                      : "border-border-subtle bg-surface-card"
                  }`}
                  whileHover={{
                    y: -8,
                    borderColor: sem.highlight ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.15)",
                    backgroundColor: sem.highlight ? "rgba(59,130,246,0.12)" : "rgba(15,23,42,0.9)",
                    boxShadow: sem.highlight
                      ? "0 20px 60px rgba(59,130,246,0.15)"
                      : "0 20px 60px rgba(0,0,0,0.3)",
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  {sem.highlight && (
                    <motion.div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-blue/10 blur-[60px]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                  {/* Step number */}
                  <motion.div
                    className={`relative mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      sem.highlight ? "bg-primary-blue/20 text-primary-light" : "bg-surface-card-secondary text-text-tertiary"
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                  >
                    {i + 1}
                  </motion.div>
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${
                    sem.highlight ? "bg-primary-blue/20 text-primary-light" : "bg-surface-card-secondary text-text-tertiary"
                  }`}>
                    {sem.label}
                  </span>
                  <h3 className="relative mt-3 text-lg font-bold text-text-primary">{sem.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">{sem.desc}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
