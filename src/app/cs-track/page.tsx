import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CS, ISE and AIML Track: AI-Native Computer Science | Cruxion",
  description:
    "Cruxion's CS, ISE and AIML track takes Computer Science, Information Science, and AI and ML students from foundations to coding with a Socratic AI mentor to system design and cloud engineering on AWS, GCP, and Azure, with Understanding Verification on every assignment.",
  alternates: {
    canonical: "https://cruxion.in/cs-track",
  },
};

const tiers = [
  {
    name: "Apprentice",
    focus: "Foundations you can touch",
    detail:
      "Interactive lessons where every concept is a small experiment. Students build accurate mental models of how systems and models actually work, so understanding comes before fluency.",
  },
  {
    name: "Engineer",
    focus: "Code that runs, understanding that holds",
    detail:
      "Students work in the three-pane workspace: a problem statement, a code editor, and a Socratic AI mentor that asks questions instead of handing out answers. After code passes its tests, Understanding Verification confirms the student can defend every line.",
  },
  {
    name: "Architect",
    focus: "Designing what scales, on cloud",
    detail:
      "The work moves from writing functions to designing services. Students reason about cost, consistency, and scale the way senior engineers do, and design cloud-native systems on AWS, GCP, and Azure, including distributed-systems patterns like consensus, queues, and partitioning.",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Cruxion CS, ISE and AIML Track",
  description:
    "An AI-native software engineering track for Computer Science, Information Science, and AI and ML students, running from foundations to system design and cloud engineering with Understanding Verification on every assignment.",
  provider: {
    "@type": "Organization",
    name: "Cruxion",
    url: "https://cruxion.in",
  },
};

export default function CsTrackPage() {
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
            The CS, ISE and AIML track
          </h1>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            The CS, ISE and AIML track is Cruxion&apos;s software path for
            Computer Science, Information Science, and AI and Machine Learning
            students. It takes a student from first principles to designing
            cloud systems, and it verifies real understanding at every step
            rather than assuming a passing test is proof of learning.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            The three tiers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            The track runs on the same three-tier structure as the rest of
            Cruxion: Apprentice, Engineer, Architect. Each tier builds on the
            last, and progress depends on the Understanding Score, not just
            whether code ran.
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
            Understanding Verification on every assignment
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            AI tools make it trivial to produce working code without
            understanding it. On the CS track, once a submission passes its
            tests, a Socratic AI mentor asks three follow-up questions that
            reference the student&apos;s own variable names and specific
            approach. A student who cannot explain their own work does not
            advance, which keeps the standard honest as students build with AI.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Cloud engineering as a first-class discipline
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            At the Architect tier, cloud is not an afterthought. Students design
            cloud-native systems on AWS, GCP, and Azure and reason explicitly
            about trade-offs, the way real teams ship to production. Longer-form
            tracks go deeper than any single semester can, into areas like LLM
            engineering, cloud engineering, and distributed systems.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-text-primary">
            Built for faculty, and for daily practice
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Faculty get progressive hint trees they curate, AST-based
            plagiarism detection that flags structurally similar submissions for
            review, and one-click marks export. Cruxion Pulse keeps students
            practicing between graded assignments with a daily task feed,
            spaced-repetition review, streaks, and a live section leaderboard.
          </p>

          <div className="mt-14 rounded-2xl border border-primary-blue/30 bg-primary-blue/[0.06] p-8">
            <h2 className="text-lg font-bold text-text-primary">
              Bring the CS track to your department
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Start with a pilot in one section and see how students build with
              AI and prove they understood it.
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
