"use client";

import { useState, useEffect } from "react";
import {
  Home,
  User,
  Briefcase,
  Code2,
  FolderKanban,
  Trophy,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Achievements", href: "#achievements", icon: Trophy },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const springTransition = {
    type: "spring" as const,
    stiffness: 360,
    damping: 28,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navigation.forEach((item) => {
      const sectionId = item.href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Navbar — Floating centered pill */}
      <motion.header
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-shadow duration-300 ${
          isScrolled ? "shadow-lg shadow-ctp-crust/20" : ""
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        <nav className="isolate flex items-center gap-1 overflow-hidden rounded-full border border-ctp-surface0/35 bg-ctp-base/65 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-2xl">
          <a
            href="#hero"
            className="px-3 py-1.5 text-sm font-display font-bold text-ctp-blue hover:text-ctp-sapphire transition-colors"
          >
            SharifdotG
          </a>

          <div className="w-px h-5 bg-ctp-surface0/50 mx-1" />

          {navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <motion.a
                key={item.name}
                href={item.href}
                aria-label={item.name}
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-ctp-blue"
                    : "text-ctp-subtext0 hover:text-ctp-text"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavDesktop"
                    className="absolute inset-0.5 rounded-full bg-ctp-blue/12"
                    transition={springTransition}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            );
          })}
        </nav>
      </motion.header>

      {/* Mobile Navbar — Bottom-docked icon-only pill */}
      <motion.nav
        className="fixed bottom-3 left-1/2 z-50 w-[calc(100vw-1rem)] max-w-sm -translate-x-1/2 px-1 md:hidden"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.15 }}
      >
        <div className="flex items-center justify-between overflow-hidden rounded-full border border-ctp-surface0/35 bg-ctp-base/75 px-2 py-2 shadow-lg shadow-ctp-crust/25 backdrop-blur-2xl">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            const Icon = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                transition={springTransition}
                className={`relative p-2 rounded-full transition-colors ${
                  isActive
                    ? "text-ctp-blue"
                    : "text-ctp-subtext0 hover:text-ctp-text"
                }`}
                aria-label={item.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0.5 rounded-full bg-ctp-blue/12"
                    transition={springTransition}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
              </motion.a>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
