"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Code2, Globe, Wrench, BookOpen } from "lucide-react";
import { SKILLS } from "@/lib/constants";
import { useTheme } from "@/components/providers/ThemeProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
  {
    key: "languages" as const,
    label: "Languages",
    icon: Code2,
    color: "text-ctp-blue",
    bg: "bg-ctp-blue/10",
  },
  {
    key: "frameworks" as const,
    label: "Frameworks",
    icon: Globe,
    color: "text-ctp-mauve",
    bg: "bg-ctp-mauve/10",
  },
  {
    key: "tools" as const,
    label: "Tools & Databases",
    icon: Wrench,
    color: "text-ctp-green",
    bg: "bg-ctp-green/10",
  },
  {
    key: "fundamentals" as const,
    label: "Fundamentals",
    icon: BookOpen,
    color: "text-ctp-yellow",
    bg: "bg-ctp-yellow/10",
  },
];

// Technology logos data
const techLogos = [
  { name: "C", path: "/tech-logos/c.svg" },
  { name: "C++", path: "/tech-logos/cpp.svg" },
  { name: "Python", path: "/tech-logos/python.svg" },
  { name: "JavaScript", path: "/tech-logos/javascript.svg" },
  { name: "TypeScript", path: "/tech-logos/typescript.svg" },
  { name: "C#", path: "/tech-logos/csharp.svg" },
  { name: "Next.js", path: "/tech-logos/nextjs.svg" },
  {
    name: "React",
    darkPath: "/tech-logos/react-d.svg",
    lightPath: "/tech-logos/react-l.svg",
  },
  { name: "Django", path: "/tech-logos/django.svg" },
  { name: ".NET", path: "/tech-logos/dotnet.svg" },
  { name: "Tailwind CSS", path: "/tech-logos/tailwindcss.svg" },
  {
    name: "MySQL",
    darkPath: "/tech-logos/mysql-d.svg",
    lightPath: "/tech-logos/mysql-l.svg",
  },
  { name: "PostgreSQL", path: "/tech-logos/postgresql.svg" },
  { name: "Supabase", path: "/tech-logos/supabase.svg" },
  { name: "Git", path: "/tech-logos/git.svg" },
  { name: "Linux", path: "/tech-logos/linux.svg" },
  { name: "Java", path: "/tech-logos/java.svg" },
];

function InfiniteScrollingLogos() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const getLogoPath = (logo: (typeof techLogos)[0]) => {
    if (logo.darkPath && logo.lightPath) {
      return isDark ? logo.darkPath : logo.lightPath;
    }
    return logo.path || "";
  };

  return (
    <div className="relative overflow-hidden py-8 mb-10">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-ctp-base to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-ctp-base to-transparent z-10 pointer-events-none" />

      <div className="flex gap-12">
        <motion.div
          className="flex gap-12 shrink-0"
          animate={{ x: [0, -100 * techLogos.length * 0.45] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
            <div key={`logo-${index}`} className="shrink-0 group relative">
              <div className="relative w-16 h-16 flex items-center justify-center p-2">
                {failedImages.has(index % techLogos.length) ? (
                  <span className="text-xs font-bold text-ctp-blue">
                    {tech.name}
                  </span>
                ) : (
                  <Image
                    src={getLogoPath(tech)}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    onError={() =>
                      setFailedImages((prev) =>
                        new Set(prev).add(index % techLogos.length),
                      )
                    }
                  />
                )}
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-ctp-crust border border-ctp-surface0 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {tech.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function CodeSkills() {
  return (
    <Section id="skills">
      <SectionTitle
        badge="Tech Stack"
        title="Skills & Technologies"
        highlightWord="Technologies"
        subtitle="Languages, frameworks, and tools I work with"
      />

      <div className="max-w-5xl mx-auto">
        <InfiniteScrollingLogos />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {categories.map((cat) => {
            const items = SKILLS[cat.key];
            return (
              <motion.div
                key={cat.key}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease },
                  },
                }}
                className="rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm p-6 hover:border-ctp-surface1 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${cat.bg}`}>
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-ctp-text">
                    {cat.label}
                  </h3>
                  <span className="ml-auto text-xs text-ctp-overlay0 font-mono">
                    {items.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1 text-xs font-medium bg-ctp-surface0/60 text-ctp-subtext0 rounded-full border border-ctp-surface1/40 hover:text-ctp-text hover:border-ctp-surface1 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
