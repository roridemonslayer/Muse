"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { ClothingItem } from "@/lib/store"
import { useSavedItems, toggleSavedItem } from "@/lib/store"
import { AESTHETICS } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  item: ClothingItem
  index: number
}

export function ProductCard({ item, index }: ProductCardProps) {
  const { savedItems } = useSavedItems()
  const isSaved = savedItems.some((i) => i.id === item.id)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSavedItem(item)
  }

  const getAestheticLabel = (id: string) => {
    return AESTHETICS.find((a) => a.id === id)?.label || id
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="break-inside-avoid mb-4"
    >
      <Link href={`/item/${item.id}`}>
        <div className="group relative bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button
              onClick={handleSaveClick}
              className="absolute top-3 right-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-background"
            >
              <Heart
                className={cn("w-5 h-5 transition-colors", isSaved ? "fill-accent text-accent" : "text-foreground")}
              />
            </button>

            {(item.isLocal || item.isSustainable || item.isResale) && (
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {item.isLocal && (
                  <span className="px-2 py-1 bg-foreground/90 text-background text-[10px] font-medium rounded-full">
                    Local Pick
                  </span>
                )}
                {item.isSustainable && (
                  <span className="px-2 py-1 bg-accent/90 text-accent-foreground text-[10px] font-medium rounded-full">
                    Sustainable
                  </span>
                )}
                {item.isResale && (
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] font-medium rounded-full">
                    Resale
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {item.aesthetic.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {getAestheticLabel(tag)}
                </span>
              ))}
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{item.brand}</p>
            <p className="font-semibold">${item.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
