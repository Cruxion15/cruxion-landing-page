"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SceneFrame, useLocalProgress } from "./sceneUtils";

const FLOW = [
  { id: "arduino", label: "Arduino + WiFi", sub: "ESP8266 · Sensor data", icon: "⚡", color: "#00979C" },
  { id: "mqtt",    label: "MQTT Broker",    sub: "Publish · QoS 1",       icon: "📡", color: "#3B82F6" },
  { id: "aws",     label: "AWS IoT Core",   sub: "Rule engine · Shadow",  icon: "☁",  color: "#F59E0B" },
  { id: "dash",    label: "Live Dashboard", sub: "Grafana · Real-time",   icon: "📊", color: "#22C55E" },
];

const READINGS = [
  { label: "Traffic density", value: "17 cm", status: "Vehicle detected",  color: "text-red-400",      bg: "bg-red-400/10",      border: "border-red-400/20" },
  { label: "Signal state",    value: "RED",    status: "Stopping traffic",  color: "text-red-400",      bg: "bg-red-400/10",      border: "border-red-400/20" },
  { label: "Uptime",          value: "4m 23s", status: "Connected",         color: "text-accent-green", bg: "bg-accent-green/10", border: "border-accent-green/20" },
  { label: "MQTT messages",   value: "143",    status: "Published",         color: "text-primary-light",bg: "bg-primary-blue/10", border: "border-primary-blue/20" },
];

/* Each flow node animates in separately: hooks at component level */
function FlowNode({
  node,
  i,
  local,
}: {
  node: (typeof FLOW)[number];
  i: number;
  local: MotionValue<number>;
}) {
  const at = 0.12 + i * 0.1;
  const op = useTransform(local, [at, at + 0.1], [0, 1]);
  const scale = useTransform(local, [at, at + 0.1], [0.75, 1]);
  return (
    <motion.div
      style={{ opacity: op, scale }}
      className="flex shrink-0 flex-col items-center gap-1.5"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl border text-lg"
        style={{
          borderColor: `${node.color}40`,
          backgroundColor: `${node.color}15`,
          boxShadow: `0 0 18px ${node.color}25`,
        }}
      >
        {node.icon}
      </div>
      <div className="text-center">
        <div className="text-[9px] font-bold text-white">{node.label}</div>
        <div className="text-[8px] text-text-tertiary">{node.sub}</div>
      </div>
    </motion.div>
  );
}

function ReadingCard({
  r,
  i,
  local,
}: {
  r: (typeof READINGS)[number];
  i: number;
  local: MotionValue<number>;
}) {
  const at = 0.48 + i * 0.07;
  const op = useTransform(local, [at, at + 0.1], [0, 1]);
  const y = useTransform(local, [at, at + 0.1], [8, 0]);
  return (
    <motion.div
      style={{ opacity: op, y }}
      className={`rounded-lg border ${r.border} ${r.bg} p-2.5`}
    >
      <div className="text-[8px] text-text-tertiary">{r.label}</div>
      <div className={`mt-0.5 text-base font-bold ${r.color}`}>{r.value}</div>
      <div className="text-[8px] text-text-tertiary">{r.status}</div>
    </motion.div>
  );
}

export default function SceneECCloud({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const local = useLocalProgress(progress, range[0], range[1]);

  const headerOp = useTransform(local, [0, 0.15], [0, 1]);
  const flowOp = useTransform(local, [0.08, 0.28], [0, 1]);
  const dataOp = useTransform(local, [0.42, 0.58], [0, 1]);
  const captOp = useTransform(local, [0.72, 0.88], [0, 1]);

  /* Data packet traveling along the flow line */
  const packetProgress = useTransform(local, [0.15, 0.65], [0, 1]);

  return (
    <SceneFrame progress={progress} range={range}>
      <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-4 sm:px-5">
        {/* Header */}
        <motion.div style={{ opacity: headerOp }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-amber">
            Crucible · Architect tier
          </span>
          <h2 className="mt-2 text-base font-bold text-white sm:text-lg">
            Hardware meets the cloud.
          </h2>
          <p className="mt-1 text-[11px] text-text-secondary">
            The sensor data leaves the Arduino and appears live in a cloud
            dashboard. MQTT → AWS IoT Core → Grafana.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          style={{ opacity: flowOp }}
          className="overflow-x-auto rounded-xl border border-[#2E4A6E] bg-[#060E1A] p-4"
        >
          <div className="flex min-w-max items-center gap-0 mx-auto w-fit">
            {FLOW.map((node, i) => (
              <div key={node.id} className="flex items-center">
                <FlowNode node={node} i={i} local={local} />
                {i < FLOW.length - 1 && (
                  <div className="relative mx-2 h-[2px] w-14 shrink-0 overflow-hidden rounded-full bg-[#1C3050]">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-blue to-accent-amber"
                      style={{ scaleX: packetProgress, transformOrigin: "left" }}
                    />
                    {/* Traveling packet */}
                    <motion.div
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
                      style={{ opacity: packetProgress }}
                      animate={{ x: [0, 52, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live readings */}
        <motion.div style={{ opacity: dataOp }}>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[9px] font-bold uppercase tracking-wider text-text-tertiary">
              Live sensor data · AWS IoT Core
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
              <span className="text-[8px] font-bold text-accent-green">CONNECTED</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {READINGS.map((r, i) => (
              <ReadingCard key={r.label} r={r} i={i} local={local} />
            ))}
          </div>
        </motion.div>

        {/* Caption */}
        <motion.div
          style={{ opacity: captOp }}
          className="rounded-xl border border-accent-amber/25 bg-accent-amber/5 px-3 py-2.5"
        >
          <div className="text-[10px] font-bold text-accent-amber">
            ☁ Cloud-connected hardware, from Year 1
          </div>
          <div className="mt-0.5 text-[9px] leading-relaxed text-text-secondary">
            EC students ship real IoT systems, not simulations. AWS, MQTT,
            live sensor data. The same stack industry uses.
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}
