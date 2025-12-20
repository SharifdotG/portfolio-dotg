import Hero from "@/components/features/hero/Hero";
import About from "@/components/features/about/About";
import Experience from "@/components/features/experience/Experience";
import Skills from "@/components/features/skills/CodeSkills";
import Projects from "@/components/features/projects/Projects";
import Achievements from "@/components/features/achievements/Achievements";
import Contact from "@/components/features/contact/Contact";
import Preloader from "@/components/shared/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </>
  );
}
