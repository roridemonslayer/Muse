"use client"

import { useProfile } from "@/lib/store"
import { ProductFeed } from "@/components/feed/product-feed"
import { BottomNav } from "@/components/ui/bottom-nav"
import { motion } from "framer-motion"
import { WeeklyChallengeCard } from "@/components/challenge/weekly-challenge-card"

export default function FeedPage() {
  const { profile } = useProfile()

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-3xl">Muse</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-right"
          >
            {profile?.name && <p className="text-sm text-muted-foreground">Hey, {profile.name}</p>}
          </motion.div>
        </div>
      </header>

      <main className="px-4 pt-4">
        <div className="mb-6">
          <WeeklyChallengeCard />
        </div>

        <ProductFeed />
      </main>

      <BottomNav />
    </div>
  )
}
