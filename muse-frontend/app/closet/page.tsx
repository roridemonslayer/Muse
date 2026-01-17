"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Sparkles, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/ui/bottom-nav"
import { useSavedItems, toggleSavedItem } from "@/lib/store"
import { cn } from "@/lib/utils"

type ViewMode = "all" | "outfits"

export default function ClosetPage() {
  const { savedItems, isLoading } = useSavedItems()
  const [viewMode, setViewMode] = useState<ViewMode>("all")
  const [selectedForOutfit, setSelectedForOutfit] = useState<string[]>([])
  const [isOutfitMode, setIsOutfitMode] = useState(false)

  const toggleOutfitSelection = (id: string) => {
    setSelectedForOutfit((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const selectedItems = savedItems.filter((item) => selectedForOutfit.includes(item.id))

  const categories = [
    { id: "all", label: "All Saved" },
    { id: "tops", label: "Tops" },
    { id: "bottoms", label: "Bottoms" },
    { id: "dresses", label: "Dresses" },
    { id: "outerwear", label: "Outerwear" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" },
  ]

  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all" ? savedItems : savedItems.filter((item) => item.category === activeCategory)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.h1 className="font-serif text-2xl" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              My Closet
            </motion.h1>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setIsOutfitMode(!isOutfitMode)
                setSelectedForOutfit([])
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isOutfitMode ? "bg-foreground text-background" : "bg-muted text-foreground",
              )}
            >
              {isOutfitMode ? "Done" : "Build Outfit"}
            </motion.button>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === category.id ? "bg-foreground text-background" : "bg-card border hover:bg-muted",
                )}
              >
                {category.label}
                {category.id !== "all" &&
                  savedItems.filter((i) => i.category === category.id).length > 0 &&
                  ` (${savedItems.filter((i) => i.category === category.id).length})`}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {savedItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl mb-2">Your closet is empty</h2>
            <p className="text-muted-foreground mb-8">Save items to build your dream wardrobe</p>
            <Link href="/feed">
              <Button size="lg" className="rounded-full h-12 px-8">
                Discover Styles
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {isOutfitMode && selectedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-card rounded-2xl border"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="font-medium">Your Outfit</h3>
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="relative flex-shrink-0">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => toggleOutfitSelection(item.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-foreground rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-background rotate-45" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Total: ${selectedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
              </motion.div>
            )}

            <motion.div className="grid grid-cols-3 gap-3" layout>
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.03 }}
                    className="relative"
                  >
                    {isOutfitMode ? (
                      <button onClick={() => toggleOutfitSelection(item.id)} className="w-full text-left">
                        <div
                          className={cn(
                            "aspect-[3/4] rounded-xl overflow-hidden bg-muted relative transition-all",
                            selectedForOutfit.includes(item.id) && "ring-2 ring-foreground",
                          )}
                        >
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          {selectedForOutfit.includes(item.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-background" />
                            </motion.div>
                          )}
                        </div>
                      </button>
                    ) : (
                      <Link href={`/item/${item.id}`}>
                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted relative group">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              toggleSavedItem(item)
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="w-4 h-4 fill-accent text-accent" />
                          </button>
                        </div>
                      </Link>
                    )}
                    <p className="text-xs font-medium mt-2 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">${item.price}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
