"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import SkillsAndResearch from "@/components/SkillsAndResearch";
import BrandoraSpotlight from "@/components/BrandoraSpotlight";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Nav from "@/components/arcade/Nav";
import Marquee from "@/components/arcade/Marquee";
import Cursor from "@/components/arcade/Cursor";
import BootScreen from "@/components/arcade/BootScreen";
import RevealController from "@/components/arcade/RevealController";

const Home = () => {
  return (
    <>
      <BootScreen />
      <Cursor />
      <Nav />
      <main className="relative overflow-x-clip">
        <div aria-hidden className="pointer-events-none fixed inset-0 z-overlay grain opacity-[0.05] mix-blend-overlay" />
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <RecentProjects />
        <SkillsAndResearch />
        <BrandoraSpotlight />
        <Approach />
      </main>
      <Footer />
      <RevealController />
    </>
  );
};

export default Home;
