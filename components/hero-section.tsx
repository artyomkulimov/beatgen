"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

interface HeroSectionProps {
  onSignIn: () => void
  isLoading: boolean
}

export function HeroSection({ onSignIn, isLoading }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Discover Your Next Favorite Track</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            BeatGen uses AI to analyze your music taste and generate personalized recommendations that match your unique
            style.
          </p>
          <Button
            onClick={onSignIn}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg rounded-full"
          >
            {isLoading ? "Connecting..." : "Connect with Spotify"}
          </Button>
          <p className="text-gray-400 mt-4 text-sm">
            No Spotify account?{" "}
            <a href="#" className="text-green-400 underline">
              See how it works
            </a>
          </p>
        </div>
      </div>
      <div className="text-center p-6 border-t border-green-500/20 bg-black/40">
        <p className="text-gray-400 text-sm">BeatGen is not affiliated with Spotify. Powered by Spotify API.</p>
      </div>
    </div>
  )
}
