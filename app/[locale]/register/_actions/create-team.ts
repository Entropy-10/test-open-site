'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/server'
import { getSession } from '@utils/server'
import { createTeamAction } from '@schemas'

export async function createTeam(formData: FormData) {
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

  const teamData = createTeamAction.parse(JSON.parse(formTeamData))

  const supabase = createClient(cookies())

  try {
    const { data: player } = await supabase
      .from('players')
      .select()
      .eq('user_id', teamData.userId)
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

    if (teamError && teamError.code === '23505') {
      return {
        error: {
          type: 'duplicate_team',
          message:
            'Looks like a team with that name already exists. Please use a different name instead.'
        }
      }
    } else if (teamError) throw teamError

    const { error: playerError } = await supabase.from('players').insert({
      user_id: teamData.userId,
      team_id: team.id,
      role: 'captain',
      joined_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

    if (playerError) throw playerError

    return { error: null }
  } catch (err) {
    return { error: { type: 'default', message: 'failed to create team' } }
  }
}
