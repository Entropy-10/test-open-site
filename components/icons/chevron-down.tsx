import type { SVGProps } from 'react'

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export default function ChevronDownIcon({
  className,
  ...props
}: ChevronDownIconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='29'
      height='29'
      viewBox='0 0 29 29'
      fill='none'
      {...props}
    >
      <path
        d='M7.25 10.875L14.5 18.125L21.75 10.875'
        stroke='#fffefa'
        stroke-width='3'
      />
    </svg>
  )
}
