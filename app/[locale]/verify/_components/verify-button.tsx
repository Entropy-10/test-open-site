'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} variant='primary' className='w-full'>
      {pending ? 'VERIFYING' : 'VERIFY'}
    </Button>
  )
}
