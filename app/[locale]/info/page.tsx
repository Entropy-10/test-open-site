import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { createMetadata } from '@metadata'

import Background from '~/components/ui/Background'
import Divider from './_components/divider'
import Heading from './_components/heading'
import List from './_components/list'

import type { MetadataProps } from '@types'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return createMetadata({
    locale,
    title: t('PageTitles.info'),
    description: t('description')
  })
}

export default function InfoPage() {
  return (
    <div>
      <Background className='py-10'>
        <Heading>GENERAL INFO</Heading>
        <Divider />

        <List>
          <li>
            This is an international{' '}
            <Link href='https://osu.ppy.sh/wiki/en/Help_centre/Upgrading_to_lazer'>
              osu! lazer
            </Link>
            , standard mode, 3v3, open rank tournament.
          </li>
          <li>
            All tournament activities will utilize the{' '}
            <Link href='https://osu.ppy.sh/wiki/en/Help_centre/Upgrading_to_lazer'>
              osu! lazer
            </Link>{' '}
            client.
          </li>
          <li>
            The tournament will start with qualifiers and then move into a RO32
            double elimination bracket.
          </li>
          <li>
            Matches will be played with Team VS and No Fail, and scored using
            lazer&apos;s default scoring.
          </li>
          <li>
            All times will be displayed in{' '}
            <Link href='https://time.is/UTC'>UTC</Link> along with
            Discord&apos;s locale time format.
          </li>
          <li>
            You must be in the{' '}
            <Link href='https://discord.com/invite/nZnQZMvEhq'>
              Discord server
            </Link>{' '}
            at all times to participate in the tournament.
          </li>
          <li>
            Rescheduling must be completed before Thursday at 23:59 UTC the week
            of the current round. Exceptions may be made on a case-by-case
            basis.
          </li>
          <li>
            Mappools and schedules for the upcoming round will be released on
            the Sunday before 23:59 UTC.
          </li>
          <li>
            No staff members may participate in the tournament excluding
            streamers, commentators, designers, and translators.
          </li>
        </List>
      </Background>
    </div>
  )
}
