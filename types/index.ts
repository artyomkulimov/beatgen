export interface Artist {
  id: string
  name: string
  image: string
}

export interface Song {
  id: string
  name: string
  artist: string
  image: string
}

export interface Recommendation {
  id: string
  name: string
  artist: string
  album: string
  image: string
  preview_url?: string
}
