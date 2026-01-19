// muse-frontend/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user exists in waitlist
      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/waitlist?email=${encodeURIComponent(user.email || '')}`,
          { method: 'GET' }
        )
        const data = await response.json()
        
        if (!data.exists && user.email && user.name) {
          // Add to waitlist if not exists
          await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/waitlist`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, name: user.name })
            }
          )
        }
        
        return true
      } catch (error) {
        console.error('SignIn callback error:', error)
        return true // Allow sign in even if waitlist check fails
      }
    },
    async redirect({ url, baseUrl }) {
      // Check if user was already registered
      // For now, just redirect to already-registered page
      return `${baseUrl}/already-registered`
    },
    async session({ session, token }) {
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }