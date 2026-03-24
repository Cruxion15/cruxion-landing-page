"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, SplitText } from "./AnimationUtils";

export default function Testimonial() {
  return (
    <section className="relative py-24" aria-labelledby="testimonial-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll scale>
          <motion.figure
            className="relative rounded-2xl border border-border-subtle bg-surface-card p-8 sm:p-12"
            whileHover={{ borderColor: "rgba(255,255,255,0.12)", transition: { duration: 0.3 } }}
          >
            {/* Animated quote mark */}
            <motion.div
              className="pointer-events-none absolute left-6 top-6 text-6xl font-bold leading-none text-primary-blue/10 sm:left-10 sm:top-8 sm:text-8xl"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              aria-hidden="true"
            >
              &ldquo;
            </motion.div>

            <blockquote className="relative">
              <p id="testimonial-heading" className="text-lg font-medium leading-relaxed text-text-primary sm:text-xl lg:text-2xl">
                <SplitText stagger={0.02}>
                  For the first time I can see which students actually understood the loop concept and which ones just had working code. That distinction — I have never had it in six years of teaching. I opened the heatmap on Monday morning and knew exactly who I needed to speak to before the lab session started.
                </SplitText>
              </p>
            </blockquote>

            <motion.figcaption
              className="mt-8 border-t border-border-subtle pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm font-semibold text-text-primary">Faculty member, CSE Department</p>
              <p className="mt-1 text-sm text-text-tertiary">Pilot College, Karnataka &middot; Week 4 of pilot</p>
            </motion.figcaption>
          </motion.figure>
        </RevealOnScroll>
      </div>
    </section>
  );
}
