'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@navigation'

import Button from '~/components/ui/Button'
import { Content, Description, Root, Title } from '~/components/ui/modal'
import { reset } from '../_actions/reset'

export default function ErrorModal() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const error = searchParams.get('error')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (type && error) setOpen(true)
  }, [type, error])

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Content className='flex flex-col items-center justify-center'>
        <Title>
          {type == 'osu' ? 'Osu Update Error' : 'Discord Linking Error'}
        </Title>
        <Description className='text-center'>{error}</Description>
        <form action={reset}>
          <input name='pathname' defaultValue={pathname} hidden />
          <Button variant='outline'>CLOSE</Button>
        </form>
      </Content>
    </Root>
  )
}
