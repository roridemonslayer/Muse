// muse-frontend/app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (replace with actual database)
// WARNING: This will reset every time the server restarts!
const waitlist = new Map<string, { email: string; name: string; timestamp: string }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    console.log('Received signup request:', { email, name })

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Check if already registered
    if (waitlist.has(email.toLowerCase())) {
      console.log('User already registered:', email)
      return NextResponse.json(
        { alreadyRegistered: true, message: 'Email already registered' },
        { status: 409 }
      )
    }

    // Add to waitlist
    waitlist.set(email.toLowerCase(), {
      email,
      name,
      timestamp: new Date().toISOString()
    })

    console.log('Successfully added to waitlist:', { email, name })
    console.log('Current waitlist size:', waitlist.size)
    
    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const exists = waitlist.has(email.toLowerCase())
    
    return NextResponse.json({
      exists,
      ...(exists && { user: waitlist.get(email.toLowerCase()) })
    })
  } catch (error) {
    console.error('Waitlist check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}