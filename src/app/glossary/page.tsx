import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cruxion Glossary: Key Terms Explained | Cruxion",
  description:
    "Plain-language definitions of the terms used across Cruxion: Understanding Verification, Understanding Score, Socratic AI mentor, the Apprentice, Engineer and Architect tiers, Cruxion Pulse, and more.",
  alternates: {
    canonical: "https://cruxion.in/glossary",
  },
};

const terms = [
  {
    term: "AI-native engineering education",
    definition:
      "An approach where students build with AI from the first semester and are verified to actually understand what they built, rather than AI being treated as something to detect and penalize or added as a final-year elective. Cruxion is built around this approach for Indian engineering colleges.",
  },
  {
    term: "Understanding Verification",
    definition:
      "Cruxion's core mechanism for confirming that a student understood an assignment, not just that the code ran. After a submission passes automated tests, a Socratic AI mentor asks follow-up questions tied to the student's own code, and the student has to explain their own approach.",
  },
  {
    term: "Understanding Score",
    definition:
      "The score Cruxion records from Understanding Verification. It reflects how well a student could explain and defend their own work, and it is separate from whether the code merely executed correctly. Progress through the curriculum depends on it.",
  },
  {
    term: "Socratic AI mentor",
    definition:
      "The AI assistant in the Cruxion workspace. Instead of handing out answers, it asks guiding questions when a student is stuck, and after code passes it asks the verification questions that reference the student's own variable names and specific approach.",
  },
  {
    term: "Apprentice tier",
    definition:
      "The first of Cruxion's three tiers. Apprentice builds foundations through interactive lessons where every concept is a small experiment, establishing understanding before fluency.",
  },
  {
    term: "Engineer tier",
    definition:
      "The middle tier. Engineer is where students write code that runs and passes tests inside the three-pane workspace, with the Socratic AI mentor and Understanding Verification confirming they can defend every line.",
  },
  {
    term: "Architect tier",
    definition:
      "The most advanced tier. Architect moves from writing functions to designing systems: cloud-native service design on AWS, GCP, and Azure for the CS track, and cloud-connected hardware for the EC track.",
  },
  {
    term: "CS, ISE and AIML track",
    definition:
      "Cruxion's software track, covering Computer Science, Information Science, and AI and Machine Learning branches. It runs from foundations through coding with a Socratic mentor to system design and cloud engineering.",
  },
  {
    term: "EC, ECE and EEE track",
    definition:
      "Cruxion's hardware track, covering Electronics and Communication, Electronics, and Electrical branches. It runs from a visual component lab and embedded C through to cloud-connected IoT systems built on real cloud infrastructure.",
  },
  {
    term: "Three-pane workspace",
    definition:
      "The Cruxion coding environment: a problem statement on the left, a code editor in the middle, and the Socratic AI mentor on the right, together on every assignment.",
  },
  {
    term: "Progressive hints (hint tree)",
    definition:
      "A curated set of graduated hints faculty can shape for an assignment, so guidance reflects where their own students actually get stuck rather than giving away the answer.",
  },
  {
    term: "AST-based plagiarism detection",
    definition:
      "A check that compares the structure of student submissions, using the abstract syntax tree rather than surface text, to flag structurally similar work for faculty review instead of auto-penalizing students.",
  },
  {
    term: "Cruxion Pulse",
    definition:
      "The daily-engagement layer of the platform. Pulse uses a short daily task feed, spaced-repetition review, streaks, badges, and a live section leaderboard to keep students practicing between graded assignments.",
  },
  {
    term: "Section leaderboard",
    definition:
      "A live ranking that shows students how they stand against their own section, turning daily practice into something social rather than solitary.",
  },
  {
    term: "Pilot",
    definition:
      "A scoped first deployment of Cruxion, usually starting with a single department or course section, so faculty and students can see the platform in real use before it expands.",
  },
];

const glossaryJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Cruxion Glossary",
  description:
    "Definitions of the key terms used across the Cruxion AI-native engineering education platform.",
  url: "https://cruxion.in/glossary",
  hasDefinedTerm: terms.map((item) => ({
    "@type": "DefinedTerm",
    name: item.term,
    description: item.definition,
    inDefinedTermSet: "https://cruxion.in/glossary",
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            Cruxion glossary
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Plain-language definitions of the terms used across Cruxion, the
            AI-native engineering education platform. Each entry explains one
            concept in a sentence or two.
          </p>

          <dl className="mt-14 space-y-10">
            {terms.map((item) => (
              <div key={item.term} className="border-b border-border-subtle pb-10">
                <dt className="text-lg font-bold text-text-primary">{item.term}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 rounded-2xl border border-primary-blue/30 bg-primary-blue/[0.06] p-8">
            <h2 className="text-lg font-bold text-text-primary">
              See these ideas in a real classroom
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Start a pilot with a single course section and see how
              Understanding Verification, the tiers, and Cruxion Pulse work
              together.
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
