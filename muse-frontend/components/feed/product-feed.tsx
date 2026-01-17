"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { SAMPLE_ITEMS, AESTHETICS } from "@/lib/data"
import { cn } from "@/lib/utils"

export function ProductFeed() {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredItems = filter ? SAMPLE_ITEMS.filter((item) => item.aesthetic.includes(filter)) : SAMPLE_ITEMS

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur-xl z-40 pb-4 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              filter === null ? "bg-foreground text-background" : "bg-card border hover:bg-muted",
            )}
          >
            For You
          </button>
          {AESTHETICS.map((aesthetic) => (
            <button
              key={aesthetic.id}
              onClick={() => setFilter(aesthetic.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                filter === aesthetic.id ? "bg-foreground text-background" : "bg-card border hover:bg-muted",
              )}
            >
              {aesthetic.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div className="columns-2 gap-4" layout>
        {filteredItems.map((item, index) => (
          <ProductCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found for this aesthetic</p>
        </div>
      )}
    </div>
  )
}
