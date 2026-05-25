"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SplitText } from "../AnimationUtils";

type Phase = {
  n: string;
  name: string;
  tagline: string;
  body: string;
  what: { title: string; detail: string }[];
  icon: string;
  color: string; // hex for marker glow / accent
  textClass: string;
  borderClass: string;
  range: [number, number]; // when this phase is "active"
};

const PHASES: Phase[] = [
  {
    n: "01",
    name: "Apprentice",
    tagline: "Learning to see what the machine sees.",
    body: "The student arrives without assumptions. Lessons that show, not tell. They build intuition before they build systems.",
    what: [
      { title: "Interactive lessons", detail: "Type a sentence, watch it become tokens. Reason from first principles." },
      { title: "Visual reasoning", detail: "Diagrams, animations, real outputs — concepts you can touch." },
      { title: "Foundation tier", detail: "No shortcuts. No copy-paste. Just understanding." },
    ],
    icon: "◐",
    color: "#3B82F6",
    textClass: "text-primary-blue",
    borderClass: "border-primary-blue/50",
    range: [0.12, 0.42],
  },
  {
    n: "02",
    name: "Engineer",
    tagline: "Building real systems with a mentor at their elbow.",
    body: "Code that runs. Tests that pass. An AI mentor that asks questions instead of handing out answers — and a verification layer that confirms the student can defend every line.",
    what: [
      { title: "3-pane workspace", detail: "Problem · editor · Socratic AI mentor — together on every assignment." },
      { title: "Token-budget mentor", detail: "Hints earn cost. Effort is the currency students learn to spend." },
      { title: "Understanding Verified", detail: "Every submission earns marks only when the student can defend it." },
    ],
    icon: "◑",
    color: "#93C5FD",
    textClass: "text-primary-light",
    borderClass: "border-primary-light/50",
    range: [0.42, 0.72],
  },
  {
    n: "03",
    name: "Architect",
    tagline: "Designing what scales — on cloud, in production.",
    body: "The student moves from writing functions to designing services. Cloud-native by default. Trade-offs become the conversation.",
    what: [
      { title: "Cloud-native design", detail: "AWS, GCP, Azure primitives — the way real teams ship to production." },
      { title: "System design canvas", detail: "Distributed systems, ML pipelines, latency budgets, failure modes." },
      { title: "Industry-ready", detail: "Reasoning about cost vs consistency vs scale — like a senior engineer." },
    ],
    icon: "●",
    color: "#F59E0B",
    textClass: "text-accent-amber",
    borderClass: "border-accent-amber/50",
    range: [0.72, 1.0],
  },
];

/* Road stop — a node along the path; lights up when the marker arrives */
function RoadStop({
  phase,
  position,
  arrivesAt,
  progress,
}: {
  phase: Phase;
  position: number; // 0-1 along the road
  arrivesAt: number; // scroll progress at which the marker reaches this stop
  progress: MotionValue<number>;
}) {
  const arrived = useTransform(
    progress,
    [arrivesAt - 0.03, arrivesAt],
    [0, 1]
  );
  const scale = useTransform(arrived, [0, 1], [1, 1.5]);
  const ringOp = useTransform(arrived, [0, 1], [0.25, 1]);
  const labelOp = useTransform(arrived, [0, 1], [0.4, 1]);
  const shadow = useTransform(
    arrived,
    (v) =>
      `0 0 ${10 + v * 28}px ${phase.color}${Math.round(v * 255)
        .toString(16)
        .padStart(2, "0")}`
  );

  return (
    <div
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position * 100}%` }}
    >
      <motion.div
        style={{ scale, boxShadow: shadow }}
        className="relative h-3 w-3 rounded-full"
      >
        <motion.div
          style={{ opacity: ringOp, backgroundColor: phase.color }}
          className="absolute inset-0 rounded-full"
        />
      </motion.div>
      <motion.div
        style={{ opacity: labelOp }}
        className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] ${phase.textClass}`}
      >
        {phase.name}
      </motion.div>
    </div>
  );
}

/* Traveling marker — glides along the road as scroll advances */
function RoadMarker({ progress }: { progress: MotionValue<number> }) {
  /* Position interpolates between road stops at scroll 0.10 → 0.20 → 0.50 → 0.85 */
  const x = useTransform(
    progress,
    [0.05, 0.20, 0.50, 0.85],
    ["8%", "22%", "55%", "88%"]
  );
  /* Color shifts as marker passes each phase */
  const color = useTransform(
    progress,
    [0.05, 0.30, 0.55, 0.85],
    ["#475c8c", "#3B82F6", "#93C5FD", "#F59E0B"]
  );
  const glow = useTransform(
    color,
    (c) => `0 0 24px ${c}, 0 0 48px ${c}80`
  );
  return (
    <motion.div
      style={{ left: x, backgroundColor: color, boxShadow: glow }}
      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
    />
  );
}

/* The road itself — a horizontal line with fill that progresses */
function Road({ progress }: { progress: MotionValue<number> }) {
  const fillWidth = useTransform(progress, [0.05, 0.95], ["0%", "100%"]);
  return (
    <div className="relative h-[2px] w-full rounded-full bg-white/[0.08]">
      <motion.div
        style={{ width: fillWidth }}
        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary-blue via-primary-light to-accent-amber"
      />
      <RoadStop phase={PHASES[0]} position={0.22} arrivesAt={0.20} progress={progress} />
      <RoadStop phase={PHASES[1]} position={0.55} arrivesAt={0.50} progress={progress} />
      <RoadStop phase={PHASES[2]} position={0.88} arrivesAt={0.85} progress={progress} />
      <RoadMarker progress={progress} />
    </div>
  );
}

/* The detailed card for one phase — opacity tied to phase's active range */
function PhaseCard({
  phase,
  progress,
}: {
  phase: Phase;
  progress: MotionValue<number>;
}) {
  const [start, end] = phase.range;

  /* Hard step — same pattern as SceneFrame / NarrativeCard.
     Crossfade ranges caused WAAPI degradation beyond the first phase in FM v12. */
  const opacity = useTransform(progress, (v) =>
    v >= start && v < end ? 1 : 0
  );
  const visibility = useTransform(opacity, (v) =>
    v > 0 ? "visible" : "hidden"
  );
  /* Entry slide — runs once on arrival, stays at 0 for the rest of the phase */
  const entryEnd = Math.min(start + 0.05, end - 0.01);
  const y = useTransform(progress, [start, entryEnd], [28, 0]);

  return (
    <motion.div
      style={{ opacity, visibility, y }}
      className="absolute inset-0 overflow-y-auto flex items-start"
    >
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* Left — phase name + icon */}
        <div>
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className={`flex h-16 w-16 items-center justify-center rounded-full border bg-white/[0.05] text-3xl ${phase.borderClass} ${phase.textClass}`}
            >
              {phase.icon}
            </motion.div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-tertiary">
                Phase {phase.n}
              </div>
              <div className={`text-3xl font-bold tracking-tight sm:text-4xl ${phase.textClass}`}>
                {phase.name}
              </div>
            </div>
          </div>
          <div className="mt-5 text-base font-semibold text-text-primary sm:text-lg">
            {phase.tagline}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {phase.body}
          </p>
        </div>

        {/* Right — what happens in this phase */}
        <div className="space-y-3">
          {phase.what.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4"
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 text-lg ${phase.textClass}`}>›</span>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{w.title}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                    {w.detail}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function V2Tiers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.5]);

  return (
    <section
      ref={ref}
      className="relative h-[130vh] sm:h-[150vh] lg:h-[160vh]"
      aria-label="Three phases of becoming an engineer"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden px-4 py-8 sm:px-8 sm:py-16">
        {/* Ambient backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.06), transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Header */}
          <motion.div style={{ opacity: headerOpacity }} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-blue/50 bg-primary-blue/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
              The Cruxion roadmap
            </div>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              <SplitText className="block text-text-primary">
                The same student.
              </SplitText>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block bg-gradient-to-r from-primary-blue via-primary-light to-accent-amber bg-clip-text text-transparent"
              >
                Three phases of becoming.
              </motion.span>
            </h2>
          </motion.div>

          {/* THE ROAD */}
          <div className="mx-auto mt-6 mb-8 sm:mt-12 sm:mb-14 w-full max-w-4xl px-8 sm:px-12">
            <div className="relative py-8">
              <Road progress={scrollYProgress} />
            </div>
          </div>

          {/* PHASE DETAIL — swaps as marker travels */}
          <div className="relative h-[55vh] sm:h-[50vh] lg:h-[48vh]">
            {PHASES.map((phase) => (
              <PhaseCard key={phase.n} phase={phase} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
