'use client'

import { useEffect } from 'react'

import Button from '~/components/ui/Button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center space-y-4 text-medium-blue'>
      <h1 className='text-3xl font-bold'>Something Went Wrong!</h1>
      <div className='flex space-x-3'>
        <Button variant='outlineHover' onClick={() => reset()}>
          Try Again
        </Button>

        <Button href='/' variant='outlineHover'>
          Go Home
        </Button>
      </div>
    </div>
  )
}
