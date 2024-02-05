'use server'

import {
	addGuildMember,
	getGuildMember,
	sendMessage,
	updateGuildMember
} from '@discord'
import { env } from '@env'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verify() {
	const session = await getSession()
	if (!session) return verifyError('Invalid session. Try signing in again.')

	const supabase = createClient(cookies())
	const { data: user, error } = await supabase
		.from('users')
		.select('*, tokens(*)')
		.eq('osu_id', session.sub)
		.single()

	if (!user?.tokens || error) return verifyError('No user found in database.')

	const member = await getGuildMember(user.tokens).catch(() => verifyError())

	if (member?.roles.includes(env.GUILD_VERIFIED_ROLE_ID)) {
		redirect(
			'/verify?status=error&message=You are already verified. If you think this is a mistake please DM @__entro for further help.'
		)
	}

	const memberInfo = {
		osuName: user.osu_name,
		discordId: user.discord_id,
		roles: [env.GUILD_VERIFIED_ROLE_ID],
		tokens: user.tokens
	}

	try {
		if (!member) {
			await addGuildMember(memberInfo)
		} else {
			await updateGuildMember(memberInfo)
		}
	} catch (err) {
		verifyError()
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

function verifyError(message?: string) {
	redirect(
		`/verify?status=error&message=Verification failed${
			message ? `: ${message}` : '. Please try again later.'
		}`
	)
}
