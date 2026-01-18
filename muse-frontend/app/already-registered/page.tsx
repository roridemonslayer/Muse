"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function AlreadyRegisteredPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

        {/* Already Registered Message */}
        <div
          style={{
            padding: "2rem",
            background: "rgba(180,160,130,0.15)",
            borderRadius: "16px",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2rem",
              fontWeight: 400,
              color: "#3d3830",
              marginBottom: "1rem",
            }}
          >
            Welcome back!
          </p>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1rem",
              color: "#6b6560",
              lineHeight: 1.6,
            }}
          >
            You're already on our waitlist. We'll notify you via email as soon as Muse launches.
          </p>
        </div>

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
          Coming Early 2026
        </p>

        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            color: "#6b6560",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          We're putting the finishing touches on your personalized style experience. Stay tuned!
        </p>
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
        <span>Back to Home</span>
      </Link>
    </div>
  )
}