"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Code2,
  Heart,
  Trophy,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const bentoCards = [
  {
    key: "bio",
    icon: Code2,
    label: "Bio",
    color: "text-ctp-blue",
    bg: "bg-ctp-blue/10",
    content:
      "A passionate competitive programmer and full-stack developer from Bangladesh. I love turning complex problems into elegant, efficient solutions — whether it's an ICPC contest, a developer tool, or a web application.",
    span: "md:col-span-2",
  },
  {
    key: "education",
    icon: GraduationCap,
    label: "Education",
    color: "text-ctp-green",
    bg: "bg-ctp-green/10",
    content:
      "BSc (Eng.) in CSE\nUniversity of Asia Pacific\nCGPA 3.81 / 4.00 · 7th Semester",
    span: "",
  },
  {
    key: "cp",
    icon: Trophy,
    label: "Competitive Programming",
    color: "text-ctp-yellow",
    bg: "bg-ctp-yellow/10",
    content:
      "ICPC Dhaka Regionalist 2024\nCodeforces Specialist (1438)\nCodeChef 3★ (1635)\n2,000+ problems solved",
    span: "",
  },
  {
    key: "location",
    icon: MapPin,
    label: "Location",
    color: "text-ctp-pink",
    bg: "bg-ctp-pink/10",
    content: "Dhaka, Bangladesh 🇧🇩\nOpen to remote opportunities worldwide.",
    span: "",
  },
  {
    key: "currently",
    icon: Briefcase,
    label: "Currently",
    color: "text-ctp-mauve",
    bg: "bg-ctp-mauve/10",
    content:
      "Trainee Software Engineer (Intern) at Bangladesh Software Solution. Building web apps with Next.js, React, and modern tooling.",
    span: "md:col-span-2",
  },
  {
    key: "interests",
    icon: Heart,
    label: "Interests",
    color: "text-ctp-red",
    bg: "bg-ctp-red/10",
    content:
      "AI/ML · Systems Design · Open-Source\nTeaching · Problem Solving · Developer Tooling",
    span: "",
  },
];

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden">
      <SectionTitle
        badge="About Me"
        title="Get to Know Me"
        highlightWord="Know"
        subtitle="A snapshot of who I am and what I do"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        {bentoCards.map((card) => (
          <motion.div
            key={card.key}
            variants={cardVariants}
            className={`group rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm p-6 hover:border-ctp-surface1 transition-colors ${card.span}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <h3 className="font-display font-semibold text-ctp-text">
                {card.label}
              </h3>
            </div>
            <p className="text-sm text-ctp-subtext0 leading-relaxed whitespace-pre-line">
              {card.content}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
