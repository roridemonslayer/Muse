"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { RefreshCw, DollarSign } from "lucide-react"
import { SAMPLE_ITEMS, BUDGET_LABELS } from "@/lib/data"
import type { ClothingItem } from "@/lib/store"
import { cn } from "@/lib/utils"

interface OutfitReplayProps {
  items: ClothingItem[]
}

export function OutfitReplay({ items }: OutfitReplayProps) {
  const [budgetTier, setBudgetTier] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)

  const getAlternativeItems = (tier: number) => {
    return items.map((item) => {
      const tierKey = ["thrift", "affordable", "midRange", "highFashion"][tier] as
        | "thrift"
        | "affordable"
        | "midRange"
        | "highFashion"
      const altId = item.budgetAlternatives?.[tierKey]
      if (altId) {
        return SAMPLE_ITEMS.find((i) => i.id === altId) || item
      }
      return item
    })
  }

  const currentItems = getAlternativeItems(budgetTier)
  const totalPrice = currentItems.reduce((sum, item) => sum + item.price, 0)

  const handleBudgetChange = (newTier: number) => {
    if (newTier === budgetTier) return
    setIsAnimating(true)
    setTimeout(() => {
      setBudgetTier(newTier)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-2xl border"
    >
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="w-5 h-5 text-accent" />
        <h3 className="font-medium">Outfit Replay</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">See this outfit at different price points</p>

      {/* Budget Tier Selector */}
      <div className="flex gap-2 mb-4">
        {BUDGET_LABELS.map((label, idx) => (
          <button
            key={label}
            onClick={() => handleBudgetChange(idx)}
            className={cn(
              "flex-1 py-2 px-2 rounded-full text-xs font-medium transition-all",
              budgetTier === idx ? "bg-foreground text-background scale-105" : "bg-muted hover:bg-muted/80",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items Display */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <AnimatePresence mode="wait">
          {currentItems.map((item, idx) => (
            <motion.div
              key={`${item.id}-${budgetTier}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isAnimating ? 0.5 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              className="aspect-square rounded-xl overflow-hidden bg-muted relative"
            >
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              <div className="absolute bottom-1 right-1 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded-full">
                <span className="text-xs font-medium">${item.price}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Total Price */}
      <motion.div
        key={totalPrice}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 bg-muted rounded-xl"
      >
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Total</span>
        </div>
        <span className="font-serif text-xl">${totalPrice}</span>
      </motion.div>
    </motion.div>
  )
}
