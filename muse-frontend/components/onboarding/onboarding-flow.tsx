"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { WelcomeScreen } from "./welcome-screen"
import { NameInput } from "./name-input"
import { StyleQuiz } from "./style-quiz"
import { AestheticSelection } from "./aesthetic-selection"
import { BudgetSelection } from "./budget-selection"
import { ValuesSelection } from "./values-selection"
import { updateProfile, type UserProfile } from "@/lib/store"
import { useRouter } from "next/navigation"

type OnboardingStep = "welcome" | "name" | "quiz" | "aesthetic" | "budget" | "values"

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [profile, setProfile] = useState<Partial<UserProfile>>({})

  const handleComplete = (values: string[]) => {
    const finalProfile: UserProfile = {
      name: profile.name || "",
      aesthetic: profile.aesthetic || [],
      budgetTier: profile.budgetTier ?? 1,
      values,
      onboardingComplete: true,
    }
    updateProfile(finalProfile)
    router.push("/feed")
  }

  return (
    <AnimatePresence mode="wait">
      {step === "welcome" && <WelcomeScreen key="welcome" onNext={() => setStep("name")} />}

      {step === "name" && (
        <NameInput
          key="name"
          initialName={profile.name}
          onNext={(name) => {
            setProfile((p) => ({ ...p, name }))
            setStep("quiz")
          }}
          onBack={() => setStep("welcome")}
        />
      )}

      {step === "quiz" && (
        <StyleQuiz
          key="quiz"
          onNext={(likedStyles) => {
            const uniqueStyles = [...new Set(likedStyles)]
            setProfile((p) => ({ ...p, aesthetic: uniqueStyles }))
            setStep("aesthetic")
          }}
          onBack={() => setStep("name")}
        />
      )}

      {step === "aesthetic" && (
        <AestheticSelection
          key="aesthetic"
          recommended={profile.aesthetic}
          onNext={(aesthetics) => {
            setProfile((p) => ({ ...p, aesthetic: aesthetics }))
            setStep("budget")
          }}
          onBack={() => setStep("quiz")}
        />
      )}

      {step === "budget" && (
        <BudgetSelection
          key="budget"
          onNext={(budgetTier) => {
            setProfile((p) => ({ ...p, budgetTier }))
            setStep("values")
          }}
          onBack={() => setStep("aesthetic")}
        />
      )}

      {step === "values" && (
        <ValuesSelection key="values" onComplete={handleComplete} onBack={() => setStep("budget")} />
      )}
    </AnimatePresence>
  )
}
