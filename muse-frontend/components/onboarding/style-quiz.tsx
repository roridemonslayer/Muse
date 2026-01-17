"use client"

import { useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, X } from "lucide-react"
import { OUTFIT_CARDS, AESTHETICS } from "@/lib/data"
import Image from "next/image"

interface StyleQuizProps {
  onNext: (likedStyles: string[]) => void
  onBack: () => void
}

export function StyleQuiz({ onNext, onBack }: StyleQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedStyles, setLikedStyles] = useState<string[]>([])
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  const currentCard = OUTFIT_CARDS[currentIndex]
  const isComplete = currentIndex >= OUTFIT_CARDS.length

  const handleSwipe = (liked: boolean) => {
    setDirection(liked ? "right" : "left")

    if (liked && currentCard) {
      setLikedStyles((prev) => [...prev, currentCard.aesthetic])
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setDirection(null)
    }, 200)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100
    if (Math.abs(info.offset.x) > threshold) {
      handleSwipe(info.offset.x > 0)
    }
  }

  const getAestheticLabel = (id: string) => {
    return AESTHETICS.find((a) => a.id === id)?.label || id
  }

  if (isComplete) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Great choices!</h2>
          <p className="text-muted-foreground mb-8">{"We're learning your style..."}</p>
          <Button onClick={() => onNext(likedStyles)} size="lg" className="rounded-full h-14 px-12 text-lg font-medium">
            Continue
          </Button>
        </motion.div>
      </motion.div>
    )
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
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="text-center mb-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Swipe on style</h2>
        <p className="text-muted-foreground">Right if you love it, left to skip</p>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-full max-w-sm aspect-[4/5]">
          <AnimatePresence>
            {currentCard && (
              <motion.div
                key={currentCard.id}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{
                  x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                  opacity: direction ? 0 : 1,
                  rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden bg-card shadow-xl relative">
                  <Image
                    src={currentCard.image || "/placeholder.svg"}
                    alt={`Style ${currentCard.aesthetic}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                    <span className="inline-block px-4 py-2 bg-background/90 rounded-full text-sm font-medium">
                      {getAestheticLabel(currentCard.aesthetic)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-6">
        <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 rounded-full bg-card border-2 border-destructive/30 flex items-center justify-center hover:bg-destructive/10 transition-colors"
        >
          <X className="w-7 h-7 text-destructive" />
        </button>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} / {OUTFIT_CARDS.length}
        </div>
        <button
          onClick={() => handleSwipe(true)}
          className="w-16 h-16 rounded-full bg-card border-2 border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-colors"
        >
          <Heart className="w-7 h-7 text-accent" />
        </button>
      </div>
    </motion.div>
  )
}
