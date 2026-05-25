"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter, SplitText } from "../AnimationUtils";

const STATS = [
  { value: 3, suffix: "", label: "Skill tracks", caption: "Apprentice · Engineer · Architect" },
  { value: 24, suffix: "/7", label: "AI Mentor", caption: "Socratic, not shortcut" },
  { value: 100, suffix: "%", label: "Verified submissions", caption: "Marks reflect real ability" },
  { value: 0, suffix: "", label: "Added faculty workload", caption: "We run onboarding end-to-end" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function V2CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/pilot-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "Request received! Check your email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="cta" className="relative overflow-hidden py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12), transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.06), transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Outcomes */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-4xl font-semibold tracking-[-0.03em] text-text-primary sm:text-5xl">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-text-secondary">
                {s.label}
              </div>
              <div className="mt-1 text-[11px] text-text-tertiary">
                {s.caption}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-24">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            <SplitText className="block text-text-primary">
              Pilot in one section.
            </SplitText>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block bg-gradient-to-r from-primary-blue to-accent-amber bg-clip-text text-transparent"
            >
              See the loop close in 8 weeks.
            </motion.span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base text-text-secondary">
            One section. One semester. Real outcomes you can hand your
            placement cell on day one.
          </p>

          {/* Email form */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10 inline-flex items-center gap-3 rounded-xl border border-accent-green/30 bg-accent-green/10 px-6 py-4 text-base font-medium text-accent-green"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {message}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <input
                  type="email"
                  placeholder="your@college.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-[#2E4A6E] bg-[#0A1525] px-5 py-3.5 text-base text-white placeholder-text-tertiary outline-none transition-all duration-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 disabled:opacity-50 sm:w-72"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="group relative inline-flex items-center rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-surface-bg transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Request a pilot
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden="true"
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
