"use client";

import { useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const PINS = ["D6", "D7", "D8", "D9", "D10", "5V", "GND"];

const PIN_DATA: Record<
  string,
  { label: string; detail: string; code: string; color: string }
> = {
  D10: {
    label: "Digital pin 10",
    detail: "Green traffic LED output → Green LED anode.",
    code: "digitalWrite(GREEN_LED, HIGH);",
    color: "#22C55E",
  },
  D9: {
    label: "Digital pin 9",
    detail: "Yellow traffic LED output → Yellow LED anode.",
    code: "digitalWrite(YELLOW_LED, HIGH);",
    color: "#EAB308",
  },
  D8: {
    label: "Digital pin 8",
    detail: "Red traffic LED output → Red LED anode.",
    code: "digitalWrite(RED_LED, LOW);",
    color: "#EF4444",
  },
  D7: {
    label: "Digital pin 7",
    detail: "HC-SR04 TRIG — sends 10μs ultrasonic pulse.",
    code: "digitalWrite(TRIG_PIN, HIGH);",
    color: "#3B82F6",
  },
  D6: {
    label: "Digital pin 6",
    detail: "HC-SR04 ECHO — measures pulse return time.",
    code: "duration = pulseIn(ECHO_PIN, HIGH);",
    color: "#3B82F6",
  },
  "5V": {
    label: "Power — 5V",
    detail: "Powers LEDs and HC-SR04 sensor module.",
    code: "// 5V power rail",
    color: "#EF4444",
  },
  GND: {
    label: "Ground",
    detail: "Common ground for all components.",
    code: "// Common GND",
    color: "#6B7280",
  },
};

function ArduinoBoard() {
  return (
    <div className="relative shrink-0">
      <div className="relative w-28 rounded-lg border-2 border-[#00979C] bg-[#00979C]/10 p-2.5">
        {/* Label */}
        <div className="mb-2 text-[7px] font-bold uppercase tracking-[0.2em] text-[#00979C]">
          Arduino UNO
        </div>
        {/* Digital pin strip top */}
        <div className="mb-1.5 flex gap-[3px]">
          {["13", "12", "~11", "~10", "~9", "8", "7", "6"].map((p) => (
            <div key={p} className="flex flex-col items-center gap-[2px]">
              <div className="h-2.5 w-[3px] rounded-t-sm bg-[#888]" />
              <div className="h-1.5 w-[3px] rounded-b-sm bg-[#555]" />
            </div>
          ))}
        </div>
        {/* Main chip */}
        <div className="mx-auto mb-1.5 h-4 w-16 rounded-sm border border-[#333] bg-[#111]" />
        {/* Small chip */}
        <div className="mb-1 flex items-center gap-1">
          <div className="h-3 w-8 rounded-sm border border-[#333] bg-[#111]" />
          <div className="h-2 w-2 rounded-full border border-[#00979C]/50 bg-[#00979C]/10" />
        </div>
        {/* Analog pins bottom */}
        <div className="flex gap-[3px]">
          {["A0", "A1", "A2", "A3", "A4", "A5"].map((p) => (
            <div key={p} className="flex flex-col items-center gap-[2px]">
              <div className="h-1.5 w-[3px] rounded-t-sm bg-[#555]" />
              <div className="h-2.5 w-[3px] rounded-b-sm bg-[#888]" />
            </div>
          ))}
        </div>
        {/* USB port */}
        <div className="absolute -bottom-0.5 left-2 h-2.5 w-5 rounded-sm border border-[#00979C]/40 bg-[#1C3050]" />
        {/* Power LED */}
        <div
          className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#22C55E]"
          style={{ boxShadow: "0 0 5px #22C55E" }}
        />
        {/* Reset button */}
        <div className="absolute bottom-4 right-2 h-2 w-2 rounded-full border border-[#00979C]/60 bg-[#00979C]/15" />
      </div>
    </div>
  );
}

function Breadboard({ connections }: { connections: number }) {
  const leds = [
    { color: "#EF4444", glow: connections >= 1 },
    { color: "#EAB308", glow: connections >= 3 },
    { color: "#22C55E", glow: connections >= 2 },
  ];
  return (
    <div className="shrink-0 rounded-lg border border-[#2E4A6E] bg-[#E8E0C8]/10 p-2 w-[72px]">
      <div className="mb-1 text-[7px] font-bold uppercase tracking-widest text-text-tertiary">
        BBOARD
      </div>
      {/* Top power rail */}
      <div className="mb-1 h-[2px] w-full rounded-full bg-red-500/30" />
      {/* Hole grid */}
      <div className="mb-1 grid grid-cols-5 gap-[3px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-[5px] w-[5px] rounded-full bg-[#2E4A6E]" />
        ))}
      </div>
      {/* LEDs */}
      <div className="mb-1 flex justify-center gap-2">
        {leds.map((led, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="h-3 w-3 rounded-full border"
              style={{
                borderColor: `${led.color}60`,
                backgroundColor: `${led.color}25`,
                boxShadow: led.glow ? `0 0 8px ${led.color}` : "none",
              }}
            />
            <div className="h-3 w-[1px] bg-[#555]" />
          </div>
        ))}
      </div>
      {/* HC-SR04 sensor */}
      <div className="mx-auto w-fit rounded border border-[#2E4A6E] bg-[#1C3050] px-1 py-0.5">
        <div className="mb-0.5 text-[6px] text-text-tertiary">HC-SR04</div>
        <div className="flex gap-0.5">
          <div className="h-2.5 w-2.5 rounded-sm border border-[#2E4A6E] bg-[#0A1525]" />
          <div className="h-2.5 w-2.5 rounded-sm border border-[#2E4A6E] bg-[#0A1525]" />
        </div>
      </div>
      {/* Bottom power rail */}
      <div className="mt-1 h-[2px] w-full rounded-full bg-primary-blue/25" />
    </div>
  );
}

export default function SceneECLab({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const local = useLocalProgress(progress, range[0], range[1]);
  const [selectedPin, setSelectedPin] = useState("D10");
  const [connections, setConnections] = useState(0);

  const topBarOp = useTransform(local, [0, 0.15], [0, 1]);
  const leftOp = useTransform(local, [0.05, 0.25], [0, 1]);
  const leftY = useTransform(local, [0.05, 0.25], [10, 0]);
  const rightOp = useTransform(local, [0.2, 0.4], [0, 1]);

  const pin = PIN_DATA[selectedPin];

  return (
    <SceneFrame progress={progress} range={range}>
      {/* Lesson top bar */}
      <motion.div
        style={{ opacity: topBarOp }}
        className="flex shrink-0 items-center justify-between border-b border-[#2E4A6E] bg-[#0F1E32] px-3 py-1"
      >
        <div className="flex items-center gap-1.5 text-[9px] font-bold">
          <span className="uppercase tracking-wider text-text-tertiary">Crucible</span>
          <span className="text-text-tertiary">·</span>
          <span className="rounded bg-accent-amber/20 px-1.5 py-0.5 uppercase tracking-wider text-accent-amber">
            Apprentice
          </span>
          <span className="text-text-tertiary">/</span>
          <span className="hidden text-white sm:block">
            AI-Powered Smart Traffic Intersection System
          </span>
        </div>
        <span className="text-[9px] font-medium text-text-tertiary">12 min</span>
      </motion.div>

      {/* Progress track */}
      <motion.div
        style={{ opacity: topBarOp }}
        className="relative h-0.5 shrink-0 bg-[#1C3050]"
      >
        <div
          className="absolute left-0 top-0 h-full rounded-r bg-gradient-to-r from-accent-amber to-primary-blue"
          style={{ width: "12.5%" }}
        />
      </motion.div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — lesson content */}
        <motion.div
          style={{ opacity: leftOp, y: leftY }}
          className="flex flex-1 flex-col overflow-y-auto p-3"
        >
          {/* Hook badge */}
          <div className="mb-1.5 flex items-center gap-2">
            <span className="rounded border border-accent-amber/50 bg-accent-amber/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-amber">
              Hook
            </span>
            <span className="text-[9px] text-text-tertiary">1 of 8</span>
          </div>

          <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
            Traffic lights are embedded systems, not decorations.
          </h3>
          <p className="mt-1.5 text-[10px] leading-relaxed text-text-secondary">
            Build a smart intersection one connection at a time — controller,
            power, LED outputs, ultrasonic sensing, then adaptive logic.
          </p>

          {/* Two-column info */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <div className="rounded-lg border border-[#2E4A6E] bg-[#060E1A] p-2">
              <div className="mb-1.5 text-[8px] font-bold uppercase tracking-wider text-text-tertiary">
                What this step teaches
              </div>
              {[
                "Arduino is the controller",
                "Sensors become inputs",
                "LEDs become outputs",
              ].map((b) => (
                <div key={b} className="mb-1 flex items-start gap-1">
                  <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-primary-blue" />
                  <span className="text-[9px] text-text-secondary">{b}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-[#2E4A6E] bg-[#060E1A] p-2">
              <div className="mb-1.5 text-[8px] font-bold uppercase tracking-wider text-text-tertiary">
                Mental model
              </div>
              <div className="space-y-0.5 font-mono text-[8px] text-primary-light">
                <div>input → Arduino → output</div>
                <div>sensor → decision → LEDs</div>
              </div>
              <p className="mt-1.5 text-[8px] leading-relaxed text-text-tertiary">
                Know the flow before writing syntax.
              </p>
            </div>
          </div>

          {/* Socratic question */}
          <div className="mt-2.5 rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-2.5">
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="text-[11px]">⭐</span>
              <span className="text-[10px] font-bold text-white">
                What did you just learn?
              </span>
            </div>
            <p className="mb-2 text-[9px] text-text-secondary">
              Before wiring anything, what is the Arduino responsible for?
            </p>
            {[
              { text: "Reading sensors and controlling outputs", correct: true },
              { text: "Supplying city grid power", correct: false },
              { text: "Replacing every traffic light bulb", correct: false },
            ].map((opt, i) => (
              <div
                key={i}
                className={`mb-1 cursor-pointer rounded border px-2 py-1.5 text-[9px] transition-colors ${
                  opt.correct
                    ? "border-primary-blue/50 bg-primary-blue/15 text-white"
                    : "border-[#2E4A6E] text-text-secondary hover:border-primary-blue/20"
                }`}
              >
                {opt.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — component lab */}
        <motion.div
          style={{ opacity: rightOp }}
          className="hidden w-[44%] shrink-0 flex-col border-l border-[#2E4A6E] sm:flex"
        >
          {/* Lab header */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#2E4A6E] bg-[#0F1E32] px-2 py-1">
            <div>
              <div className="text-[10px] font-bold text-white">3D component lab</div>
              <div className="text-[9px] text-text-tertiary">
                {connections} / 7 connections complete
              </div>
            </div>
            <div className="flex gap-1">
              {["Orbit 3D", "▷", "⚡"].map((b) => (
                <button
                  key={b}
                  className="rounded border border-[#2E4A6E] bg-[#060E1A] px-1.5 py-0.5 text-[8px] text-text-secondary transition-colors hover:border-primary-blue/40 hover:text-white"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Pin inspector */}
          <div className="shrink-0 border-b border-[#2E4A6E] bg-[#060E1A] px-2.5 py-1.5">
            <div className="mb-0.5 text-[8px] font-bold uppercase tracking-wider text-text-tertiary">
              Pin Inspector
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: pin?.color,
                  boxShadow: `0 0 6px ${pin?.color}`,
                }}
              />
              <span className="text-[10px] font-bold text-white">{pin?.label}</span>
            </div>
            <div className="mt-0.5 text-[9px] text-text-secondary">{pin?.detail}</div>
          </div>

          {/* Hardware canvas */}
          <div className="flex flex-1 items-center justify-center gap-2 overflow-hidden bg-[#060E1A] px-3 py-2">
            <ArduinoBoard />
            {/* Connection wires */}
            <svg width="18" height="70" className="shrink-0 overflow-visible">
              {connections > 0 && (
                <line x1="9" y1="8" x2="9" y2="62" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.8" />
              )}
              {connections > 1 && (
                <line x1="5" y1="20" x2="5" y2="62" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.8" />
              )}
              {connections > 2 && (
                <line x1="13" y1="14" x2="13" y2="62" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.8" />
              )}
              {connections > 3 && (
                <line x1="9" y1="35" x2="9" y2="62" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.7" />
              )}
            </svg>
            <Breadboard connections={connections} />
          </div>

          {/* Pin selector + code + actions */}
          <div className="shrink-0 border-t border-[#2E4A6E] bg-[#0F1E32] px-2 py-1.5">
            <div className="mb-1.5 flex flex-wrap gap-1">
              {PINS.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPin(p)}
                  className={`rounded-full border px-1.5 py-0.5 font-mono text-[8px] font-bold transition-colors ${
                    selectedPin === p
                      ? "border-primary-blue bg-primary-blue text-white"
                      : "border-[#2E4A6E] bg-[#060E1A] text-text-secondary hover:border-primary-blue/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mb-1.5 rounded border border-[#2E4A6E] bg-[#060E1A] px-2 py-1">
              <span className="font-mono text-[9px] text-accent-amber">{pin?.code}</span>
            </div>
            <div className="flex gap-1">
              <button className="flex-1 rounded border border-[#2E4A6E] py-1 text-[8px] text-text-secondary transition-colors hover:border-primary-blue/30">
                Inspect model
              </button>
              <button
                onClick={() => setConnections((c) => Math.min(7, c + 1))}
                className="flex-1 rounded bg-primary-blue py-1 text-[8px] font-bold text-white transition-colors hover:bg-primary-blue/80"
              >
                Connect it
              </button>
              <button
                onClick={() => setConnections(0)}
                className="rounded border border-[#2E4A6E] px-2 py-1 text-[8px] text-text-secondary transition-colors hover:border-primary-blue/30"
              >
                ↺
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}
