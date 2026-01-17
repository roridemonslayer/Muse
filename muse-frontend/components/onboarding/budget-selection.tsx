"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BUDGET_LABELS } from "@/lib/data"
import { cn } from "@/lib/utils"

interface BudgetSelectionProps {
  onNext: (budget: number) => void
  onBack: () => void
}

export function BudgetSelection({ onNext, onBack }: BudgetSelectionProps) {
  const [budget, setBudget] = useState(1)

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-3">{"What's your budget?"}</h2>
          <p className="text-muted-foreground">{"We'll tailor recommendations to your range"}</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="relative">
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-foreground [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-4">
              {BUDGET_LABELS.map((label, index) => (
                <span
                  key={label}
                  className={cn(
                    "text-sm transition-colors",
                    index === budget ? "text-foreground font-medium" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <motion.div className="p-6 bg-card rounded-2xl border" layout>
            <p className="text-lg font-medium mb-2">{BUDGET_LABELS[budget]}</p>
            <p className="text-muted-foreground text-sm">
              {budget === 0 && "Thrift finds, vintage gems, and budget-friendly basics"}
              {budget === 1 && "Quality everyday pieces from accessible brands"}
              {budget === 2 && "Investment pieces from contemporary designers"}
              {budget === 3 && "Luxury fashion and designer pieces"}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Button onClick={() => onNext(budget)} size="lg" className="w-full rounded-full h-14 text-lg font-medium">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
