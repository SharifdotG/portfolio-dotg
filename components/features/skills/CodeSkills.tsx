"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { FileJson, FileCode, Terminal as TerminalIcon, Copy, Check } from "lucide-react";
import { SKILLS } from "@/lib/constants";
import { Highlight } from "prism-react-renderer";
import { useTheme } from "@/components/providers/ThemeProvider";

const tabs = [
  { id: "languages", label: "languages.cpp", icon: FileCode, color: "text-ctp-blue" },
  { id: "web", label: "package.json", icon: FileJson, color: "text-ctp-yellow" },
  { id: "tools", label: "setup.sh", icon: TerminalIcon, color: "text-ctp-green" },
];

// Custom Catppuccin theme for prism-react-renderer 👀 - supports both dark and light modes
const getCatppuccinTheme = (isDark: boolean) => ({
  plain: {
    color: isDark ? "#cdd6f4" : "#4c4f69",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: isDark ? "#6c7086" : "#9ca0b0",
        fontStyle: "italic" as const
      },
    },
    {
      types: ["punctuation"],
      style: { color: isDark ? "#9399b2" : "#8c8fa1" },
    },
    {
      types: ["property", "tag", "constant", "symbol", "deleted"],
      style: { color: isDark ? "#f38ba8" : "#d20f39" },
    },
    {
      types: ["boolean", "number"],
      style: { color: isDark ? "#fab387" : "#fe640b" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: { color: isDark ? "#a6e3a1" : "#40a02b" },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: { color: isDark ? "#89dceb" : "#04a5e5" },
    },
    {
      types: ["atrule", "attr-value", "function", "class-name"],
      style: { color: isDark ? "#89b4fa" : "#1e66f5" },
    },
    {
      types: ["keyword"],
      style: { color: isDark ? "#cba6f7" : "#8839ef" },
    },
    {
      types: ["regex", "important"],
      style: { color: isDark ? "#f9e2af" : "#df8e1d" },
    },
    {
      types: ["namespace"],
      style: { color: isDark ? "#f5c2e7" : "#ea76cb" },
    },
  ],
});

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <motion.button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-lg bg-ctp-surface0/80 text-ctp-subtext0 opacity-0 group-hover:opacity-100 transition-all hover:text-ctp-text hover:bg-ctp-surface1 z-10"
        aria-label="Copy code"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {copied ? <Check className="w-4 h-4 text-ctp-green" /> : <Copy className="w-4 h-4" />}
      </motion.button>

      <div className="rounded-xl overflow-hidden border border-ctp-surface0 bg-ctp-mantle shadow-lg">
        <Highlight
          theme={getCatppuccinTheme(isDark)}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm md:text-base custom-scrollbar leading-relaxed`}
              style={{ ...style, backgroundColor: 'transparent' }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell pr-4 select-none text-ctp-surface2 text-right w-8 text-xs">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

// Technology logos data - using local SVG files with theme-aware variants
const techLogos = [
  { name: "C", path: "/tech-logos/c.svg" },
  { name: "C++", path: "/tech-logos/cpp.svg" },
  { name: "Python", path: "/tech-logos/python.svg" },
  { name: "JavaScript", path: "/tech-logos/javascript.svg" },
  { name: "TypeScript", path: "/tech-logos/typescript.svg" },
  { name: "C#", path: "/tech-logos/csharp.svg" },
  { name: "Next.js", path: "/tech-logos/nextjs.svg" },
  { name: "React", darkPath: "/tech-logos/react-d.svg", lightPath: "/tech-logos/react-l.svg" },
  { name: "Django", path: "/tech-logos/django.svg" },
  { name: ".NET", path: "/tech-logos/dotnet.svg" },
  { name: "Tailwind CSS", path: "/tech-logos/tailwindcss.svg" },
  { name: "MySQL", darkPath: "/tech-logos/mysql-d.svg", lightPath: "/tech-logos/mysql-l.svg" },
  { name: "PostgreSQL", path: "/tech-logos/postgresql.svg" },
  { name: "Supabase", path: "/tech-logos/supabase.svg" },
  { name: "Git", path: "/tech-logos/git.svg" },
  { name: "Linux", path: "/tech-logos/linux.svg" },
  { name: "Java", path: "/tech-logos/java.svg" },
];

// Infinite Scrolling Logos Component :3
function InfiniteScrollingLogos() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Function to get the correct path based on theme
  const getLogoPath = (logo: typeof techLogos[0]) => {
    if (logo.darkPath && logo.lightPath) {
      return isDark ? logo.darkPath : logo.lightPath;
    }
    return logo.path || "";
  };

  return (
    <div className="relative overflow-hidden py-12 mb-12">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-ctp-base to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-ctp-base to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container - duplicated for seamless loop 🥹 */}
      <div className="flex gap-16">
        <motion.div
          className="flex gap-16 shrink-0"
          animate={{
            x: [0, -100 * techLogos.length * 0.5],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
            <motion.div
              key={`logo-${index}`}
              className="shrink-0 group cursor-pointer relative"
              whileHover={{ scale: 1.2, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="relative w-24 h-24 flex items-center justify-center p-3">
                <Image
                  src={getLogoPath(tech)}
                  alt={tech.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const span = document.createElement('span');
                      span.className = 'text-sm font-bold text-ctp-blue';
                      span.textContent = tech.name;
                      target.parentElement.appendChild(span);
                    }
                  }}
                />
              </div>
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-ctp-crust border border-ctp-surface0 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                {tech.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function CodeSkills() {
  const [activeTab, setActiveTab] = useState("languages");

  const languagesCode = `#include <bits/stdc++.h>
using namespace std;

vector<string> languages = {
${SKILLS.languages.map(l => `        "${l.name}"`).join(",\n")}
};

vector<string> fundamentals = {
${SKILLS.fundamentals.map(f => `        "${f.name}"`).join(",\n")}
};

void solve() {
    for(auto& lang : languages) {
        cout << "Mastered: " << lang << endl;
    }
        
    cout << "Total Skills: " << languages.size() << endl;
}

int main() {
    Programmer sharif;
    sharif.solve();
    return 0;
}`;

  const webCode = `{
  "name": "sharif-web-stack",
  "version": "1.0.0",
  "author": "Sharif Md. Yousuf",
  "frameworks": {
${SKILLS.frameworks.map(f => `    "${f.name}": "latest"`).join(",\n")}
  },
  "skills": [
${SKILLS.frameworks.map(f => `    "${f.name}"`).join(",\n")}
  ],
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "deploy": "vercel --prod"
  }
}`;

  const toolsCode = `#!/bin/bash

DATABASES=(
${SKILLS.tools.filter(t => t.category === "Database").map(t => `    "${t.name}"`).join("\n")}
)

TOOLS=(
${SKILLS.tools.filter(t => t.category === "Tool").map(t => `    "${t.name}"`).join("\n")}
)

for db in "\${DATABASES[@]}"; do
    echo "Connecting to $db"
done

for tool in "\${TOOLS[@]}"; do
    echo "Installing $tool"
done

echo "Environment configured successfully"`;

  // Combine all skills for the interactive display
  const allSkills = [
    ...SKILLS.languages.map(s => ({ ...s, category: "Languages" })),
    ...SKILLS.frameworks.map(s => ({ ...s, category: "Frameworks" })),
    ...SKILLS.tools.map(s => ({ ...s, category: "Tools & Databases" })),
    ...SKILLS.fundamentals.map(s => ({ ...s, category: "Fundamentals" }))
  ];

  return (
    <Section id="skills">
      <SectionTitle
        badge="Tech Stack"
        title="Skills & Technologies"
        highlightWord="Technologies"
        subtitle="My technical skills in an interactive code editor"
      />

      <div className="max-w-6xl mx-auto">
        {/* Infinite Scrolling Tech Logos */}
        <InfiniteScrollingLogos />

        {/* VSCode-inspired Editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-ctp-mantle rounded-xl border border-ctp-surface0 overflow-hidden shadow-2xl"
        >
          {/* Editor Header - Tabs */}
          <div className="bg-ctp-crust border-b border-ctp-surface0 px-2 py-1.5 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-ctp-mantle text-ctp-text"
                      : "bg-transparent text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/30"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? tab.color : ""}`} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="editorTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctp-blue"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Code Display */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "languages" && (
              <CodeBlock code={languagesCode} language="cpp" />
            )}
            {activeTab === "web" && (
              <CodeBlock code={webCode} language="json" />
            )}
            {activeTab === "tools" && (
              <CodeBlock code={toolsCode} language="bash" />
            )}
          </motion.div>

          {/* Status Bar */}
          <div className="bg-ctp-crust border-t border-ctp-surface0 px-4 py-1.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="text-ctp-subtext0 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-ctp-green rounded-full animate-pulse" />
                Ready
              </span>
              <span className="text-ctp-subtext1">
                {activeTab === "languages" && "C++ · UTF-8"}
                {activeTab === "web" && "JSON · UTF-8"}
                {activeTab === "tools" && "Shell Script · UTF-8"}
              </span>
            </div>
            <div className="text-ctp-subtext1">
              {allSkills.length} Skills Loaded
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
