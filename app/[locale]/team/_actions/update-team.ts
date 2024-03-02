'use server'

import { env } from '@env'
import { updateTeamAction } from '@schemas'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getServerTranslations } from '@utils/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function updateTeam(formData: FormData) {
	const t = await getServerTranslations('TeamPage.Errors')
	const registerT = await getServerTranslations('RegistrationPage.Errors')
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const formTeamData = formData.get('teamData')?.toString()
	if (!formTeamData) return { error: { title: 'default', message: '' } }

	try {
		const { id, flag, ...teamData } = updateTeamAction.parse(
			JSON.parse(formTeamData)
		)
		const supabase = createClient(cookies())
		const { error: teamError } = await supabase
			.from('teams')
			.update({
				...teamData,
				flag: `${env.SUPABASE_STORAGE_URL}/flags/${flag.newPath}`,
				updated_at: new Date().toISOString()
			})
			.eq('id', id)

		if (teamError) {
			const violatedKey = teamError.message
				.match(/_(name|acronym|player)_/)?.[0]
				.replaceAll('_', '') as 'name' | 'acronym' | 'player' | undefined

			if (violatedKey && teamError.code === '23505') {
				return {
					error: {
						title: registerT('Duplicate.title', {
							type: registerT(`Duplicate.Types.${violatedKey}`).toUpperCase()
						}),
						message: registerT('Duplicate.message', {
							type: registerT(`Duplicate.Types.${violatedKey}`)
						})
					}
				}
			}
			throw teamError
		}

		if (teamData.name && !flag.new) {
			const { error: flagError } = await supabase.storage
				.from('flags')
				.move(flag.oldPath, flag.newPath)
			if (flagError) throw flagError
		}

		revalidatePath('/team')
		return { error: null }
	} catch (err) {
		console.log(err)
		return {
			error: {
				title: t('UpdateTeamFailed.title'),
				message: t('UpdateTeamFailed.message')
			}
		}
	}
}
