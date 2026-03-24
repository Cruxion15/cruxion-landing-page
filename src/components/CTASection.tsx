"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealOnScroll, SplitText, MagneticButton, FloatingOrb } from "./AnimationUtils";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/pilot-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Request sent! Check your email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden" aria-labelledby="cta-heading" id="cta">
      <FloatingOrb size={600} color="rgba(59,130,246,0.05)" duration={10} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 id="cta-heading" className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            <SplitText>Run a free pilot</SplitText>{" "}
            <SplitText className="gradient-text-blue" delay={0.2}>this semester.</SplitText>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            One faculty member. One section. Your assignment component. We handle the rest.
          </p>
        </RevealOnScroll>

        {/* Email form */}
        <RevealOnScroll delay={0.2} scale>
          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit}
            aria-label="Request pilot form"
          >
            <label htmlFor="cta-email" className="sr-only">Your college email address</label>
            <motion.input
              id="cta-email"
              type="email"
              placeholder="Your college email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-xl border border-border-subtle bg-surface-card px-5 py-4 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all duration-300 focus:border-primary-blue/40 focus:ring-2 focus:ring-primary-blue/20 disabled:opacity-60"
              whileFocus={{ scale: 1.02 }}
            />
            <MagneticButton>
              <button
                type="submit"
                disabled={loading}
                className="group relative rounded-xl bg-primary-blue px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label="Submit pilot request"
              >
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">
                  {loading ? "Sending..." : "Request pilot →"}
                </span>
              </button>
            </MagneticButton>
          </form>
        </RevealOnScroll>

        {/* Status messages */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-6">
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-accent-green/30 bg-accent-green/[0.08] px-4 py-3"
              >
                <p className="text-sm text-accent-green font-medium">✓ {message}</p>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/30 bg-red-500/[0.08] px-4 py-3"
              >
                <p className="text-sm text-red-400 font-medium">✕ {message}</p>
              </motion.div>
            )}
            {status === "idle" && !loading && (
              <p className="text-xs leading-relaxed text-text-tertiary sm:text-sm">
                We will reach out within 24 hours
              </p>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
