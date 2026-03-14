"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  TrendingUp,
  Award,
  Target,
  X,
  ExternalLink,
  Trophy,
} from "lucide-react";
import { getCodeforcesUser, type CodeforcesUser } from "@/lib/api/codeforces";
import { getLeetCodeStats, type LeetCodeStats } from "@/lib/api/leetcode";

export default function FloatingStats() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [codeforcesData, setCodeforcesData] = useState<CodeforcesUser | null>(
    null,
  );
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [codeforces, leetcode] = await Promise.all([
          getCodeforcesUser("SharifdotG"),
          getLeetCodeStats("SharifdotG"),
        ]);
        setCodeforcesData(codeforces);
        setLeetcodeData(leetcode);
      } catch (error) {
        console.error("Error fetching competitive programming data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Floating Button — clears mobile bottom nav */}
      <motion.div
        className="fixed bottom-40 right-4 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isExpanded && (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="p-3 rounded-full bg-ctp-base/60 border border-ctp-surface0/60 backdrop-blur-xl text-ctp-blue shadow-lg hover:border-ctp-surface1 transition-colors"
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View competitive programming stats"
            >
              <Code2 className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Stats Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 bg-ctp-crust/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            <motion.div
              className="fixed bottom-24 right-4 z-50 max-h-[70vh] w-[calc(100vw-1rem)] max-w-2xl overflow-y-auto rounded-2xl border border-ctp-surface0/60 bg-ctp-base/80 p-5 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-ctp-blue/10 rounded-lg">
                    <Code2 className="w-5 h-5 text-ctp-blue" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-ctp-text">
                      Competitive Programming
                    </h3>
                    <p className="text-xs text-ctp-overlay0">Live Stats</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 hover:bg-ctp-surface0/60 rounded-lg transition-colors"
                  aria-label="Close stats"
                >
                  <X className="w-4 h-4 text-ctp-overlay0" />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-6 text-ctp-overlay0 text-sm">
                  <div className="w-8 h-8 border-2 border-ctp-surface1 border-t-ctp-blue rounded-full mx-auto mb-2 animate-spin" />
                  Loading stats...
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Codeforces */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-ctp-text">
                        Codeforces
                      </h4>
                      <a
                        href="https://codeforces.com/profile/SharifdotG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ctp-blue hover:text-ctp-sapphire transition-colors flex items-center gap-1"
                      >
                        Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        {
                          icon: TrendingUp,
                          label: "Rating",
                          value: codeforcesData?.rating || 0,
                          color: "text-ctp-blue",
                        },
                        {
                          icon: Award,
                          label: "Max Rating",
                          value: codeforcesData?.maxRating || 0,
                          color: "text-ctp-yellow",
                        },
                        {
                          icon: Trophy,
                          label: "Rank",
                          value: codeforcesData?.rank || "Unrated",
                          color: "text-ctp-green",
                        },
                        {
                          icon: Target,
                          label: "Max Rank",
                          value: codeforcesData?.maxRank || "Unrated",
                          color: "text-ctp-mauve",
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="rounded-lg p-2.5 bg-ctp-surface0/30 border border-ctp-surface0/60"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                            <span className="text-[11px] text-ctp-overlay0">
                              {s.label}
                            </span>
                          </div>
                          <p className="text-sm font-display font-bold text-ctp-text capitalize">
                            {s.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LeetCode */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-ctp-text">
                        LeetCode
                      </h4>
                      <a
                        href="https://leetcode.com/SharifdotG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ctp-blue hover:text-ctp-sapphire transition-colors flex items-center gap-1"
                      >
                        Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg p-3 bg-ctp-surface0/30 border border-ctp-surface0/60">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Code2 className="w-3.5 h-3.5 text-ctp-blue" />
                          <span className="text-xs text-ctp-overlay0">
                            Solved
                          </span>
                        </div>
                        <p className="text-lg font-display font-bold text-ctp-text">
                          {leetcodeData?.totalSolved || 0}
                        </p>
                      </div>
                      <div className="rounded-lg p-3 bg-ctp-surface0/30 border border-ctp-surface0/60">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Trophy className="w-3.5 h-3.5 text-ctp-yellow" />
                          <span className="text-xs text-ctp-overlay0">
                            Ranking
                          </span>
                        </div>
                        <p className="text-lg font-display font-bold text-ctp-text">
                          {leetcodeData?.ranking
                            ? `#${leetcodeData.ranking.toLocaleString()}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
