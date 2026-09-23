"use client";

/**
 * Crux, the companion: a frosted pastel crystal with a face, arms and legs,
 * drawn in SVG from the character sheet so it stays crisp at any size and can
 * blink, wave and react. Poses follow the sheet: wave, laptop (learn),
 * pencil (build), cheer (grow) and mug ("you got this").
 * Motion respects prefers-reduced-motion.
 */
import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Ported verbatim from the app (apps/web/src/components/b2c/Crux.tsx); only the Mood import is inlined.
export type Mood = "idle" | "thinking" | "happy" | "concerned" | "celebrate";
export type Pose = "wave" | "laptop" | "pencil" | "cheer" | "mug";

const POSE_FOR: Record<Mood, Pose> = { happy: "wave", idle: "pencil", thinking: "laptop", concerned: "mug", celebrate: "cheer" };

// The crystal: a tall hexagon whose six faces meet slightly above centre.
const V = { top: [100, 16], ul: [49, 58], ur: [151, 58], ll: [51, 126], lr: [149, 126], bot: [100, 168], c: [100, 94] } as const;
const P = (...ps: readonly (readonly number[])[]) => ps.map((p) => p.join(",")).join(" ");
const FACES: { pts: string; from: string; to: string; x1: number; y1: number; x2: number; y2: number }[] = [
  { pts: P(V.top, V.ul, V.c), from: "#bccaff", to: "#f7c98c", x1: 0.2, y1: 0.2, x2: 0.8, y2: 1 },
  { pts: P(V.top, V.ur, V.c), from: "#eef3ff", to: "#fbd7a2", x1: 0.3, y1: 0, x2: 0.4, y2: 1 },
  { pts: P(V.ur, V.lr, V.c), from: "#fce2bc", to: "#e6d8e2", x1: 1, y1: 0, x2: 0, y2: 1 },
  { pts: P(V.lr, V.bot, V.c), from: "#d9c6cf", to: "#f4c686", x1: 1, y1: 0, x2: 0.3, y2: 1 },
  { pts: P(V.bot, V.ll, V.c), from: "#f1cc98", to: "#aeaede", x1: 0.6, y1: 1, x2: 0, y2: 0 },
  { pts: P(V.ll, V.ul, V.c), from: "#b9c3f3", to: "#f0d6c6", x1: 0, y1: 0.4, x2: 1, y2: 0.6 },
];

const NAVY = "#262b48";
const RIM = "#9aa6e6";

/** A limb: navy with a soft rim light so it reads on dark backgrounds too. */
function Limb({ d, w = 13 }: { d: string; w?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={RIM} strokeOpacity={0.35} strokeWidth={w + 3.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={NAVY} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={w * 0.3} strokeLinecap="round" transform="translate(-1.5 -1.5)" />
    </>
  );
}

function Sparkle({ x, y, s = 1, delay = 0, reduced }: { x: number; y: number; s?: number; delay?: number; reduced: boolean }) {
  return (
    <motion.path
      d={`M${x} ${y - 7 * s} Q${x + 1.2 * s} ${y - 1.2 * s} ${x + 7 * s} ${y} Q${x + 1.2 * s} ${y + 1.2 * s} ${x} ${y + 7 * s} Q${x - 1.2 * s} ${y + 1.2 * s} ${x - 7 * s} ${y} Q${x - 1.2 * s} ${y - 1.2 * s} ${x} ${y - 7 * s}Z`}
      fill="#ffc94d"
      animate={reduced ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
      transition={reduced ? undefined : { duration: 2.4, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

/** One eye: glossy black with a highlight, blinking; or a happy arc; or a wink. */
function Eye({ x, y, kind, reduced }: { x: number; y: number; kind: "open" | "happy" | "wink"; reduced: boolean }) {
  if (kind !== "open") {
    return <path d={kind === "happy" ? `M${x - 6.5} ${y + 2} Q${x} ${y - 6} ${x + 6.5} ${y + 2}` : `M${x - 6} ${y + 1} Q${x} ${y - 3} ${x + 6} ${y + 1}`}
      fill="none" stroke="#14102a" strokeWidth={3.2} strokeLinecap="round" />;
  }
  return (
    <motion.g
      animate={reduced ? undefined : { scaleY: [1, 1, 0.08, 1, 1, 1, 0.08, 1] }}
      transition={reduced ? undefined : { duration: 6, times: [0, 0.62, 0.65, 0.68, 0.9, 0.92, 0.94, 0.96], repeat: Infinity }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <ellipse cx={x} cy={y} rx={7.4} ry={8} fill="#14102a" />
      <circle cx={x + 2.2} cy={y - 2.6} r={2.5} fill="#ffffff" />
      <circle cx={x - 2.4} cy={y + 2.8} r={1} fill="#ffffff" fillOpacity={0.7} />
    </motion.g>
  );
}

function Arm({ d, reduced, wave }: { d: string; reduced: boolean; wave?: boolean }) {
  const path = <Limb d={d} />;
  if (!wave || reduced) return path;
  return (
    <motion.g animate={{ rotate: [0, -14, 6, -14, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      style={{ transformOrigin: "54px 104px" }}>
      {path}
    </motion.g>
  );
}

export function Crux({ mood = "idle", level = 0, size = 120, pose, className }: { mood?: Mood; level?: number; size?: number; pose?: Pose; className?: string }) {
  const reduced = !!useReducedMotion();
  const id = useId().replace(/:/g, "");
  const p = pose ?? POSE_FOR[mood];
  const eyes: ["open" | "happy" | "wink", "open" | "happy" | "wink"] =
    p === "cheer" || p === "laptop" ? ["happy", "happy"] : p === "pencil" ? ["open", "wink"] : ["open", "open"];
  const mouthOpen = p === "wave" || p === "cheer";
  const tiny = size < 60; // small avatars drop the extra sparkles

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Crux, feeling ${mood}`}
      animate={reduced ? undefined : p === "cheer" ? { y: [0, -6, 0] } : { y: [0, -2.5, 0] }}
      transition={reduced ? undefined : { duration: p === "cheer" ? 0.9 : 3.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ overflow: "visible" }}
    >
      <defs>
        {FACES.map((f, i) => (
          <linearGradient key={i} id={`f${i}-${id}`} x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2}>
            <stop offset="0%" stopColor={f.from} />
            <stop offset="100%" stopColor={f.to} />
          </linearGradient>
        ))}
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p === "cheer" ? "#ffb95f" : "#8fa9ff"} stopOpacity={0.42} />
          <stop offset="100%" stopColor="#8fa9ff" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`blush-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff8a73" stopOpacity={1} />
          <stop offset="100%" stopColor="#ff8f78" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Presence grows with mastery. */}
      <ellipse cx={100} cy={96} rx={70 + level * 6} ry={78 + level * 6} fill={`url(#glow-${id})`} />
      <ellipse cx={100} cy={190} rx={46} ry={6} fill="#000" fillOpacity={0.28} />

      {/* Legs and feet, behind the body */}
      <Limb d="M82 158 Q80 172 74 179" w={14} />
      <Limb d="M118 158 Q120 172 126 179" w={14} />
      <ellipse cx={69} cy={182} rx={13} ry={7.5} fill={NAVY} stroke={RIM} strokeOpacity={0.35} strokeWidth={1.8} transform="rotate(-8 69 182)" />
      <ellipse cx={131} cy={182} rx={13} ry={7.5} fill={NAVY} stroke={RIM} strokeOpacity={0.35} strokeWidth={1.8} transform="rotate(8 131 182)" />

      {/* Arms behind the body */}
      {p === "wave" && <Arm d="M54 104 C38 102 30 88 31 68" reduced={reduced} wave />}
      {p === "wave" && <Arm d="M147 112 C160 120 162 134 155 144" reduced={reduced} />}
      {p === "cheer" && <Arm d="M54 100 C38 92 30 76 33 56" reduced={reduced} />}
      {p === "cheer" && <Arm d="M146 100 C162 92 170 76 167 56" reduced={reduced} />}
      {p === "pencil" && <Arm d="M53 112 C42 122 42 134 48 144" reduced={reduced} />}
      {p === "pencil" && <Arm d="M147 110 C160 106 165 94 162 84" reduced={reduced} />}

      {/* The crystal */}
      <g>
        <polygon points={P(V.top, V.ur, V.lr, V.bot, V.ll, V.ul)} fill="#ffffff" fillOpacity={0.35} stroke="#ffffff" strokeOpacity={0.35} strokeWidth={6} strokeLinejoin="round" />
        {FACES.map((f, i) => <polygon key={i} points={f.pts} fill={`url(#f${i}-${id})`} />)}
        {[V.top, V.ur, V.lr, V.bot, V.ll, V.ul].map((v, i) => (
          <line key={i} x1={V.c[0]} y1={V.c[1]} x2={v[0]} y2={v[1]} stroke="#ffffff" strokeOpacity={0.75} strokeWidth={1.3} />
        ))}
        <polygon points={P(V.top, V.ur, V.lr, V.bot, V.ll, V.ul)} fill="none" stroke="#ffffff" strokeOpacity={0.9} strokeWidth={2} strokeLinejoin="round" />
        <polygon points={P([100, 30], [120, 44], [100, 58], [81, 44])} fill="#ffffff" fillOpacity={0.4} />
      </g>

      {/* Face */}
      <ellipse cx={69} cy={104} rx={10} ry={6.5} fill={`url(#blush-${id})`} />
      <ellipse cx={131} cy={106} rx={10} ry={6.5} fill={`url(#blush-${id})`} />
      <Eye x={80} y={91} kind={eyes[0]} reduced={reduced} />
      <Eye x={120} y={92} kind={eyes[1]} reduced={reduced} />
      {mouthOpen ? (
        <g>
          <path d="M90 101 Q100 100 110 101 Q109 113 100 114 Q91 113 90 101Z" fill="#1b0f25" />
          <path d="M94 110 Q100 106 106 110 Q104 114 100 114 Q96 114 94 110Z" fill="#ff8e8a" />
        </g>
      ) : (
        <path d="M93 104 Q100 110 107 104" fill="none" stroke="#1b0f25" strokeWidth={2.8} strokeLinecap="round" />
      )}

      {/* Props and arms in front */}
      {p === "laptop" && (
        <g>
          <Limb d="M52 112 C44 126 50 140 64 144" w={12} />
          <Limb d="M148 112 C156 126 150 140 136 144" w={12} />
          <rect x={58} y={124} width={84} height={46} rx={6} fill="#343a5e" stroke="#4a5178" strokeWidth={1.5} />
          <path d="M100 138 Q101 146 108 147 Q101 148 100 156 Q99 148 92 147 Q99 146 100 138Z" fill="#dfe6ff" />
          <rect x={54} y={168} width={92} height={6} rx={3} fill="#1d2139" />
        </g>
      )}
      {p === "pencil" && (
        <g transform="rotate(28 164 72)">
          <rect x={158} y={50} width={11} height={40} rx={2} fill="#ffc94d" />
          <rect x={158} y={50} width={11} height={7} rx={2} fill="#ff8e8a" />
          <path d="M158 90 L169 90 L163.5 100 Z" fill="#f6d8b0" />
          <path d="M161.5 96 L165.5 96 L163.5 100 Z" fill="#262b48" />
          <circle cx={163} cy={86} r={6} fill={NAVY} stroke={RIM} strokeOpacity={0.35} strokeWidth={1.5} />
        </g>
      )}
      {p === "mug" && (
        <g>
          <Limb d="M53 114 C56 136 84 142 105 138" w={12} />
          <Limb d="M147 112 C152 126 146 136 132 136" w={12} />
          <rect x={104} y={118} width={28} height={30} rx={5} fill="#2f3556" />
          <path d="M132 124 q10 1 9 9 q-1 7 -9 7" fill="none" stroke="#2f3556" strokeWidth={4} />
          <path d="M118 126 Q119 132 124 133 Q119 134 118 140 Q117 134 112 133 Q117 132 118 126Z" fill="#ffc94d" />
        </g>
      )}

      {/* Sparkles and motion lines, per the sheet */}
      {!tiny && (p === "wave" || p === "cheer" || p === "pencil") && (
        <g>
          <Sparkle x={38} y={36} s={1} reduced={reduced} />
          <Sparkle x={168} y={116} s={0.8} delay={0.8} reduced={reduced} />
          <Sparkle x={28} y={132} s={0.9} delay={1.4} reduced={reduced} />
        </g>
      )}
      {!tiny && p === "wave" && (
        <g stroke="#ffc94d" strokeWidth={3.5} strokeLinecap="round">
          <path d="M16 62 l-9 -6" /><path d="M24 50 l-5 -9" />
        </g>
      )}
      {!tiny && p === "cheer" && (
        <g stroke="#ffc94d" strokeWidth={3.5} strokeLinecap="round">
          <path d="M84 6 l-3 -6" /><path d="M100 2 l0 -7" /><path d="M116 6 l3 -6" />
        </g>
      )}
    </motion.svg>
  );
}
