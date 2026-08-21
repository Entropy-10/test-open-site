import { cn } from "cnfast"

interface HeadingProps {
  className?: string
  children: React.ReactNode
  sub?: boolean
  id?: string
  padding?: boolean
}

function stringArray(children: React.ReactNode) {
  if (!children || typeof children === "object") return ""
  return children.toString().split(" ")
}

function fancyHeader(children: React.ReactNode) {
  return stringArray(children).length < 2 ? (
    children
  ) : (
    <>
      {stringArray(children)[0]}
      <span className="font-medium">{` ${[...stringArray(children)]
        .slice(1)
        .join(" ")}`}</span>
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
