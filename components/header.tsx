import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "lucide-react"

interface HeaderProps {
  showProfile?: boolean
}

export function Header({ showProfile = true }: HeaderProps) {
  return (
    <header className="border-b border-green-500/20 bg-black/60 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>

          {showProfile && (
            <Button variant="ghost" className="text-green-400 hover:bg-green-500/10 rounded-full p-2">
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
