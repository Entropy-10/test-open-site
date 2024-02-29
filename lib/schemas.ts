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
		.min(1, 'Name is required')
		.min(3, "Name can't be less than three characters")
		.max(20, "Name can't be more than 20 characters"),
	acronym: z
		.string()
		.trim()
		.toUpperCase()
		.min(1, 'Acronym is required')
		.min(3, "Acronym can't be less than three characters")
		.max(4, "Acronym can't be more than four characters")
		.regex(/^\w+$/, 'Acronym only allows letters or numbers'),
	timezone: z.string().toUpperCase().min(1, 'Timezone is required'),
	flag: z
		.custom<FileList | File>()
		.transform(file => (file instanceof FileList ? file.item(0) : file))
		.refine(file => !!file, 'Flag is required')
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
	flag: z.string().min(1),
	osuId: z.string().min(1)
})

export const updateTeamAction = z.object({
	id: z.number().min(1),
	name: z.string().min(1).optional(),
	acronym: z.string().min(1).optional(),
	timezone: z.string().min(1).optional(),
	flag: z.object({
		new: z.boolean(),
		newPath: z.string().min(1),
		oldPath: z.string().min(1)
	})
})
