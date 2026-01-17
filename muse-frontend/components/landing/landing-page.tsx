"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Sparkles, Heart, Zap, Target, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    console.log("[v0] TypewriterText mounted, starting animation for:", text)
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [text])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span>
      {displayText}
      <span
        className={`inline-block w-[3px] h-[0.9em] ml-1 align-middle transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundColor: "#3d3830" }}
      />
    </span>
  )
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number
          const duration = 2000
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log("[v0] LandingPage mounted")
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Sparkles,
      title: "Style DNA",
      description:
        "Discover your unique style profile through our intelligent quiz. We map your preferences across silhouettes, colors, textures, and aesthetics.",
    },
    {
      icon: Target,
      title: "Curated For You",
      description:
        "Every piece in your feed is handpicked based on your Style DNA. No more endless scrolling through items that aren't you.",
    },
    {
      icon: Heart,
      title: "Build Your Closet",
      description:
        "Save pieces you love, create outfits, and watch your digital wardrobe come to life. Your personal stylist, always in your pocket.",
    },
    {
      icon: Zap,
      title: "Smart Fit",
      description:
        "Our Fit Intelligence learns your preferences and body type to recommend the perfect size, every time.",
    },
  ]

  const stats = [
    { value: 50000, suffix: "+", label: "Curated Pieces" },
    { value: 98, suffix: "%", label: "Style Match Rate" },
    { value: 200, suffix: "+", label: "Brands" },
  ]

  const steps = [
    {
      step: "01",
      title: "Take the Quiz",
      description: "Answer a few questions about your style preferences, lifestyle, and fashion goals.",
    },
    {
      step: "02",
      title: "Get Your Style DNA",
      description: "Receive your personalized style profile with insights into your unique fashion identity.",
    },
    {
      step: "03",
      title: "Discover & Shop",
      description: "Browse a curated feed of pieces that match your style, budget, and values.",
    },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#f5f3ef", color: "#3d3830" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div
          className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md rounded-full px-6 py-3 border"
          style={{ backgroundColor: "rgba(245, 243, 239, 0.8)", borderColor: "rgba(61, 56, 48, 0.1)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#3d3830" }}
            >
              <span className="font-serif text-sm" style={{ color: "#f5f3ef" }}>
                M
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-it-works" className="opacity-60 hover:opacity-100 transition-opacity">
              How it works
            </a>
            <a href="#features" className="opacity-60 hover:opacity-100 transition-opacity">
              Features
            </a>
            <a href="#about" className="opacity-60 hover:opacity-100 transition-opacity">
              About
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "#3d3830" }}
            >
              Log in
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full transition-all duration-300 border-[#3d3830]/20 hover:bg-[#3d3830] hover:text-[#f5f3ef] bg-transparent"
                style={{ color: "#3d3830" }}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(61, 56, 48, 0.03)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(196, 167, 125, 0.2)" }}
          />
        </div>

        <div className="relative text-center max-w-4xl mx-auto">
          <div
            className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: "rgba(61, 56, 48, 0.05)", color: "rgba(61, 56, 48, 0.7)" }}
            >
              <Sparkles className="w-4 h-4" />
              Your personal style, decoded
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8" style={{ color: "#3d3830" }}>
            <TypewriterText text="Muse" />
          </h1>

          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ color: "rgba(61, 56, 48, 0.6)" }}
          >
            The fashion discovery app that learns your style, curates your perfect wardrobe, and helps you dress with
            intention.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Link href="/login">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-base group hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#3d3830", color: "#f5f3ef" }}
              >
                Sign Up Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6" style={{ color: "rgba(61, 56, 48, 0.4)" }} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-y" style={{ borderColor: "rgba(61, 56, 48, 0.1)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-5xl md:text-6xl mb-2" style={{ color: "#3d3830" }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: "rgba(61, 56, 48, 0.6)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: "#3d3830" }}>
              How Muse Works
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
              Three simple steps to unlock your personal style journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-7xl font-serif mb-4" style={{ color: "rgba(61, 56, 48, 0.05)" }}>
                  {item.step}
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: "#3d3830" }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6" style={{ backgroundColor: "rgba(61, 56, 48, 0.02)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: "#3d3830" }}>
              Designed for You
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
              Powerful features that make finding your style effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl"
                style={{ backgroundColor: "#faf9f7", borderColor: "rgba(61, 56, 48, 0.1)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ backgroundColor: "rgba(61, 56, 48, 0.05)" }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: "rgba(61, 56, 48, 0.7)" }} />
                </div>
                <h3 className="font-serif text-xl mb-3" style={{ color: "#3d3830" }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-8"
            style={{ color: "#3d3830" }}
          >
            &ldquo;We believe everyone deserves to feel confident in what they wear. Muse is here to make personal style
            accessible, sustainable, and joyful.&rdquo;
          </blockquote>
          <div style={{ color: "rgba(61, 56, 48, 0.6)" }}>The Muse Team</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: "#3d3830" }}>
            Ready to find your style?
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
            Join thousands of fashion lovers who have discovered their unique style with Muse.
          </p>
          <Link href="/onboarding">
            <Button
              size="lg"
              className="rounded-full px-10 h-14 text-base group hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#3d3830", color: "#f5f3ef" }}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "rgba(61, 56, 48, 0.1)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#3d3830" }}
            >
              <span className="font-serif text-sm" style={{ color: "#f5f3ef" }}>
                M
              </span>
            </div>
            <span className="font-serif text-lg" style={{ color: "#3d3830" }}>
              Muse
            </span>
          </div>
          <div className="flex items-center gap-8 text-sm" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
            <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">
              Privacy
            </a>
            <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">
              Terms
            </a>
            <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">
              Contact
            </a>
          </div>
          <div className="text-sm" style={{ color: "rgba(61, 56, 48, 0.6)" }}>
            &copy; 2025 Muse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
