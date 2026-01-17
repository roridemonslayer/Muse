"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ChevronRight, Shuffle } from "lucide-react"
import { WEEKLY_CHALLENGES, SAMPLE_ITEMS, BUDGET_LABELS } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function WeeklyChallengeCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<number>(2) // Mid-Range default
  const challenge = WEEKLY_CHALLENGES[0]
  const heroItem = SAMPLE_ITEMS.find((i) => i.id === challenge.heroItem)

  const budgetTiers = ["thrift", "affordable", "midRange", "highFashion"] as const

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl border overflow-hidden"
    >
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full p-4 flex items-start gap-4 text-left">
        <div className="w-20 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
          {heroItem && (
            <Image src={heroItem.image || "/placeholder.svg"} alt={heroItem.name} fill className="object-cover" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">Weekly Challenge</span>
          </div>
          <h3 className="font-serif text-lg mb-1">{challenge.title}</h3>
          <p className="text-sm text-muted-foreground">{challenge.subtitle}</p>
        </div>
        <ChevronRight
          className={cn("w-5 h-5 text-muted-foreground transition-transform flex-shrink-0", isExpanded && "rotate-90")}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              <p className="text-sm text-muted-foreground">{challenge.description}</p>

              {/* Outfit Suggestions */}
              <div className="space-y-3">
                {challenge.outfitSuggestions.map((outfit, idx) => {
                  const outfitItems = outfit.items.map((id) => SAMPLE_ITEMS.find((i) => i.id === id)).filter(Boolean)

                  return (
                    <motion.div
                      key={outfit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3 bg-muted/50 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{outfit.name}</h4>
                        <span className="text-xs text-muted-foreground">{outfit.description}</span>
                      </div>
                      <div className="flex gap-2">
                        {outfitItems.map((item) => (
                          <Link
                            key={item!.id}
                            href={`/item/${item!.id}`}
                            className="w-14 h-14 rounded-lg overflow-hidden bg-muted relative"
                          >
                            <Image
                              src={item!.image || "/placeholder.svg"}
                              alt={item!.name}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Budget Replay */}
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Replay in different budget</h4>
                <div className="flex gap-2 mb-3">
                  {budgetTiers.map((tier, idx) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedBudget(idx)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-full text-xs font-medium transition-colors",
                        selectedBudget === idx ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80",
                      )}
                    >
                      {BUDGET_LABELS[idx]}
                    </button>
                  ))}
                </div>
                <motion.div
                  key={selectedBudget}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-accent/5 rounded-xl border border-accent/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total outfit cost</span>
                    <span className="font-serif text-lg">
                      ${challenge.budgetBreakdown[budgetTiers[selectedBudget]]}
                    </span>
                  </div>
                </motion.div>
              </div>

              <Button className="w-full rounded-full h-12 bg-foreground text-background hover:bg-foreground/90">
                <Shuffle className="w-4 h-4 mr-2" />
                Start Challenge
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
