import { z } from 'zod'

export const acceptedImageTypes = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif'
]

export const createTeamForm = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Team name is required')
		.min(3, 'Cannot be less than three characters')
		.max(20, 'Cannot be more than 20 characters'),
	acronym: z
		.string()
		.trim()
		.toUpperCase()
		.min(1, 'Team name is required')
		.min(3, 'Cannot be less than three characters')
		.max(4, 'Cannot be more than four characters'),
	timezone: z.string().toUpperCase().min(1, 'Timezone is required'),
	flag: z
		.custom<FileList>()
		.transform(file => (file?.length > 0 ? file.item(0) : null))
		.refine(file => !!file, 'Team flag is required')
		.refine(file => !!file && file.size <= 5000000, 'Max image size is 5MB')
		.refine(
			file => !!file && acceptedImageTypes.includes(file.type),
			'Only .jpg, .jpeg, .gif, and .png formats are supported'
		)
})

export const createTeamAction = z.object({
	name: z.string().min(1),
	acronym: z.string().min(1),
	timezone: z.string().min(1),
	flag: z.object({
		path: z.string().min(1),
		url: z.string().min(1)
	}),
	osuId: z.string().min(1),
	discordId: z.string().min(1)
})
