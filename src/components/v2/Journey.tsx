"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import SceneWelcome from "./scenes/SceneWelcome";
import SceneAssignments from "./scenes/SceneAssignments";
import SceneCrucibleCourses from "./scenes/SceneCrucibleCourses";
import SceneApprentice from "./scenes/SceneApprentice";
import SceneEngineer from "./scenes/SceneEngineer";
import SceneUV from "./scenes/SceneUV";
import SceneArchitect from "./scenes/SceneArchitect";
import SceneExam from "./scenes/SceneExam";

type Scene = {
  id: string;
  rail: string; // short label for progress rail
  start: number;
  end: number;
  sidebar: string;
  narrative: {
    tag: string;
    title: string;
    body: string;
    bullets: string[];
  };
};

const SCENES: Scene[] = [
  {
    id: "welcome",
    rail: "dashboard",
    start: 0.0, end: 0.16, sidebar: "dashboard",
    narrative: {
      tag: "Dashboard",
      title: "A student opens Cruxion.",
      body: "One login. One view. Their faculty's syllabus, their cohort, and their tracks — already loaded.",
      bullets: [
        "Single Google login — no passwords for faculty to reset",
        "Section-scoped — students only see what their faculty assigned",
        "Browser-only — nothing to install, nothing to maintain",
      ],
    },
  },
  {
    id: "assignments",
    rail: "assignments",
    start: 0.16, end: 0.27, sidebar: "assignments",
    narrative: {
      tag: "Assignments · Weekly practice",
      title: "Weekly assignments, status-aware.",
      body: "Faculty assigns problem sets aligned to the syllabus. Students see what's open, what's verified, and what needs a re-attempt — at a glance.",
      bullets: [
        "Weekly problem sets aligned to your university curriculum",
        "Status badges per submission — Open, Verified, Review, Complete",
        "Re-attempts allowed when understanding isn't yet verified",
      ],
    },
  },
  {
    id: "mentor",
    rail: "coding · mentor",
    start: 0.27, end: 0.40, sidebar: "assignments",
    narrative: {
      tag: "Inside an assignment · AI Mentor",
      title: "A mentor that asks, never tells.",
      body: "Click a problem and the 3-pane workspace opens — problem statement on the left, code editor in the middle, Socratic AI mentor on the right. Hints earn cost. Effort is the currency.",
      bullets: [
        "Three-pane workspace: problem · editor · AI mentor",
        "Mentor asks questions instead of handing out answers",
        "Token budget shown live — students see the cost of leaning on it",
      ],
    },
  },
  {
    id: "uv",
    rail: "verifying",
    start: 0.40, end: 0.52, sidebar: "assignments",
    narrative: {
      tag: "Understanding Verification",
      title: "Marks reflect ability, not output.",
      body: "After the code passes test cases, three questions appear — referencing specific line numbers in the student's own submission. Answer with depth, marks credited. Answer with vagueness, flagged for re-attempt.",
      bullets: [
        "Questions cite real line numbers and function calls from the student's code",
        "AI flags vague, copied, or LLM-generated answers automatically",
        "Three verdicts: Advance, Verify, Reject — surfaced to faculty in real time",
      ],
    },
  },
  {
    id: "crucible",
    rail: "crucible",
    start: 0.52, end: 0.63, sidebar: "crucible",
    narrative: {
      tag: "Crucible · Skill tracks",
      title: "Hands-on tracks — beyond the syllabus.",
      body: "Crucible is the engineering creation environment. Long-form tracks that go deeper than any semester can — LLM Engineering, Cloud Engineering, Distributed Systems. Faculty grants access section-wide.",
      bullets: [
        "Each track has three tiers: Apprentice → Engineer → Architect",
        "Faculty enrolls a whole section — no individual purchases",
        "Built for engineering depth: LLMs, cloud, system design",
      ],
    },
  },
  {
    id: "lesson",
    rail: "lesson · apprentice tier",
    start: 0.63, end: 0.75, sidebar: "crucible",
    narrative: {
      tag: "Crucible lesson · Apprentice tier",
      title: "First principles, made visible.",
      body: "Inside an Apprentice-tier lesson. Type any sentence, watch the model split it into tokens, see the integer sequence the machine actually consumes. Concepts become small, runnable experiments.",
      bullets: [
        "Interactive lessons — every concept is a small experiment",
        "Visual reasoning — diagrams, animations, real outputs",
        "Foundation before fluency — no shortcuts, no copy-paste",
      ],
    },
  },
  {
    id: "design",
    rail: "lesson · architect tier",
    start: 0.75, end: 0.86, sidebar: "crucible",
    narrative: {
      tag: "Crucible lesson · Architect tier",
      title: "Designing what scales — on cloud.",
      body: "Architect-tier lessons move from writing functions to designing services. Cloud-native by default — on AWS, GCP, Azure. The student reasons about latency, consistency, cost, and failure modes.",
      bullets: [
        "Design canvases for distributed systems and ML pipelines",
        "Cloud computing as a first-class discipline — not an afterthought",
        "Trade-off reasoning made explicit — the way real teams ship",
      ],
    },
  },
  {
    id: "exam",
    rail: "exam · faculty view",
    start: 0.86, end: 0.98, sidebar: "exams",
    narrative: {
      tag: "Exam Mode · Faculty Monitor",
      title: "Lab-grade integrity. Zero overhead.",
      body: "Faculty see every student in one table — submission status, anti-cheat flags, tests passed, UV verdict, marks. One click exports the official CSV before students leave the room.",
      bullets: [
        "Live flags — Tab-switch, Paste, and Resume counts per student",
        "UV outcome shown row-level: Passed, Verify, Failed — no manual review",
        "End Exam · Refresh · Export CSV — one-button invigilator workflow",
      ],
    },
  },
];

/* ─── Sidebar nav item with scroll-driven highlight ─── */
function SidebarItem({
  icon,
  label,
  progress,
  activeRanges,
}: {
  icon: React.ReactNode;
  label: string;
  progress: MotionValue<number>;
  activeRanges: [number, number][];
}) {
  const points: number[] = [];
  const values: number[] = [];
  if (activeRanges.length === 0) {
    points.push(0, 1);
    values.push(0, 0);
  } else {
    activeRanges.forEach(([s, e]) => {
      points.push(s - 0.02, s, e, e + 0.02);
      values.push(0, 1, 1, 0);
    });
  }
  const active = useTransform(progress, points, values);
  const bg = useTransform(active, (v) => `rgba(59,130,246,${v * 0.25})`);
  return (
    <motion.div
      style={{ backgroundColor: bg }}
      className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white"
    >
      <motion.span
        style={{ opacity: active }}
        className="absolute left-0 top-1 bottom-1 w-[2px] rounded-r bg-primary-blue"
      />
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}


/* ─── Single narrative card — hard step opacity, zero overlap between adjacent scenes ─── */
function NarrativeCard({
  scene,
  progress,
}: {
  scene: Scene;
  progress: MotionValue<number>;
}) {
  /* Hard step — exactly ON when in [start, end), OFF otherwise. Matches SceneFrame. */
  const opacity = useTransform(progress, (v) =>
    v >= scene.start && v < scene.end ? 1 : 0
  );
  const visibility = useTransform(opacity, (v) => (v > 0 ? "visible" : "hidden"));
  /* Gentle y entry — slides up on arrival, stays put for the rest of the scene */
  const entryEnd = Math.min(scene.start + 0.04, scene.end - 0.01);
  const y = useTransform(progress, [scene.start, entryEnd], [18, 0]);
  return (
    <motion.div style={{ opacity, visibility, y }} className="absolute inset-0 flex flex-col justify-center px-10 py-10">
      <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary-blue/50 bg-primary-blue/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-light">
        {scene.narrative.tag}
      </div>
      <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-text-primary sm:text-4xl lg:text-[2.5rem]">
        {scene.narrative.title}
      </h2>
      <p className="mt-5 text-sm leading-[1.75] text-text-secondary sm:text-[0.9375rem]">
        {scene.narrative.body}
      </p>
      <ul className="mt-8 space-y-3.5">
        {scene.narrative.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function NarrativePane({ progress }: { progress: MotionValue<number> }) {
  /* No parent opacity wrapper — each NarrativeCard controls its own hard-step opacity.
     Parent opacity wrappers with scroll-derived MotionValues can degrade to < 1 in
     Framer Motion v12's WAAPI mode for ranges beyond the defined keyframe span. */
  return (
    <div className="relative z-10 h-full w-full">
      {SCENES.map((s) => (
        <NarrativeCard key={s.id} scene={s} progress={progress} />
      ))}
    </div>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [activeIdx, setActiveIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    for (let i = 0; i < SCENES.length; i++) {
      const trigger = SCENES[i].start + 0.015;
      if (v >= trigger) idx = i;
    }
    if (idx !== activeIdx) setActiveIdx(idx);
  });

  const shellY = useTransform(scrollYProgress, [0, 0.015, 1], [24, 0, 0]);
  const shellOp = useTransform(scrollYProgress, [0, 0.025], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[500vh] sm:h-[650vh] lg:h-[850vh]"
      aria-label="Walk through the Cruxion product"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-14">
        {/* Ambient backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 40%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.06), transparent 55%)",
          }}
        />
        {/* SPLIT LAYOUT — narrative left, product right */}
        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 items-center gap-6 px-2 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8 lg:px-12">
          {/* LEFT — narrative text, no card wrapper */}
          <div className="relative hidden lg:block lg:h-[84vh] overflow-hidden">
            <NarrativePane progress={scrollYProgress} />
          </div>

          {/* RIGHT — app shell */}
          <motion.div
            style={{ y: shellY, opacity: shellOp }}
            className="relative h-[65vh] sm:h-[75vh] lg:h-[84vh] w-full overflow-hidden rounded-2xl border border-[#2E4A6E] bg-[#0A1525] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Browser top bar */}
            <div className="flex h-8 items-center gap-1.5 border-b border-[#2E4A6E] bg-[#0F1E32] px-3">
              <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <div className="h-2 w-2 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex h-4 flex-1 items-center justify-center rounded bg-[#060E1A] text-[9px] font-medium text-white">
                app.cruxion.in
              </div>
            </div>

            {/* App header */}
            <div className="flex h-10 items-center justify-between border-b border-[#2E4A6E] bg-[#0F1E32] px-4">
              <div className="text-sm font-bold tracking-tight text-white">
                Crux<span className="text-primary-blue">ion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right leading-tight">
                  <div className="text-xs font-semibold text-white">Dev Student</div>
                  <div className="text-[10px] font-medium text-white">1CX22CS001</div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-blue text-[10px] font-bold text-white">
                  DS
                </div>
              </div>
            </div>

            <div className="flex h-[calc(100%-4.5rem)]">
              {/* SIDEBAR */}
              <aside className="hidden w-36 shrink-0 border-r border-[#2E4A6E] bg-[#0F1E32] p-2.5 md:block">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Dashboard
                </div>
                <div className="mb-3 px-2 text-sm font-bold text-white">
                  Dev
                </div>
                <nav className="space-y-1">
                  <SidebarItem
                    icon="📖"
                    label="Assignments"
                    progress={scrollYProgress}
                    activeRanges={[[0.16, 0.52]]}
                  />
                  <SidebarItem
                    icon="🎓"
                    label="Exams"
                    progress={scrollYProgress}
                    activeRanges={[[0.86, 0.98]]}
                  />
                  <SidebarItem
                    icon="🔥"
                    label="Crucible"
                    progress={scrollYProgress}
                    activeRanges={[[0.52, 0.86]]}
                  />
                  <SidebarItem
                    icon="📋"
                    label="Quiz"
                    progress={scrollYProgress}
                    activeRanges={[]}
                  />
                </nav>
              </aside>

              {/* CONTENT — scenes hard-cut based on scroll */}
              <div className="relative flex-1 overflow-hidden bg-[#0A1525]">
                <SceneWelcome progress={scrollYProgress} range={[SCENES[0].start, SCENES[0].end]} />
                <SceneAssignments progress={scrollYProgress} range={[SCENES[1].start, SCENES[1].end]} />
                <SceneEngineer progress={scrollYProgress} range={[SCENES[2].start, SCENES[2].end]} />
                <SceneUV progress={scrollYProgress} range={[SCENES[3].start, SCENES[3].end]} />
                <SceneCrucibleCourses progress={scrollYProgress} range={[SCENES[4].start, SCENES[4].end]} />
                <SceneApprentice progress={scrollYProgress} range={[SCENES[5].start, SCENES[5].end]} />
                <SceneArchitect progress={scrollYProgress} range={[SCENES[6].start, SCENES[6].end]} />
                <SceneExam progress={scrollYProgress} range={[SCENES[7].start, SCENES[7].end]} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile/tablet narrative — shown below shell when left pane is hidden */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-30 w-full max-w-lg -translate-x-1/2 px-4 sm:px-6 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={SCENES[activeIdx].id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-[#2E4A6E]/60 bg-[#0A1525]/80 px-4 py-3 backdrop-blur-sm"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-primary-light mb-1">
                {SCENES[activeIdx].narrative.tag}
              </div>
              <div className="text-sm font-semibold text-white leading-snug">
                {SCENES[activeIdx].narrative.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
