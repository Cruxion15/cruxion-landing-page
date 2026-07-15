import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cruxion Pulse | Daily Engagement for Engineering Students",
  description:
    "Cruxion Pulse is the daily-engagement layer of the Cruxion platform. Streaks, spaced-repetition review, badges, and a live leaderboard keep students practicing between classes.",
  alternates: {
    canonical: "https://cruxion.in/cruxion-pulse",
  },
};

const features = [
  {
    title: "A daily practice loop",
    detail: "Students open a single Today feed each day with a short, focused task, so daily practice takes minutes, not hours.",
  },
  {
    title: "Spaced-repetition review",
    detail: "Concepts a student has already learned resurface for review at the right interval, so understanding compounds instead of fading.",
  },
  {
    title: "Streaks and badges",
    detail: "Consistency is rewarded directly. Streaks track daily practice, and badges mark real milestones in a student's progress.",
  },
  {
    title: "A live section leaderboard",
    detail: "Students see how they stand against their own section, turning daily practice into something social, not solitary.",
  },
  {
    title: "Faculty visibility",
    detail: "Faculty and admins see engagement at a glance across their sections, so a quiet student is visible before it becomes a pattern.",
  },
];

export default function CruxionPulsePage() {
  return (
    <>
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            Cruxion Pulse
          </h1>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Cruxion Pulse is the daily-engagement layer of the Cruxion
            platform. A structured curriculum is only useful if students
            actually show up to it. Pulse is built to make that happen every
            day, not just during graded assignments.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            What Pulse does
          </h2>

          <div className="mt-8 space-y-8">
            {features.map((feature) => (
              <div key={feature.title} className="border-b border-border-subtle pb-8 last:border-0">
                <h3 className="text-base font-bold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{feature.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Why daily engagement matters
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Most learning tools are used only when an assignment is due.
            Pulse is built around the opposite assumption: that consistent,
            small daily practice builds real skill faster than occasional
            long sessions, and that students need a reason to come back on
            days nothing is due.
          </p>

          <div className="mt-14 rounded-2xl border border-primary-blue/30 bg-primary-blue/[0.06] p-8">
            <h2 className="text-lg font-bold text-text-primary">
              See Pulse alongside a Cruxion pilot
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Pulse runs alongside the core Cruxion platform for any college
              running a pilot.
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
