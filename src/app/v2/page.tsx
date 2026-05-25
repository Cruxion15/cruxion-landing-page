import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Tiers from "@/components/v2/V2Tiers";
import Journey from "@/components/v2/Journey";
import V2Integration from "@/components/v2/V2Integration";
import V2CTA from "@/components/v2/V2CTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cruxion — Engineering outcome infrastructure",
  description:
    "The AI-native platform that takes engineering students from classroom to industry-ready. Skill tracks, Socratic AI mentorship, and verified outcomes. Apprentice → Engineer → Architect.",
};

export default function V2Page() {
  return (
    <>
      <V2Nav />
      <main className="bg-surface-bg text-text-primary">
        <V2Hero />
        <V2Tiers />
        <Journey />
        <V2Integration />
        <V2CTA />
      </main>
      <Footer />
    </>
  );
}
