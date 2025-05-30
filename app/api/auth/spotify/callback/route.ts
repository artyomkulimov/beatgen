import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/spotify/callback`

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=access_denied`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=no_code`)
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=config_error`)
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    
    // Get user profile
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    if (!userResponse.ok) {
      throw new Error('Failed to get user profile')
    }

    const userData = await userResponse.json()

    // Store tokens in cookies (in production, use a more secure method)
    const cookieStore = await cookies()
    cookieStore.set('spotify_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in
    })
    
    if (tokenData.refresh_token) {
      cookieStore.set('spotify_refresh_token', tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }

    cookieStore.set('spotify_user', JSON.stringify({
      id: userData.id,
      display_name: userData.display_name,
      email: userData.email,
      images: userData.images
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    // Redirect to the main app
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/select`)
  } catch (error) {
    console.error('Spotify auth error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=auth_failed`)
  }
} 