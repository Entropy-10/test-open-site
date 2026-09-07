import { cn } from "cn"

interface HeadingProps {
  className?: string
  children: React.ReactNode
  sub?: boolean
  id?: string
  padding?: boolean
}

function words(children: React.ReactNode) {
  if (!children || typeof children === "object") return []
  return children.toString().split(" ")
}

function fancyHeader(children: React.ReactNode) {
  const [first, ...rest] = words(children)
  if (rest.length === 0) return children

  return (
    <>
      {first}
      <span className="font-medium">{` ${rest.join(" ")}`}</span>
    </>
  )
}

export function Heading({
  className,
  children,
  sub,
  id,
  padding = true
}: HeadingProps) {
  return sub ? (
    <h3
      id={id}
      className={cn(
        "text-lg font-extrabold sm:text-2xl",
        padding && "padding",
        className
      )}
    >
      {fancyHeader(children)}
    </h3>
  ) : (
    <h2
      id={id}
      className={cn(
        "padding grow text-3xl font-extrabold sm:text-5xl",
        className
      )}
    >
      {fancyHeader(children)}
    </h2>
  )
}
