"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, ArrowUp, Twitter, Facebook, Instagram } from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { PERSONAL_INFO } from "@/lib/constants";

const socialLinks = [
  { name: "GitHub", href: PERSONAL_INFO.githubUrl, icon: Github, color: "ctp-mauve" },
  { name: "LinkedIn", href: PERSONAL_INFO.linkedinUrl, icon: Linkedin, color: "ctp-blue" },
  { name: "Twitter", href: PERSONAL_INFO.twitterUrl, icon: Twitter, color: "ctp-sky" },
  { name: "Facebook", href: PERSONAL_INFO.facebookUrl, icon: Facebook, color: "ctp-sapphire" },
  { name: "Instagram", href: PERSONAL_INFO.instagramUrl, icon: Instagram, color: "ctp-pink" },
  { name: "Discord", href: PERSONAL_INFO.discordUrl, icon: SiDiscord, color: "ctp-lavender" },
  { name: "Email", href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, color: "ctp-green" },
  { name: "Codeforces", href: PERSONAL_INFO.codeforcesUrl, icon: Code2, color: "ctp-yellow" },
  { name: "LeetCode", href: PERSONAL_INFO.leetcodeUrl, icon: Code2, color: "ctp-peach" },
];

const quickLinks = [
  { name: "About Me", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ctp-mantle border-t border-ctp-surface0 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-ctp-blue/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-ctp-mauve/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ctp-crust/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl font-display font-bold mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">SharifdotG</span>
            </motion.h3>
            <p className="text-ctp-subtext0 text-sm mb-4 leading-relaxed">
              A Competitive Programmer and a Computer Science Student.
              Experienced in building web applications and developer tools.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-display font-semibold text-ctp-text mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-ctp-subtext0 hover:text-ctp-blue transition-colors inline-flex items-center gap-2 group"
                  >
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-display font-semibold text-ctp-text mb-4">
              Connect With Me
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 text-ctp-subtext0 hover:text-${link.color} bg-ctp-surface0/50 hover:bg-ctp-surface0 rounded-lg transition-all`}
                  aria-label={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5 mx-auto" />
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-ctp-surface0 text-ctp-text text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-ctp-subtext0 hover:text-ctp-blue transition-colors group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Back to Top
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-ctp-surface0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-center text-ctp-subtext0 text-sm flex items-center justify-center flex-wrap gap-1">
              © {currentYear} Sharif Md. Yousuf. dotG for Life (≧∇≦)ﾉ
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
