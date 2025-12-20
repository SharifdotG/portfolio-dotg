"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Eye, Download, Sparkles, Code2, Layers } from "lucide-react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/constants";
import { getGitHubRepo } from "@/lib/api/github";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

type ProjectStats = {
  stars: number;
  forks: number;
  language: string;
  downloads?: number;
};

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("featured");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projectStats, setProjectStats] = useState<Record<string, ProjectStats>>({});

  const filteredProjects = filter === "featured"
    ? PROJECTS.filter((p) => p.featured)
    : PROJECTS;

  useEffect(() => {
    const fetchStats = async () => {
      const stats: Record<string, ProjectStats> = {};

      for (const project of PROJECTS) {
        if (project.githubRepo) {
          const [owner, repo] = project.githubRepo.split('/');
          const repoData = await getGitHubRepo(owner, repo);

          if (repoData) {
            stats[project.title] = {
              stars: repoData.stargazers_count,
              forks: repoData.forks_count,
              language: repoData.language,
            };
          }
        }

        // Hardcoded VS Code extension stats :') (CORS issue prevents direct API call :))
        if (project.extensionId === 'SharifdotG.catppuccin-dark-pro') {
          if (stats[project.title]) {
            stats[project.title].downloads = 3481;
          }
        }
      }

      setProjectStats(stats);
    };

    fetchStats();
  }, []);

  return (
    <Section id="projects">
      <SectionTitle
        badge="Portfolio"
        title="Featured Projects"
        highlightWord="Projects"
        subtitle="Building innovative solutions through code"
      />

      {/* Filter Buttons */}
      <motion.div
        className="flex justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Button
          variant={filter === "featured" ? "primary" : "ghost"}
          onClick={() => setFilter("featured")}
          icon={Sparkles}
        >
          Featured
        </Button>
        <Button
          variant={filter === "all" ? "primary" : "ghost"}
          onClick={() => setFilter("all")}
          icon={Layers}
        >
          All Projects
        </Button>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        key={filter}
      >
        {filteredProjects.map((project) => {
          const stats = projectStats[project.title];

          return (
            <motion.div
              key={project.title}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(project.title)}
              onHoverEnd={() => setHoveredProject(null)}
              className="relative group"
            >
              {/* Hover Preview */}
              <AnimatePresence>
                {hoveredProject === project.title && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-64 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden lg:block"
                  >
                    <div className="relative w-120 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-ctp-blue/50 bg-ctp-base">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-ctp-base via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-sm text-ctp-text font-medium line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Card
                className="p-6 h-full flex flex-col relative overflow-hidden"
                variant="bordered"
              >
                {/* Animated Gradient Border */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, #89b4fa, #cba6f7, #f5c2e7, #89b4fa)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-px bg-ctp-base rounded-[11px] z-10" />

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <motion.div
                        className="p-2.5 bg-ctp-blue/10 rounded-lg group-hover:bg-ctp-blue/20 transition-colors"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <Code2 className="w-5 h-5 text-ctp-blue" />
                      </motion.div>
                      {project.featured && (
                        <motion.span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-ctp-yellow/20 text-ctp-yellow rounded-full border border-ctp-yellow/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </motion.span>
                      )}
                    </div>

                    <h3 className="text-xl font-display font-bold text-ctp-text group-hover:text-ctp-blue transition-colors mb-1">
                      {project.title}
                    </h3>

                    <span className="text-xs text-ctp-subtext0 font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-ctp-subtext0 mb-4 leading-relaxed line-clamp-3 grow">
                    {project.description}
                  </p>

                  {/* GitHub Stats */}
                  {stats && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-ctp-subtext0">
                      {stats.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-ctp-yellow" />
                          <span className="font-medium">{stats.stars}</span>
                        </div>
                      )}
                      {stats.forks > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-ctp-blue" />
                          <span className="font-medium">{stats.forks}</span>
                        </div>
                      )}
                      {stats.downloads && (
                        <div className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-ctp-green" />
                          <span className="font-medium">{stats.downloads.toLocaleString()}</span>
                        </div>
                      )}
                      {stats.language && (
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="w-2 h-2 rounded-full bg-ctp-mauve" />
                          <span>{stats.language}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <motion.span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-ctp-surface0/60 text-ctp-blue font-mono border border-ctp-surface1/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs px-2.5 py-1 text-ctp-subtext0">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-ctp-surface0/50 hover:bg-ctp-surface0 text-ctp-text rounded-lg border border-ctp-surface1 transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a>

                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-ctp-blue text-ctp-crust rounded-lg transition-all hover:bg-ctp-sapphire"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="p-8 max-w-2xl mx-auto relative overflow-hidden" variant="elevated">
          <div className="absolute inset-0 bg-linear-to-br from-ctp-blue/5 via-transparent to-ctp-mauve/5" />
          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-ctp-blue/10 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github className="w-8 h-8 text-ctp-blue" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold text-ctp-text mb-3">
              Open Source Contributions
            </h3>
            <p className="text-ctp-subtext0 mb-6">
              Explore my complete portfolio of projects and contributions on GitHub
            </p>
            <Button
              variant="primary"
              size="lg"
              icon={Eye}
              onClick={() => window.open("https://github.com/SharifdotG", "_blank")}
            >
              View All Repositories
            </Button>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
