'use server'

import { env } from '@env'
import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import sharp from 'sharp'

export async function uploadImage(formData: FormData) {
	try {
		const teamName = formData.get('teamName')?.toString()
		const image = await (
			formData.get('file') as Blob | undefined
		)?.arrayBuffer()

		if (!teamName || !image) throw new Error('Missing team name or file')

		const {
			data: flag,
			info: { format }
		} = await sharp(image)
			.resize(333, 148)
			.toFormat('jpeg', { quality: 100 })
			.toBuffer({ resolveWithObject: true })

		const supabase = createClient(cookies())
		const { data, error } = await supabase.storage
			.from('flags')
			.upload(
				`${teamName}/flag.${format}`,
				new File([flag], `flag.${format}`, { type: `image/${format}` }),
				{ upsert: true }
			)

		if (error) throw error

		return {
			data: {
				path: data.path,
				url: `${env.SUPABASE_STORAGE_URL}/flags/${data.path}`
			},
			error: null
		}
	} catch (err) {
		return { error: { type: 'default', message: 'failed to create team' } }
	}
}
