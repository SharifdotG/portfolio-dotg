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
  const [isVisible, setIsVisible] = useState(true);
  const [problemName] = useState(problemNames[0]);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);

  useEffect(() => {
    const timers: number[] = [];

    statuses.forEach((status, idx) => {
      const timeoutId = window.setTimeout(() => {
        setVisibleSteps((prev) => [...prev, status]);
      }, idx * 550);
      timers.push(timeoutId);
    });

    const hideTimeout = window.setTimeout(
      () => setIsVisible(false),
      statuses.length * 550 + 800
    );
    timers.push(hideTimeout);

    return () => {
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ctp-base font-mono px-4"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
            {/* Terminal Window */}
            <div className="bg-ctp-mantle border border-ctp-surface0 rounded-lg shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-ctp-surface0/50 px-3 sm:px-4 py-2 flex items-center gap-2 border-b border-ctp-surface0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-ctp-red" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-ctp-yellow" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-ctp-green" />
                <span className="ml-2 text-[10px] sm:text-xs text-ctp-subtext0 truncate">sharifdotg@portfolio:~/cp</span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 sm:p-6 min-h-45 sm:min-h-55 flex flex-col justify-start">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-start gap-2 text-ctp-text text-xs sm:text-sm">
                    <span className="text-ctp-green shrink-0">➜</span>
                    <span className="text-ctp-blue shrink-0">~</span>
                    <span className="break-all">g++ -o solution {problemName.replace(/\s+/g, '_').toLowerCase()}.cpp</span>
                  </div>

                  <div className="flex items-center gap-2 text-ctp-text text-xs sm:text-sm mb-2 sm:mb-4">
                    <span className="text-ctp-green">➜</span>
                    <span className="text-ctp-blue">~</span>
                    <span>./solution</span>
                  </div>

                  {problemName && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm sm:text-base text-ctp-text mb-1 sm:mb-2"
                    >
                      Problem: {problemName}
                    </motion.div>
                  )}

                  {visibleSteps.map((step, index) => (
                    <motion.div
                      key={`step-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm sm:text-base font-semibold ${
                        step === "Accepted!"
                          ? "text-ctp-green"
                          : step?.includes("Running")
                            ? "text-ctp-yellow"
                            : "text-ctp-text"
                      }`}
                    >
                      {step}
                      {index === visibleSteps.length - 1 && step !== "Accepted!" && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-1.5 h-3.5 sm:w-2 sm:h-4 bg-current ml-1 align-middle"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading Bar */}
            <div className="mt-6 sm:mt-8 h-1 bg-ctp-surface0 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-ctp-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min((visibleSteps.length / statuses.length) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
