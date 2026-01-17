"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, Sparkles, Heart, ShoppingBag, CheckCircle2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 1000)
        }
      }, 150)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.9em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  )
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function FeatureCard({
  icon: Icon,
  step,
  title,
  description,
  index,
}: {
  icon: React.ElementType
  step: string
  title: string
  description: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 md:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
            <Icon className="w-6 h-6 text-primary/70" />
          </div>
          <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">{step}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

function ValueCard({ title, description, index }: { title: string; description: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-5">
        <CheckCircle2 className="w-5 h-5 text-accent" />
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
    </motion.div>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/30"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/landing" className="font-serif text-2xl tracking-tight text-foreground">
            Muse
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#waitlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Join Waitlist
            </a>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Open App
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        {/* Subtle gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Logo/Brand with typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] tracking-tight text-foreground">
              <TypewriterText text="Muse" delay={500} />
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="font-serif text-xl md:text-3xl lg:text-4xl text-foreground/80 mb-4 tracking-tight"
          >
            Find Your Perfect Outfit with AI
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Personalized fashion discovery for every body, budget, and style.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#waitlist">
              <Button size="lg" className="rounded-full px-8 py-6 text-base group">
                Join Waitlist
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button variant="ghost" size="lg" className="rounded-full px-8 py-6 text-base">
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 md:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              The Process
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <FeatureCard
              icon={Sparkles}
              step="Step 01"
              title="Share Your Style"
              description="Tell us your preferences, size, and budget through our personalized style quiz."
              index={0}
            />
            <FeatureCard
              icon={Heart}
              step="Step 02"
              title="Get Curated Outfits"
              description="Our AI creates complete looks tailored just for you, matching your unique aesthetic."
              index={1}
            />
            <FeatureCard
              icon={ShoppingBag}
              step="Step 03"
              title="Shop Your Favorites"
              description="Buy directly from top brands and boutiques with seamless checkout."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 border-y border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 50, suffix: "+", label: "Partner Brands" },
              { value: 10000, suffix: "+", label: "Style Combinations" },
              { value: 98, suffix: "%", label: "Satisfaction Rate" },
              { value: 24, suffix: "/7", label: "AI Styling" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Muse */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4 block">
              Our Promise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">Why Muse</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We&apos;re building fashion discovery that works for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              title="Fashion for Everyone"
              description="Whether you're exploring new styles or know exactly what you want, Muse makes getting dressed easier. No more endless scrolling or mismatched pieces."
              index={0}
            />
            <ValueCard
              title="Inclusive & Accessible"
              description="From XS to 3XL+, $20 budgets to high fashion—we believe everyone deserves to feel confident in what they wear."
              index={1}
            />
            <ValueCard
              title="Smart Recommendations"
              description="Our AI learns your preferences and suggests outfits that actually work for your lifestyle, body, and values."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium opacity-70 tracking-widest uppercase mb-6 block">Our Mission</span>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
              Make fashion accessible, inclusive, and stress-free for people of all ages, sizes, and budgets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Coming Early 2026
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">Get Early Access</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Join our waitlist for outfit inspiration and be the first to experience Muse.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-6 rounded-full bg-secondary border-0 text-base"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="rounded-full px-8 py-6">
                  Join Waitlist
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-accent/10"
              >
                <CheckCircle2 className="w-6 h-6 text-accent" />
                <span className="text-foreground font-medium">
                  You&apos;re on the list! We&apos;ll be in touch soon.
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span className="font-serif text-xl text-foreground">Muse</span>
              <span className="text-sm text-muted-foreground">© 2026 All rights reserved</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@muse.style"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@muse.style
              </a>
              <a
                href="mailto:partnerships@muse.style"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Partnerships
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
