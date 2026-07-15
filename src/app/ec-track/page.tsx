import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EC, ECE and EEE Track: AI-Native Embedded Systems and IoT | Cruxion",
  description:
    "Cruxion's EC, ECE and EEE track takes Electronics, Communication, and Electrical students from a visual component lab and embedded C to cloud-connected IoT on real cloud infrastructure, with Understanding Verification applied to hardware logic from Year 1.",
  alternates: {
    canonical: "https://cruxion.in/ec-track",
  },
};

const tiers = [
  {
    name: "Apprentice",
    focus: "The physical language of hardware",
    detail:
      "Students meet a 3D component lab, wiring LEDs, mapping GPIO pins, and tracing power and ground. They build mental models of signal flow before a single line of embedded C is written, with every pin explained in context instead of buried in a datasheet.",
  },
  {
    name: "Engineer",
    focus: "Embedded C with understanding",
    detail:
      "The embedded C workspace opens with the circuit already wired. Students read sensor data, write control logic, and watch the serial monitor respond live, while a Socratic AI mentor checks understanding, not just syntax. Understanding Verification applies the same rigour used on the CS track to hardware logic.",
  },
  {
    name: "Architect",
    focus: "Hardware that meets the cloud",
    detail:
      "Students add a WiFi module, publish sensor readings over MQTT to AWS IoT Core, and watch a live dashboard light up. This is cloud-connected hardware, the way industry builds it, and it is the bridge between embedded systems and cloud engineering.",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Cruxion EC, ECE and EEE Track",
  description:
    "An AI-native hardware engineering track for Electronics, Communication, and Electrical students, running from a visual component lab and embedded C to cloud-connected IoT, with Understanding Verification applied to hardware logic.",
  provider: {
    "@type": "Organization",
    name: "Cruxion",
    url: "https://cruxion.in",
  },
};

export default function EcTrackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            The EC, ECE and EEE track
          </h1>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            The EC, ECE and EEE track is Cruxion&apos;s hardware path for
            Electronics and Communication, Electronics, and Electrical
            students. It starts with the physical language of circuits and ends
            with real IoT systems running on cloud infrastructure, and it holds
            students to the same standard of real understanding that the
            software track does, from Year 1 rather than final year.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            The three tiers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            The track runs on the same three-tier structure as the rest of
            Cruxion: Apprentice, Engineer, Architect. Each tier builds on the
            last, moving from wiring a circuit to shipping a cloud-connected
            device.
          </p>

          <div className="mt-8 space-y-8">
            {tiers.map((tier, i) => (
              <div key={tier.name} className="flex gap-5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary-blue/30 bg-primary-blue/[0.08] text-sm font-bold text-primary-light">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">
                    {tier.name}: {tier.focus}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {tier.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Understanding Verification, applied to hardware
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            A working circuit is not proof a student understood it. On the EC
            track, once control logic behaves correctly, the Socratic AI mentor
            asks the student to defend their own decisions, for example why a
            specific output goes high when a sensor reading crosses a threshold.
            The same Understanding Verification model used for code applies to
            embedded logic, so comprehension is what gets rewarded.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            A component lab and a lending library
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Students learn on a visual component lab that makes GPIO pins, power
            rails, and signal flow tangible before they touch real hardware. A
            component lending library lets a section check out, build with, and
            return physical kits, with every item tracked, so hands-on work
            scales across a batch.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Built for faculty, and for daily practice
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Faculty get progressive hint trees they curate, plagiarism review,
            and one-click marks export, the same faculty tooling as the software
            track. Cruxion Pulse keeps students practicing between graded
            assignments with a daily task feed, spaced-repetition review,
            streaks, and a live section leaderboard.
          </p>

          <div className="mt-14 rounded-2xl border border-primary-blue/30 bg-primary-blue/[0.06] p-8">
            <h2 className="text-lg font-bold text-text-primary">
              Bring the EC track to your department
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Start with a pilot in one section and see students build
              cloud-connected hardware and prove they understood it.
            </p>
            <a
              href="/#cta"
              className="mt-5 inline-flex items-center rounded-lg bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-blue/90"
            >
              Request a pilot
              <span className="ml-1" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
