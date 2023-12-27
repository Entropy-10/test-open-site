import { cn } from '@utils/client'

import type { SVGProps } from 'react'

interface XIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export default function XIcon({ className, ...props }: XIconProps) {
  return (
    <svg
      role='img'
      width='30'
      height='30'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(
        'fill-milky-white transition-all duration-200 ease-in-out',
        className
      )}
      {...props}
    >
      <title>X</title>
      <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'></path>
    </svg>
  )
}
