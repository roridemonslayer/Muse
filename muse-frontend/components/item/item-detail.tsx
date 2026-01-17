"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ClothingItem } from "@/lib/store"
import { toggleSavedItem, useSavedItems, addToCart, trackStyleInteraction } from "@/lib/store"
import { SAMPLE_ITEMS, AESTHETICS } from "@/lib/data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { RecommendationCard } from "./recommendation-card"
import { FitIntelligence } from "./fit-intelligence"
import { OutfitReplay } from "@/components/outfit/outfit-replay"
import { StyleGrowthFeedback } from "@/components/feedback/style-growth-feedback"

interface ItemDetailProps {
  item: ClothingItem
}

export function ItemDetail({ item }: ItemDetailProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [showStyleFeedback, setShowStyleFeedback] = useState(false)
  const { savedItems } = useSavedItems()
  const isSaved = savedItems.some((i) => i.id === item.id)

  const images = [item.image]

  const pairsWellItems = item.pairsWellWith
    ?.map((id) => SAMPLE_ITEMS.find((i) => i.id === id))
    .filter(Boolean) as ClothingItem[]

  const handleAddToCart = () => {
    addToCart(item)
    trackStyleInteraction({ type: "purchase", itemId: item.id, aesthetic: item.aesthetic })
    setShowAddedToCart(true)
    setShowStyleFeedback(true)
    setTimeout(() => setShowAddedToCart(false), 2000)
  }

  const handleToggleSave = () => {
    const wasAlreadySaved = isSaved
    toggleSavedItem(item)
    if (!wasAlreadySaved) {
      trackStyleInteraction({ type: "save", itemId: item.id, aesthetic: item.aesthetic })
      setShowStyleFeedback(true)
    }
  }

  const getAestheticLabel = (id: string) => {
    return AESTHETICS.find((a) => a.id === id)?.label || id
  }

  return (
    <div className="min-h-screen pb-32">
      <StyleGrowthFeedback show={showStyleFeedback} onDismiss={() => setShowStyleFeedback(false)} />

      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleToggleSave}
          className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <Heart className={cn("w-5 h-5", isSaved ? "fill-accent text-accent" : "")} />
        </button>
      </header>

      <div className="relative aspect-[3/4] bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    idx === currentImageIndex ? "bg-foreground" : "bg-foreground/30",
                  )}
                />
              ))}
            </div>
          </>
        )}

        {(item.isLocal || item.isSustainable || item.isResale) && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {item.isLocal && (
              <span className="px-3 py-1.5 bg-foreground/90 text-background text-xs font-medium rounded-full">
                Local Pick
              </span>
            )}
            {item.isSustainable && (
              <span className="px-3 py-1.5 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full">
                Sustainable
              </span>
            )}
            {item.isResale && (
              <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                Resale
              </span>
            )}
          </div>
        )}
      </div>

      <div className="px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {item.aesthetic.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {getAestheticLabel(tag)}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="font-serif text-2xl mb-1">{item.name}</h1>
            <p className="text-muted-foreground">{item.brand}</p>
          </div>
          <p className="font-serif text-2xl">${item.price}</p>
        </div>

        {item.description && <p className="text-muted-foreground mt-4 leading-relaxed">{item.description}</p>}

        <div className="mt-6">
          <RecommendationCard item={item} />
        </div>

        <div className="mt-4">
          <FitIntelligence item={item} />
        </div>

        {item.stylingTips && item.stylingTips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 p-4 bg-card rounded-2xl border"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="font-medium">Why This Works</h3>
            </div>
            <ul className="space-y-2">
              {item.stylingTips.map((tip, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
            <button className="mt-4 flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <Shuffle className="w-4 h-4" />
              Style This Differently
            </button>
          </motion.div>
        )}

        {pairsWellItems && pairsWellItems.length > 0 && (
          <div className="mt-4">
            <OutfitReplay items={[item, ...pairsWellItems.slice(0, 2)]} />
          </div>
        )}

        {pairsWellItems && pairsWellItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <h3 className="font-medium mb-4">Pairs Well With</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {pairsWellItems.map((pairItem) => (
                <Link key={pairItem.id} href={`/item/${pairItem.id}`} className="flex-shrink-0 w-32">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-2 relative">
                    <Image
                      src={pairItem.image || "/placeholder.svg"}
                      alt={pairItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium line-clamp-1">{pairItem.name}</p>
                  <p className="text-xs text-muted-foreground">${pairItem.price}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 rounded-full h-14 bg-transparent"
            onClick={handleToggleSave}
          >
            <Heart className={cn("w-5 h-5 mr-2", isSaved ? "fill-accent text-accent" : "")} />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button size="lg" className="flex-1 rounded-full h-14 relative overflow-hidden" onClick={handleAddToCart}>
            <AnimatePresence mode="wait">
              {showAddedToCart ? (
                <motion.span
                  key="added"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center"
                >
                  Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  )
}
