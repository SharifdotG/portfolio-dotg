"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Home,
  User,
  Briefcase,
  Code2,
  FolderKanban,
  Trophy,
  Mail,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

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
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-xl bg-ctp-base/60 border border-ctp-surface0/30">
          <a
            href="#hero"
            className="px-3 py-1.5 text-sm font-display font-bold text-ctp-blue hover:text-ctp-sapphire transition-colors"
          >
            S.
          </a>

          <div className="w-px h-5 bg-ctp-surface0/50 mx-1" />

          {navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-ctp-blue"
                    : "text-ctp-subtext0 hover:text-ctp-text"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavDesktop"
                    className="absolute inset-0 bg-ctp-blue/10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}

          <div className="w-px h-5 bg-ctp-surface0/50 mx-1" />

          <button
            onClick={toggleTheme}
            className="p-2 text-ctp-subtext0 hover:text-ctp-text rounded-full hover:bg-ctp-surface0/50 transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Navbar — Bottom-docked icon-only pill */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-xl bg-ctp-base/70 border border-ctp-surface0/30 shadow-lg shadow-ctp-crust/30">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative p-2.5 rounded-full transition-colors ${
                  isActive
                    ? "text-ctp-blue"
                    : "text-ctp-subtext0 hover:text-ctp-text"
                }`}
                aria-label={item.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0 bg-ctp-blue/10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4.5 h-4.5 relative z-10" />
              </a>
            );
          })}

          <div className="w-px h-5 bg-ctp-surface0/50 mx-0.5" />

          <button
            onClick={toggleTheme}
            className="p-2.5 text-ctp-subtext0 hover:text-ctp-text rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4.5 h-4.5" />
            ) : (
              <Moon className="w-4.5 h-4.5" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
