// app/api/auth/[...nextauth]/route.ts
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
      try {
        if (!user.email || !user.name) {
          console.log('❌ Missing email or name from Google')
          return false
        }

        console.log('🔍 Checking if user exists:', user.email)
        
        // Check if user exists in waitlist
        const response = await fetch(
          `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/waitlist?email=${encodeURIComponent(user.email)}`,
          { method: 'GET' }
        )
        const data = await response.json()
        
        console.log('📋 Waitlist check result:', { exists: data.exists, email: user.email })
        
        if (!data.exists) {
          console.log('➕ Adding new user to waitlist:', user.email)
          
          // Add to waitlist if not exists
          const addResponse = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/waitlist`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                email: user.email, 
                name: user.name 
              })
            }
          )
          
          const addResult = await addResponse.json()
          console.log('✅ Add to waitlist result:', addResult)
          
          // Store that this is a new user so we can redirect appropriately
          // We'll use the account object to pass this info
          if (account) {
            account.isNewUser = true
          }
        } else {
          console.log('👋 Existing user signing in:', user.email)
          if (account) {
            account.isNewUser = false
          }
        }
        
        return true
      } catch (error) {
        console.error('❌ SignIn callback error:', error)
        // Allow sign in even if waitlist check fails
        return true
      }
    },
    
    async redirect({ url, baseUrl }) {
      console.log('🔀 Redirect callback - url:', url, 'baseUrl:', baseUrl)
      
      // If the URL contains an error, go to error page
      if (url.includes('error')) {
        return `${baseUrl}/login?error=auth_failed`
      }
      
      // If redirecting after callback, check if new or existing user
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      // For all other cases, we need to check the waitlist
      // Since we can't pass data from signIn to redirect directly,
      // we'll do the check again (or use a better state management)
      // For now, let's redirect to a handler page
      return `${baseUrl}/auth/check-status`
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