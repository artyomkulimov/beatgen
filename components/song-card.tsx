"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Song } from "@/types"

interface SongCardProps {
  song: Song
  isSelected: boolean
  onSelect: (song: Song) => void
}

export function SongCard({ song, isSelected, onSelect }: SongCardProps) {
  return (
    <Card
      className="bg-black/60 border-green-500/20 hover:bg-black/80 transition-colors cursor-pointer"
      onClick={() => onSelect(song)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Image src={song.image || "/placeholder.svg"} alt={song.name} width={48} height={48} className="rounded-lg" />
          <div className="flex-1">
            <div className="font-medium text-white">{song.name}</div>
            <div className="text-sm text-gray-300">{song.artist}</div>
          </div>
          {isSelected && <Badge className="bg-green-500 text-black">Selected</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}
