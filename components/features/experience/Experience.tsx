"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  ChevronDown,
  BookOpen,
  Award,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { EXPERIENCE, ORGANIZING_VOLUNTEERING } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const typeConfig: Record<
  string,
  { icon: typeof Briefcase; color: string; bg: string; label: string }
> = {
  work: {
    icon: Briefcase,
    color: "text-ctp-blue",
    bg: "bg-ctp-blue/10",
    label: "Work",
  },
  teaching: {
    icon: BookOpen,
    color: "text-ctp-green",
    bg: "bg-ctp-green/10",
    label: "Teaching",
  },
  education: {
    icon: GraduationCap,
    color: "text-ctp-mauve",
    bg: "bg-ctp-mauve/10",
    label: "Education",
  },
};

// Sort: work first, then teaching, then education
const sortedExperience = [...EXPERIENCE].sort((a, b) => {
  const order = { work: 0, teaching: 1, education: 2 };
  return (
    (order[a.type as keyof typeof order] ?? 3) -
    (order[b.type as keyof typeof order] ?? 3)
  );
});

export default function Experience() {
  const [showOrganizing, setShowOrganizing] = useState(false);

  return (
    <Section id="experience" className="relative overflow-hidden">
      <SectionTitle
        badge="Experience"
        title="Work & Education"
        highlightWord="Education"
        subtitle="A journey through learning, building, and teaching"
      />

      {/* Experience Cards */}
      <div className="max-w-3xl mx-auto space-y-4 mb-12">
        {sortedExperience.map((exp, index) => {
          const config = typeConfig[exp.type] ?? typeConfig.work;
          const Icon = config.icon;

          return (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease }}
              className="rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm p-6 hover:border-ctp-surface1 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl ${config.bg} shrink-0 mt-0.5`}
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-lg font-display font-bold text-ctp-text">
                      {exp.title}
                    </h3>
                    <span
                      className={`shrink-0 px-2.5 py-0.5 text-xs font-medium rounded-full ${config.bg} ${config.color}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ctp-subtext0 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      {exp.organization}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-ctp-blue">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-ctp-subtext0"
                      >
                        <span className="text-ctp-blue mt-0.5 shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Organizing & Volunteering — collapsible */}
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setShowOrganizing(!showOrganizing)}
          className="flex items-center gap-2 text-sm font-medium text-ctp-subtext0 hover:text-ctp-text transition-colors mx-auto"
        >
          <Award className="w-4 h-4" />
          Organizing & Volunteering ({ORGANIZING_VOLUNTEERING.length})
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${showOrganizing ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {showOrganizing && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {ORGANIZING_VOLUNTEERING.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className="rounded-xl border border-ctp-surface0/60 bg-ctp-surface0/20 p-4"
                  >
                    <span className="text-xs font-mono text-ctp-blue">
                      {item.date}
                    </span>
                    <h4 className="text-sm font-semibold text-ctp-text mt-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-ctp-subtext0 mt-1">
                      {item.organization}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
