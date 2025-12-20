"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, TrendingUp, Award, Target, X, ExternalLink, Trophy } from "lucide-react";
import Card from "@/components/ui/Card";
import {
  getCodeforcesUser,
  type CodeforcesUser,
} from "@/lib/api/codeforces";
import { getLeetCodeStats, type LeetCodeStats } from "@/lib/api/leetcode";

export default function FloatingStats() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [codeforcesData, setCodeforcesData] = useState<CodeforcesUser | null>(null);
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
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isExpanded && (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="relative p-4 bg-ctp-blue text-ctp-crust rounded-full shadow-2xl hover:bg-ctp-sapphire transition-all hover:scale-110 active:scale-95 group"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 0, opacity: 0 }}
              aria-label="View competitive programming stats"
            >
              <Code2 className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Stats Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ctp-crust/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Stats Panel */}
            <motion.div
              className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Card className="p-6" variant="elevated">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-ctp-blue/20 rounded-lg">
                      <Code2 className="w-6 h-6 text-ctp-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-ctp-text">
                        Competitive Programming
                      </h3>
                      <p className="text-sm text-ctp-subtext0">Live Stats</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-ctp-surface0 rounded-lg transition-colors"
                    aria-label="Close stats"
                  >
                    <X className="w-5 h-5 text-ctp-subtext0" />
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8 text-ctp-subtext0">
                    <motion.div
                      className="w-12 h-12 border-4 border-ctp-surface0 border-t-ctp-blue rounded-full mx-auto mb-3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Loading stats...
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Codeforces Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-display font-semibold text-ctp-text flex items-center gap-2">
                          <span className="w-2 h-2 bg-ctp-yellow rounded-full animate-pulse" />
                          Codeforces
                        </h4>
                        <a
                          href="https://codeforces.com/profile/SharifdotG"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ctp-blue hover:text-ctp-sapphire transition-colors flex items-center gap-1"
                        >
                          View Profile
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-ctp-surface0/50 rounded-lg p-3 border border-ctp-surface1">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-ctp-blue" />
                            <span className="text-xs text-ctp-subtext0">Rating</span>
                          </div>
                          <p className="text-xl font-display font-bold text-ctp-text">
                            {codeforcesData?.rating || 0}
                          </p>
                        </div>

                        <div className="bg-ctp-surface0/50 rounded-lg p-3 border border-ctp-surface1">
                          <div className="flex items-center gap-2 mb-1">
                            <Award className="w-4 h-4 text-ctp-yellow" />
                            <span className="text-xs text-ctp-subtext0">Max Rating</span>
                          </div>
                          <p className="text-xl font-display font-bold text-ctp-text">
                            {codeforcesData?.maxRating || 0}
                          </p>
                        </div>

                        <div className="bg-ctp-surface0/50 rounded-lg p-3 border border-ctp-surface1">
                          <div className="flex items-center gap-2 mb-1">
                            <Trophy className="w-4 h-4 text-ctp-green" />
                            <span className="text-xs text-ctp-subtext0">Rank</span>
                          </div>
                          <p className="text-base font-display font-bold text-ctp-text capitalize">
                            {codeforcesData?.rank || "Unrated"}
                          </p>
                        </div>

                        <div className="bg-ctp-surface0/50 rounded-lg p-3 border border-ctp-surface1">
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4 text-ctp-mauve" />
                            <span className="text-xs text-ctp-subtext0">Max Rank</span>
                          </div>
                          <p className="text-base font-display font-bold text-ctp-text capitalize">
                            {codeforcesData?.maxRank || "Unrated"}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* LeetCode Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-display font-semibold text-ctp-text flex items-center gap-2">
                          <span className="w-2 h-2 bg-ctp-yellow rounded-full animate-pulse" />
                          LeetCode
                        </h4>
                        <a
                          href="https://leetcode.com/SharifdotG"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ctp-blue hover:text-ctp-sapphire transition-colors flex items-center gap-1"
                        >
                          View Profile
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-ctp-surface0/50 rounded-lg p-4 border border-ctp-surface1">
                          <div className="flex items-center gap-2 mb-2">
                            <Code2 className="w-5 h-5 text-ctp-blue" />
                            <span className="text-sm text-ctp-subtext0">Total Solved</span>
                          </div>
                          <p className="text-2xl font-display font-bold text-ctp-text">
                            {leetcodeData?.totalSolved || 0}
                          </p>
                        </div>

                        <div className="bg-ctp-surface0/50 rounded-lg p-4 border border-ctp-surface1">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-ctp-yellow" />
                            <span className="text-sm text-ctp-subtext0">Global Ranking</span>
                          </div>
                          <p className="text-2xl font-display font-bold text-ctp-text">
                            {leetcodeData?.ranking ? `#${leetcodeData.ranking.toLocaleString()}` : "N/A"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
