'use client'

import { useFormStatus } from 'react-dom'

import Button from '~/components/ui/Button'

export default function UpdateButton() {
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} className='w-24 md:w-[123px]'>
      {pending ? 'UPDATING' : 'UPDATE'}
    </Button>
  )
}
