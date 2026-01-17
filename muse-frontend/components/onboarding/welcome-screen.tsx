"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-center"
      >
        <motion.h1
          className="font-serif text-7xl md:text-9xl tracking-tight mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Muse
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg md:text-xl mb-12 max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your personal stylist. Discover fashion that matches your aesthetic and budget.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-sm"
      >
        <Button onClick={onNext} size="lg" className="w-full rounded-full h-14 text-lg font-medium">
          Get Started
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">Takes less than 2 minutes</p>
      </motion.div>
    </motion.div>
  )
}
