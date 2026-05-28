import dynamic from "next/dynamic";
import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Tiers from "@/components/v2/V2Tiers";
import V2Integration from "@/components/v2/V2Integration";
import V2CTA from "@/components/v2/V2CTA";
import Footer from "@/components/Footer";

/* Journey is the heaviest chunk (~8 scenes + scroll hooks).
   Dynamic import keeps the initial JS bundle lean — matches v1 load speed. */
const Journey = dynamic(() => import("@/components/v2/Journey"), {
  ssr: false,
  loading: () => (
    <div
      className="relative h-[500vh] sm:h-[650vh] lg:h-[850vh]"
      aria-hidden="true"
    />
  ),
});

export const metadata = {
  title: "Cruxion — Engineering outcome infrastructure",
  description:
    "Cruxion gives engineering colleges structured skill tracks for CS and EC students — from system design to cloud engineering on AWS, GCP, and Azure, and from circuits to IoT on Arduino. Verified outcomes employers actually look for.",
  alternates: {
    canonical: "https://cruxion.in",
  },
};

export default function Home() {
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
