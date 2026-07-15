"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const CODE_LINES = [
  { n: 1,  tokens: [{ t: "// Smart Traffic Controller: Cruxion EC", c: "text-text-tertiary" }] },
  { n: 2,  tokens: [{ t: "#define ", c: "text-accent-amber" }, { t: "GREEN_LED  ", c: "text-primary-light" }, { t: "10", c: "text-accent-amber" }] },
  { n: 3,  tokens: [{ t: "#define ", c: "text-accent-amber" }, { t: "YELLOW_LED ", c: "text-primary-light" }, { t: "9", c: "text-accent-amber" }] },
  { n: 4,  tokens: [{ t: "#define ", c: "text-accent-amber" }, { t: "RED_LED    ", c: "text-primary-light" }, { t: "8", c: "text-accent-amber" }] },
  { n: 5,  tokens: [{ t: "#define ", c: "text-accent-amber" }, { t: "TRIG_PIN   ", c: "text-primary-light" }, { t: "7", c: "text-accent-amber" }] },
  { n: 6,  tokens: [{ t: "#define ", c: "text-accent-amber" }, { t: "ECHO_PIN   ", c: "text-primary-light" }, { t: "6", c: "text-accent-amber" }] },
  { n: 7,  tokens: [{ t: "", c: "" }] },
  { n: 8,  tokens: [{ t: "void ", c: "text-accent-amber" }, { t: "setup", c: "text-primary-blue" }, { t: "() {", c: "text-white" }] },
  { n: 9,  tokens: [{ t: "  pinMode", c: "text-primary-blue" }, { t: "(GREEN_LED, ", c: "text-white" }, { t: "OUTPUT", c: "text-accent-amber" }, { t: ");", c: "text-white" }] },
  { n: 10, tokens: [{ t: "  pinMode", c: "text-primary-blue" }, { t: "(TRIG_PIN,  ", c: "text-white" }, { t: "OUTPUT", c: "text-accent-amber" }, { t: ");", c: "text-white" }] },
  { n: 11, tokens: [{ t: "  pinMode", c: "text-primary-blue" }, { t: "(ECHO_PIN,  ", c: "text-white" }, { t: "INPUT", c: "text-accent-amber" }, { t: ");", c: "text-white" }] },
  { n: 12, tokens: [{ t: "}", c: "text-white" }] },
  { n: 13, tokens: [{ t: "", c: "" }] },
  { n: 14, tokens: [{ t: "void ", c: "text-accent-amber" }, { t: "loop", c: "text-primary-blue" }, { t: "() {", c: "text-white" }] },
  { n: 15, tokens: [{ t: "  long ", c: "text-accent-amber" }, { t: "dist = ", c: "text-white" }, { t: "readDistance", c: "text-primary-blue" }, { t: "();", c: "text-white" }] },
  { n: 16, tokens: [{ t: "  if ", c: "text-accent-amber" }, { t: "(dist < ", c: "text-white" }, { t: "20", c: "text-primary-light" }, { t: ") {", c: "text-white" }], highlight: true },
  { n: 17, tokens: [{ t: "    digitalWrite", c: "text-primary-blue" }, { t: "(RED_LED, ", c: "text-white" }, { t: "HIGH", c: "text-accent-amber" }, { t: ");", c: "text-white" }], highlight: true },
  { n: 18, tokens: [{ t: "  } else {", c: "text-white" }] },
  { n: 19, tokens: [{ t: "    digitalWrite", c: "text-primary-blue" }, { t: "(GREEN_LED, ", c: "text-white" }, { t: "HIGH", c: "text-accent-amber" }, { t: ");", c: "text-white" }] },
  { n: 20, tokens: [{ t: "  }", c: "text-white" }] },
  { n: 21, tokens: [{ t: "  delay", c: "text-primary-blue" }, { t: "(", c: "text-white" }, { t: "500", c: "text-primary-light" }, { t: ");", c: "text-white" }] },
  { n: 22, tokens: [{ t: "}", c: "text-white" }] },
];

const SERIAL_LINES = [
  { t: "23:14:01", msg: "Setup complete. Pins initialized.", color: "text-text-tertiary" },
  { t: "23:14:02", msg: "Distance: 45cm, traffic clear", color: "text-accent-green" },
  { t: "23:14:02", msg: "GREEN_LED → HIGH", color: "text-primary-light" },
  { t: "23:14:04", msg: "Distance: 17cm, vehicle detected!", color: "text-accent-amber" },
  { t: "23:14:04", msg: "RED_LED → HIGH · stopping traffic", color: "text-red-400" },
  { t: "23:14:06", msg: "Distance: 62cm, path clear", color: "text-accent-green" },
  { t: "23:14:06", msg: "GREEN_LED → HIGH", color: "text-primary-light" },
  { t: "23:14:08", msg: "Distance: 12cm, vehicle detected!", color: "text-accent-amber" },
  { t: "23:14:08", msg: "RED_LED → HIGH · stopping traffic", color: "text-red-400" },
];

export default function SceneECEmbed({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const local = useLocalProgress(progress, range[0], range[1]);
  const headerOp = useTransform(local, [0, 0.2], [0, 1]);
  const editorOp = useTransform(local, [0.05, 0.25], [0, 1]);
  const serialOp = useTransform(local, [0.3, 0.5], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      {/* Top bar */}
      <motion.div
        style={{ opacity: headerOp }}
        className="flex shrink-0 items-center justify-between border-b border-[#2E4A6E] bg-[#0F1E32] px-3 py-1"
      >
        <div className="flex items-center gap-1.5 text-[9px]">
          <span className="font-bold uppercase tracking-wider text-accent-amber">
            Crucible · Apprentice
          </span>
          <span className="text-text-tertiary">/</span>
          <span className="text-white">Step 5: Write the control logic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          <span className="text-[8px] text-accent-green">Compiled OK</span>
        </div>
      </motion.div>

      {/* Two-pane layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code editor */}
        <motion.div
          style={{ opacity: editorOp }}
          className="flex flex-1 flex-col overflow-hidden border-r border-[#2E4A6E]"
        >
          {/* Tab bar */}
          <div className="flex shrink-0 items-center border-b border-[#2E4A6E] bg-[#0F1E32]">
            <div className="flex items-center gap-1.5 border-r border-[#2E4A6E] bg-[#060E1A] px-3 py-1.5"
              style={{ borderBottom: "2px solid #3B82F6" }}>
              <span className="text-[8px] text-accent-amber">●</span>
              <span className="text-[9px] font-medium text-white">traffic.ino</span>
            </div>
          </div>

          {/* Lines */}
          <div className="flex-1 overflow-y-auto bg-[#060E1A] py-1.5 font-mono text-[9px]">
            {CODE_LINES.map((line) => (
              <div
                key={line.n}
                className={`flex px-2 py-[1.5px] ${
                  (line as { highlight?: boolean }).highlight
                    ? "border-l-2 border-primary-blue bg-primary-blue/8"
                    : ""
                }`}
              >
                <span className="mr-3 w-5 shrink-0 select-none text-right text-text-tertiary">
                  {line.n}
                </span>
                <span>
                  {line.tokens.map((tok, i) => (
                    <span key={i} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            {/* Blinking cursor */}
            <div className="flex px-2 py-[1.5px]">
              <span className="mr-3 w-5 shrink-0 text-right text-text-tertiary">23</span>
              <span
                className="inline-block animate-pulse bg-white"
                style={{ width: 5, height: 10 }}
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex shrink-0 items-center justify-between border-t border-[#2E4A6E] bg-[#0F1E32] px-2 py-1">
            <span className="text-[8px] text-text-tertiary">Arduino Uno · Port /dev/cu.usbmodem</span>
            <span className="text-[8px] text-accent-green">▶ Upload</span>
          </div>
        </motion.div>

        {/* Serial monitor */}
        <motion.div
          style={{ opacity: serialOp }}
          className="hidden w-[38%] shrink-0 flex-col sm:flex"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[#2E4A6E] bg-[#0F1E32] px-2 py-1.5">
            <span className="text-[9px] font-bold text-white">Serial Monitor</span>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-text-tertiary">9600 baud</span>
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#020B14] p-2 font-mono">
            {SERIAL_LINES.map((l, i) => (
              <div key={i} className="mb-1 flex gap-2 text-[8px]">
                <span className="shrink-0 text-text-tertiary">{l.t}</span>
                <span className={l.color}>{l.msg}</span>
              </div>
            ))}
            <div className="flex gap-1 text-[8px]">
              <span className="text-text-tertiary">›</span>
              <span
                className="inline-block animate-pulse bg-accent-green"
                style={{ width: 4, height: 8 }}
              />
            </div>
          </div>

          {/* UV check */}
          <div className="shrink-0 border-t border-[#2E4A6E] bg-[#0F1E32] p-2">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-2">
              <div className="mb-1 text-[8px] font-bold uppercase tracking-wider text-text-tertiary">
                Understanding check
              </div>
              <p className="text-[9px] text-text-secondary">
                Why does <span className="font-mono text-accent-amber">RED_LED</span> go{" "}
                <span className="font-mono text-accent-amber">HIGH</span> when dist &lt; 20?
              </p>
              <div className="mt-2 flex gap-1">
                <div className="flex-1 rounded border border-primary-blue/30 bg-primary-blue/10 px-1.5 py-1 text-[8px] text-white">
                  Vehicle is in range, stop traffic
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}
