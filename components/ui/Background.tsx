import Image from 'next/image'
import { cn } from '@utils'

import background from '../../public/images/background.jpg'

interface BackgroundProps {
  children: React.ReactNode
  className?: string
  fade?: boolean | 'double'
  gradient?: boolean
}

export default function Background({
  children,
  className,
  fade,
  gradient = true
}: BackgroundProps) {
  return (
    <div
      className={cn(
        'relative text-medium-blue',
        gradient && 'text-milky-white',
        fade && 'bg-bottom-fade'
      )}
    >
      {gradient && (
        <Image
          fill
          priority
          src={background}
          alt='gradient background'
          placeholder='blur'
          sizes='100vw'
          className='-z-20 h-auto select-none object-cover'
        />
      )}
      <div className={className}>{children}</div>
    </div>
  )
}
