"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, SplitText } from "./AnimationUtils";

const cards = [
  {
    title: "What does not change",
    items: ["Semester End Exam stays with university", "CIE test structure stays", "Timetable unchanged"],
    highlight: false,
  },
  {
    title: "What we replace",
    items: ["The assignment sub-component (10–20 marks)", "Paper submissions become platform problems", "Manual grading becomes automated Understanding Score"],
    highlight: true,
  },
];

export default function HowItSlotsIn() {
  return (
    <section className="relative py-32" aria-labelledby="slots-heading" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 id="slots-heading" className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            <SplitText>It replaces your assignment component —</SplitText>{" "}
            <SplitText className="text-text-secondary" delay={0.4}>nothing else.</SplitText>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-secondary sm:text-lg">
            In Karnataka affiliated colleges, the assignment sub-component of CIE
            is entirely at the faculty&apos;s discretion. No mandated format, no
            university oversight, no approval required above the faculty member.
            Cruxion slots directly into that space.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.title} delay={i * 0.15} scale>
              <motion.div
                className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
                  card.highlight
                    ? "border-primary-blue/30 bg-primary-blue/[0.06]"
                    : "border-border-subtle bg-surface-card"
                }`}
                whileHover={{
                  y: -8,
                  borderColor: card.highlight ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.15)",
                  backgroundColor: card.highlight ? "rgba(59,130,246,0.1)" : "rgba(15,23,42,0.9)",
                  boxShadow: card.highlight
                    ? "0 20px 60px rgba(59,130,246,0.15)"
                    : "0 20px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                }}
              >
                {card.highlight && (
                  <motion.div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-blue/10 blur-[60px]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    aria-hidden="true"
                  />
                )}
                <h3 className="relative text-lg font-bold text-text-primary">{card.title}</h3>
                <ul className="relative mt-5 space-y-4" role="list">
                  {card.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: j * 0.12, ease: [0.33, 1, 0.68, 1] }}
                      className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                    >
                      <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${card.highlight ? "bg-primary-blue" : "bg-text-tertiary"}`} aria-hidden="true" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
