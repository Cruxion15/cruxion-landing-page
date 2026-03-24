"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll, SplitText, FloatingOrb } from "./AnimationUtils";

export default function UVDifferentiator() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: "#060f22" }} aria-labelledby="uv-heading">
      <FloatingOrb size={600} color="rgba(59,130,246,0.04)" duration={12} className="left-1/2 top-0 -translate-x-1/2" />

      {/* Moving background grain */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)`,
            backgroundSize: "800px 800px",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-4 flex justify-center">
            <motion.span
              className="inline-flex items-center rounded-full border border-primary-blue/20 bg-primary-blue/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-primary-light"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59,130,246,0.12)" }}
              transition={{ duration: 0.3 }}
            >
              The core differentiator — no other platform does this
            </motion.span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 id="uv-heading" className="mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            <SplitText>Every other platform checks if your code ran. We check if you</SplitText>{" "}
            <SplitText className="gradient-text-blue" delay={0.5}>understood why.</SplitText>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-secondary sm:text-lg">
            After every 10/10 pass, the Understanding Verification module asks
            three Socratic questions about the student&apos;s own specific code.
            Questions reference their own variable names and their own approach. A
            student who copied cannot answer them.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
