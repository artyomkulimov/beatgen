import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('spotify_access_token')
    const user = cookieStore.get('spotify_user')

    if (!accessToken || !user) {
      return NextResponse.json({ authenticated: false })
    }

    // Verify token is still valid by making a simple API call
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`
      }
    })

    if (!response.ok) {
      // Token is invalid, clear cookies
      cookieStore.delete('spotify_access_token')
      cookieStore.delete('spotify_refresh_token')
      cookieStore.delete('spotify_user')
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ 
      authenticated: true,
      user: JSON.parse(user.value)
    })
  } catch (error) {
    console.error('Auth status check error:', error)
    return NextResponse.json({ authenticated: false })
  }
} 