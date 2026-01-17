"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import type { ClothingItem } from "@/lib/store"

interface RecommendationCardProps {
  item: ClothingItem
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  const [showWhyNot, setShowWhyNot] = useState(false)

  const reasons = item.recommendationReasons || [
    "Matches your aesthetic preferences",
    "Within your budget range",
    "Aligns with your style DNA",
  ]

  const notRecommendedReasons = item.notRecommendedReasons || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-2xl border"
    >
      <div className="flex items-center gap-2 mb-4">
        <ThumbsUp className="w-5 h-5 text-accent" />
        <h3 className="font-medium">Why This Was Recommended</h3>
      </div>

      <ul className="space-y-3 mb-4">
        {reasons.map((reason, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            {reason}
          </motion.li>
        ))}
      </ul>

      {notRecommendedReasons.length > 0 && (
        <>
          <button
            onClick={() => setShowWhyNot(!showWhyNot)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Why it might not be perfect</span>
            {showWhyNot ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showWhyNot && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {notRecommendedReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}
