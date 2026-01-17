"use client"

import { motion } from "framer-motion"
import { Ruler, User } from "lucide-react"
import { useProfile } from "@/lib/store"
import type { ClothingItem } from "@/lib/store"
import { cn } from "@/lib/utils"

interface FitIntelligenceProps {
  item: ClothingItem
}

export function FitIntelligence({ item }: FitIntelligenceProps) {
  const { profile } = useProfile()
  const userHeight = profile?.height || 170
  const preferredFit = profile?.preferredFit || "relaxed"

  const fitInfo = item.fitInfo || {
    oversized: "Relaxed, drapey silhouette",
    relaxed: "Comfortable with room to move",
    fitted: "Close to the body, more structured",
  }

  const getSizeRecommendation = () => {
    if (!item.sizeGuide) return "M"
    const heightRanges = Object.keys(item.sizeGuide)
    for (const range of heightRanges) {
      const [min, max] = range.split("-").map(Number)
      if (max) {
        if (userHeight >= min && userHeight <= max) return item.sizeGuide[range]
      } else if (range.includes("+")) {
        const minHeight = Number.parseInt(range)
        if (userHeight >= minHeight) return item.sizeGuide[range]
      }
    }
    return "M"
  }

  const fits: Array<"oversized" | "relaxed" | "fitted"> = ["oversized", "relaxed", "fitted"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-2xl border"
    >
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="w-5 h-5 text-accent" />
        <h3 className="font-medium">Fit Intelligence</h3>
      </div>

      {profile?.height && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-xl">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">
            Based on your height ({userHeight}cm), we recommend size{" "}
            <span className="font-semibold">{getSizeRecommendation()}</span>
          </span>
        </div>
      )}

      <div className="space-y-3">
        {fits.map((fit) => (
          <motion.div
            key={fit}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "p-3 rounded-xl border transition-colors",
              fit === preferredFit ? "border-accent bg-accent/5" : "border-transparent bg-muted/50",
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium capitalize">{fit}</span>
              {fit === preferredFit && <span className="text-xs text-accent font-medium">Your preference</span>}
            </div>
            <p className="text-xs text-muted-foreground">{fitInfo[fit]}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
