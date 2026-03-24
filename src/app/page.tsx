import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsRow from "@/components/StatsRow";
import BeforeAfter from "@/components/BeforeAfter";
import WorkspacePreview from "@/components/WorkspacePreview";
import UVDifferentiator from "@/components/UVDifferentiator";
import FacultyHeatmap from "@/components/FacultyHeatmap";
import SixPillars from "@/components/SixPillars";
import SemesterJourney from "@/components/SemesterJourney";
import HowItSlotsIn from "@/components/HowItSlotsIn";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";
import { ScrollProgress } from "@/components/AnimationUtils";

export default function Home() {
  return (
    <>
      <AmbientParticles />
      <Navigation />
      <ScrollProgress />
      <main>
        <Hero />
        <StatsRow />
        <BeforeAfter />
        <WorkspacePreview />
        <UVDifferentiator />
        <FacultyHeatmap />
        <SixPillars />
        <SemesterJourney />
        <HowItSlotsIn />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
