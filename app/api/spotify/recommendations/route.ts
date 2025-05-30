import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { seed_artists = [], seed_tracks = [], limit = 20 } = body

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('spotify_access_token')

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Spotify recommendations API requires at least one seed
    if (seed_artists.length === 0 && seed_tracks.length === 0) {
      return NextResponse.json({ error: 'At least one seed artist or track is required' }, { status: 400 })
    }

    // Spotify API limits to 5 seeds total
    const totalSeeds = seed_artists.length + seed_tracks.length
    if (totalSeeds > 5) {
      return NextResponse.json({ error: 'Maximum 5 seeds allowed (artists + tracks combined)' }, { status: 400 })
    }

    const params = new URLSearchParams({
      limit: limit.toString(),
    })

    if (seed_artists.length > 0) {
      params.append('seed_artists', seed_artists.join(','))
    }

    if (seed_tracks.length > 0) {
      params.append('seed_tracks', seed_tracks.join(','))
    }

    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/recommendations?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken.value}`
        }
      }
    )

    if (!spotifyResponse.ok) {
      const errorData = await spotifyResponse.json()
      console.error('Spotify recommendations error:', errorData)
      throw new Error('Spotify recommendations request failed')
    }

    const data = await spotifyResponse.json()
    
    // Transform the data to match our app's format
    const recommendations = data.tracks.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0]?.name || 'Unknown Artist',
      album: track.album.name,
      image: track.album.images[0]?.url || '/placeholder.svg',
      preview_url: track.preview_url,
      external_urls: track.external_urls,
      popularity: track.popularity
    }))

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Recommendations error:', error)
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 })
  }
} 