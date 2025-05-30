import { NextRequest, NextResponse } from 'next/server'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/spotify/callback`

export async function GET(request: NextRequest) {
  if (!SPOTIFY_CLIENT_ID) {
    return NextResponse.json({ error: 'Spotify client ID not configured' }, { status: 500 })
  }

  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' ')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: Math.random().toString(36).substring(7), // Simple state for CSRF protection
  })

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`
  
  return NextResponse.redirect(spotifyAuthUrl)
} 