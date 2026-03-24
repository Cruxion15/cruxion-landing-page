"use client";

import { motion } from "framer-motion";
import { Counter, RevealOnScroll } from "./AnimationUtils";

const stats = [
  {
    value: 80,
    suffix: "%+",
    label: "Understanding Verification completion rate in pilot cohort",
  },
  {
    prefix: "<",
    value: 10,
    suffix: " min",
    label: "To create and publish a lab assignment with auto-grading",
  },
  {
    value: 0,
    suffix: "",
    label: "Changes needed to your syllabus, timetable, or curriculum",
    isZero: true,
  },
];

export default function StatsRow() {
  return (
    <section className="relative py-20" aria-label="Key statistics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.15} scale>
              <motion.div
                className="glass-card group p-8 text-center"
                whileHover={{
                  y: -8,
                  borderColor: "rgba(59,130,246,0.25)",
                  backgroundColor: "rgba(15,23,42,0.9)",
                  boxShadow: "0 20px 60px rgba(59,130,246,0.1)",
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div className="text-4xl font-extrabold tracking-tight text-text-primary transition-colors duration-500 group-hover:text-primary-blue sm:text-5xl">
                  {stat.isZero ? (
                    <span>0</span>
                  ) : (
                    <Counter
                      target={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {stat.label}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
