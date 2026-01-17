"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5f3ef 0%, #ebe7e0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(180,160,130,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(61,56,48,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "4rem",
            fontWeight: 300,
            color: "#3d3830",
            marginBottom: "0.5rem",
            letterSpacing: "0.2em",
          }}
        >
          MUSE
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #b4a082, transparent)",
            margin: "1.5rem auto",
          }}
        />

        {/* Coming Soon Text */}
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.875rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#8a8578",
            marginBottom: "2rem",
          }}
        >
          Coming Soon
        </p>

        {/* Main Message */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "#3d3830",
            lineHeight: 1.4,
            marginBottom: "1.5rem",
          }}
        >
          Something beautiful is on its way
        </h2>

        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            color: "#6b6560",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          We're crafting a new way to discover your personal style. Be the first to experience fashion that truly
          understands you.
        </p>

        {/* Email Signup */}
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                maxWidth: "400px",
                margin: "0 auto",
                flexDirection: "column",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "1rem 1.25rem",
                  border: "1px solid #d4cfc5",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.7)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.95rem",
                  color: "#3d3830",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#b4a082"
                  e.target.style.background = "rgba(255,255,255,0.9)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d4cfc5"
                  e.target.style.background = "rgba(255,255,255,0.7)"
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "1rem 2rem",
                  background: "#3d3830",
                  color: "#f5f3ef",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2a2520"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#3d3830"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                Notify Me
              </button>
            </div>
          </form>
        ) : (
          <div
            style={{
              padding: "1.5rem 2rem",
              background: "rgba(180,160,130,0.15)",
              borderRadius: "12px",
              marginBottom: "2rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.25rem",
                color: "#3d3830",
                marginBottom: "0.5rem",
              }}
            >
              You're on the list
            </p>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.875rem",
                color: "#6b6560",
              }}
            >
              We'll let you know when Muse is ready for you.
            </p>
          </div>
        )}

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {["Instagram", "TikTok", "Pinterest"].map((social) => (
            <a
              key={social}
              href="#"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.75rem",
                color: "#8a8578",
                textDecoration: "none",
                letterSpacing: "0.1em",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3d3830")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8578")}
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.875rem",
          color: "#6b6560",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#3d3830")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6560")}
      >
        <span>←</span>
        <span>Back</span>
      </Link>
    </div>
  )
}
