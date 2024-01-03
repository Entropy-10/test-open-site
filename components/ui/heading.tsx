import { cn } from '@utils/client'

interface HeadingProps {
  className?: string
  children: React.ReactNode
  sub?: boolean
  id?: string
}

export default function Heading({
  className,
  children,
  sub,
  id
}: HeadingProps) {
  return !sub ? (
    <h2
      id={id}
      className={cn(
        'padding grow text-3xl font-extrabold sm:text-5xl',
        className
      )}
    >
      {fancyHeader(children)}.
    </h2>
  ) : (
    <h3
      id={id}
      className={cn('padding text-lg font-extrabold sm:text-2xl', className)}
    >
      {fancyHeader(children)}
    </h3>
  )
}

function stringArray(children: React.ReactNode) {
  if (!children || typeof children === 'object') return ''
  return children.toString().split(' ')
}

function fancyHeader(children: React.ReactNode) {
  return stringArray(children).length < 2 ? (
    children
  ) : (
    <>
      {stringArray(children)[0]}
      <span className='font-medium'>{` ${stringArray(children)[1]}`}</span>
    </>
  )
}
