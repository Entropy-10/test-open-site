import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import Highlight from './_components/highlight'
import Link from './_components/link'
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
						<Highlight>
							<Link href='https://osu.ppy.sh/wiki/en/Help_centre/Upgrading_to_lazer'>
								osu! lazer
							</Link>
							, standard mode, 3v3, open rank
						</Highlight>{' '}
						tournament.
					</li>
					<li>
						All tournament activities will{' '}
						<Highlight>
							utilize the{' '}
							<Link href='https://osu.ppy.sh/wiki/en/Help_centre/Upgrading_to_lazer'>
								osu! lazer
							</Link>{' '}
							client.
						</Highlight>
					</li>
					<li>
						The tournament will start with{' '}
						<Highlight>
							qualifiers and then move into a RO32 double elimination
						</Highlight>{' '}
						bracket.
					</li>
					<li>
						Matches will be played with{' '}
						<Highlight>
							Team VS and No Fail, and scored using lazer&apos;s default
						</Highlight>{' '}
						scoring.
					</li>
					<li>
						All times will be{' '}
						<Highlight>
							displayed in <Link href='https://time.is/UTC'>UTC</Link>
						</Highlight>{' '}
						along with Discord&apos;s locale time format.
					</li>
					<li>
						You{' '}
						<Highlight>
							must be in the{' '}
							<Link href='https://discord.com/invite/nZnQZMvEhq'>
								Discord server
							</Link>
						</Highlight>{' '}
						at all times to participate in the tournament.
					</li>
					<li>
						<Highlight>Rescheduling</Highlight> must be completed{' '}
						<Highlight>before Thursday at 23:59 UTC</Highlight> the week of the
						current round. Exceptions may be made on a case-by-case basis.
					</li>
					<li>
						<Highlight>Mappools and schedules</Highlight> for the upcoming round
						will be released on the{' '}
						<Highlight>Sunday before 23:59 UTC</Highlight>.
					</li>
					<li>
						<Highlight>No staff members may participate</Highlight> in the
						tournament{' '}
						<Highlight>
							excluding streamers, commentators, designers, and translators
						</Highlight>
						.
					</li>
				</List>
			</Background>

			<div className='py-10 flex justify-center'>
				<span className='font-bold text-3xl text-medium-blue italic'>
					More Info Coming Soon
				</span>
			</div>
		</div>
	)
}
