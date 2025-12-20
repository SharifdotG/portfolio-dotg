"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Star, Calendar, ExternalLink, FileImage, X } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { ACHIEVEMENTS } from "@/lib/constants";

// Icon mapping based on achievement type
const getIconForType = (type: string) => {
  switch (type) {
    case "competition":
      return Trophy;
    case "scholarship":
    case "academic":
      return Award;
    case "rating":
    case "certification":
      return Star;
    case "training":
      return Star;
    case "volunteer":
      return Award;
    default:
      return Trophy;
  }
};

// Color mapping based on achievement type
const getColorForType = (type: string) => {
  switch (type) {
    case "competition":
      return "text-ctp-yellow";
    case "scholarship":
    case "academic":
      return "text-ctp-blue";
    case "rating":
    case "certification":
      return "text-ctp-green";
    case "training":
      return "text-ctp-mauve";
    case "volunteer":
      return "text-ctp-pink";
    default:
      return "text-ctp-mauve";
  }
};

export default function Achievements() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <Section id="achievements">
      <SectionTitle
        badge="Milestones"
        title="Achievements & Recognition"
        highlightWord="Recognition"
        subtitle="Milestones in competitive programming, academics, and community service"
      />

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {ACHIEVEMENTS.map((achievement, index) => {
          const Icon = getIconForType(achievement.type);
          const colorClass = getColorForType(achievement.type);

          return (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Card
                className="p-6 h-full group hover:border-ctp-blue/50 hover:shadow-lg transition-all duration-500"
                variant="bordered"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`p-3 bg-ctp-surface0 rounded-lg ${colorClass}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display font-semibold text-ctp-text mb-1 group-hover:text-ctp-blue transition-colors duration-300">
                      {achievement.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-ctp-subtext0">
                      <span className="font-medium text-ctp-blue">
                        {achievement.organization}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {achievement.date}
                      </span>
                    </div>

                    <p className="text-sm text-ctp-subtext1 mb-3 leading-relaxed">
                      {achievement.description}
                    </p>

                    {achievement.viewType === "link" && achievement.link && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-ctp-blue hover:text-ctp-sapphire transition-colors duration-300 group/link"
                      >
                        {achievement.type === "certification" ? "View Certificate" : "View Profile"}
                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {achievement.viewType === "image" && achievement.certificateImage && (
                      <button
                        onClick={() => setSelectedCertificate(achievement.certificateImage)}
                        className="inline-flex items-center gap-1.5 text-sm text-ctp-blue hover:text-ctp-sapphire transition-colors duration-300 group/btn"
                      >
                        View Certificate
                        <FileImage className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Certificate Viewer Modal */}
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-ctp-surface0 hover:bg-ctp-surface1 rounded-full text-ctp-text transition-colors duration-200"
                aria-label="Close certificate"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Image */}
              <div className="p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedCertificate}
                    alt="Certificate"
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[calc(90vh-8rem)] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
