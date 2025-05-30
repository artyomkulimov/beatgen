import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"
import Image from "next/image"
import type { Recommendation } from "@/types"

interface RecommendationCardProps {
  recommendation: Recommendation
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="bg-black/60 border-green-500/20 hover:bg-black/80 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Image
            src={recommendation.image || "/placeholder.svg"}
            alt={recommendation.name}
            width={64}
            height={64}
            className="rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-white">{recommendation.name}</h3>
            <p className="text-gray-300">{recommendation.artist}</p>
            <p className="text-sm text-gray-400">{recommendation.album}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-500/10">
              <Play className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-500/10">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
