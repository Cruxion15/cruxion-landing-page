import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ | Cruxion",
  description:
    "Answers on how Cruxion makes an engineering college AI-native: what Understanding Verification is, which tracks it covers, and how a pilot starts.",
  alternates: {
    canonical: "https://cruxion.in/faq",
  },
};

const faqs = [
  {
    q: "What does it mean for an engineering college to be \"AI-native\"?",
    a: "An AI-native engineering college teaches students to build with AI from semester one, and verifies that they actually understand what they built, instead of treating AI as something to detect and penalize or as an elective bolted on in the final year. Cruxion is built around that idea: students build with AI assistance, then an AI mentor verifies real understanding before the work counts.",
  },
  {
    q: "What is Understanding Verification, and why does it matter?",
    a: "Understanding Verification is Cruxion's core feature. Most platforms check whether a student's code ran. Cruxion checks whether the student understood it. After code passes, a Socratic AI mentor asks three follow-up questions that reference the student's own variable names and their own specific approach. A student who copied a solution, or had AI generate it without understanding it, cannot answer these.",
  },
  {
    q: "Which departments and branches does Cruxion support?",
    a: "Two tracks: a CS/ISE/AIML track covering system design and cloud engineering on AWS, GCP, and Azure, and an EC/ECE/EEE hardware track covering embedded systems and IoT on Arduino. Both run on the same three-tier structure, Apprentice, Engineer, Architect, with the same Understanding Verification model.",
  },
  {
    q: "Does using Cruxion mean more work for faculty?",
    a: "The opposite is the intent. Faculty get progressive hint trees they curate, so guidance reflects where their own students actually get stuck, AST-based plagiarism detection that flags structurally similar submissions for review rather than auto-penalizing, and one-click marks export in department format. It's built to reduce manual grading, not add a parallel process.",
  },
  {
    q: "What do students do day-to-day?",
    a: "Students work through curriculum nodes on a progress map that unlock as their Understanding Score crosses a threshold, earn points and streaks for daily practice from semester one, and compete on section leaderboards. Cruxion Pulse extends this into a daily-engagement layer, so practice doesn't drop off between classes.",
  },
  {
    q: "Is this the same as giving students ChatGPT Edu, GitHub Copilot, or cloud-vendor AI credits?",
    a: "No. Those give students access to AI tools but don't verify how the tools were used or whether the student understood the output. Cruxion assumes students will use AI to build, that's the point, and adds the verification layer on top: Understanding Verification confirms comprehension after the fact, independent of which AI tool a student used to get there.",
  },
  {
    q: "How does a pilot work?",
    a: "Pilots are scoped per college and department, starting small so faculty and students can see the platform in real use before expanding it. Request a pilot from the homepage to start the conversation.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Direct answers on how Cruxion makes an engineering college
            AI-native, what the platform actually does, and how a pilot
            starts.
          </p>

          <div className="mt-14 space-y-10">
            {faqs.map((item) => (
              <section key={item.q} className="border-b border-border-subtle pb-10">
                <h2 className="text-lg font-bold text-text-primary">{item.q}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
