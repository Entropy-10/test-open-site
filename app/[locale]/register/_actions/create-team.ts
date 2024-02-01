'use server'

import { env } from '@env'
import { createTeamAction } from '@schemas'
import { getDoc } from '@sheets'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createTeam(
	csrfToken: string,
	formData: FormData
): Promise<{ error: CreateTeamError | null }> {
	const session = getSession()
	if (!session) redirect('/unauthorized')

	if (session.restricted)
		return {
			error: {
				type: 'restricted',
				message:
					'Looks like you are restricted on osu. Unfortunately you can not register while restricted. If you believe this is a mistake try signing out and signing back into the site.'
			}
		}

	const formTeamData = formData.get('teamData')?.toString()
	if (!formTeamData) {
		return { error: { type: 'default', message: 'failed to create team' } }
	}

	//todo: add system for cleaning up created data on error
	try {
		const teamData = createTeamAction.parse(JSON.parse(formTeamData))
		const supabase = createClient(cookies())

		const { data: player } = await supabase
			.from('players')
			.select()
			.eq('user_id', teamData.osuId)
			.maybeSingle()

		if (player) {
			return {
				error: {
					type: 'duplicate_player',
					message:
						'Looks like you are already on a team. Please delete or leave your current team before making a new one.'
				}
			}
		}

		const { data: team, error: teamError } = await supabase
			.from('teams')
			.insert({
				name: teamData.name,
				acronym: teamData.acronym,
				timezone: teamData.timezone,
				flag: teamData.flag.url,
				updated_at: new Date().toISOString()
			})
			.select()
			.single()

		if (teamError) {
			const violatedKey = teamError.message
				.match(/_(name|acronym|player)_/)?.[0]
				.replaceAll('_', '') as 'name' | 'acronym' | 'player' | undefined

			if (violatedKey && teamError.code === '23505') {
				return {
					error: {
						type: `duplicate_${violatedKey}`,
						message: `Looks like a team with that ${violatedKey} already exists. Please use a different ${violatedKey} instead.`
					}
				}
			}
			throw teamError
		}

		const { error: playerError } = await supabase.from('players').insert({
			user_id: teamData.osuId,
			team_id: team.id,
			role: 'captain',
			joined_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		})

		if (playerError) throw playerError

		const doc = getDoc(env.ADMIN_SHEET)
		await doc.loadInfo()

		const sheet = doc.sheetsByTitle.TeamRegs

		await sheet.addRow({
			team_id: team.id,
			name: team.name,
			p1_osu_id: teamData.osuId,
			p1_discord_id: teamData.discordId,
			timezone: team.timezone
		})
		return { error: null }
	} catch (err) {
		return {
			error: {
				type: 'default',
				message:
					'We were unable to create your team. Looks like an issue on our end. Please try again to see if that helps.'
			}
		}
	}
}

interface CreateTeamError {
	type:
		| 'duplicate_name'
		| 'duplicate_acronym'
		| 'duplicate_player'
		| 'restricted'
		| 'default'
	message: string
}
