import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Shell from "@/components/students/Shell";
import Hero from "@/components/students/Hero";
import Learn from "@/components/students/Learn";
import TwoSumDemo from "@/components/students/TwoSumDemo";
import AiTrack from "@/components/students/AiTrack";
import SystemDesign from "@/components/students/SystemDesign";
import Features from "@/components/students/Features";
import Companies from "@/components/students/Companies";
import FinalCTA from "@/components/students/FinalCTA";
import Footer from "@/components/Footer";
import { Scene } from "@/components/students/ui";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Cruxion: learn DSA and AI with Crux, your guide",
  description:
    "For students and working engineers. Learn DSA and LLM engineering by predicting, building and defending every idea, with Crux, an AI companion that notices what you're stuck on. System design coming next.",
  alternates: { canonical: "https://cruxion.in/students" },
  openGraph: {
    title: "Stop watching tutorials. Start getting good.",
    description: "Take the tour with Crux: DSA, AI and LLMs, and system design, learned by doing. Sign up with Google.",
    url: "https://cruxion.in/students",
  },
};

export default function StudentsPage() {
  return (
    <div className={`${display.variable} bg-surface-bg text-text-primary`}>
      <Shell>
        <main className="overflow-x-clip">
          <Hero />
          <Scene><Learn /></Scene>
          <Scene><TwoSumDemo /></Scene>
          <Scene><AiTrack /></Scene>
          <Scene><SystemDesign /></Scene>
          <Scene><Features /></Scene>
          <Scene><Companies /></Scene>
          <Scene><FinalCTA /></Scene>
        </main>
        <Footer />
      </Shell>
    </div>
  );
}
