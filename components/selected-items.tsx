"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Artist, Song } from "@/types"

interface SelectedArtistsProps {
  artists: Artist[]
  onRemove: (id: string) => void
}

interface SelectedSongsProps {
  songs: Song[]
  onRemove: (id: string) => void
}

export function SelectedArtists({ artists, onRemove }: SelectedArtistsProps) {
  if (artists.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Selected Artists ({artists.length}/5)</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {artists.map((artist) => (
          <Badge
            key={artist.id}
            variant="secondary"
            className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1"
          >
            {artist.name}
            <button onClick={() => onRemove(artist.id)} className="ml-2 hover:text-red-400">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function SelectedSongs({ songs, onRemove }: SelectedSongsProps) {
  if (songs.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Selected Songs ({songs.length}/5)</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {songs.map((song) => (
          <Badge
            key={song.id}
            variant="secondary"
            className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1"
          >
            {song.name} - {song.artist}
            <button onClick={() => onRemove(song.id)} className="ml-2 hover:text-red-400">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
