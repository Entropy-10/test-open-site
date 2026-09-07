import type { ReactNode } from "react"

interface MessageBoxProps {
  title: string
  message: string
  children?: ReactNode
}

export function MessageBox({ title, message, children }: MessageBoxProps) {
  return (
    <div className="from-lavender to-light-blue flex h-[195px] w-[90vw] max-w-[595px] flex-col items-center justify-center bg-linear-to-bl from-[-9%] to-109% p-[25px] drop-shadow-lg">
      <div className="text-milky-white text-base font-bold sm:text-lg">
        {title}
      </div>
      <p className="text-milky-white py-2 text-center text-xs font-medium sm:pb-5 sm:text-sm">
        {message}
      </p>
      {children}
    </div>
  )
}
