'use server'

import { getGuildMember, sendMessage, updateGuildMember } from '@discord'
import { env } from '@env'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verify() {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const t = await getServerTranslations('VerifyPage.Errors')
	const supabase = createClient(cookies())

	const { data: user, error } = await supabase
		.from('users')
		.select('*, tokens(*)')
		.eq('osu_id', session.sub)
		.single()

	if (!user?.tokens || error) return verifyError(t)

	const member = await getGuildMember(user.tokens).catch(() => verifyError(t))

	if (member?.roles.includes(env.GUILD_VERIFIED_ROLE_ID)) {
		redirect(`/verify?status=error&message=${t('alreadyVerified')}`)
	}

	const memberInfo = {
		osuName: user.osu_name,
		discordId: user.discord_id,
		roles: [env.GUILD_VERIFIED_ROLE_ID],
		tokens: user.tokens
	}

	if (!member) redirect(`/verify?status=error&message=${t('notInServer')}`)

	try {
		await updateGuildMember(memberInfo)
	} catch (err) {
		verifyError(t)
	}

	await sendMessage(env.GUILD_LOG_CHANNEL_ID, {
		embeds: [
			{
				color: 0x5e72eb,
				description: `<@${user.discord_id}> was verified.`
			}
		]
	})

	redirect('/verify?status=success')
}

function verifyError(t: Awaited<ReturnType<typeof getServerTranslations>>) {
	redirect(`/verify?status=error&message=${t('verificationFailed')}`)
}
