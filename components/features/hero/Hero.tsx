"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Download,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function Hero() {
  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.githubUrl, label: "GitHub" },
    { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: "LinkedIn" },
    { icon: Twitter, href: PERSONAL_INFO.twitterUrl, label: "Twitter" },
    { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: "Facebook" },
    { icon: Instagram, href: PERSONAL_INFO.instagramUrl, label: "Instagram" },
    { icon: SiDiscord, href: PERSONAL_INFO.discordUrl, label: "Discord" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ctp-base pt-20 pb-10"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-ctp-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-ctp-mauve/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Text */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ctp-surface0/40 backdrop-blur-sm border border-ctp-surface0/50 rounded-full text-sm"
            >
              <span className="font-mono text-ctp-blue">Hello, I&apos;m</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight"
            >
              <span className="gradient-text">Sharif</span>
              <br />
              <span className="text-ctp-text">Md. Yousuf</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-ctp-subtext0"
            >
              Competitive Programmer &middot; Software Engineer &middot; CS
              Student
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 text-sm text-ctp-subtext0"
            >
              <span
                className="inline-block w-5 h-3.5 rounded-sm overflow-hidden"
                role="img"
                aria-label="Flag of Bangladesh"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 800"
                  className="w-full h-full"
                >
                  <rect width="1200" height="800" fill="#006a4e" />
                  <circle cx="460" cy="400" r="200" fill="#f42a41" />
                </svg>
              </span>
              <span>Dhaka, Bangladesh</span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-2.5 bg-ctp-blue text-ctp-crust font-semibold rounded-lg hover:bg-ctp-sapphire transition-colors flex items-center gap-2 group"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "Sharif_Md_Yousuf_Resume.pdf";
                  link.click();
                }}
                className="px-6 py-2.5 bg-transparent text-ctp-text font-semibold rounded-lg border border-ctp-surface1 hover:border-ctp-blue hover:bg-ctp-blue/5 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctp-overlay0 hover:text-ctp-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Subtle glow behind image */}
              <div className="absolute -inset-4 bg-ctp-blue/10 rounded-full blur-3xl" />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-ctp-surface1 shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Sharif Md. Yousuf"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="w-5 h-8 border border-ctp-surface1 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1 bg-ctp-blue rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
