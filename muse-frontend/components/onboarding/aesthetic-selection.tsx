"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { AESTHETICS } from "@/lib/data"
import { cn } from "@/lib/utils"

interface AestheticSelectionProps {
  onNext: (aesthetics: string[]) => void
  onBack: () => void
  recommended?: string[]
}

export function AestheticSelection({ onNext, onBack, recommended = [] }: AestheticSelectionProps) {
  const [selected, setSelected] = useState<string[]>(recommended)

  const toggleAesthetic = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

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

      <div className="flex-1">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-3">Pick your aesthetics</h2>
          <p className="text-muted-foreground">Select all that resonate with you</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {AESTHETICS.map((aesthetic, index) => (
            <motion.button
              key={aesthetic.id}
              onClick={() => toggleAesthetic(aesthetic.id)}
              className={cn(
                "relative p-4 rounded-2xl border-2 text-left transition-all",
                selected.includes(aesthetic.id)
                  ? "border-foreground bg-foreground/5"
                  : "border-border hover:border-foreground/50",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <span className="text-2xl mb-2 block">{aesthetic.emoji}</span>
              <span className="font-medium">{aesthetic.label}</span>
              {selected.includes(aesthetic.id) && (
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="w-4 h-4 text-background" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Button
          onClick={() => onNext(selected)}
          size="lg"
          disabled={selected.length === 0}
          className="w-full rounded-full h-14 text-lg font-medium"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}
