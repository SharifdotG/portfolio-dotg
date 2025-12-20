"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  Users,
  Trophy,
  GraduationCap,
  Rocket,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

// Timeline data with my milestones
const timelineData = [
  {
    year: "2022",
    title: "The Beginning",
    icon: Sparkles,
    color: "ctp-mauve",
    description:
      "Started my Computer Science journey at University of Asia Pacific. Fell in love with competitive programming on Codeforces.",
    details: [
      "Enrolled in BSc (Eng.) CSE at UAP",
      "Discovered the beauty of problem-solving",
      "Solved my first 200 problems",
      "Realized programming can change lives",
    ],
  },
  {
    year: "2023",
    title: "Growth & Leadership",
    icon: Users,
    color: "ctp-blue",
    description:
      "Joined UAP Programming Contest Club (PCC) as Technical Lead and Math Club as Junior Representative. Started training juniors.",
    details: [
      "Technical Lead @ UAP Programming Contest Club",
      "Junior Representative @ Math Club, CSE-UAP",
      "Started mentoring 1st-year students in competitive programming",
      "Champion of Ekushey Intra Department Programming Contest 2023",
    ],
  },
  {
    year: "2023-2024",
    title: "Recognition & Excellence",
    icon: Trophy,
    color: "ctp-yellow",
    description:
      "Received ICPC Jamilur Reza Chowdhury Scholarship for three semesters. Achieved Specialist rank on Codeforces.",
    details: [
      "ICPC JRC Scholarship recipient (Spring 2023, Fall 2023, Spring 2024)",
      "Codeforces Specialist (Max Rating: 1438)",
      "CodeChef 3 Stars (Max Rating: 1635)",
      "Became a permanent trainer at UAP Programming Contest Club",
      "Started receiving VC's Awards & Dean's Awards Regularly",
    ],
  },
  {
    year: "2024",
    title: "ICPC Regionalist",
    icon: GraduationCap,
    color: "ctp-green",
    description:
      "Competed in ICPC Asia West Continent Dhaka Regional Contest. Built multiple full-stack applications with modern tech.",
    details: [
      "ICPC Dhaka Regionalist 2024",
      "Competed against best programmers in Bangladesh",
      "Developed TechReform BD 2 e-commerce platform",
      "Created Catppuccin Dark Pro VSCode theme (3,300+ downloads)",
    ],
  },
  {
    year: "2025 (Present)",
    title: "Always Learning",
    icon: Rocket,
    color: "ctp-pink",
    description:
      "Staying up-to-date with tech trends, making programming accessible, and working on meaningful projects that improve lives.",
    details: [
      "Maintaining CGPA 3.81/4.00 (after 7 semesters)",
      "Built DevStudy AI Suite with Next.js 15 & React 19",
      "Exploring AI/ML and modern web technologies",
      "Making programming easy for everyone",
      "Building solutions with meaningful ideas",
    ],
  },
];

export default function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section id="about" className="bg-ctp-mantle/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-ctp-blue/5 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-ctp-mauve/5 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      <SectionTitle
        badge="About Me"
        title="My Journey"
        highlightWord="Journey"
        subtitle="From curious student to passionate developer and mentor"
      />

      {/* Interactive Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Timeline line - hidden on mobile, visible on desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-ctp-blue via-ctp-mauve to-ctp-pink" />

        {/* Timeline items */}
        <div className="space-y-8 lg:space-y-16">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Desktop layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 items-start">
                  {/* Left side */}
                  {isLeft ? (
                    <div className="text-right pr-8">
                      <div className="inline-block w-full">
                        <motion.div
                          className="bg-ctp-surface0/50 backdrop-blur-sm border border-ctp-surface1 rounded-xl p-6 cursor-pointer transition-all duration-300"
                          style={{ willChange: isHovered ? 'transform' : 'auto' }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <div className="flex items-center justify-end gap-3 mb-3">
                            <h3 className="text-2xl font-display font-bold text-ctp-text">
                              {item.title}
                            </h3>
                            <div className={`p-3 bg-${item.color}/10 rounded-full`}>
                              <Icon className={`w-6 h-6 text-${item.color}`} />
                            </div>
                          </div>
                          <div className={`text-lg font-mono font-semibold text-${item.color} mb-2`}>
                            {item.year}
                          </div>
                          <p className="text-ctp-subtext0 leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>

                        {/* Expanded details */}
                        <div
                          className="mt-4 bg-ctp-base/80 backdrop-blur-sm border border-ctp-surface1 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight: isHovered ? '500px' : '0',
                            opacity: isHovered ? 1 : 0,
                            marginTop: isHovered ? '1rem' : '0',
                          }}
                        >
                          <div className="p-4">
                            <ul className="space-y-2">
                              {item.details.map((detail, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-end gap-2 text-sm text-ctp-subtext0 transition-opacity duration-200"
                                  style={{
                                    opacity: isHovered ? 1 : 0,
                                    transitionDelay: isHovered ? `${i * 30}ms` : '0ms',
                                  }}
                                >
                                  <span>{detail}</span>
                                  <span className={`text-${item.color}`}>▸</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-4 h-4 rounded-full bg-${item.color} border-4 border-ctp-base`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-${item.color}`}
                        animate={{
                          scale: isHovered ? [1, 1.5, 1] : 1,
                          opacity: isHovered ? [1, 0] : 1,
                        }}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                      />
                    </motion.div>
                  </div>

                  {/* Right side */}
                  {!isLeft ? (
                    <div className="pl-8">
                      <div className="inline-block w-full">
                        <motion.div
                          className="bg-ctp-surface0/50 backdrop-blur-sm border border-ctp-surface1 rounded-xl p-6 cursor-pointer transition-all duration-300"
                          style={{ willChange: isHovered ? 'transform' : 'auto' }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-3 bg-${item.color}/10 rounded-full`}>
                              <Icon className={`w-6 h-6 text-${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-ctp-text">
                              {item.title}
                            </h3>
                          </div>
                          <div className={`text-lg font-mono font-semibold text-${item.color} mb-2`}>
                            {item.year}
                          </div>
                          <p className="text-ctp-subtext0 leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>

                        {/* Expanded details */}
                        <div
                          className="mt-4 bg-ctp-base/80 backdrop-blur-sm border border-ctp-surface1 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight: isHovered ? '500px' : '0',
                            opacity: isHovered ? 1 : 0,
                            marginTop: isHovered ? '1rem' : '0',
                          }}
                        >
                          <div className="p-4">
                            <ul className="space-y-2">
                              {item.details.map((detail, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-ctp-subtext0 transition-opacity duration-200"
                                  style={{
                                    opacity: isHovered ? 1 : 0,
                                    transitionDelay: isHovered ? `${i * 30}ms` : '0ms',
                                  }}
                                >
                                  <span className={`text-${item.color}`}>▸</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden">
                  <motion.div
                    className="bg-ctp-surface0/50 backdrop-blur-sm border border-ctp-surface1 rounded-xl p-5"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 bg-${item.color}/10 rounded-full`}>
                        <Icon className={`w-6 h-6 text-${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-ctp-text">
                          {item.title}
                        </h3>
                        <div className={`text-sm font-mono font-semibold text-${item.color}`}>
                          {item.year}
                        </div>
                      </div>
                    </div>
                    <p className="text-ctp-subtext0 text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Mobile details - always show */}
                    <ul className="space-y-2 border-t border-ctp-surface1 pt-3 mt-3">
                      {item.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-ctp-subtext0"
                        >
                          <span className={`text-${item.color} mt-0.5`}>▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </Section>
  );
}
