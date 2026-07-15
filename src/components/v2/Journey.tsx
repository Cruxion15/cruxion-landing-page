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
import SceneECWelcome from "./scenes/SceneECWelcome";
import SceneECLab from "./scenes/SceneECLab";
import SceneECEmbed from "./scenes/SceneECEmbed";
import SceneECCloud from "./scenes/SceneECCloud";

type Scene = {
  id: string;
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

/* ─── CS scenes ─── */
const SCENES: Scene[] = [
  {
    id: "welcome",
    start: 0.0, end: 0.16, sidebar: "dashboard",
    narrative: {
      tag: "Dashboard",
      title: "A student opens Cruxion.",
      body: "One login. One view. Their faculty's syllabus, their cohort, and their tracks, already loaded.",
      bullets: [
        "Single Google login: no passwords for faculty to reset",
        "Section-scoped: students only see what their faculty assigned",
        "Browser-only: nothing to install, nothing to maintain",
      ],
    },
  },
  {
    id: "assignments",
    start: 0.16, end: 0.27, sidebar: "assignments",
    narrative: {
      tag: "Assignments · Weekly practice",
      title: "Weekly assignments, status-aware.",
      body: "Faculty assigns problem sets aligned to the syllabus. Students see what's open, what's verified, and what needs a re-attempt, at a glance.",
      bullets: [
        "Weekly problem sets aligned to your university curriculum",
        "Status badges per submission: Open, Verified, Review, Complete",
        "Re-attempts allowed when understanding isn't yet verified",
      ],
    },
  },
  {
    id: "mentor",
    start: 0.27, end: 0.40, sidebar: "assignments",
    narrative: {
      tag: "Inside an assignment · AI Mentor",
      title: "A mentor that asks, never tells.",
      body: "Click a problem and the 3-pane workspace opens: problem statement on the left, code editor in the middle, Socratic AI mentor on the right.",
      bullets: [
        "Three-pane workspace: problem · editor · AI mentor",
        "Mentor asks questions instead of handing out answers",
        "Token budget shown live: students see the cost of leaning on it",
      ],
    },
  },
  {
    id: "uv",
    start: 0.40, end: 0.52, sidebar: "assignments",
    narrative: {
      tag: "Understanding Verification",
      title: "Marks reflect ability, not output.",
      body: "After the code passes test cases, three questions appear, referencing specific line numbers in the student's own submission.",
      bullets: [
        "Questions cite real line numbers from the student's code",
        "AI flags vague, copied, or LLM-generated answers automatically",
        "Three verdicts: Advance, Verify, Reject, surfaced to faculty in real time",
      ],
    },
  },
  {
    id: "crucible",
    start: 0.52, end: 0.63, sidebar: "crucible",
    narrative: {
      tag: "Crucible · Skill tracks",
      title: "Hands-on tracks: beyond the syllabus.",
      body: "Crucible is the engineering creation environment. Long-form tracks that go deeper than any semester can: LLM Engineering, Cloud Engineering, Distributed Systems.",
      bullets: [
        "Each track has three tiers: Apprentice → Engineer → Architect",
        "Faculty enrolls a whole section: no individual purchases",
        "Built for engineering depth: LLMs, cloud, system design",
      ],
    },
  },
  {
    id: "lesson",
    start: 0.63, end: 0.75, sidebar: "crucible",
    narrative: {
      tag: "Crucible lesson · Apprentice tier",
      title: "First principles, made visible.",
      body: "Inside an Apprentice-tier lesson. Type any sentence, watch the model split it into tokens, see the integer sequence the machine actually consumes.",
      bullets: [
        "Interactive lessons: every concept is a small experiment",
        "Visual reasoning: diagrams, animations, real outputs",
        "Foundation before fluency: no shortcuts, no copy-paste",
      ],
    },
  },
  {
    id: "design",
    start: 0.75, end: 0.86, sidebar: "crucible",
    narrative: {
      tag: "Crucible lesson · Architect tier",
      title: "Designing what scales, on cloud.",
      body: "Architect-tier lessons move from writing functions to designing services. Cloud-native by default: on AWS, GCP, Azure.",
      bullets: [
        "Design canvases for distributed systems and ML pipelines",
        "Cloud computing as a first-class discipline, not an afterthought",
        "Trade-off reasoning made explicit, the way real teams ship",
      ],
    },
  },
  {
    id: "exam",
    start: 0.86, end: 0.98, sidebar: "exams",
    narrative: {
      tag: "Exam Mode · Faculty Monitor",
      title: "Lab-grade integrity. Zero overhead.",
      body: "Faculty see every student in one table: submission status, anti-cheat flags, tests passed, UV verdict, marks.",
      bullets: [
        "Live flags: Tab-switch, Paste, and Resume counts per student",
        "UV outcome shown row-level: Passed, Verify, Failed, no manual review",
        "End Exam · Refresh · Export CSV: one-button invigilator workflow",
      ],
    },
  },
];

/* ─── EC scenes ─── */
const EC_SCENES: Scene[] = [
  {
    id: "ec-welcome",
    start: 0.0, end: 0.18, sidebar: "lab",
    narrative: {
      tag: "Hardware Dashboard",
      title: "An EC student opens Cruxion.",
      body: "One login. Hardware tracks, component library, and their batch's projects, already loaded. From first year, not final year.",
      bullets: [
        "Hardware tracks from Year 1: Apprentice → Engineer → Architect",
        "Component lending library: check out, build, return, all tracked",
        "Peer project wall: see what second and third years shipped",
      ],
    },
  },
  {
    id: "ec-lab",
    start: 0.18, end: 0.45, sidebar: "lab",
    narrative: {
      tag: "Circuit Lab · Pin Inspector",
      title: "Wiring a circuit before writing a line.",
      body: "The 3D component lab opens. Before a single line of embedded C, the student maps GPIO pins, follows signal flow, and connects the circuit one pin at a time.",
      bullets: [
        "3D virtual lab: understand every component before touching physical hardware",
        "Pin inspector: every GPIO pin explained in context, not in a 40-page datasheet",
        "Socratic checkpoint: defend your wiring choices before the next step unlocks",
      ],
    },
  },
  {
    id: "ec-embed",
    start: 0.45, end: 0.68, sidebar: "projects",
    narrative: {
      tag: "Embedded Code · Arduino C",
      title: "Code that talks to hardware.",
      body: "The editor opens with the circuit already wired. The student writes embedded C: reading sensors, controlling outputs, watching the serial monitor respond in real time.",
      bullets: [
        "Auto-linked to the circuit: the editor knows which pins are wired and why",
        "Serial monitor shows live output from simulated hardware as the code runs",
        "Understanding Verified: defend every function choice, not just make it compile",
      ],
    },
  },
  {
    id: "ec-cloud",
    start: 0.68, end: 0.98, sidebar: "iot",
    narrative: {
      tag: "IoT · Architect Tier",
      title: "Hardware meets the cloud.",
      body: "Architect tier. The Arduino connects via WiFi, pushes sensor readings to AWS IoT Core, and a live dashboard lights up. Cloud-connected hardware, the way industry builds it.",
      bullets: [
        "MQTT → AWS IoT Core → real-time dashboard in one lesson",
        "Students see their sensor data appear live in the cloud",
        "The bridge between Embedded Systems and Cloud Engineering, from Year 1",
      ],
    },
  },
];

/* ─── Sidebar nav item ─── */
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
        className="absolute bottom-1 left-0 top-1 w-[2px] rounded-r bg-primary-blue"
      />
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}

/* ─── CS narrative card ─── */
function NarrativeCard({
  scene,
  progress,
}: {
  scene: Scene;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (v) =>
    v >= scene.start && v < scene.end ? 1 : 0
  );
  const visibility = useTransform(opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const entryEnd = Math.min(scene.start + 0.04, scene.end - 0.01);
  const y = useTransform(progress, [scene.start, entryEnd], [18, 0]);
  return (
    <motion.div
      style={{ opacity, visibility, y }}
      className="absolute inset-0 flex flex-col justify-center px-10 py-10"
    >
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

/* ─── EC narrative card: amber accent ─── */
function ECNarrativeCard({
  scene,
  progress,
}: {
  scene: Scene;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (v) =>
    v >= scene.start && v < scene.end ? 1 : 0
  );
  const visibility = useTransform(opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const entryEnd = Math.min(scene.start + 0.04, scene.end - 0.01);
  const y = useTransform(progress, [scene.start, entryEnd], [18, 0]);
  return (
    <motion.div
      style={{ opacity, visibility, y }}
      className="absolute inset-0 flex flex-col justify-center px-10 py-10"
    >
      <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent-amber/50 bg-accent-amber/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-amber">
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
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-amber" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function NarrativePane({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative z-10 h-full w-full">
      {SCENES.map((s) => (
        <NarrativeCard key={s.id} scene={s} progress={progress} />
      ))}
    </div>
  );
}

function ECNarrativePane({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative z-10 h-full w-full">
      {EC_SCENES.map((s) => (
        <ECNarrativeCard key={s.id} scene={s} progress={progress} />
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

  const [branch, setBranch] = useState<"cs" | "ec">("cs");
  const [activeCSIdx, setActiveCSIdx] = useState(0);
  const [activeECIdx, setActiveECIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let csIdx = 0;
    for (let i = 0; i < SCENES.length; i++) {
      if (v >= SCENES[i].start + 0.015) csIdx = i;
    }
    if (csIdx !== activeCSIdx) setActiveCSIdx(csIdx);

    let ecIdx = 0;
    for (let i = 0; i < EC_SCENES.length; i++) {
      if (v >= EC_SCENES[i].start + 0.015) ecIdx = i;
    }
    if (ecIdx !== activeECIdx) setActiveECIdx(ecIdx);
  });

  const shellY = useTransform(scrollYProgress, [0, 0.015, 1], [24, 0, 0]);
  const shellOp = useTransform(scrollYProgress, [0, 0.025], [0, 1]);

  const activeScene = branch === "cs" ? SCENES[activeCSIdx] : EC_SCENES[activeECIdx];

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
              branch === "cs"
                ? "radial-gradient(ellipse at 80% 40%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.06), transparent 55%)"
                : "radial-gradient(ellipse at 80% 40%, rgba(245,158,11,0.10), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(0,151,156,0.06), transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 items-center gap-6 px-2 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8 lg:px-12">
          {/* LEFT: narrative pane (desktop only) */}
          <div className="relative hidden lg:block lg:h-[84vh] overflow-hidden">
            <AnimatePresence mode="wait">
              {branch === "cs" ? (
                <motion.div
                  key="cs-narrative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <NarrativePane progress={scrollYProgress} />
                </motion.div>
              ) : (
                <motion.div
                  key="ec-narrative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <ECNarrativePane progress={scrollYProgress} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: prominent toggle + app shell */}
          <motion.div
            style={{ y: shellY, opacity: shellOp }}
            className="flex w-full flex-col gap-3"
          >
            {/* ── Prominent branch switcher ── */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-0.5 rounded-2xl border border-[#2E4A6E] bg-[#0A1525]/90 p-1 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                <button
                  onClick={() => setBranch("cs")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 sm:px-6 sm:py-3 sm:text-sm ${
                    branch === "cs"
                      ? "bg-primary-blue text-white shadow-[0_0_24px_rgba(59,130,246,0.55)]"
                      : "text-text-tertiary hover:text-white"
                  }`}
                >
                  <span className="text-sm sm:text-base">💻</span>
                  <span>CS · Software</span>
                </button>
                <div className="mx-1 h-6 w-px bg-[#2E4A6E]" />
                <button
                  onClick={() => setBranch("ec")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 sm:px-6 sm:py-3 sm:text-sm ${
                    branch === "ec"
                      ? "bg-accent-amber text-[#060E1A] shadow-[0_0_24px_rgba(245,158,11,0.55)]"
                      : "text-text-tertiary hover:text-white"
                  }`}
                >
                  <span className="text-sm sm:text-base">⚡</span>
                  <span>EC · Hardware</span>
                </button>
              </div>
            </div>

            {/* ── App shell ── */}
            <div className="relative h-[57vh] sm:h-[65vh] lg:h-[76vh] w-full overflow-hidden rounded-2xl border border-[#2E4A6E] bg-[#0A1525] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              {/* Browser top bar: clean */}
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
                  <div className="text-xs font-semibold text-white">
                    {branch === "cs" ? "Dev Student" : "Priya ECE"}
                  </div>
                  <div className="text-[10px] font-medium text-white">
                    {branch === "cs" ? "1CX22CS001" : "1CX22EC042"}
                  </div>
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                    branch === "cs" ? "bg-primary-blue" : "bg-accent-amber"
                  }`}
                >
                  {branch === "cs" ? "DS" : "PE"}
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex h-[calc(100%-4.5rem)]">
              {/* Sidebar */}
              <aside className="hidden w-36 shrink-0 border-r border-[#2E4A6E] bg-[#0F1E32] p-2.5 md:block">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {branch === "cs" ? "Dashboard" : "EC Lab"}
                </div>
                <div className="mb-3 px-2 text-sm font-bold text-white">
                  {branch === "cs" ? "Dev" : "Priya"}
                </div>
                <nav className="space-y-1">
                  {branch === "cs" ? (
                    <>
                      <SidebarItem icon="📖" label="Assignments" progress={scrollYProgress} activeRanges={[[0.16, 0.52]]} />
                      <SidebarItem icon="🎓" label="Exams" progress={scrollYProgress} activeRanges={[[0.86, 0.98]]} />
                      <SidebarItem icon="🔥" label="Crucible" progress={scrollYProgress} activeRanges={[[0.52, 0.86]]} />
                      <SidebarItem icon="📋" label="Quiz" progress={scrollYProgress} activeRanges={[]} />
                    </>
                  ) : (
                    <>
                      <SidebarItem icon="🔬" label="Lab" progress={scrollYProgress} activeRanges={[[0.0, 0.45]]} />
                      <SidebarItem icon="📦" label="Components" progress={scrollYProgress} activeRanges={[[0.0, 0.18]]} />
                      <SidebarItem icon="🏗️" label="Projects" progress={scrollYProgress} activeRanges={[[0.45, 0.68]]} />
                      <SidebarItem icon="☁️" label="IoT" progress={scrollYProgress} activeRanges={[[0.68, 0.98]]} />
                    </>
                  )}
                </nav>
              </aside>

              {/* Scene content: CS or EC */}
              <div className="relative flex-1 overflow-hidden bg-[#0A1525]">
                <AnimatePresence mode="wait">
                  {branch === "cs" && (
                    <motion.div
                      key="cs-scenes"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="absolute inset-0"
                    >
                      <SceneWelcome progress={scrollYProgress} range={[SCENES[0].start, SCENES[0].end]} />
                      <SceneAssignments progress={scrollYProgress} range={[SCENES[1].start, SCENES[1].end]} />
                      <SceneEngineer progress={scrollYProgress} range={[SCENES[2].start, SCENES[2].end]} />
                      <SceneUV progress={scrollYProgress} range={[SCENES[3].start, SCENES[3].end]} />
                      <SceneCrucibleCourses progress={scrollYProgress} range={[SCENES[4].start, SCENES[4].end]} />
                      <SceneApprentice progress={scrollYProgress} range={[SCENES[5].start, SCENES[5].end]} />
                      <SceneArchitect progress={scrollYProgress} range={[SCENES[6].start, SCENES[6].end]} />
                      <SceneExam progress={scrollYProgress} range={[SCENES[7].start, SCENES[7].end]} />
                    </motion.div>
                  )}
                  {branch === "ec" && (
                    <motion.div
                      key="ec-scenes"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="absolute inset-0"
                    >
                      <SceneECWelcome progress={scrollYProgress} range={[EC_SCENES[0].start, EC_SCENES[0].end]} />
                      <SceneECLab progress={scrollYProgress} range={[EC_SCENES[1].start, EC_SCENES[1].end]} />
                      <SceneECEmbed progress={scrollYProgress} range={[EC_SCENES[2].start, EC_SCENES[2].end]} />
                      <SceneECCloud progress={scrollYProgress} range={[EC_SCENES[3].start, EC_SCENES[3].end]} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </div>{/* end app shell */}
          </motion.div>
        </div>

        {/* Mobile/tablet narrative overlay */}
        <div className="absolute bottom-4 left-1/2 z-30 w-full max-w-lg -translate-x-1/2 px-4 sm:bottom-6 sm:px-6 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className={`rounded-xl border bg-[#0A1525]/80 px-4 py-3 backdrop-blur-sm ${
                branch === "ec"
                  ? "border-accent-amber/30"
                  : "border-[#2E4A6E]/60"
              }`}
            >
              <div
                className={`mb-1 text-xs font-bold uppercase tracking-wider ${
                  branch === "ec" ? "text-accent-amber" : "text-primary-light"
                }`}
              >
                {activeScene.narrative.tag}
              </div>
              <div className="text-sm font-semibold leading-snug text-white">
                {activeScene.narrative.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
