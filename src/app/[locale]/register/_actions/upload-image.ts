'use server'

import sharp from 'sharp'

import { env } from '@env'
import { createClient } from '@supabase/server'

export async function uploadImage(formData: FormData) {
	try {
		const teamName = formData.get('team_name')?.toString()
		const imageType = formData.get('file_type')?.toString()
		const image = await (
			formData.get('file') as Blob | undefined
		)?.arrayBuffer()

		if (!teamName || !image || !imageType) {
			throw new Error('Missing team name or file')
		}

		const isGif = imageType.endsWith('gif')
		const sharpImage = sharp(image, { animated: isGif }).resize(666, 296)

		if (isGif) sharpImage.gif({ interFrameMaxError: 25 })
		else sharpImage.jpeg({ quality: 100 })

		const {
			data: flag,
			info: { format }
		} = await sharpImage.toBuffer({ resolveWithObject: true })
		const flagBlobParts = [flag as unknown as BlobPart]

		const supabase = await createClient()
		const { data, error } = await supabase.storage.from('flags').upload(
			`${teamName}/flag-${Date.now()}.${format}`,
			new File(flagBlobParts, `flag.${format}`, {
				type: `image/${format}`
			}),
			{ upsert: true }
		)

		if (error) throw error

		return {
			url: `${env.SUPABASE_STORAGE_URL}/flags/${data.path}`,
			error: null
		}
	} catch (_) {
		return { error: { type: 'default', message: 'failed to create team' } }
	}
}
