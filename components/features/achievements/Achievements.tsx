"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Calendar,
  ExternalLink,
  FileImage,
  X,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { ACHIEVEMENTS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const typeStyles: Record<
  string,
  { icon: typeof Trophy; color: string; bg: string }
> = {
  competition: {
    icon: Trophy,
    color: "text-ctp-yellow",
    bg: "bg-ctp-yellow/10",
  },
  scholarship: { icon: Award, color: "text-ctp-blue", bg: "bg-ctp-blue/10" },
  academic: { icon: Award, color: "text-ctp-blue", bg: "bg-ctp-blue/10" },
  rating: { icon: Star, color: "text-ctp-green", bg: "bg-ctp-green/10" },
  certification: { icon: Star, color: "text-ctp-green", bg: "bg-ctp-green/10" },
  training: { icon: Star, color: "text-ctp-mauve", bg: "bg-ctp-mauve/10" },
  volunteer: { icon: Award, color: "text-ctp-pink", bg: "bg-ctp-pink/10" },
};

const fallbackStyle = {
  icon: Trophy,
  color: "text-ctp-mauve",
  bg: "bg-ctp-mauve/10",
};

export default function Achievements() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null,
  );

  return (
    <Section id="achievements">
      <SectionTitle
        badge="Milestones"
        title="Achievements & Recognition"
        highlightWord="Recognition"
        subtitle="Milestones in competitive programming, academics, and community service"
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.04 }}
      >
        {ACHIEVEMENTS.map((achievement) => {
          const style = typeStyles[achievement.type] ?? fallbackStyle;
          const Icon = style.icon;

          return (
            <motion.div
              key={achievement.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease },
                },
              }}
              className="rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm p-5 hover:border-ctp-surface1 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${style.bg} shrink-0`}>
                  <Icon className={`w-4 h-4 ${style.color}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-ctp-text leading-snug mb-1 line-clamp-2">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-ctp-subtext0 mb-1">
                    {achievement.organization}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-ctp-overlay0">
                    <Calendar className="w-3 h-3" />
                    {achievement.date}
                  </span>

                  {achievement.viewType === "link" && achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-ctp-blue hover:text-ctp-sapphire transition-colors"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {achievement.viewType === "image" &&
                    achievement.certificateImage && (
                      <button
                        onClick={() =>
                          setSelectedCertificate(achievement.certificateImage)
                        }
                        className="inline-flex items-center gap-1 mt-2 text-xs text-ctp-blue hover:text-ctp-sapphire transition-colors"
                      >
                        Certificate <FileImage className="w-3 h-3" />
                      </button>
                    )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ctp-crust/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] bg-ctp-base border border-ctp-surface0 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-ctp-surface0 hover:bg-ctp-surface1 rounded-full text-ctp-text transition-colors"
                aria-label="Close certificate"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-8">
                <Image
                  src={selectedCertificate}
                  alt="Certificate"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[calc(90vh-8rem)] object-contain rounded-lg mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
