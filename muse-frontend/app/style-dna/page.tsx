/*"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/ui/bottom-nav"
import { StyleDNAScreen } from "@/components/style-dna/style-dna-screen"

export default function StyleDNAPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b">
        <div className="px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-2xl">
            Style DNA
          </motion.h1>
        </div>
      </header>

      <main>
        <StyleDNAScreen />
      </main>

      <BottomNav />
    </div>
  )
}
*/