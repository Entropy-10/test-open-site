import React from 'react'
import { getSession } from '@utils/server'

import Button from '~/components/ui/Button'
import SignInButton from '~/components/sign-in-button'
import { verify } from './_actions/verify'
import VerifyButton from './_components/verify-button'

interface VerifyPageProps {
  searchParams: {
    status?: 'success' | 'error'
    message?: string
  }
}

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  const session = getSession()
  const { status, message } = searchParams

  if (!session) {
    return (
      <VerifyContainer>
        <p className='mb-2 text-sm'>
          Sign in first before attempting to verify.
        </p>
        <SignInButton className='w-full' />
      </VerifyContainer>
    )
  }

  if (status === 'error') {
    return (
      <VerifyContainer>
        <p className='mb-4 text-sm'>
          {message ?? 'Verification failed. Please try again later.'}
        </p>
        <Button href='/verify' variant='invertedOutline' className='w-full'>
          TRY AGAIN
        </Button>
      </VerifyContainer>
    )
  }

  if (status === 'success') {
    return (
      <VerifyContainer>
        <p className='text-sm'>
          {message ?? 'Welcome to the TEST Open Discord server!'}
        </p>
      </VerifyContainer>
    )
  }

  return (
    <VerifyContainer>
      <form action={verify}>
        <p className='mb-4 text-sm'>
          Please click the button below to gain access to the server.
        </p>
        <VerifyButton />
      </form>
    </VerifyContainer>
  )
}

interface VerifyContainerProps {
  children: React.ReactNode
}

function VerifyContainer({ children }: VerifyContainerProps) {
  return (
    <div className='flex justify-center'>
      <div className='mt-28 w-64 border-2 p-2'>
        <h2 className='mb-1 text-lg font-bold'>Server Verification</h2>
        {children}
      </div>
    </div>
  )
}
