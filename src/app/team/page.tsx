import type { Metadata } from "next";
import V2Nav from "@/components/v2/V2Nav";
import Footer from "@/components/Footer";
import TeamShowcase from "@/components/v2/TeamShowcase";

export const metadata: Metadata = {
  title: "Cruxion Team",
  description:
    "Meet the founding team behind Cruxion, engineers building outcome infrastructure for India's engineering colleges.",
  alternates: {
    canonical: "https://cruxion.in/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <TeamShowcase />
      </main>
      <Footer />
    </>
  );
}
