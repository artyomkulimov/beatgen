"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Artist } from "@/types"

interface ArtistCardProps {
  artist: Artist
  isSelected: boolean
  onSelect: (artist: Artist) => void
}

export function ArtistCard({ artist, isSelected, onSelect }: ArtistCardProps) {
  return (
    <Card
      className="bg-black/60 border-green-500/20 hover:bg-black/80 transition-colors cursor-pointer"
      onClick={() => onSelect(artist)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="font-medium text-white">{artist.name}</span>
          {isSelected && <Badge className="ml-auto bg-green-500 text-black">Selected</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}
