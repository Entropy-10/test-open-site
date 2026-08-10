import Image from "next/image"

import { cn } from "cnfast"

import background from "../../../public/images/background.jpg"

interface BackgroundProps {
  children: React.ReactNode
  className?: string
  imageClassName?: string
  fade?: boolean | "double"
  gradient?: boolean
}

export function Background({
  children,
  className,
  imageClassName,
  fade,
  gradient = true
}: BackgroundProps) {
  return (
    <div
      className={cn(
        "text-medium-blue relative",
        gradient && "text-milky-white",
        fade && "bg-bottom-fade"
      )}
    >
      {gradient && (
        <Image
          fill
          priority
          src={background}
          alt="gradient background"
          placeholder="blur"
          sizes="100vw"
          className={cn(
            "-z-20 h-auto object-cover select-none",
            imageClassName
          )}
        />
      )}
      <div className={className}>{children}</div>
    </div>
  )
}
