import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'

import { getTranslations } from 'next-intl/server'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '~/components/carousel'
import Invite from './invite'

interface InvitesProps {
	userId: string
}

export default async function Invites({ userId }: InvitesProps) {
	const t = await getTranslations('ProfilePage.Invites')
	const supabase = createClient(cookies())
	const { data: invites, error } = await supabase
		.from('invites')
		.select('*, teams(id, flag, name, timezone)')
		.eq('user_id', userId)
		.eq('status', 'pending')

	if (error) console.log(error)
	if (!invites || invites.length === 0) {
		return (
			<div className='flex h-[311px] items-center justify-center'>
				<p className='max-w-72 text-center'>{t('none')}</p>
			</div>
		)
	}

	return (
		<div className='padding my-5 flex w-full gap-5'>
			<Carousel className='w-full'>
				<CarouselContent className='-ml-4'>
					{invites.map(invite => (
						<CarouselItem
							key={invite.id}
							className='ml-4 basis-[200px] md:basis-[250px]'
						>
							<Invite invite={invite} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}
