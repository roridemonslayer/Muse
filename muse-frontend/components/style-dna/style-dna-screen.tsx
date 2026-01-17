"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useProfile } from "@/lib/store"
import { STYLE_TRAITS } from "@/lib/data"
import { Dna, TrendingUp } from "lucide-react"

export function StyleDNAScreen() {
  const { profile } = useProfile()
  const styleDNA = profile?.styleDNA

  const defaultDNA = {
    silhouette: ["oversized", "relaxed"],
    colorPalette: ["neutrals", "earth-tones"],
    layering: 65,
    texture: ["linen", "cashmere", "denim"],
    patterns: ["solid", "minimal-stripe"],
    lastUpdated: new Date().toISOString(),
  }

  const dna = styleDNA || defaultDNA

  const getTraitLabel = (category: keyof typeof STYLE_TRAITS, id: string) => {
    return STYLE_TRAITS[category]?.find((t) => t.id === id)?.label || id
  }

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-3xl border p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Dna className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="font-serif text-xl">Your Style DNA</h2>
            <p className="text-sm text-muted-foreground">Evolving based on what you love</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Silhouette */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Silhouette</h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {dna.silhouette.map((trait, idx) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium"
                  >
                    {getTraitLabel("silhouette", trait)}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Color Palette</h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {dna.colorPalette.map((trait, idx) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                  >
                    {getTraitLabel("colorPalette", trait)}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Layering Score */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground">Layering Tendency</h3>
              <span className="text-sm font-medium">{dna.layering}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dna.layering}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </div>

          {/* Textures */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Favorite Textures</h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {dna.texture.map((trait, idx) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium"
                  >
                    {getTraitLabel("texture", trait)}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Patterns */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Pattern Preference</h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {dna.patterns.map((trait, idx) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-4 py-2 border rounded-full text-sm font-medium"
                  >
                    {getTraitLabel("patterns", trait)}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Evolution Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/20"
      >
        <TrendingUp className="w-5 h-5 text-accent" />
        <p className="text-sm text-muted-foreground">Your style DNA updates as you save and purchase items</p>
      </motion.div>
    </div>
  )
}
