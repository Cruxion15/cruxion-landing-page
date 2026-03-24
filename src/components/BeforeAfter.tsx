"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, SplitText, FloatingOrb } from "./AnimationUtils";

const beforeItems = [
  "Students copy assignments from each other in 30 minutes",
  "Faculty have zero visibility into who actually understands",
  "Marks awarded for submission, not comprehension",
  "No placement preparation in Semester 1–3",
  "Hours of manual collection and grading each week",
];

const afterItems = [
  "Students solve original problems independently on the platform",
  "Faculty see real-time Understanding Score per student per problem",
  "Marks reflect verified comprehension, not just working code",
  "Placement-ready habits built systematically from Semester 1",
  "Marks sheet exported to Excel in one click, ready to submit",
];

const listItemVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function BeforeAfter() {
  return (
    <section className="relative py-32 overflow-hidden" aria-labelledby="before-after-heading" id="faculty">
      <FloatingOrb size={500} color="rgba(239,68,68,0.03)" duration={10} className="-left-40 top-1/3" />
      <FloatingOrb size={500} color="rgba(34,197,94,0.03)" duration={10} delay={3} className="-right-40 top-1/3" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-4 flex justify-center">
            <motion.span
              className="inline-flex items-center rounded-full border border-border-subtle bg-surface-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(15,23,42,0.8)" }}
              transition={{ duration: 0.3 }}
            >
              The problem we are solving
            </motion.span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2
            id="before-after-heading"
            className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            <SplitText>The assignment component currently produces</SplitText>{" "}
            <SplitText className="text-accent-amber" delay={0.4}>nothing.</SplitText>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-secondary sm:text-lg">
            Every subject has 10–20 marks completely at the faculty&apos;s discretion.
            Right now those marks come from handwritten submissions that students
            copy in 30 minutes and faculty check in seconds. We replace that —
            without touching anything the university controls.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <RevealOnScroll direction="left">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-red-500/10 bg-surface-card p-8"
              whileHover={{
                borderColor: "rgba(239,68,68,0.25)",
                boxShadow: "0 20px 60px rgba(239,68,68,0.08)",
                backgroundColor: "rgba(15,23,42,0.9)",
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/[0.06] blur-[80px]" aria-hidden="true" />
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1">
                <motion.span className="h-2 w-2 rounded-full bg-red-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wide text-red-400">Right now — paper assignments</span>
              </div>
              <ul className="space-y-4" role="list">
                {beforeItems.map((item, i) => (
                  <motion.li key={item} variants={listItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                    <svg className="mt-1 h-4 w-4 flex-shrink-0 text-red-400/70" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="4" y1="4" x2="12" y2="12" />
                      <line x1="12" y1="4" x2="4" y2="12" />
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-accent-green/10 bg-surface-card p-8"
              whileHover={{
                borderColor: "rgba(34,197,94,0.25)",
                boxShadow: "0 20px 60px rgba(34,197,94,0.08)",
                backgroundColor: "rgba(15,23,42,0.9)",
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-green/[0.06] blur-[80px]" aria-hidden="true" />
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green/[0.06] px-3 py-1">
                <motion.span className="h-2 w-2 rounded-full bg-accent-green" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wide text-accent-green">With Cruxion — platform assignments</span>
              </div>
              <ul className="space-y-4" role="list">
                {afterItems.map((item, i) => (
                  <motion.li key={item} variants={listItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                    <svg className="mt-1 h-4 w-4 flex-shrink-0 text-accent-green" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="3 8 7 12 13 4" />
                    </svg>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
