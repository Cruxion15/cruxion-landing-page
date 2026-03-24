"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll, SplitText } from "./AnimationUtils";

const tabs = ["Student workspace", "Faculty dashboard", "HOD analytics"] as const;

export default function WorkspacePreview() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Student workspace");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative py-32" aria-labelledby="workspace-heading" id="students">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-4 flex justify-center">
            <motion.span
              className="inline-flex items-center rounded-full border border-border-subtle bg-surface-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(15,23,42,0.8)" }}
              transition={{ duration: 0.3 }}
            >
              The student workspace
            </motion.span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            id="workspace-heading"
            className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            <SplitText>Everything a student needs in</SplitText>{" "}
            <SplitText className="gradient-text-blue" delay={0.3}>one screen.</SplitText>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-secondary sm:text-lg">
            A professional three-pane environment — real-world problem context, a
            Monaco code editor (the same engine behind VS Code), and a Socratic AI
            mentor that asks questions instead of giving answers.
          </p>
        </RevealOnScroll>

        {/* Tabs */}
        <RevealOnScroll delay={0.15}>
          <div className="mt-10 flex justify-center" role="tablist" aria-label="Workspace view tabs">
            <div className="inline-flex rounded-xl border border-border-subtle bg-surface-card/60 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/20"
                      : "text-text-tertiary hover:text-text-secondary hover:bg-surface-card-secondary/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Workspace preview with parallax */}
        <motion.div style={{ y: cardY }} className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 60, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-label={activeTab}
            >
              {activeTab === "Student workspace" && (
                <div className="grid gap-4 lg:grid-cols-3">
                  {/* Pane 1: Problem briefing */}
                  <motion.div
                    initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-border-subtle bg-surface-card p-6"
                    whileHover={{
                      borderColor: "rgba(59,130,246,0.2)",
                      boxShadow: "0 20px 60px rgba(59,130,246,0.06)",
                      backgroundColor: "rgba(15,23,42,0.9)",
                      transition: { duration: 0.4 },
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-text-primary">Count Occurrences</h3>
                    </div>
                    <div className="mb-4 flex gap-2">
                      <span className="rounded-md bg-accent-amber/10 px-2 py-0.5 text-xs font-medium text-accent-amber">Intermediate</span>
                      <span className="rounded-md bg-surface-card-secondary px-2 py-0.5 text-xs text-text-tertiary">Week 3</span>
                    </div>
                    <div className="mb-4 rounded-lg border border-primary-blue/10 bg-primary-blue/[0.04] p-3">
                      <p className="text-xs font-medium text-primary-light">Why it matters</p>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        Search engines count word frequency to rank pages. You&apos;re building exactly that core logic today.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-tertiary">Problem</p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        Given a list and a target value, return how many times the target appears. Must run in O(n) time.
                      </p>
                    </div>
                  </motion.div>

                  {/* Pane 2: Code editor */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-border-subtle bg-[#010b18] p-6"
                    whileHover={{
                      borderColor: "rgba(59,130,246,0.2)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                      transition: { duration: 0.4 },
                    }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" aria-hidden="true" />
                      </div>
                      <span className="ml-2 text-xs text-text-tertiary">solution.py</span>
                    </div>
                    <pre className="overflow-x-auto text-xs leading-6 sm:text-sm">
                      <code className="font-mono">
                        <span className="text-purple-400">def</span>{" "}
                        <span className="text-primary-light">count_occurrences</span>
                        <span className="text-text-tertiary">(</span>
                        <span className="text-accent-amber">arr</span>
                        <span className="text-text-tertiary">,</span>{" "}
                        <span className="text-accent-amber">target</span>
                        <span className="text-text-tertiary">):</span>
                        {"\n"}
                        <span className="text-text-tertiary">{"    "}# initialise before the loop</span>
                        {"\n"}{"    "}
                        <span className="text-text-primary">count</span>{" "}
                        <span className="text-primary-blue">=</span>{" "}
                        <span className="text-accent-amber">0</span>
                        {"\n"}{"    "}
                        <span className="text-purple-400">for</span>{" "}
                        <span className="text-text-primary">item</span>{" "}
                        <span className="text-purple-400">in</span>{" "}
                        <span className="text-text-primary">arr</span>
                        <span className="text-text-tertiary">:</span>
                        {"\n"}{"        "}
                        <span className="text-purple-400">if</span>{" "}
                        <span className="text-text-primary">item</span>{" "}
                        <span className="text-primary-blue">==</span>{" "}
                        <span className="text-text-primary">target</span>
                        <span className="text-text-tertiary">:</span>
                        {"\n"}{"            "}
                        <span className="text-text-primary">count</span>{" "}
                        <span className="text-primary-blue">+=</span>{" "}
                        <span className="text-accent-amber">1</span>
                        {"\n"}{"    "}
                        <span className="text-purple-400">return</span>{" "}
                        <span className="text-text-primary">count</span>
                      </code>
                    </pre>
                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent-green/20 bg-accent-green/[0.06] px-3 py-1.5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <svg className="h-3.5 w-3.5 text-accent-green" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="3 8 7 12 13 4" />
                      </svg>
                      <span className="text-xs font-medium text-accent-green">10 / 10 tests passed — Understanding check unlocked</span>
                    </motion.div>
                  </motion.div>

                  {/* Pane 3: Understanding Verification */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-border-subtle bg-surface-card p-6"
                    whileHover={{
                      borderColor: "rgba(59,130,246,0.2)",
                      boxShadow: "0 20px 60px rgba(59,130,246,0.06)",
                      backgroundColor: "rgba(15,23,42,0.9)",
                      transition: { duration: 0.4 },
                    }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-primary-blue"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold tracking-wide text-primary-light">UNDERSTANDING VERIFICATION</span>
                    </div>
                    <div className="rounded-xl border border-primary-blue/10 bg-primary-blue/[0.03] p-4">
                      <p className="text-sm leading-relaxed text-text-primary">
                        &ldquo;You initialised count before the loop, not inside it. What would happen to your result if it was inside the loop? Walk me through it.&rdquo;
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-text-tertiary">Question 1 of 3</span>
                      <span className="text-xs text-text-tertiary">47 words written</span>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-text-secondary">Understanding Score</span>
                        <span className="text-sm font-bold text-accent-green">74/100</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-surface-card-secondary">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-green/70"
                          initial={{ width: 0 }}
                          whileInView={{ width: "74%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === "Faculty dashboard" && (
                <motion.div
                  className="flex items-center justify-center rounded-2xl border border-border-subtle bg-surface-card p-16"
                  whileHover={{
                    borderColor: "rgba(59,130,246,0.2)",
                    boxShadow: "0 20px 60px rgba(59,130,246,0.06)",
                    transition: { duration: 0.4 },
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/10"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <svg className="h-8 w-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                      </svg>
                    </motion.div>
                    <p className="text-lg font-semibold text-text-primary">Faculty Dashboard</p>
                    <p className="mt-2 text-sm text-text-secondary">Real-time heatmaps, at-risk alerts, and one-click marks export</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "HOD analytics" && (
                <motion.div
                  className="flex items-center justify-center rounded-2xl border border-border-subtle bg-surface-card p-16"
                  whileHover={{
                    borderColor: "rgba(245,158,11,0.2)",
                    boxShadow: "0 20px 60px rgba(245,158,11,0.06)",
                    transition: { duration: 0.4 },
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber/10"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <svg className="h-8 w-8 text-accent-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" />
                      </svg>
                    </motion.div>
                    <p className="text-lg font-semibold text-text-primary">HOD Analytics</p>
                    <p className="mt-2 text-sm text-text-secondary">Department-wide understanding trends across all sections and semesters</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
