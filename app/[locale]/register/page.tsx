import { redirect } from 'next/navigation'
import { env } from '@env'
import { isProd } from '@utils/client'
import { getSession } from '@utils/server'
import { getTranslations } from 'next-intl/server'
import { createMetadata } from '@metadata'

import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import MessageBox from '~/components/message-box'
import CreateTeamForm from './_components/create-team-form'

import type { MetadataProps } from '@types'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return createMetadata({
    locale,
    title: t('PageTitles.register'),
    description: t('description')
  })
}

export default function RegisterPage() {
  const session = getSession()
  if (!session) redirect('/unauthorized')
  const allowRegs = isProd
    ? Date.now() >= Number(env.NEXT_PUBLIC_START_DATE)
    : true

  return (
    <Background className='relative flex min-h-screen items-center justify-center'>
      <div className='absolute left-0 top-10'>
        <Heading>TEAM REGISTRATION</Heading>
        <Divider />
      </div>

      {allowRegs ? (
        <CreateTeamForm userId={session.sub} />
      ) : (
        <MessageBox
          title='REGISTRATIONS CLOSED!'
          message='Registrations are currently closed until the tournament starts. Please check back here once the countdown on the front page has ended.'
        />
      )}
    </Background>
  )
}
