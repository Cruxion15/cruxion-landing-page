"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SplitText, RevealOnScroll } from "../AnimationUtils";

type Member = {
  name: string;
  role: string;
  linkedin: string;
  initials: string;
  photo: string;
  accent: string; // tailwind gradient classes
};

const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/brharsha/";

const TEAM: Member[] = [
  {
    name: "Hemanth Kumar S",
    role: "Institutional Relations Lead",
    linkedin: "https://www.linkedin.com/in/hemanthkumars25/",
    initials: "HK",
    photo: "/team/hemanth.jpeg",
    accent: "from-primary-blue to-cyan-400",
  },
  {
    name: "Visalakshi P L",
    role: "Campus Head, CSE & Allied Branches",
    linkedin: "https://www.linkedin.com/in/pl-visalakshi-profile",
    initials: "VP",
    photo: "/team/visalakshi.jpeg",
    accent: "from-fuchsia-500 to-primary-blue",
  },
  {
    name: "Haswanth M",
    role: "Curriculum Integration Lead, EC",
    linkedin: "https://www.linkedin.com/in/haswanth-m-271252259",
    initials: "HM",
    photo: "/team/haswanth.jpeg",
    accent: "from-accent-amber to-rose-400",
  },
  {
    name: "Sujan Suresh",
    role: "Faculty Engagement Lead, EC",
    linkedin: "https://www.linkedin.com/in/sujan-suresh-612165257",
    initials: "SS",
    photo: "/team/sujan.jpeg",
    accent: "from-emerald-400 to-cyan-400",
  },
];

const VALUES = [
  {
    title: "Built by engineers",
    body:
      "We've sat in the same classrooms, written the same code, and felt the same gap between syllabus and industry. Cruxion is what we wish we'd had.",
  },
  {
    title: "Faculty stay in command",
    body:
      "Every workflow is designed so faculty teach, set the bar, and see the truth. Cruxion is leverage, never a replacement.",
  },
  {
    title: "Outcomes over optics",
    body:
      "We measure ourselves on what students can actually do at the end of a semester, not on logins, hours, or vanity dashboards.",
  },
];

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function TeamShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOrbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOrbScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      >
        {/* Ambient orbs */}
        <motion.div
          style={{ y: heroOrbY, scale: heroOrbScale }}
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary-blue/20 blur-[120px]"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: heroOrbY }}
          className="pointer-events-none absolute top-40 right-1/4 h-[280px] w-[280px] rounded-full bg-accent-amber/15 blur-[100px]"
          aria-hidden="true"
        />
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-8">
            <motion.a
              href="/"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-xs text-text-tertiary transition-colors hover:text-primary-light"
            >
              ← Back to home
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-blue/40 bg-primary-blue/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            The founding team
          </motion.div>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            <SplitText className="block text-text-primary">
              The engineers
            </SplitText>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block bg-gradient-to-r from-primary-blue via-primary-light to-accent-amber bg-clip-text text-transparent"
            >
              behind Cruxion.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            A small team building outcome infrastructure for India&apos;s
            engineering colleges, from the first line of code in a CS lab to
            the first cloud dashboard lit up by an EC student&apos;s board.
          </motion.p>
        </div>
      </section>

      {/* ─── Founder's message ─── */}
      <section className="relative py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07), transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.05), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
              {/* Photo */}
              <div className="relative mx-auto w-full max-w-[320px] lg:max-w-none">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary-blue via-primary-light to-accent-amber opacity-40 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-[1.8rem] border border-border-subtle bg-surface-card shadow-2xl shadow-primary-blue/10">
                  <Image
                    src="/team/harsha.png"
                    alt="Harsha B R, Founder & CEO of Cruxion"
                    width={720}
                    height={900}
                    priority
                    className="h-auto w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-bg/40 via-transparent to-transparent" />
                </div>
                <div className="mt-5 text-center lg:text-left">
                  <p className="text-base font-semibold tracking-tight text-text-primary">
                    Harsha B R
                  </p>
                  <p className="text-sm text-primary-light">Founder &amp; CEO</p>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                  A note from the founder
                </div>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-text-primary sm:text-4xl lg:text-5xl">
                  We&apos;re making engineering colleges{" "}
                  <span className="bg-gradient-to-r from-primary-blue via-primary-light to-accent-amber bg-clip-text text-transparent">
                    AI-native.
                  </span>
                </h2>

                <div className="relative mt-8 space-y-5 text-[15px] leading-[1.75] text-text-secondary sm:text-base">
                  {/* Decorative quote mark */}
                  <span
                    className="pointer-events-none absolute -left-2 -top-10 text-7xl font-bold leading-none text-primary-blue/10 sm:-left-4 sm:text-8xl"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  <p>
                    Four years in an engineering classroom showed me something I
                    couldn&apos;t unsee. The brightest students in my batch
                    could write working code, score well on theory papers, and
                    still freeze the first time someone in industry asked them
                    to ship something real.
                  </p>
                  <p>
                    The gap was never talent. It was the loop &mdash; the one
                    where you write, get judged on{" "}
                    <span className="text-text-primary">understanding</span>{" "}
                    (not just output), and iterate until what you build matches
                    what professionals build. That loop never made it into the
                    classroom.
                  </p>
                  <p>
                    We&apos;re at a moment in time where AI can finally close
                    that loop &mdash; not by replacing teachers, but by giving
                    every student a Socratic mentor that asks the questions a
                    senior engineer would, and giving every faculty member
                    visibility into who actually understands what they wrote.
                  </p>
                  <p>
                    So we&apos;re building the{" "}
                    <span className="text-text-primary">
                      outcome infrastructure
                    </span>{" "}
                    engineering colleges have never had. An AI mentor that
                    refuses to give shortcuts. An understanding-verification
                    layer that checks comprehension after every submission.
                    Crucible &mdash; an experiential environment where students
                    actually build, from circuits to cloud. Skill tracks that
                    progress students from{" "}
                    <span className="text-text-primary">
                      Apprentice &rarr; Engineer &rarr; Architect
                    </span>
                    , with proctored exam mode and on-site mentor visits so
                    faculty stay in command of every step.
                  </p>
                  <p className="text-text-primary">
                    That&apos;s what Cruxion is. We&apos;re making engineering
                    colleges AI-native in the only way that matters: every
                    student is verified, every faculty member sees the truth,
                    and every graduate walks into industry already fluent in how
                    it operates.
                  </p>
                  <p>
                    This is the infrastructure I wish I&apos;d had as a student.
                    Now we&apos;re building it for the next generation &mdash;
                    one campus at a time.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border-subtle/60 pt-6">
                  <div
                    className="text-2xl italic tracking-wide text-text-primary sm:text-3xl"
                    style={{ fontFamily: "'Brush Script MT', 'Snell Roundhand', cursive" }}
                  >
                    Harsha B R
                  </div>
                  <div className="h-6 w-px bg-border-subtle" />
                  <div className="text-xs uppercase tracking-[0.18em] text-text-tertiary">
                    Founder &amp; CEO &middot; Cruxion
                  </div>
                  <a
                    href={FOUNDER_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card/80 px-4 py-1.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:border-primary-blue/50 hover:bg-primary-blue/10 hover:text-primary-light"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Team grid ─── */}
      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                Core team
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-text-primary sm:text-4xl">
                Leading on the ground.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Each lead owns a slice of how Cruxion lands in real colleges,
                partnerships, curriculum integration, campus operations, and
                faculty enablement.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-card/60 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-primary-blue/40"
              >
                {/* Hover glow */}
                <div
                  className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${member.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Avatar */}
                  <div className="relative mb-5 inline-flex">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.accent} opacity-50 blur-lg transition-opacity duration-500 group-hover:opacity-80`}
                      aria-hidden="true"
                    />
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl shadow-lg">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 min-h-[2.6em] text-sm leading-snug text-text-secondary">
                    {member.role}
                  </p>

                  <div className="mt-5 border-t border-border-subtle/50 pt-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-text-tertiary transition-colors duration-300 hover:text-primary-light"
                    >
                      <LinkedInIcon />
                      LinkedIn
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How we work / values ─── */}
      <section className="relative py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                How we work
              </div>
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-text-primary sm:text-4xl">
                The principles we don&apos;t bend.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-border-subtle bg-surface-card/50 p-7 backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-blue/15 text-sm font-semibold text-primary-light">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <RevealOnScroll>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-text-primary sm:text-4xl">
              Want to bring Cruxion to your campus?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              One section. One semester. Real outcomes you can hand your
              placement cell on day one.
            </p>
            <a
              href="/#cta"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-surface-bg transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
            >
              Request a pilot
              <span aria-hidden="true">→</span>
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
