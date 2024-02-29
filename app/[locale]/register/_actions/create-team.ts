'use server'

import { createTeamAction } from '@schemas'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createTeam(
	formData: FormData
): Promise<{ error: CreateTeamError | null }> {
	const session = await getSession()
	const t = await getServerTranslations('RegistrationPage.Errors')

	if (!session) redirect('/unauthorized')

	if (session.user.restricted) {
		return {
			error: {
				title: t('Restricted.title'),
				message: t('Restricted.message')
			}
		}
	}

	const formTeamData = formData.get('teamData')?.toString()
	if (!formTeamData) {
		return { error: { title: 'default', message: 'failed to create team' } }
	}

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
					title: t('DuplicatePlayer.title'),
					message: t('DuplicatePlayer.message')
				}
			}
		}

		const { data: team, error: teamError } = await supabase
			.from('teams')
			.insert({
				name: teamData.name,
				acronym: teamData.acronym,
				timezone: teamData.timezone,
				flag: teamData.flag,
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
						title: t('Duplicate.title', {
							type: t(`Duplicate.Types.${violatedKey}`).toUpperCase()
						}),
						message: t('Duplicate.message', {
							type: t(`Duplicate.Types.${violatedKey}`)
						})
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

		return { error: null }
	} catch (err) {
		return {
			error: {
				title: t('Default.title'),
				message: t('Default.message')
			}
		}
	}
}

interface CreateTeamError {
	title: string
	message: string
}
