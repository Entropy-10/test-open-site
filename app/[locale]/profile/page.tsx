import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'

import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import SectionLoader from '~/components/section-loader'
import AvatarInfo from './_components/avatar-info'
import ErrorModal from './_components/error-modal'
import Team from './_components/team'

export default async function ProfilePage() {
  const session = getSession()
  if (!session) redirect('/unauthorized')

  const supabase = createClient(cookies())
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('osu_id', session.sub)
    .maybeSingle()

  if (!user) notFound()

  return (
    <div>
      <ErrorModal />
      <Background className='py-8'>
        <Heading>MY PROFILE</Heading>
        <Divider />

        <section className='padding flex gap-6 md:gap-20'>
          <AvatarInfo user={user} type='osu'>
            <div className='space-y-1'>
              <div>
                <span className='font-extrabold'>GLOBAL RANK:</span> #
                {user.rank ? user.rank.toLocaleString() : 'No Rank'}
              </div>

              <div>
                <span className='font-extrabold'>BWS RANK:</span> #
                {user.rank ? user.rank.toLocaleString() : 'No Rank'}
              </div>
            </div>

            <div className='flex items-center gap-1'>
              <Image
                width={30}
                height={30}
                src={`https://flagsapi.com/${user.country_code}/flat/64.png`}
                alt={`${user.country} flag`}
              />
              {user.country}
            </div>
          </AvatarInfo>

          <AvatarInfo user={user} type='discord' className='hidden xs:flex'>
            <div className='font-extrabold uppercase'>@{user.discord_tag}</div>
          </AvatarInfo>
        </section>
      </Background>

      <section className='py-8 text-light-blue'>
        <Heading>MY TEAM</Heading>
        <Divider className='bg-light-blue' />
        <Heading sub>CURRENT TEAM</Heading>

        <Suspense fallback={<SectionLoader />}>
          <Team userId={session.sub} />
        </Suspense>

        <Divider variant='single' className='bg-light-blue' />
        <Heading id='invites' sub>
          PENDING INVITES
        </Heading>

        <div className='h-48'>
          <p className='flex h-full items-center justify-center text-center'>
            You currently do not have any invites. <br />
            Wait for one or create your own team.
          </p>
        </div>
      </section>
    </div>
  )
}
