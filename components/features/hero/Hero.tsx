"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const springTransition = {
  type: "spring" as const,
  stiffness: 130,
  damping: 18,
  mass: 0.9,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, rotate: 2, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
      mass: 0.95,
    },
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
      className="relative min-h-screen overflow-hidden bg-ctp-base pt-20 pb-10"
    >
      {/* Layered ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 text-ctp-blue/15 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[42px_42px] mask-[radial-gradient(circle_at_center,black_30%,transparent_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(137,180,250,0.14),transparent_34%),radial-gradient(circle_at_85%_78%,rgba(203,166,247,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-ctp-base/20 to-ctp-base/85" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image first on mobile, right side on desktop */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            variants={imageVariants}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={springTransition}
          >
            <div className="relative w-[min(66vw,16rem)] sm:w-80 md:w-96 lg:w-100">
              <motion.div
                className="absolute -inset-6 rounded-[2.5rem] bg-ctp-blue/10 blur-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease }}
              />

              <div className="relative aspect-square overflow-hidden rounded-full border border-ctp-surface1/70 bg-ctp-mantle/70 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-ctp-surface0/80">
                  <Image
                    src="/profile.jpg"
                    alt="Sharif Md. Yousuf"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-2 space-y-6 text-center lg:order-1 lg:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-ctp-surface0/80 bg-ctp-surface0/35 px-4 py-2 text-sm backdrop-blur-sm"
            >
              <span className="font-mono text-ctp-blue">Hello, I&apos;m</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="gradient-text">Sharif</span> <br />
              <span className="text-ctp-text">Md. Yousuf</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-xl font-body text-lg leading-relaxed text-ctp-subtext0 lg:mx-0"
            >
              Trainee Software Engineer Intern • Competitive Programmer •
              Computer Science Student
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-sm text-ctp-subtext0 lg:justify-start"
            >
              <span
                className="inline-block h-3.5 w-5 overflow-hidden rounded-sm"
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
              className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start"
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
                className="group flex items-center gap-2 rounded-xl bg-ctp-blue px-6 py-2.5 font-body font-semibold text-ctp-crust transition-colors hover:bg-ctp-sapphire"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
                className="flex items-center gap-2 rounded-xl border border-ctp-surface1 bg-transparent px-6 py-2.5 font-body font-semibold text-ctp-text transition-all hover:border-ctp-blue hover:bg-ctp-blue/5"
              >
                <FileText className="h-4 w-4" />
                Resume
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 pt-2 lg:justify-start"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springTransition}
                  className="text-ctp-overlay0 transition-colors hover:text-ctp-blue"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="flex h-8 w-5 justify-center rounded-full border border-ctp-surface1 pt-1.5">
          <motion.div
            className="h-1 w-1 rounded-full bg-ctp-blue"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease }}
          />
        </div>
      </motion.div>
    </section>
  );
}
