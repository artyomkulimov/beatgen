"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RecommendationCard } from "@/components/recommendation-card"
import type { Artist, Recommendation, Song } from "@/types"
import { getRecommendations } from "@/lib/spotify"
import { Logo } from "@/components/logo"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function RecommendationsPage() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMode, setSelectedMode] = useState<"artists" | "songs">("artists")

  useEffect(() => {
    async function loadRecommendations() {
      try {
        // Get the selected mode and items from localStorage
        const mode = (localStorage.getItem("selectedMode") as "artists" | "songs") || "artists"
        setSelectedMode(mode)

        let selectedArtists: Artist[] = []
        let selectedSongs: Song[] = []

        if (mode === "artists") {
          selectedArtists = JSON.parse(localStorage.getItem("selectedArtists") || "[]")
        } else {
          selectedSongs = JSON.parse(localStorage.getItem("selectedSongs") || "[]")
        }

        // Fetch recommendations
        const results = await getRecommendations(selectedArtists, selectedSongs)
        setRecommendations(results)
      } catch (error) {
        console.error("Error loading recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRecommendations()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 p-0 flex flex-col">
      <Header />
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <h2 className="text-2xl font-bold text-white">Your Recommendations</h2>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/select")}
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
            >
              Back to Selection
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-lg">Loading recommendations...</div>
            </div>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
