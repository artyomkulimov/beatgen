interface LogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "simple"
}

export function Logo({ size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-16 w-16 text-xl",
  }

  if (variant === "simple") {
    return (
      <div className={`bg-green-500 rounded-full flex items-center justify-center ${sizeClasses[size]}`}>
        <span className="font-bold text-black">BG</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`bg-green-500 rounded-full flex items-center justify-center ${sizeClasses[size]}`}>
        <span className="font-bold text-black">BG</span>
      </div>
      <span className="font-bold text-white text-xl">BeatGen</span>
    </div>
  )
}
