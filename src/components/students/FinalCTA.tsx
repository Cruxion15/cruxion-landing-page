"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crux } from "./Crux";
import { CTA, EASE, Reveal, ScrollWords, DISPLAY } from "./ui";

// Sparks that burst out of Crux when the finale scrolls in.
const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  const r = 150 + (i % 3) * 40;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, c: i % 2 ? "#F59E0B" : "#93C5FD" };
});

export default function FinalCTA() {
  return (
    <section id="finale" data-stop="finale" className="scroll-mt-20 relative isolate overflow-hidden px-4 py-24 sm:px-6 md:py-32">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400/12 to-primary-blue/12 blur-[120px]" />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div initial="off" whileInView="on" viewport={{ once: true, margin: "-80px" }} className="relative">
          {SPARKS.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: s.c, boxShadow: `0 0 14px ${s.c}` }}
              variants={{
                off: { x: 0, y: 0, opacity: 0, scale: 0 },
                on: { x: s.x, y: s.y, opacity: [0, 1, 0], scale: [0, 1.2, 0.4], transition: { duration: 1.4, delay: 0.35 + i * 0.02, ease: EASE } },
              }}
            />
          ))}
          <motion.div variants={{ off: { opacity: 0, scale: 0.4, y: 60 }, on: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 11 } } }}>
            <Crux mood="celebrate" pose="cheer" level={4} size={220} className="h-auto w-[170px] sm:w-[220px]" />
          </motion.div>
        </motion.div>

        <ScrollWords
          as="h2"
          text="That's the tour. *Your* *turn.*"
          className={`${DISPLAY} mt-8 text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em]`}
        />
        <Reveal delay={0.25} y={20}>
          <p className="mt-5 max-w-xl text-lg text-text-secondary">
            Sign up with Google and pick DSA or AI. Your first lesson takes about 16 minutes, and I&apos;ll be right there for it.
          </p>
        </Reveal>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4, ease: EASE }} className="mt-9">
          <CTA size="lg">Get started free</CTA>
        </motion.div>
        <Reveal delay={0.5} y={12}>
          <Link href="/verify" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-text-tertiary transition-colors hover:text-text-primary">
            Have a Cruxion certificate to check? Verify it here <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
