import Clients from "@/Components/Clients";
import Experience from "@/Components/Experience";
import Footer from "@/Components/Footer";
import Grid from "@/Components/Grid";
import Hero from "@/Components/Hero";
import RecentProjects from "@/Components/RecentProjects";
import BeyondCode from "@/Components/BeyondCode";
import LLDPlayground from "@/Components/LLDPlayground";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import { CursorSpotlight } from "@/Components/ui/CursorSpotlight";
import { ScrollProgress } from "@/Components/ui/ScrollProgress";
import { TerminalEgg } from "@/Components/ui/TerminalEgg";
import { GrainOverlay } from "@/Components/ui/GrainOverlay";
import { CommandPalette } from "@/Components/ui/CommandPalette";
import { ScrollToTop } from "@/Components/ui/ScrollToTop";
import { navItems } from "@/data";

export default function Home() {
  return (
    <>
      {/* True full-screen grid background */}
      <div className="fixed inset-0 -z-10 dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_100%_60%_at_50%_0%,transparent_30%,black_80%)] dark:bg-black-100" />
      </div>

      {/* Global overlays */}
      <ScrollToTop />
      <GrainOverlay />
      <CursorSpotlight />
      <ScrollProgress />
      <TerminalEgg />
      <CommandPalette />

      <main className="relative bg-black-100 flex flex-col overflow-x-clip">
        <FloatingNav navItems={navItems} />

        <Hero />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Grid />
          <RecentProjects />
          <Clients />
          <Experience />
        </div>

        <BeyondCode />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <LLDPlayground />
          <Footer />
        </div>
      </main>
    </>
  );
}
