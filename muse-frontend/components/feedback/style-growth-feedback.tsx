"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"
import { STYLE_MESSAGES } from "@/lib/data"

interface StyleGrowthFeedbackProps {
  show?: boolean
  onDismiss?: () => void
}

export function StyleGrowthFeedback({ show = true, onDismiss }: StyleGrowthFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (show) {
      const randomMessage = STYLE_MESSAGES[Math.floor(Math.random() * STYLE_MESSAGES.length)]
      setMessage(randomMessage)
      setIsVisible(true)

      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [show, onDismiss])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-4 right-4 z-50"
        >
          <div className="bg-foreground text-background p-4 rounded-2xl shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
