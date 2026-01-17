/*"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  User,
  Settings,
  ChevronRight,
  Palette,
  DollarSign,
  Leaf,
  Heart,
  ShoppingBag,
  LogOut,
  Dna,
  Ruler,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/ui/bottom-nav"
import { useProfile, useSavedItems, useCart, updateProfile } from "@/lib/store"
import { AESTHETICS, BUDGET_LABELS } from "@/lib/data"

export default function ProfilePage() {
  const router = useRouter()
  const { profile, isLoading } = useProfile()
  const { savedItems } = useSavedItems()
  const { itemCount } = useCart()

  const handleResetOnboarding = () => {
    if (profile) {
      updateProfile({ ...profile, onboardingComplete: false })
    }
    router.push("/")
  }

  const getAestheticLabels = (ids: string[]) => {
    return ids.map((id) => AESTHETICS.find((a) => a.id === id)?.label || id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-background border-b">
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-2xl">{profile?.name || "Guest"}</h1>
              <p className="text-sm text-muted-foreground">Style Explorer</p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <Link
            href="/closet"
            className="p-4 bg-card rounded-2xl border flex flex-col items-center justify-center text-center hover:bg-muted transition-colors"
          >
            <Heart className="w-6 h-6 mb-2 text-accent" />
            <span className="font-semibold text-xl">{savedItems.length}</span>
            <span className="text-xs text-muted-foreground">Saved Items</span>
          </Link>
          <Link
            href="/cart"
            className="p-4 bg-card rounded-2xl border flex flex-col items-center justify-center text-center hover:bg-muted transition-colors"
          >
            <ShoppingBag className="w-6 h-6 mb-2" />
            <span className="font-semibold text-xl">{itemCount}</span>
            <span className="text-xs text-muted-foreground">Cart Items</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Link
            href="/style-dna"
            className="block p-4 bg-accent/5 rounded-2xl border border-accent/20 hover:bg-accent/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Dna className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Your Style DNA</h3>
                <p className="text-sm text-muted-foreground">See your evolving style traits</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-medium mb-4">Your Style Profile</h2>
          <div className="space-y-3">
            <div className="p-4 bg-card rounded-2xl border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Palette className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Aesthetics</h3>
                  <p className="text-xs text-muted-foreground">Your style preferences</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex flex-wrap gap-2">
                {profile?.aesthetic && profile.aesthetic.length > 0 ? (
                  getAestheticLabels(profile.aesthetic).map((label) => (
                    <span key={label} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                      {label}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No aesthetics selected</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-card rounded-2xl border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Ruler className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Fit Intelligence</h3>
                  <p className="text-xs text-muted-foreground">
                    {profile?.height
                      ? `${profile.height}cm • ${profile.preferredFit || "Relaxed"} fit`
                      : "Not set up yet"}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="p-4 bg-card rounded-2xl border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Budget</h3>
                  <p className="text-xs text-muted-foreground">
                    {profile?.budgetTier !== undefined ? BUDGET_LABELS[profile.budgetTier] : "Not set"}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="p-4 bg-card rounded-2xl border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Values</h3>
                  <p className="text-xs text-muted-foreground">What matters to you</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex flex-wrap gap-2">
                {profile?.values && profile.values.length > 0 && !profile.values.includes("none") ? (
                  profile.values.map((value) => (
                    <span key={value} className="px-3 py-1 bg-muted rounded-full text-xs font-medium capitalize">
                      {value === "local" ? "Local Brands" : value === "sustainable" ? "Sustainability" : "Resale"}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No preferences</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="font-medium mb-4">Settings</h2>
          <div className="space-y-2">
            <button className="w-full p-4 bg-card rounded-2xl border flex items-center gap-3 hover:bg-muted transition-colors">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-sm">App Settings</h3>
                <p className="text-xs text-muted-foreground">Notifications, privacy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              onClick={handleResetOnboarding}
              className="w-full p-4 bg-card rounded-2xl border flex items-center gap-3 hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-sm">Retake Style Quiz</h3>
                <p className="text-xs text-muted-foreground">Update your preferences</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            onClick={handleResetOnboarding}
            className="w-full rounded-full h-12 border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}
  */
