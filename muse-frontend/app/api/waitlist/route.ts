// muse-frontend/app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory storage for demo (replace with actual database)
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
    
    // 🎯 NEW: Send welcome email
    try {
      await resend.emails.send({
        from: 'Muse <onboarding@resend.dev>', // Resend's test domain
        to: email,
        subject: "You're on the Muse Waitlist! ✨",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f3ef;">
              <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 40px;">
                  <div style="width: 60px; height: 60px; background-color: #3d3830; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-family: Georgia, serif; font-size: 28px; color: #f5f3ef;">M</span>
                  </div>
                  <h1 style="font-family: Georgia, serif; font-size: 32px; color: #3d3830; margin: 0; letter-spacing: 0.1em;">MUSE</h1>
                </div>

                <!-- Main Content -->
                <div style="background-color: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(61, 56, 48, 0.1);">
                  <h2 style="font-family: Georgia, serif; font-size: 24px; color: #3d3830; margin-top: 0;">Hi ${name}! 👋</h2>
                  
                  <p style="color: #6b6560; line-height: 1.6; font-size: 16px;">
                    Thank you for joining the Muse waitlist! We're thrilled to have you as one of our early supporters.
                  </p>

                  <div style="background-color: rgba(180, 160, 130, 0.1); border-left: 4px solid #b4a082; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #3d3830; font-size: 15px;">
                      <strong>What's Next?</strong><br>
                      We're putting the finishing touches on your personalized style experience. You'll be among the first to know when we launch in <strong>Early 2026</strong>.
                    </p>
                  </div>

                  <p style="color: #6b6560; line-height: 1.6; font-size: 16px;">
                    In the meantime, we'll occasionally send you:
                  </p>
                  
                  <ul style="color: #6b6560; line-height: 1.8; font-size: 15px;">
                    <li>Sneak peeks of new features</li>
                    <li>Early access opportunities</li>
                    <li>Style inspiration and tips</li>
                  </ul>

                  <p style="color: #6b6560; line-height: 1.6; font-size: 16px; margin-top: 30px;">
                    Have questions? Just reply to this email - we'd love to hear from you!
                  </p>

                  <p style="color: #6b6560; line-height: 1.6; font-size: 16px; margin-bottom: 0;">
                    Stay stylish,<br>
                    <strong style="color: #3d3830;">The Muse Team</strong>
                  </p>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; color: #8a8578; font-size: 12px;">
                  <p>
                    You're receiving this because you signed up for the Muse waitlist.<br>
                    © 2026 Muse. All rights reserved.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
        // Plain text fallback for email clients that don't support HTML
        text: `Hi ${name}!\n\nThank you for joining the Muse waitlist! We're thrilled to have you as one of our early supporters.\n\nWhat's Next?\nWe're putting the finishing touches on your personalized style experience. You'll be among the first to know when we launch in Early 2026.\n\nStay stylish,\nThe Muse Team`
      })

      console.log('Welcome email sent successfully to:', email)
    } catch (emailError) {
      // Log the error but don't fail the signup
      console.error('Failed to send welcome email:', emailError)
      // User is still added to waitlist even if email fails
    }
    
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