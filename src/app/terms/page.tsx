import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Cruxion",
  description: "Cruxion terms of use. Rules governing the use of our platform.",
};

export default function TermsOfUse() {
  return (
    <>
      <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-surface-card/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back button */}
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-tertiary transition-colors duration-300 hover:text-primary-blue"
            aria-label="Back to home"
          >
            ← Back to home
          </a>

          {/* Header */}
          <div className="mb-16 border-b border-border-subtle pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-4 text-sm text-text-tertiary">
              Last updated: March 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-sm leading-relaxed text-text-secondary">
            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Cruxion platform (&ldquo;Platform&rdquo;),
                you agree to be bound by these Terms of Use. If you do not agree,
                do not use the Platform. These terms apply to all users including
                faculty members, students, and institutional administrators.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">2. Description of Service</h2>
              <p>
                Cruxion provides a coding education platform that includes
                assignment creation, a code editor, automated test execution,
                Understanding Verification through Socratic questioning, plagiarism
                detection, marks management, and analytics. The Platform is designed
                to integrate with the assignment sub-component of Continuous Internal
                Evaluation (CIE) in engineering colleges.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">3. User Accounts</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  You must provide accurate and complete registration information.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of your
                  account credentials.
                </li>
                <li>
                  You must notify us immediately of any unauthorised access to your
                  account.
                </li>
                <li>
                  Faculty accounts are provisioned through institutional
                  onboarding. Student accounts are created by faculty invitation.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>
                  Submit code or content that is malicious, harmful, or designed to
                  compromise Platform security.
                </li>
                <li>
                  Attempt to circumvent Understanding Verification through automated
                  tools, scripts, or third-party assistance during verification.
                </li>
                <li>
                  Share account credentials or allow others to access the Platform
                  under your identity.
                </li>
                <li>
                  Copy, distribute, or reverse-engineer any part of the Platform.
                </li>
                <li>
                  Use the Platform for any purpose other than legitimate academic
                  activities.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">5. Academic Integrity</h2>
              <p>
                The Platform includes AST-based plagiarism detection. Submissions
                flagged for structural similarity are reported to faculty for review.
                The Platform does not auto-penalise students — all academic
                integrity decisions remain with the faculty member. Students are
                expected to complete coding assignments and Understanding
                Verification independently.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">6. Intellectual Property</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong className="text-text-primary">Platform:</strong> All
                  rights, title, and interest in the Platform (including software,
                  design, content, and trademarks) belong to Cruxion Technologies
                  Pvt. Ltd.
                </li>
                <li>
                  <strong className="text-text-primary">User content:</strong>{" "}
                  Students retain ownership of their code submissions. By
                  submitting code, you grant Cruxion a limited licence to process,
                  analyse, and display it for Platform functionality (test
                  execution, AST analysis, faculty review).
                </li>
                <li>
                  <strong className="text-text-primary">Problem content:</strong>{" "}
                  Problems, hints, and aptitude questions authored by Cruxion are
                  proprietary and may not be reproduced without permission.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">7. Pilot Programme</h2>
              <p>
                Pilot programme terms are agreed upon separately between Cruxion and
                the participating institution or faculty member. Pilot access may be
                time-limited and subject to additional conditions communicated
                during onboarding.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">8. Availability and Modifications</h2>
              <p>
                We strive to maintain continuous Platform availability but do not
                guarantee uninterrupted access. We may modify, suspend, or
                discontinue features with reasonable notice. We will provide at
                least 30 days&apos; notice before discontinuing any core feature
                that affects active academic sessions.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Cruxion shall not be liable
                for any indirect, incidental, special, or consequential damages
                arising from Platform use, including but not limited to loss of
                data, academic outcomes, or business interruption. Our total
                liability shall not exceed the fees paid by your institution in the
                12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">10. Termination</h2>
              <p>
                We may suspend or terminate your access if you violate these Terms.
                Upon termination, your right to use the Platform ceases immediately.
                Faculty and institutions may request data export before account
                closure.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall be
                subject to the exclusive jurisdiction of the courts of Bengaluru,
                Karnataka.
              </p>
            </section>

            <section className="border-t border-border-subtle pt-12">
              <h2 className="mb-4 text-lg font-bold text-text-primary">12. Contact</h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <span className="text-primary-blue">support@cruxion.in</span>.
              </p>
              <p className="mt-3">
                Cruxion
                <br />
                Bengaluru, Karnataka, India
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
