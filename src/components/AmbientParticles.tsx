"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  type: "circle" | "square" | "diamond" | "line" | "ring" | "dot" | "cross" | "triangle" | "glowdot";
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: { x: number[]; y: number[] };
  rotate?: number[];
  scale?: number[];
  opacity: number[];
}

const particles: Particle[] = [
  // ── Row 1 — top strip (2–18vh) ──
  { id: 1,  type: "diamond",  x: "6%",   y: "4vh",  size: 14, color: "rgba(245,158,11,0.7)",  duration: 13, delay: 0,   drift: { x: [0,22,-10,0],  y: [0,-18,12,0]  }, rotate: [0,360],       opacity: [0.4,0.75,0.4] },
  { id: 2,  type: "glowdot",  x: "20%",  y: "8vh",  size: 6,  color: "rgba(59,130,246,1)",    duration: 6,  delay: 1,   drift: { x: [0,-10,8,0],   y: [0,14,-6,0]   },                        opacity: [0.5,0.9,0.5] },
  { id: 3,  type: "ring",     x: "34%",  y: "3vh",  size: 22, color: "rgba(147,197,253,0.5)",  duration: 10, delay: 2,   drift: { x: [0,14,-8,0],   y: [0,-12,10,0]  }, scale: [1,1.3,1],     opacity: [0.3,0.6,0.3] },
  { id: 4,  type: "square",   x: "50%",  y: "10vh", size: 11, color: "rgba(245,158,11,0.55)",  duration: 16, delay: 0.5, drift: { x: [0,-18,10,0],  y: [0,12,-8,0]   }, rotate: [0,90,180,270,360], opacity: [0.35,0.65,0.35] },
  { id: 5,  type: "glowdot",  x: "65%",  y: "6vh",  size: 5,  color: "rgba(34,197,94,1)",     duration: 7,  delay: 3,   drift: { x: [0,10,-14,0],  y: [0,-16,8,0]   },                        opacity: [0.45,0.8,0.45] },
  { id: 6,  type: "diamond",  x: "80%",  y: "14vh", size: 10, color: "rgba(59,130,246,0.65)",  duration: 14, delay: 1.5, drift: { x: [0,-12,18,0],  y: [0,10,-14,0]  }, rotate: [45,405],      opacity: [0.35,0.7,0.35] },
  { id: 7,  type: "cross",    x: "93%",  y: "5vh",  size: 14, color: "rgba(147,197,253,0.45)", duration: 11, delay: 4,   drift: { x: [0,-8,12,0],   y: [0,18,-10,0]  }, rotate: [0,180],       opacity: [0.3,0.6,0.3] },

  // ── Row 2 — upper-mid (18–35vh) ──
  { id: 8,  type: "glowdot",  x: "3%",   y: "22vh", size: 7,  color: "rgba(245,158,11,1)",    duration: 5,  delay: 0,   drift: { x: [0,12,-8,0],   y: [0,-20,12,0]  },                        opacity: [0.5,0.85,0.5] },
  { id: 9,  type: "ring",     x: "15%",  y: "28vh", size: 28, color: "rgba(59,130,246,0.4)",   duration: 12, delay: 2,   drift: { x: [0,20,-12,0],  y: [0,14,-18,0]  }, scale: [1,1.2,0.9,1], opacity: [0.25,0.55,0.25] },
  { id: 10, type: "triangle", x: "28%",  y: "20vh", size: 12, color: "rgba(245,158,11,0.5)",   duration: 18, delay: 1,   drift: { x: [0,-22,15,0],  y: [0,-10,18,0]  }, rotate: [0,240],       opacity: [0.3,0.6,0.3] },
  { id: 11, type: "glowdot",  x: "42%",  y: "32vh", size: 5,  color: "rgba(147,197,253,1)",   duration: 6,  delay: 4,   drift: { x: [0,8,-14,0],   y: [0,12,-8,0]   },                        opacity: [0.4,0.75,0.4] },
  { id: 12, type: "diamond",  x: "57%",  y: "24vh", size: 9,  color: "rgba(34,197,94,0.6)",    duration: 15, delay: 2.5, drift: { x: [0,-14,20,0],  y: [0,-16,10,0]  }, rotate: [0,360],       opacity: [0.35,0.65,0.35] },
  { id: 13, type: "cross",    x: "70%",  y: "30vh", size: 16, color: "rgba(59,130,246,0.5)",   duration: 10, delay: 0,   drift: { x: [0,16,-10,0],  y: [0,8,-16,0]   }, rotate: [0,90],        opacity: [0.3,0.6,0.3] },
  { id: 14, type: "square",   x: "85%",  y: "19vh", size: 9,  color: "rgba(245,158,11,0.5)",   duration: 20, delay: 3,   drift: { x: [0,-10,16,0],  y: [0,20,-10,0]  }, rotate: [0,180],       opacity: [0.3,0.6,0.3] },
  { id: 15, type: "glowdot",  x: "96%",  y: "27vh", size: 6,  color: "rgba(59,130,246,1)",     duration: 8,  delay: 5,   drift: { x: [0,-8,12,0],   y: [0,-14,10,0]  },                        opacity: [0.45,0.8,0.45] },

  // ── Row 3 — mid (35–52vh) ──
  { id: 16, type: "ring",     x: "8%",   y: "40vh", size: 18, color: "rgba(245,158,11,0.45)",  duration: 9,  delay: 1,   drift: { x: [0,14,-10,0],  y: [0,-22,14,0]  }, scale: [1,1.35,1],    opacity: [0.3,0.6,0.3] },
  { id: 17, type: "glowdot",  x: "22%",  y: "46vh", size: 8,  color: "rgba(34,197,94,1)",      duration: 5,  delay: 2,   drift: { x: [0,-10,16,0],  y: [0,14,-10,0]  },                        opacity: [0.5,0.85,0.5] },
  { id: 18, type: "diamond",  x: "38%",  y: "38vh", size: 13, color: "rgba(59,130,246,0.65)",   duration: 14, delay: 0,   drift: { x: [0,18,-14,0],  y: [0,-12,18,0]  }, rotate: [45,405],      opacity: [0.4,0.7,0.4] },
  { id: 19, type: "line",     x: "52%",  y: "50vh", size: 40, color: "rgba(147,197,253,0.35)",  duration: 7,  delay: 3.5, drift: { x: [0,-10,15,0],  y: [0,8,-12,0]   }, rotate: [0,180],       opacity: [0.2,0.45,0.2] },
  { id: 20, type: "glowdot",  x: "66%",  y: "43vh", size: 5,  color: "rgba(245,158,11,1)",      duration: 6,  delay: 1.5, drift: { x: [0,12,-8,0],   y: [0,-18,10,0]  },                        opacity: [0.45,0.8,0.45] },
  { id: 21, type: "triangle", x: "78%",  y: "49vh", size: 10, color: "rgba(59,130,246,0.55)",   duration: 16, delay: 4,   drift: { x: [0,-16,12,0],  y: [0,10,-16,0]  }, rotate: [0,360],       opacity: [0.3,0.6,0.3] },
  { id: 22, type: "square",   x: "91%",  y: "37vh", size: 8,  color: "rgba(34,197,94,0.5)",     duration: 19, delay: 0.5, drift: { x: [0,-12,18,0],  y: [0,16,-8,0]   }, rotate: [0,270],       opacity: [0.3,0.6,0.3] },

  // ── Row 4 — lower-mid (52–70vh) ──
  { id: 23, type: "glowdot",  x: "5%",   y: "57vh", size: 7,  color: "rgba(147,197,253,1)",     duration: 7,  delay: 2,   drift: { x: [0,14,-10,0],  y: [0,-16,12,0]  },                        opacity: [0.5,0.85,0.5] },
  { id: 24, type: "diamond",  x: "18%",  y: "64vh", size: 12, color: "rgba(245,158,11,0.6)",    duration: 12, delay: 0,   drift: { x: [0,-18,12,0],  y: [0,14,-18,0]  }, rotate: [0,360],       opacity: [0.35,0.7,0.35] },
  { id: 25, type: "ring",     x: "32%",  y: "55vh", size: 24, color: "rgba(59,130,246,0.4)",    duration: 11, delay: 3,   drift: { x: [0,16,-12,0],  y: [0,-10,16,0]  }, scale: [1,1.25,1],    opacity: [0.25,0.55,0.25] },
  { id: 26, type: "glowdot",  x: "48%",  y: "68vh", size: 6,  color: "rgba(34,197,94,1)",       duration: 6,  delay: 4.5, drift: { x: [0,-12,16,0],  y: [0,18,-8,0]   },                        opacity: [0.45,0.8,0.45] },
  { id: 27, type: "cross",    x: "62%",  y: "58vh", size: 15, color: "rgba(245,158,11,0.45)",   duration: 14, delay: 1,   drift: { x: [0,10,-18,0],  y: [0,-14,10,0]  }, rotate: [0,180],       opacity: [0.28,0.55,0.28] },
  { id: 28, type: "glowdot",  x: "75%",  y: "65vh", size: 5,  color: "rgba(59,130,246,1)",      duration: 5,  delay: 2.5, drift: { x: [0,-8,14,0],   y: [0,10,-14,0]  },                        opacity: [0.45,0.8,0.45] },
  { id: 29, type: "triangle", x: "88%",  y: "53vh", size: 11, color: "rgba(147,197,253,0.5)",   duration: 17, delay: 0,   drift: { x: [0,-14,10,0],  y: [0,-12,18,0]  }, rotate: [0,120,240,360], opacity: [0.3,0.6,0.3] },

  // ── Row 5 — lower (70–86vh) ──
  { id: 30, type: "diamond",  x: "4%",   y: "74vh", size: 10, color: "rgba(59,130,246,0.65)",   duration: 13, delay: 1,   drift: { x: [0,20,-12,0],  y: [0,-18,14,0]  }, rotate: [45,405],      opacity: [0.4,0.7,0.4] },
  { id: 31, type: "glowdot",  x: "17%",  y: "80vh", size: 7,  color: "rgba(245,158,11,1)",      duration: 6,  delay: 3,   drift: { x: [0,-14,10,0],  y: [0,12,-18,0]  },                        opacity: [0.5,0.85,0.5] },
  { id: 32, type: "ring",     x: "30%",  y: "72vh", size: 20, color: "rgba(34,197,94,0.4)",     duration: 10, delay: 0,   drift: { x: [0,12,-16,0],  y: [0,-10,14,0]  }, scale: [1,1.3,1],     opacity: [0.25,0.55,0.25] },
  { id: 33, type: "square",   x: "45%",  y: "83vh", size: 10, color: "rgba(147,197,253,0.5)",   duration: 18, delay: 2,   drift: { x: [0,-20,14,0],  y: [0,18,-10,0]  }, rotate: [0,90,180,270,360], opacity: [0.3,0.6,0.3] },
  { id: 34, type: "glowdot",  x: "59%",  y: "76vh", size: 6,  color: "rgba(59,130,246,1)",      duration: 7,  delay: 4,   drift: { x: [0,16,-10,0],  y: [0,-14,12,0]  },                        opacity: [0.45,0.8,0.45] },
  { id: 35, type: "cross",    x: "73%",  y: "85vh", size: 13, color: "rgba(245,158,11,0.5)",    duration: 12, delay: 1.5, drift: { x: [0,-10,18,0],  y: [0,10,-16,0]  }, rotate: [0,90],        opacity: [0.3,0.6,0.3] },
  { id: 36, type: "diamond",  x: "87%",  y: "71vh", size: 9,  color: "rgba(34,197,94,0.55)",    duration: 15, delay: 5,   drift: { x: [0,-16,12,0],  y: [0,-12,16,0]  }, rotate: [0,360],       opacity: [0.35,0.65,0.35] },

  // ── Row 6 — bottom strip (86–100vh) ──
  { id: 37, type: "glowdot",  x: "10%",  y: "90vh", size: 8,  color: "rgba(147,197,253,1)",     duration: 5,  delay: 0,   drift: { x: [0,12,-10,0],  y: [0,-16,12,0]  },                        opacity: [0.5,0.85,0.5] },
  { id: 38, type: "ring",     x: "25%",  y: "95vh", size: 25, color: "rgba(59,130,246,0.4)",    duration: 13, delay: 2.5, drift: { x: [0,-18,14,0],  y: [0,10,-14,0]  }, scale: [1,1.2,1],     opacity: [0.25,0.5,0.25] },
  { id: 39, type: "triangle", x: "40%",  y: "88vh", size: 10, color: "rgba(245,158,11,0.55)",   duration: 16, delay: 4,   drift: { x: [0,20,-14,0],  y: [0,-8,14,0]   }, rotate: [0,240],       opacity: [0.3,0.6,0.3] },
  { id: 40, type: "glowdot",  x: "55%",  y: "93vh", size: 6,  color: "rgba(34,197,94,1)",       duration: 6,  delay: 1,   drift: { x: [0,-12,16,0],  y: [0,14,-10,0]  },                        opacity: [0.45,0.8,0.45] },
  { id: 41, type: "diamond",  x: "68%",  y: "97vh", size: 11, color: "rgba(59,130,246,0.65)",   duration: 12, delay: 3,   drift: { x: [0,14,-18,0],  y: [0,-12,16,0]  }, rotate: [45,405],      opacity: [0.4,0.7,0.4] },
  { id: 42, type: "square",   x: "82%",  y: "91vh", size: 8,  color: "rgba(147,197,253,0.5)",   duration: 19, delay: 0.5, drift: { x: [0,-14,10,0],  y: [0,16,-12,0]  }, rotate: [0,180],       opacity: [0.3,0.6,0.3] },
  { id: 43, type: "glowdot",  x: "95%",  y: "96vh", size: 7,  color: "rgba(245,158,11,1)",      duration: 7,  delay: 5,   drift: { x: [0,-10,14,0],  y: [0,-18,10,0]  },                        opacity: [0.5,0.85,0.5] },

  // ── Centre column extras (spread through all heights) ──
  { id: 44, type: "glowdot",  x: "50%",  y: "16vh", size: 5,  color: "rgba(245,158,11,1)",      duration: 6,  delay: 2,   drift: { x: [0,-8,12,0],   y: [0,10,-14,0]  },                        opacity: [0.4,0.75,0.4] },
  { id: 45, type: "cross",    x: "50%",  y: "45vh", size: 18, color: "rgba(59,130,246,0.4)",    duration: 14, delay: 0,   drift: { x: [0,14,-10,0],  y: [0,-10,14,0]  }, rotate: [0,360],       opacity: [0.25,0.5,0.25] },
  { id: 46, type: "glowdot",  x: "50%",  y: "72vh", size: 6,  color: "rgba(147,197,253,1)",     duration: 7,  delay: 3,   drift: { x: [0,-12,8,0],   y: [0,14,-10,0]  },                        opacity: [0.45,0.8,0.45] },
];

function ParticleShape({ p }: { p: Particle }) {
  const baseProps = {
    className: "pointer-events-none absolute",
    style: { left: p.x, top: p.y } as React.CSSProperties,
    animate: {
      x: p.drift.x,
      y: p.drift.y,
      opacity: p.opacity,
      ...(p.rotate ? { rotate: p.rotate } : {}),
      ...(p.scale  ? { scale:  p.scale  } : {}),
    },
    transition: {
      duration:  p.duration,
      delay:     p.delay,
      repeat:    Infinity,
      ease:      "easeInOut" as const,
    },
  };

  switch (p.type) {
    case "glowdot":
      return (
        <motion.div {...baseProps}>
          <div
            className="rounded-full"
            style={{
              width:     p.size,
              height:    p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 8}px ${p.color}40`,
            }}
          />
        </motion.div>
      );
    case "circle":
      return (
        <motion.div {...baseProps}>
          <div
            className="rounded-full"
            style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          />
        </motion.div>
      );
    case "dot":
      return (
        <motion.div {...baseProps}>
          <div
            className="rounded-full"
            style={{ width: p.size, height: p.size, backgroundColor: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
          />
        </motion.div>
      );
    case "square":
      return (
        <motion.div {...baseProps}>
          <div
            style={{
              width:  p.size,
              height: p.size,
              border: `1.5px solid ${p.color}`,
              boxShadow: `0 0 8px ${p.color}40`,
            }}
          />
        </motion.div>
      );
    case "diamond":
      return (
        <motion.div {...baseProps}>
          <div
            className="rotate-45"
            style={{
              width:  p.size,
              height: p.size,
              border: `1.5px solid ${p.color}`,
              boxShadow: `0 0 10px ${p.color}50`,
            }}
          />
        </motion.div>
      );
    case "ring":
      return (
        <motion.div {...baseProps}>
          <div
            className="rounded-full"
            style={{
              width:  p.size,
              height: p.size,
              border: `2px solid ${p.color}`,
              boxShadow: `0 0 12px ${p.color}40, inset 0 0 6px ${p.color}20`,
            }}
          />
        </motion.div>
      );
    case "line":
      return (
        <motion.div {...baseProps}>
          <div
            className="rounded-full"
            style={{ width: p.size, height: 2, backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }}
          />
        </motion.div>
      );
    case "cross":
      return (
        <motion.div {...baseProps}>
          <div className="relative" style={{ width: p.size, height: p.size }}>
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
              style={{ width: 2, height: p.size, backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }}
            />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
              style={{ width: p.size, height: 2, backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }}
            />
          </div>
        </motion.div>
      );
    case "triangle":
      return (
        <motion.div {...baseProps}>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft:   `${p.size / 2}px solid transparent`,
              borderRight:  `${p.size / 2}px solid transparent`,
              borderBottom: `${p.size}px solid ${p.color}`,
              filter: `drop-shadow(0 0 4px ${p.color})`,
            }}
          />
        </motion.div>
      );
    default:
      return null;
  }
}

export default function AmbientParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <ParticleShape key={p.id} p={p} />
      ))}
    </div>
  );
}
