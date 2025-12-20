"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { EXPERIENCE, ORGANIZING_VOLUNTEERING } from "@/lib/constants";

type TabType = "experience" | "organizing";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<TabType>("experience");

  return (
    <Section id="experience" className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-ctp-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-ctp-yellow/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-ctp-surface0/50 backdrop-blur-sm border border-ctp-surface1 rounded-full text-sm mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Sparkles className="w-4 h-4 text-ctp-green" />
          <span className="text-ctp-text font-medium">My Professional Path</span>
        </motion.div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ctp-text mb-6">
          Experience & <span className="gradient-text">Education</span>
        </h2>

        <p className="text-lg text-ctp-subtext0 leading-relaxed">
          A journey through learning, teaching, and community building
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex gap-2 bg-ctp-surface0/30 backdrop-blur-sm p-2 rounded-xl w-fit mx-auto">
          <motion.button
            onClick={() => setActiveTab("experience")}
            className={`relative px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "experience"
                ? "text-ctp-text"
                : "text-ctp-subtext0 hover:text-ctp-text"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === "experience" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-ctp-blue/20 border border-ctp-blue/30 rounded-lg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Work & Education
            </span>
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("organizing")}
            className={`relative px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "organizing"
                ? "text-ctp-text"
                : "text-ctp-subtext0 hover:text-ctp-text"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === "organizing" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-ctp-blue/20 border border-ctp-blue/30 rounded-lg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Organizing & Volunteering
            </span>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {activeTab === "experience" ? (
          <ExperienceGrid />
        ) : (
          <OrganizingGrid />
        )}
      </div>
    </Section>
  );
}

// Experience & Education Grid
function ExperienceGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {EXPERIENCE.map((exp, index) => {
        const TypeIcon = exp.type === "teaching" ? Briefcase : GraduationCap;
        const colorScheme = exp.type === "teaching"
          ? { bg: "bg-ctp-green/10", text: "text-ctp-green", border: "border-ctp-green/30" }
          : { bg: "bg-ctp-mauve/10", text: "text-ctp-mauve", border: "border-ctp-mauve/30" };

        return (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Card className="p-6 h-full hover:border-ctp-blue transition-all duration-300" variant="bordered">
              {/* Icon & Type Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colorScheme.bg} rounded-xl`}>
                  <TypeIcon className={`w-6 h-6 ${colorScheme.text}`} />
                </div>
                <div className={`px-3 py-1 ${colorScheme.bg} ${colorScheme.text} text-xs font-medium rounded-full border ${colorScheme.border}`}>
                  {exp.type === "teaching" ? "Teaching" : "Education"}
                </div>
              </div>

              {/* Title & Organization */}
              <h3 className="text-xl font-display font-bold text-ctp-text mb-2">
                {exp.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-ctp-subtext0 text-sm">
                  <Building className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{exp.organization}</span>
                </div>
                <div className="flex items-center gap-2 text-ctp-subtext1 text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-ctp-blue text-sm">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="font-medium">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>

              {/* Description List */}
              <ul className="space-y-2">
                {exp.description.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-ctp-subtext0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <span className="text-ctp-blue mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// Organizing & Volunteering Grid
function OrganizingGrid() {
  const organizer = ORGANIZING_VOLUNTEERING.filter((item) => item.category === "organizer");
  const volunteer = ORGANIZING_VOLUNTEERING.filter((item) => item.category === "volunteer");

  return (
    <div className="space-y-12">
      {/* Organizer Section */}
      {organizer.length > 0 && (
        <div>
          <h3 className="text-2xl font-display font-bold text-ctp-text mb-6 flex items-center gap-3">
            <div className="p-2 bg-ctp-blue/10 rounded-lg">
              <Award className="w-5 h-5 text-ctp-blue" />
            </div>
            Event Organizer
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizer.map((item, index) => (
              <OrganizingCard key={item.title} item={item} index={index} type="organizer" />
            ))}
          </div>
        </div>
      )}

      {/* Volunteer Section */}
      {volunteer.length > 0 && (
        <div>
          <h3 className="text-2xl font-display font-bold text-ctp-text mb-6 flex items-center gap-3">
            <div className="p-2 bg-ctp-green/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-ctp-green" />
            </div>
            Volunteer Work
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteer.map((item, index) => (
              <OrganizingCard key={item.title} item={item} index={index} type="volunteer" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Organizing Card Component
function OrganizingCard({
  item,
  index,
  type,
}: {
  item: typeof ORGANIZING_VOLUNTEERING[0];
  index: number;
  type: "organizer" | "volunteer";
}) {
  const colorScheme = type === "organizer"
    ? { bg: "bg-ctp-blue/10", text: "text-ctp-blue", border: "border-ctp-blue/30" }
    : { bg: "bg-ctp-green/10", text: "text-ctp-green", border: "border-ctp-green/30" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card className="p-5 h-full hover:border-ctp-blue transition-all duration-300" variant="bordered">
        {/* Date Badge */}
        <div className={`inline-flex items-center gap-1 px-3 py-1 ${colorScheme.bg} ${colorScheme.text} text-xs font-medium rounded-full border ${colorScheme.border} mb-3`}>
          <Calendar className="w-3 h-3" />
          {item.date}
        </div>

        {/* Title */}
        <h4 className="text-base font-display font-bold text-ctp-text mb-2 line-clamp-2">
          {item.title}
        </h4>

        {/* Organization */}
        <p className="text-xs text-ctp-subtext0 font-medium mb-2">
          {item.organization}
        </p>

        {/* Description */}
        <p className="text-xs text-ctp-subtext1 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </Card>
    </motion.div>
  );
}
