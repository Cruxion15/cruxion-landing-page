import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Cruxion",
  description: "Cruxion privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-text-tertiary">
              Last updated: March 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 text-sm leading-relaxed text-text-secondary">
            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">1. Information We Collect</h2>
              <p>
                We collect information you provide directly when you use the Cruxion
                platform, including:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-text-secondary">
                <li>
                  <strong className="text-text-primary">Account information:</strong> Name,
                  email address, college name, department, and role (faculty or student).
                </li>
                <li>
                  <strong className="text-text-primary">Academic data:</strong> Code
                  submissions, Understanding Verification responses, scores, and
                  progress data generated through platform use.
                </li>
                <li>
                  <strong className="text-text-primary">Usage data:</strong> Browser type,
                  device information, IP address, pages visited, and interaction
                  timestamps collected automatically.
                </li>
                <li>
                  <strong className="text-text-primary">Communication data:</strong> Messages
                  sent through the pilot request form or support channels.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">2. How We Use Your Information</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>To provide, maintain, and improve the Cruxion platform.</li>
                <li>
                  To generate Understanding Scores and analytics for faculty and
                  institutional dashboards.
                </li>
                <li>To detect plagiarism through AST-based structural analysis.</li>
                <li>To communicate about your account, pilot programme, or support requests.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">3. Data Sharing</h2>
              <p>
                We do not sell your personal data. We share information only in the
                following circumstances:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>
                  <strong className="text-text-primary">With your institution:</strong> Faculty
                  and HODs can access student performance data (scores, heatmaps,
                  at-risk alerts) within their own sections and departments.
                </li>
                <li>
                  <strong className="text-text-primary">Service providers:</strong> We use
                  third-party infrastructure providers (hosting, analytics) who
                  process data on our behalf under strict contractual obligations.
                </li>
                <li>
                  <strong className="text-text-primary">Legal requirements:</strong> When
                  required by law, regulation, or valid legal process.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">4. Data Security</h2>
              <p>
                We implement industry-standard security measures including encrypted
                data transmission (TLS 1.3), encrypted storage at rest, access
                controls, and regular security audits. Student code submissions and
                Understanding Verification responses are stored securely and
                accessible only to authorised faculty and platform administrators.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">5. Data Retention</h2>
              <p>
                We retain account and academic data for the duration of the
                institution&apos;s engagement with Cruxion, plus one academic year
                after termination. Usage logs are retained for 12 months. You may
                request deletion of your personal data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">6. Student Data Protection</h2>
              <p>
                We recognise the sensitivity of student academic data. Student code
                submissions and Understanding Verification responses are never used
                to train machine learning models. Student data is never shared with
                other institutions or third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">7. Your Rights</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>Access, correct, or delete your personal data.</li>
                <li>Export your data in a machine-readable format.</li>
                <li>Object to or restrict certain processing activities.</li>
                <li>Withdraw consent where processing is based on consent.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <span className="text-primary-blue">support@cruxion.in</span>.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">8. Cookies</h2>
              <p>
                We use essential cookies required for platform functionality
                (authentication, session management). We do not use advertising or
                third-party tracking cookies. Analytics cookies are used only in
                aggregate to improve the platform experience.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-text-primary">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify
                registered users of material changes via email or in-platform
                notification at least 30 days before they take effect.
              </p>
            </section>

            <section className="border-t border-border-subtle pt-12">
              <h2 className="mb-4 text-lg font-bold text-text-primary">10. Contact</h2>
              <p>
                For privacy-related questions or concerns, contact us at{" "}
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
