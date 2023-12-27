import { cn } from '@utils/client'

interface HeadingProps {
  children: React.ReactNode
  sub?: boolean
}

export default function Heading({ children, sub }: HeadingProps) {
  return !sub ? (
    <h2 className={cn('padding grow text-3xl font-extrabold sm:text-5xl')}>
      {fancyHeader(children)}.
    </h2>
  ) : (
    <h3 className={cn('padding text-lg font-extrabold sm:text-2xl')}>
      {fancyHeader(children)}.
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
