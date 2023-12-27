import { cn } from '@utils/client'

interface HighlightProps {
  children: React.ReactNode
  dark?: boolean
}

export default function Highlight({ children, dark }: HighlightProps) {
  return <span className={cn('font-bold', dark && '')}>{children}</span>
}
