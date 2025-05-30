import type { Artist, Song, Recommendation } from "@/types"

export const mockArtists: Artist[] = [
  { id: "1", name: "Taylor Swift", image: "/placeholder.svg?height=64&width=64" },
  { id: "2", name: "The Weeknd", image: "/placeholder.svg?height=64&width=64" },
  { id: "3", name: "Billie Eilish", image: "/placeholder.svg?height=64&width=64" },
  { id: "4", name: "Drake", image: "/placeholder.svg?height=64&width=64" },
]

export const mockSongs: Song[] = [
  { id: "1", name: "Anti-Hero", artist: "Taylor Swift", image: "/placeholder.svg?height=64&width=64" },
  { id: "2", name: "Blinding Lights", artist: "The Weeknd", image: "/placeholder.svg?height=64&width=64" },
  { id: "3", name: "bad guy", artist: "Billie Eilish", image: "/placeholder.svg?height=64&width=64" },
  { id: "4", name: "God's Plan", artist: "Drake", image: "/placeholder.svg?height=64&width=64" },
]

export const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    name: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "2",
    name: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "3",
    name: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "4",
    name: "Calm Down",
    artist: "Rema & Selena Gomez",
    album: "Rave & Roses",
    image: "/placeholder.svg?height=64&width=64",
  },
  { id: "5", name: "Shivers", artist: "Ed Sheeran", album: "=", image: "/placeholder.svg?height=64&width=64" },
]
