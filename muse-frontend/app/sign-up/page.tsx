"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowRight, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!name || !email || !password) return
    
    setIsLoading(true)
    // Simulate sign up
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/coming-soon")
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: "#f5f3ef" }}>
      {/* Left side - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{ backgroundColor: "#3d3830" }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#c4a77d" }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "#f5f3ef" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-16 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#f5f3ef]/20"
            style={{ backgroundColor: "rgba(245, 243, 239, 0.1)" }}
          >
            <span className="font-serif text-4xl" style={{ color: "#f5f3ef" }}>
              M
            </span>
          </div>
          <h1 className="font-serif text-5xl mb-6" style={{ color: "#f5f3ef" }}>
            Join Muse
          </h1>
          <p className="text-lg leading-relaxed max-w-md mx-auto" style={{ color: "rgba(245, 243, 239, 0.7)" }}>
            Start your personalized style journey. We'll notify you when we launch.
          </p>

          {/* Fashion quote */}
          <div className="mt-16 pt-16 border-t border-[#f5f3ef]/10">
            <blockquote className="font-serif text-xl italic" style={{ color: "rgba(245, 243, 239, 0.6)" }}>
              &ldquo;Fashion is the armor to survive the reality of everyday life.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm" style={{ color: "rgba(245, 243, 239, 0.4)" }}>
              — Bill Cunningham
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        {/* Mobile header */}
        <div className="lg:hidden mb-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#3d3830" }}
            >
              <span className="font-serif text-lg" style={{ color: "#f5f3ef" }}>
                M
              </span>
            </div>
            <span className="font-serif text-xl" style={{ color: "#3d3830" }}>
              Muse
            </span>
          </Link>
        </div>

        <div className="max-w-md mx-auto w-full">
          {/* Desktop back link */}
          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-2 text-sm mb-12 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "#3d3830" }}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to home
          </Link>

          <div className="mb-10">
            <h2 className="font-serif text-3xl lg:text-4xl mb-3" style={{ color: "#3d3830" }}>
              Create your account
            </h2>
            <p style={{ color: "rgba(61, 56, 48, 0.6)" }}>Join our waitlist to get early access</p>
          </div>

          <div className="space-y-6">
            {/* Name field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium" style={{ color: "#3d3830" }}>
                Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "name" ? "opacity-100" : "opacity-40"
                  }`}
                  style={{ color: "#3d3830" }}
                />
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 h-14 rounded-xl border border-[#3d3830]/10 bg-transparent focus:border-[#3d3830]/30 focus:ring-0 transition-all duration-300 placeholder:text-[#3d3830]/30 outline-none"
                  style={{ color: "#3d3830" }}
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium" style={{ color: "#3d3830" }}>
                Email
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "email" ? "opacity-100" : "opacity-40"
                  }`}
                  style={{ color: "#3d3830" }}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 h-14 rounded-xl border border-[#3d3830]/10 bg-transparent focus:border-[#3d3830]/30 focus:ring-0 transition-all duration-300 placeholder:text-[#3d3830]/30 outline-none"
                  style={{ color: "#3d3830" }}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium" style={{ color: "#3d3830" }}>
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === "password" ? "opacity-100" : "opacity-40"
                  }`}
                  style={{ color: "#3d3830" }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && name && email && password) {
                      handleSubmit(e as any)
                    }
                  }}
                  className="w-full pl-12 pr-12 h-14 rounded-xl border border-[#3d3830]/10 bg-transparent focus:border-[#3d3830]/30 focus:ring-0 transition-all duration-300 placeholder:text-[#3d3830]/30 outline-none"
                  style={{ color: "#3d3830" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                  style={{ color: "#3d3830" }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !name || !email || !password}
              className="w-full h-14 rounded-xl text-base font-medium relative overflow-hidden group transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#3d3830", color: "#f5f3ef" }}
            >
              <span
                className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: "#f5f3ef", borderTopColor: "transparent" }}
                  />
                </div>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t" style={{ borderColor: "rgba(61, 56, 48, 0.1)" }} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{ backgroundColor: "#f5f3ef", color: "rgba(61, 56, 48, 0.5)" }}>
                or continue with
              </span>
            </div>
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="h-14 rounded-xl border border-[#3d3830]/10 bg-transparent hover:bg-[#3d3830]/5 transition-all duration-300 flex items-center justify-center"
              style={{ color: "#3d3830" }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="h-14 rounded-xl border border-[#3d3830]/10 bg-transparent hover:bg-[#3d3830]/5 transition-all duration-300 flex items-center justify-center"
              style={{ color: "#3d3830" }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Sign in link */}
          <p className="text-center mt-10 text-sm" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline transition-all" style={{ color: "#3d3830" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}