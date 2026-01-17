"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ruler, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { updateFitPreferences } from "@/lib/store"
import { cn } from "@/lib/utils"

interface FitPreferencesProps {
  onComplete: () => void
}

export function FitPreferences({ onComplete }: FitPreferencesProps) {
  const [height, setHeight] = useState([170])
  const [preferredFit, setPreferredFit] = useState<"oversized" | "relaxed" | "fitted">("relaxed")

  const fits = [
    {
      id: "oversized" as const,
      label: "Oversized",
      description: "Drapey, relaxed, room to breathe",
    },
    {
      id: "relaxed" as const,
      label: "Relaxed",
      description: "Comfortable but not baggy",
    },
    {
      id: "fitted" as const,
      label: "Fitted",
      description: "Close to body, more structured",
    },
  ]

  const handleContinue = () => {
    updateFitPreferences(height[0], preferredFit)
    onComplete()
  }

  return (
    <div className="min-h-screen flex flex-col p-6 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
          <Ruler className="w-7 h-7 text-accent" />
        </div>

        <h1 className="font-serif text-3xl mb-2">Fit Intelligence</h1>
        <p className="text-muted-foreground mb-8">Help us recommend the right sizes and fits for you</p>

        {/* Height Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Your Height</h3>
            <span className="font-serif text-2xl">{height[0]} cm</span>
          </div>
          <Slider value={height} onValueChange={setHeight} min={140} max={210} step={1} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>140 cm</span>
            <span>210 cm</span>
          </div>
        </div>

        {/* Fit Preference */}
        <div>
          <h3 className="font-medium mb-4">Preferred Fit</h3>
          <div className="space-y-3">
            {fits.map((fit, idx) => (
              <motion.button
                key={fit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setPreferredFit(fit.id)}
                className={cn(
                  "w-full p-4 rounded-2xl border text-left transition-all",
                  preferredFit === fit.id ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30",
                )}
              >
                <span className="font-medium block mb-1">{fit.label}</span>
                <span className="text-sm text-muted-foreground">{fit.description}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-6"
      >
        <Button
          onClick={handleContinue}
          className="w-full h-14 rounded-full text-base bg-foreground text-background hover:bg-foreground/90"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}
