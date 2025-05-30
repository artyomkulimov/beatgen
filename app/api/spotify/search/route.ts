import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'artist,track'
    const limit = searchParams.get('limit') || '20'

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('spotify_access_token')

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken.value}`
        }
      }
    )

    if (!spotifyResponse.ok) {
      throw new Error('Spotify API request failed')
    }

    const data = await spotifyResponse.json()
    
    // Transform the data to match our app's format
    const transformedData: any = {}

    if (data.artists) {
      transformedData.artists = data.artists.items.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images[0]?.url || '/placeholder.svg',
        genres: artist.genres,
        popularity: artist.popularity
      }))
    }

    if (data.tracks) {
      transformedData.songs = data.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album.name,
        image: track.album.images[0]?.url || '/placeholder.svg',
        preview_url: track.preview_url,
        external_urls: track.external_urls
      }))
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Spotify search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
} 