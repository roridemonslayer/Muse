"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/feed/product-card"
import { BottomNav } from "@/components/ui/bottom-nav"
import { SAMPLE_ITEMS, AESTHETICS } from "@/lib/data"

export function ExploreContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]

  const filteredItems = SAMPLE_ITEMS.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aesthetic.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      !selectedCategory || selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b px-4 py-4">
        <motion.h1 className="font-serif text-2xl mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Explore
        </motion.h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search styles, brands, aesthetics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-muted border-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-4 -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category || (category === "All" && !selectedCategory)
                  ? "bg-foreground text-background"
                  : "bg-card border hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4">
        <div className="mb-6">
          <h2 className="font-medium mb-3">Trending Aesthetics</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {AESTHETICS.slice(0, 5).map((aesthetic) => (
              <button
                key={aesthetic.id}
                onClick={() => setSearchQuery(aesthetic.label)}
                className="flex-shrink-0 w-24 text-center"
              >
                <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center text-4xl mb-2">
                  {aesthetic.emoji}
                </div>
                <span className="text-xs font-medium">{aesthetic.label}</span>
              </button>
            ))}
          </div>
        </div>

        <h2 className="font-medium mb-4">{searchQuery ? `Results for "${searchQuery}"` : "All Items"}</h2>

        <motion.div className="columns-2 gap-4" layout>
          {filteredItems.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
