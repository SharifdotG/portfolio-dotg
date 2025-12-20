"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, ArrowRight, Twitter, Facebook, Instagram } from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/constants";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.githubUrl, color: "hover:text-ctp-mauve", label: "GitHub" },
    { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, color: "hover:text-ctp-sapphire", label: "LinkedIn" },
    { icon: Twitter, href: PERSONAL_INFO.twitterUrl, color: "hover:text-ctp-sky", label: "Twitter" },
    { icon: Facebook, href: PERSONAL_INFO.facebookUrl, color: "hover:text-ctp-blue", label: "Facebook" },
    { icon: Instagram, href: PERSONAL_INFO.instagramUrl, color: "hover:text-ctp-pink", label: "Instagram" },
    { icon: SiDiscord, href: PERSONAL_INFO.discordUrl, color: "hover:text-ctp-lavender", label: "Discord" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 2.5, // Waiting for preloader
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ctp-base pt-20 pb-10"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-ctp-blue/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ctp-mauve/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-medium text-ctp-blue font-mono">
                Hello, I&apos;m
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-ctp-text">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-ctp-blue via-ctp-mauve to-ctp-pink animate-text-gradient bg-size-[200%_auto]">
                  Sharif
                </span>
                <br />
                <span className="text-ctp-text">
                  Md. Yousuf
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-ctp-subtext0 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              A <span className="text-ctp-text font-semibold">Competitive Programmer</span> and a <span className="text-ctp-text font-semibold">Computer Science Student</span>. Experienced in building web applications and developer tools.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-ctp-blue text-ctp-base font-bold rounded-full hover:bg-ctp-sapphire transition-all shadow-lg shadow-ctp-blue/25 hover:shadow-ctp-blue/40 flex items-center gap-2 group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "Sharif_Md_Yousuf_Resume.pdf";
                  link.click();
                }}
                className="px-8 py-3 bg-transparent text-ctp-text font-bold rounded-full border-2 border-ctp-surface1 hover:border-ctp-blue hover:bg-ctp-blue/5 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Resume
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6 pt-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-ctp-subtext0 transition-colors transform hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mt-8 lg:mt-0"

            >
              {/* Neon Glow Ring */}
              <div className="absolute -inset-4 bg-linear-to-r from-ctp-blue via-ctp-mauve to-ctp-pink rounded-full opacity-75 blur-2xl animate-pulse" />

              {/* Rotating Border */}
              <div className="absolute -inset-1 bg-linear-to-r from-ctp-blue via-ctp-mauve to-ctp-pink rounded-full animate-rotate" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-ctp-base shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Sharif Md. Yousuf"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-xs font-mono text-ctp-subtext0 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-ctp-surface1 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-ctp-blue rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
