import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What Is Understanding Verification? | Cruxion",
  description:
    "Understanding Verification is how Cruxion confirms a student actually understood a coding assignment, not just that the code ran. How it works and why it matters for AI-native engineering education.",
  alternates: {
    canonical: "https://cruxion.in/understanding-verification",
  },
};

const steps = [
  {
    title: "Code passes automated tests",
    detail: "A student submits an assignment and it passes the standard automated checks. This is where most platforms stop.",
  },
  {
    title: "The AI mentor asks follow-up questions",
    detail: "A Socratic AI mentor asks three questions about the submission, referencing the student's own variable names and their own specific approach, not a generic template question.",
  },
  {
    title: "The student explains their own work",
    detail: "Because the questions are tied to the exact code submitted, a student who copied a solution or had AI generate it without understanding it cannot answer convincingly.",
  },
  {
    title: "An Understanding Score is recorded",
    detail: "The result feeds an Understanding Score that determines whether the student progresses, separate from whether the code merely executed correctly.",
  },
];

export default function UnderstandingVerificationPage() {
  return (
    <>
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            What is Understanding Verification?
          </h1>

          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            Understanding Verification is a step Cruxion runs after a
            student&apos;s code passes, designed to check whether the student
            understood what they built, not just whether it ran. It exists
            because AI tools make it trivial to produce working code without
            understanding it, and a grading system that only checks output
            rewards that shortcut. Understanding Verification is built to
            reward comprehension instead.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            How it works
          </h2>

          <div className="mt-8 space-y-8">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary-blue/30 bg-primary-blue/[0.08] text-sm font-bold text-primary-light">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Why this matters for AI-native education
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            An AI-native curriculum assumes students will use AI to build,
            that is the point. The open question is whether they understand
            what they shipped. Understanding Verification answers that
            question directly, on every assignment, instead of relying on
            occasional spot checks or trusting that a passing test is proof
            of learning.
          </p>

          <div className="mt-14 rounded-2xl border border-primary-blue/30 bg-primary-blue/[0.06] p-8">
            <h2 className="text-lg font-bold text-text-primary">
              See Understanding Verification in a real classroom
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Start a pilot with a single course section and see how it
              changes what students actually learn.
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
