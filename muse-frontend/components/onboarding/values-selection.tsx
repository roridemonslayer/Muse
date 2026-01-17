"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { VALUES } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ValuesSelectionProps {
  onComplete: (values: string[]) => void
  onBack: () => void
}

export function ValuesSelection({ onComplete, onBack }: ValuesSelectionProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleValue = (id: string) => {
    if (id === "none") {
      setSelected(["none"])
    } else {
      setSelected((prev) => {
        const filtered = prev.filter((v) => v !== "none")
        return filtered.includes(id) ? filtered.filter((v) => v !== id) : [...filtered, id]
      })
    }
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

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-3">What matters to you?</h2>
          <p className="text-muted-foreground">{"We'll highlight brands that align with your values"}</p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {VALUES.map((value, index) => (
            <motion.button
              key={value.id}
              onClick={() => toggleValue(value.id)}
              className={cn(
                "w-full relative p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4",
                selected.includes(value.id)
                  ? "border-foreground bg-foreground/5"
                  : "border-border hover:border-foreground/50",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                  selected.includes(value.id) ? "bg-foreground border-foreground" : "border-muted-foreground",
                )}
              >
                {selected.includes(value.id) && <Check className="w-4 h-4 text-background" />}
              </div>
              <div>
                <span className="font-medium block">{value.label}</span>
                <span className="text-sm text-muted-foreground">{value.description}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Button
            onClick={() => onComplete(selected.length > 0 ? selected : ["none"])}
            size="lg"
            className="w-full rounded-full h-14 text-lg font-medium"
          >
            Complete Setup
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
