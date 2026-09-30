import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Shell from "@/components/students/Shell";
import Pricing from "@/components/students/Pricing";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Pricing: learn free, go Pro when an interview is coming | Cruxion",
  description:
    "Every Cruxion lesson, problem and visual is free, with Crux as your guide. Pro adds AI-graded explanations, mock interview rounds, readiness per pattern, cheat-sheets and mistake fixes. From ₹299, GST included.",
  alternates: { canonical: "https://cruxion.in/pricing" },
};

export default function PricingPage() {
  return (
    <div className={`${display.variable} bg-surface-bg text-text-primary`}>
      <Shell>
        <Pricing />
        <Footer />
      </Shell>
    </div>
  );
}
