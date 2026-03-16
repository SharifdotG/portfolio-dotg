"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Download,
  Sparkles,
  Layers,
} from "lucide-react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

type ProjectStats = {
  stars: number;
  forks: number;
  language: string;
  downloads?: number;
};

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("featured");
  const [projectStats, setProjectStats] = useState<
    Record<string, ProjectStats>
  >(() =>
    PROJECTS.reduce<Record<string, ProjectStats>>((acc, project) => {
      acc[project.title] = { stars: 0, forks: 0, language: "" };
      return acc;
    }, {}),
  );

  const filteredProjects =
    filter === "featured" ? PROJECTS.filter((p) => p.featured) : PROJECTS;

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/projects-stats", {
          signal: controller.signal,
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch project stats: ${response.status}`);
        }

        const data = (await response.json()) as Record<string, ProjectStats>;
        setProjectStats((prev) => ({ ...prev, ...data }));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching project stats:", error);
      }
    };

    void fetchStats();

    return () => controller.abort();
  }, []);

  return (
    <Section id="projects" className="relative overflow-hidden">
      <SectionTitle
        badge="Portfolio"
        title="Featured Projects"
        highlightWord="Projects"
        subtitle="Building innovative solutions through code"
      />

      {/* Filter */}
      <div className="flex justify-center gap-2 mb-10">
        {(["featured", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-ctp-blue text-ctp-crust"
                : "text-ctp-subtext0 hover:text-ctp-text bg-ctp-surface0/30"
            }`}
          >
            {f === "featured" ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <Layers className="w-4 h-4" />
            )}
            {f === "featured" ? "Featured" : "All Projects"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.06 }}
        key={filter}
      >
        {filteredProjects.map((project) => {
          const stats = projectStats[project.title];

          return (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="group rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm overflow-hidden hover:border-ctp-surface1 transition-colors flex flex-col"
            >
              {/* Image */}
              <div className="relative h-40 bg-ctp-mantle overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.featured && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-ctp-yellow/90 text-ctp-crust rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-ctp-overlay0 font-mono mb-1">
                  {project.category}
                </span>
                <h3 className="text-lg font-display font-bold text-ctp-text mb-1.5 group-hover:text-ctp-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-ctp-subtext0 leading-relaxed line-clamp-2 mb-3 flex-1">
                  {project.description}
                </p>

                {/* Stats */}
                {stats && (
                  <div className="flex items-center gap-3 mb-3 text-xs text-ctp-subtext0">
                    {stats.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-ctp-yellow" />
                        {stats.stars}
                      </span>
                    )}
                    {stats.forks > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-ctp-blue" />
                        {stats.forks}
                      </span>
                    )}
                    {stats.downloads != null && stats.downloads > 0 && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5 text-ctp-green" />
                        {stats.downloads.toLocaleString()}
                      </span>
                    )}
                    {stats.language && (
                      <span className="flex items-center gap-1 ml-auto">
                        <span className="w-2 h-2 rounded-full bg-ctp-mauve" />
                        {stats.language}
                      </span>
                    )}
                  </div>
                )}

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-md bg-ctp-surface0/60 text-ctp-subtext0 border border-ctp-surface1/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs text-ctp-overlay0">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-ctp-surface0/50 hover:bg-ctp-surface0 text-ctp-text rounded-lg border border-ctp-surface1/50 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-ctp-blue text-ctp-crust rounded-lg hover:bg-ctp-sapphire transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        className="mt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="https://github.com/SharifdotG"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-ctp-text bg-ctp-surface0/30 border border-ctp-surface0/60 rounded-lg hover:border-ctp-surface1 transition-colors"
        >
          <Github className="w-4 h-4" />
          View All Repositories
        </a>
      </motion.div>
    </Section>
  );
}
