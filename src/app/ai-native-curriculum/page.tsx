import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What Does It Mean for an Engineering College to Be AI-Native? | Cruxion",
  description:
    "A framework for what it actually means to make an engineering college AI-native, and where Cruxion's platform fits into it.",
  alternates: {
    canonical: "https://cruxion.in/ai-native-curriculum",
  },
};

const layers = [
  {
    name: "Student layer",
    detail: "AI-assisted building from semester one, with verification that the student understood what they built, not just that it ran.",
    status: "Delivered by Cruxion, across CS and EC tracks",
  },
  {
    name: "Faculty layer",
    detail: "AI-assisted grading, plagiarism review, and curriculum tools, so adoption doesn't add to faculty workload.",
    status: "Delivered by Cruxion, through hint trees, plagiarism flags, and marks export",
  },
  {
    name: "Engagement layer",
    detail: "Keeping students practicing consistently, not just during graded assignments.",
    status: "Delivered by Cruxion Pulse, a daily-engagement layer with streaks and progress tracking",
  },
  {
    name: "Institutional layer",
    detail: "Visibility for a college into student engagement and competency trends over time.",
    status: "In progress, through Cruxion's engagement and competency tracking for pilot colleges",
  },
];

export default function AiNativeCurriculumPage() {
  return (
    <>
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            What does it mean for an engineering college to be AI-native?
          </h1>

          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            An AI-native engineering college is one where AI is built into how
            students learn and how faculty teach and grade, not a single AI
            lab or elective bolted onto an otherwise unchanged program. It
            means students build with AI from the start and are held to a
            real standard of understanding, and faculty get tools that make
            that standard practical to enforce at scale.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            The layers of an AI-native college
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Most colleges start with a single elective or workshop. A genuinely
            AI-native college builds AI into the student experience, the
            faculty workflow, day-to-day engagement, and institutional
            visibility, together.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border-subtle">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-card text-left">
                  <th className="px-4 py-3 font-semibold text-text-primary">Layer</th>
                  <th className="px-4 py-3 font-semibold text-text-primary">What it covers</th>
                  <th className="px-4 py-3 font-semibold text-text-primary">Cruxion today</th>
                </tr>
              </thead>
              <tbody>
                {layers.map((layer) => (
                  <tr key={layer.name} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-4 align-top font-medium text-text-primary">{layer.name}</td>
                    <td className="px-4 py-4 align-top text-text-secondary">{layer.detail}</td>
                    <td className="px-4 py-4 align-top text-text-secondary">{layer.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Where Cruxion fits
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Cruxion is built around Understanding Verification: after a
            student&apos;s code passes, an AI mentor asks follow-up questions
            about their own approach, so real comprehension is what gets
            rewarded, not just a working submission. That runs across both
            the CS/ISE/AIML and EC/ECE/EEE tracks, with faculty-facing tools
            for grading, plagiarism review, and progress tracking built in
            from the start.
          </p>

          <div className="mt-14 rounded-2xl border border-primary-blue/30 bg-primary-blue/[0.06] p-8">
            <h2 className="text-lg font-bold text-text-primary">
              Considering an AI-native transformation for your college?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Start with a pilot in one department and see how students and
              faculty respond.
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
