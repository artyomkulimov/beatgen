import type { Artist, Song, Recommendation } from "@/types"

// Get recommendations from Spotify API
export async function getRecommendations(
  selectedArtists: Artist[] = [],
  selectedSongs: Song[] = [],
): Promise<Recommendation[]> {
  try {
    const seed_artists = selectedArtists.map(artist => artist.id)
    const seed_tracks = selectedSongs.map(song => song.id)

    const response = await fetch('/api/spotify/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seed_artists,
        seed_tracks,
        limit: 20
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get recommendations')
    }

    const data = await response.json()
    return data.recommendations
  } catch (error) {
    console.error('Error getting recommendations:', error)
    throw error
  }
}

// Check if user is authenticated with Spotify
export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/status')
    const data = await response.json()
    return data.authenticated
  } catch (error) {
    console.error('Error checking auth status:', error)
    return false
  }
}

// Redirect to Spotify authentication
export function authenticateWithSpotify(): void {
  window.location.href = '/api/auth/spotify'
}

// Search for artists and tracks
export async function searchSpotify(query: string, type: 'artist' | 'track' | 'both' = 'both'): Promise<{
  artists?: Artist[]
  songs?: Song[]
}> {
  try {
    const searchType = type === 'both' ? 'artist,track' : type
    const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&type=${searchType}&limit=20`)
    
    if (!response.ok) {
      throw new Error('Search failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Error searching Spotify:', error)
    throw error
  }
}
