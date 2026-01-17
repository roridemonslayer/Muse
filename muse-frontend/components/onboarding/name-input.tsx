"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface NameInputProps {
  onNext: (name: string) => void
  onBack: () => void
  initialName?: string
}

export function NameInput({ onNext, onBack, initialName = "" }: NameInputProps) {
  const [name, setName] = useState(initialName)

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="font-serif text-4xl md:text-5xl mb-3">{"What's your name?"}</h2>
          <p className="text-muted-foreground mb-8">{"Let's make this personal."}</p>

          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 text-lg rounded-xl border-2 focus:border-foreground bg-transparent"
            autoFocus
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button
            onClick={() => onNext(name)}
            size="lg"
            disabled={!name.trim()}
            className="w-full rounded-full h-14 text-lg font-medium"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
