"use client"
import useSWR, { mutate } from "swr"

export interface UserProfile {
  name: string
  aesthetic: string[]
  budgetTier: number
  values: string[]
  onboardingComplete: boolean
  height?: number
  preferredFit?: "oversized" | "relaxed" | "fitted"
  styleDNA?: StyleDNA
  styleInteractions?: StyleInteraction[]
}

export interface StyleDNA {
  silhouette: string[]
  colorPalette: string[]
  layering: number // 0-100 scale
  texture: string[]
  patterns: string[]
  lastUpdated: string
}

export interface StyleInteraction {
  type: "save" | "purchase" | "view" | "skip"
  itemId: string
  timestamp: string
  aesthetic: string[]
}

export interface ClothingItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  aesthetic: string[]
  category: string
  isLocal?: boolean
  isSustainable?: boolean
  isResale?: boolean
  description?: string
  stylingTips?: string[]
  pairsWellWith?: string[]
  recommendationReasons?: string[]
  notRecommendedReasons?: string[]
  fitInfo?: {
    oversized: string
    relaxed: string
    fitted: string
  }
  sizeGuide?: {
    [height: string]: string
  }
  budgetAlternatives?: {
    thrift: string | null
    affordable: string | null
    midRange: string | null
    highFashion: string | null
  }
}

const STORAGE_KEYS = {
  profile: "muse-profile",
  savedItems: "muse-saved",
  cart: "muse-cart",
}

function getStorageData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : defaultValue
}

function setStorageData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

// Profile hooks
export function useProfile() {
  const { data, isLoading } = useSWR<UserProfile | null>(STORAGE_KEYS.profile, () =>
    getStorageData<UserProfile | null>(STORAGE_KEYS.profile, null),
  )
  return { profile: data, isLoading }
}

export function updateProfile(profile: UserProfile) {
  setStorageData(STORAGE_KEYS.profile, profile)
  mutate(STORAGE_KEYS.profile, profile)
}

// Saved items hooks
export function useSavedItems() {
  const { data, isLoading } = useSWR<ClothingItem[]>(STORAGE_KEYS.savedItems, () =>
    getStorageData<ClothingItem[]>(STORAGE_KEYS.savedItems, []),
  )
  return { savedItems: data || [], isLoading }
}

export function toggleSavedItem(item: ClothingItem) {
  const current = getStorageData<ClothingItem[]>(STORAGE_KEYS.savedItems, [])
  const exists = current.find((i) => i.id === item.id)
  const updated = exists ? current.filter((i) => i.id !== item.id) : [...current, item]
  setStorageData(STORAGE_KEYS.savedItems, updated)
  mutate(STORAGE_KEYS.savedItems, updated)
}

export function isItemSaved(itemId: string): boolean {
  const items = getStorageData<ClothingItem[]>(STORAGE_KEYS.savedItems, [])
  return items.some((i) => i.id === itemId)
}

// Cart hooks
export function useCart() {
  const { data, isLoading } = useSWR<CartItem[]>(STORAGE_KEYS.cart, () =>
    getStorageData<CartItem[]>(STORAGE_KEYS.cart, []),
  )

  const subtotal = (data || []).reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = (data || []).reduce((sum, item) => sum + item.quantity, 0)

  return { cart: data || [], isLoading, subtotal, itemCount }
}

export function addToCart(item: ClothingItem) {
  const current = getStorageData<CartItem[]>(STORAGE_KEYS.cart, [])
  const existingIndex = current.findIndex((i) => i.id === item.id)

  let updated: CartItem[]
  if (existingIndex >= 0) {
    updated = current.map((i, idx) => (idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i))
  } else {
    updated = [...current, { ...item, quantity: 1 }]
  }

  setStorageData(STORAGE_KEYS.cart, updated)
  mutate(STORAGE_KEYS.cart, updated)
}

export function removeFromCart(itemId: string) {
  const current = getStorageData<CartItem[]>(STORAGE_KEYS.cart, [])
  const updated = current.filter((i) => i.id !== itemId)
  setStorageData(STORAGE_KEYS.cart, updated)
  mutate(STORAGE_KEYS.cart, updated)
}

export function updateCartQuantity(itemId: string, quantity: number) {
  const current = getStorageData<CartItem[]>(STORAGE_KEYS.cart, [])
  const updated =
    quantity <= 0
      ? current.filter((i) => i.id !== itemId)
      : current.map((i) => (i.id === itemId ? { ...i, quantity } : i))
  setStorageData(STORAGE_KEYS.cart, updated)
  mutate(STORAGE_KEYS.cart, updated)
}

export function clearCart() {
  setStorageData(STORAGE_KEYS.cart, [])
  mutate(STORAGE_KEYS.cart, [])
}

export function trackStyleInteraction(interaction: Omit<StyleInteraction, "timestamp">) {
  const profile = getStorageData<UserProfile | null>(STORAGE_KEYS.profile, null)
  if (!profile) return

  const newInteraction: StyleInteraction = {
    ...interaction,
    timestamp: new Date().toISOString(),
  }

  const updatedProfile = {
    ...profile,
    styleInteractions: [...(profile.styleInteractions || []), newInteraction].slice(-100), // Keep last 100
  }

  // Update Style DNA based on interactions
  if (interaction.type === "save" || interaction.type === "purchase") {
    updatedProfile.styleDNA = calculateStyleDNA(updatedProfile.styleInteractions || [])
  }

  setStorageData(STORAGE_KEYS.profile, updatedProfile)
  mutate(STORAGE_KEYS.profile, updatedProfile)
}

function calculateStyleDNA(interactions: StyleInteraction[]): StyleDNA {
  const positiveInteractions = interactions.filter((i) => i.type === "save" || i.type === "purchase")
  const aestheticCounts: Record<string, number> = {}

  positiveInteractions.forEach((i) => {
    i.aesthetic.forEach((a) => {
      aestheticCounts[a] = (aestheticCounts[a] || 0) + 1
    })
  })

  return {
    silhouette: ["oversized", "relaxed"],
    colorPalette: ["neutrals", "earth-tones", "muted"],
    layering: Math.min(100, positiveInteractions.length * 10),
    texture: ["linen", "cashmere", "denim"],
    patterns: ["solid", "minimal-stripe"],
    lastUpdated: new Date().toISOString(),
  }
}

export function updateFitPreferences(height: number, preferredFit: "oversized" | "relaxed" | "fitted") {
  const profile = getStorageData<UserProfile | null>(STORAGE_KEYS.profile, null)
  if (!profile) return

  const updatedProfile = {
    ...profile,
    height,
    preferredFit,
  }

  setStorageData(STORAGE_KEYS.profile, updatedProfile)
  mutate(STORAGE_KEYS.profile, updatedProfile)
}

interface CartItem extends ClothingItem {
  quantity: number
}
