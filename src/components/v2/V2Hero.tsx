"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "../AnimationUtils";

export default function V2Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden pt-20"
    >
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.05), transparent 60%)",
        }}
      />

      {/* Sparkle anchor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[18vh] left-1/2 -translate-x-1/2"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="#3B82F6"
              opacity="0.9"
            />
            <path d="M19 17L19.7 19.3L22 20L19.7 20.7L19 23L18.3 20.7L16 20L18.3 19.3L19 17Z" fill="#3B82F6" opacity="0.6" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-blue/30 bg-primary-blue/10 px-4 py-1.5 text-xs font-medium text-primary-light backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          AI-native · CS + EC · Cloud-first engineering
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-[0.95] tracking-[-0.035em] sm:text-5xl md:text-7xl lg:text-[5.5rem]">
          <SplitText className="block text-text-primary" delay={0.4}>
            Engineering outcome
          </SplitText>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="block bg-gradient-to-r from-primary-blue via-primary-light to-accent-amber bg-clip-text text-transparent"
          >
            infrastructure.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Built to take engineering students from classroom to industry-ready.
          Cruxion gives colleges{" "}
          <span className="text-text-primary">structured skill tracks — from system design to cloud engineering on AWS, GCP, and Azure — with verified outcomes</span> that employers actually look for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-tertiary">
            Walk through the product
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-[1px] bg-gradient-to-b from-text-tertiary/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
