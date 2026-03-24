"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText, FloatingOrb, MagneticButton, Parallax } from "./AnimationUtils";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[110vh] items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Animated floating orbs */}
      <FloatingOrb size={600} color="rgba(59,130,246,0.05)" duration={10} className="left-1/2 top-1/4 -translate-x-1/2" />
      <FloatingOrb size={400} color="rgba(245,158,11,0.04)" duration={12} delay={2} className="right-1/4 top-1/3" />
      <FloatingOrb size={300} color="rgba(34,197,94,0.03)" duration={9} delay={4} className="left-1/4 bottom-1/4" />

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Parallax floating shapes */}
      <Parallax speed={-0.3} className="pointer-events-none absolute left-[10%] top-[20%]">
        <motion.div
          className="h-2 w-2 rounded-full bg-primary-blue/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </Parallax>
      <Parallax speed={0.4} className="pointer-events-none absolute right-[15%] top-[30%]">
        <motion.div
          className="h-3 w-3 rotate-45 border border-accent-amber/30"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </Parallax>
      <Parallax speed={-0.5} className="pointer-events-none absolute left-[20%] bottom-[30%]">
        <motion.div
          className="h-1.5 w-8 rounded-full bg-accent-green/20"
          animate={{ scaleX: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </Parallax>
      <Parallax speed={0.2} className="pointer-events-none absolute right-[25%] bottom-[25%]">
        <motion.div
          className="h-4 w-4 rounded-full border border-primary-light/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </Parallax>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card/60 px-4 py-2 backdrop-blur-sm"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent-green"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium tracking-wide text-text-secondary sm:text-sm">
            For Karnataka engineering colleges &middot; VTU aligned
          </span>
        </motion.div>

        {/* Headline with word-by-word reveal */}
        <h1
          id="hero-heading"
          className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <SplitText className="text-text-primary" delay={0.3}>
            Your students submit code.
          </SplitText>
          <br />
          <span className="mt-2 inline-block">
            <SplitText className="text-primary-blue" delay={0.7}>
              Now find out
            </SplitText>{" "}
            <SplitText className="text-text-primary" delay={0.9}>
              if they
            </SplitText>{" "}
            <SplitText className="text-accent-amber" delay={1.05}>
              understood it.
            </SplitText>
          </span>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.33, 1, 0.68, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg md:mt-8"
        >
          The only platform that verifies understanding — not just output. Plugs
          directly into your assignment component. Zero curriculum changes. Marks
          export in one click.
        </motion.p>

        {/* CTAs with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10"
        >
          <MagneticButton>
            <a
              href="#cta"
              className="group relative inline-flex items-center rounded-xl bg-primary-blue px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
              aria-label="Request a free pilot for your college"
            >
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Request a free pilot</span>
              <motion.span
                className="relative ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                aria-hidden="true"
              >
                &rarr;
              </motion.span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-text-tertiary sm:text-sm"
        >
          No approval required above faculty level &middot; Setup in under 15 minutes
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-text-tertiary/50 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
