"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/ui/bottom-nav"
import { useCart, updateCartQuantity, removeFromCart, clearCart } from "@/lib/store"

export default function CartPage() {
  const { cart, subtotal, itemCount, isLoading } = useCart()

  const estimatedTax = subtotal * 0.08
  const estimatedTotal = subtotal + estimatedTax

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-48">
      <header className="sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.h1 className="font-serif text-2xl" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            Cart
          </motion.h1>
          {cart.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => clearCart()}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear All
            </motion.button>
          )}
        </div>
      </header>

      <main className="px-4 py-4">
        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Discover pieces that match your style</p>
            <Link href="/feed">
              <Button size="lg" className="rounded-full h-12 px-8">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 p-4 bg-card rounded-2xl border"
                >
                  <Link href={`/item/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <Link href={`/item/${item.id}`}>
                        <h3 className="font-medium text-sm line-clamp-1 hover:underline">{item.name}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                      <p className="font-semibold mt-1">${item.price}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-16 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t"
        >
          <div className="max-w-lg mx-auto">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Estimated Total</span>
                <span>${estimatedTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full rounded-full h-14">
              Checkout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  )
}
