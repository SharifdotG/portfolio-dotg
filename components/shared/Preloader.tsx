"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const problemNames = [
  "Problem A. Watermelon",
  "Problem B. Theatre Square",
  "Problem C. Way Too Long Words",
  "Problem D. Next Round",
  "Problem E. Domino piling",
  "Problem F. Bit++",
  "Problem G. Team",
  "Problem H. Petya and Strings",
  "Problem I. Helpful Maths",
  "Problem J. Word Capitalization",
  "Problem K. Stones on the Table",
  "Problem L. Boy or Girl",
  "Problem M. Amusing Joke",
  "Problem N. Soft Drinking",
  "Problem O. HQ9+",
  "Problem P. Tram",
  "Problem Q. Elephant",
  "Problem R. Soldier and Bananas",
  "Problem S. Bear and Big Brother",
  "Problem T. Wrong Subtraction",
];

const statuses = [
  "Submitted.",
  "In Queue...",
  "Compiling...",
  "Running on Test 1...",
  "Running on Test 15...",
  "Running on Test 42...",
  "Accepted!",
];

export default function Preloader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [problemName, setProblemName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setProblemName(problemNames[Math.floor(Math.random() * problemNames.length)]);
    }, 0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= statuses.length) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const displayText = currentStep === 0
    ? `Problem: ${problemName}`
    : statuses[currentStep - 1];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ctp-base font-mono"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full max-w-md px-6">
            {/* Terminal Window */}
            <div className="bg-ctp-mantle border border-ctp-surface0 rounded-lg shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-ctp-surface0/50 px-4 py-2 flex items-center gap-2 border-b border-ctp-surface0">
                <div className="w-3 h-3 rounded-full bg-ctp-red" />
                <div className="w-3 h-3 rounded-full bg-ctp-yellow" />
                <div className="w-3 h-3 rounded-full bg-ctp-green" />
                <span className="ml-2 text-xs text-ctp-subtext0">sharifdotg@portfolio:~/cp</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 min-h-40 flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-ctp-text">
                    <span className="text-ctp-green">➜</span>
                    <span className="text-ctp-blue">~</span>
                    <span>g++ -o solution {problemName.replace(/\s+/g, '_').toLowerCase()}.cpp</span>
                  </div>

                  <div className="flex items-center gap-2 text-ctp-text">
                    <span className="text-ctp-green">➜</span>
                    <span className="text-ctp-blue">~</span>
                    <span>./solution</span>
                  </div>

                  <motion.div
                    key={displayText}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-xl font-bold mt-4 ${
                      displayText === "Accepted!"
                        ? "text-ctp-green"
                        : displayText?.includes("Running")
                          ? "text-ctp-yellow"
                          : "text-ctp-text"
                    }`}
                  >
                    {displayText}
                    {displayText !== "Accepted!" && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2.5 h-5 bg-ctp-text ml-1 align-middle"
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Loading Bar */}
            <div className="mt-8 h-1 bg-ctp-surface0 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-ctp-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min((currentStep / statuses.length) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
