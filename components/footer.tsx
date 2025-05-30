import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="border-t border-green-500/20 bg-black/40 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" variant="simple" />
            <span className="text-white font-semibold">BeatGen</span>
          </div>
          <div className="text-sm text-gray-400">Powered by Spotify API. BeatGen is not affiliated with Spotify.</div>
          <div className="flex gap-4">
            <Link href="#" className="text-green-400 hover:text-green-300 text-sm">
              About
            </Link>
            <Link href="#" className="text-green-400 hover:text-green-300 text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-green-400 hover:text-green-300 text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
