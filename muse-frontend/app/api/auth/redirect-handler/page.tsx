"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RedirectHandler() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    // Check if new user or existing
    // Since we can't reliably track this, let's just check the waitlist again
    const checkStatus = async () => {
      if (!session.user?.email) {
        router.push("/login")
        return
      }

      try {
        const response = await fetch(`/api/waitlist?email=${encodeURIComponent(session.user.email)}`)
        const data = await response.json()
        
        // For simplicity with Google OAuth, always go to already-registered
        // since we add them in the signIn callback
        router.push("/already-registered")
      } catch (error) {
        console.error("Error checking status:", error)
        router.push("/already-registered")
      }
    }

    checkStatus()
  }, [session, status, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  )
}