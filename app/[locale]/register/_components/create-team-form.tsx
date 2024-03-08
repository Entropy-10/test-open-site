'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { acceptedImageTypes, createTeamForm } from '@schemas'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ImagePicker from '~/components/image-picker'
import MessageBox from '~/components/message-box'
import TextModal from '~/components/text-modal'
import Button from '~/components/ui/button'
import Heading from '~/components/ui/heading'
import UtcPicker from '~/components/utc-picker'
import { createTeam } from '../_actions/create-team'
import { uploadImage } from '../_actions/upload-image'
import Input from './input'
import InputError from './input-error'
import Label from './label'

import type { ModalError } from '@types'
import { useTranslations } from 'next-intl'
import type { z } from 'zod'

interface CreateTeamFormProps {
	osuId: string
	discordId: string
}

export default function CreateTeamForm({ osuId }: CreateTeamFormProps) {
	const t = useTranslations('RegistrationPage')
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<ModalError | null>(null)
	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		resetField,
		formState: { errors, isSubmitting }
	} = useForm<z.infer<typeof createTeamForm>>({
		resolver: zodResolver(createTeamForm)
	})

	watch((data, { name }) => {
		if (name !== 'flag') return
		const file = (data.flag as unknown as FileList)?.item(0)
		if (!file || !acceptedImageTypes.includes(file.type)) {
			return setPreviewImage(null)
		}
		setPreviewImage(URL.createObjectURL(file))
	})

	function clearPreviewImage() {
		setPreviewImage(null)
		resetField('flag')
	}

	async function onSubmit(data: z.infer<typeof createTeamForm>) {
		if (!data.flag) return

		const flagBlob = new Blob([await data.flag.arrayBuffer()])
		const flagForm = new FormData()
		const csrfResp = await fetch('/csrf-token')
		const { csrfToken } = await csrfResp.json()

		flagForm.append('file', flagBlob)
		flagForm.append('file_type', data.flag.type)
		flagForm.append('team_name', data.name.toLowerCase().replaceAll(' ', '-'))
		flagForm.append('csrf_token', csrfToken)

		let flag: string
		try {
			const { url: flagUrl, error: imageUploadError } =
				await uploadImage(flagForm)

			if (!flagUrl || imageUploadError) throw Error
			flag = flagUrl
		} catch (err) {
			setError({
				title: t('Errors.UploadFailed.title'),
				message: t('Errors.UploadFailed.message')
			})
			return setOpen(true)
		}

		const teamForm = new FormData()
		teamForm.append('csrf_token', csrfToken)
		teamForm.append(
			'teamData',
			JSON.stringify({
				...data,
				flag,
				osuId
			})
		)

		const { error: createTeamError } = await createTeam(teamForm)

		if (createTeamError) {
			setError({
				title: createTeamError.title,
				message: createTeamError.message
			})
			return setOpen(true)
		}

		setSuccess(true)
	}

	return !success ? (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex w-[300px] flex-col gap-3 bg-milky-white px-6 py-4'
		>
			<Heading className='text-light-blue sm:text-md' padding={false} sub>
				{t('Form.heading')}
			</Heading>

			<div className='group'>
				<Label htmlFor='name'>*{t('Form.teamName')}</Label>
				<Input {...register('name')} />
				{errors.name?.message && <InputError message={errors.name.message} />}
			</div>

			<div className='group'>
				<Label htmlFor='acronym'>*{t('Form.teamAcronym')}</Label>
				<Input {...register('acronym')} />
				{errors.acronym?.message && (
					<InputError message={errors.acronym.message} />
				)}
			</div>

			<div className='group'>
				<Label htmlFor='timezone'>*{t('Form.timezone')}</Label>
				<UtcPicker {...register('timezone')} />
				{errors.timezone?.message && (
					<InputError message={errors.timezone.message} />
				)}
			</div>

			<div className='relative'>
				<Label htmlFor='flag'>*{t('Form.teamFlag')}</Label>
				<ImagePicker
					uploadText={t('Form.ImagePicker.upload')}
					recommendedText={t('Form.ImagePicker.recommended')}
					previewImage={previewImage}
					clearPreviewImage={clearPreviewImage}
					{...register('flag')}
				/>
				{errors.flag?.message && <InputError message={errors.flag.message} />}
			</div>

			<Button
				loading={isSubmitting}
				type='submit'
				className='w-full'
				variant='invertedOutline'
			>
				{isSubmitting
					? t('Form.createButton.loadingText')
					: t('Form.createButton.text')}
			</Button>

			{error && (
				<TextModal
					open={open}
					setOpen={() => setOpen(!open)}
					title={error.title}
					message={error.message}
				/>
			)}
		</form>
	) : (
		<MessageBox
			title={t('Form.Success.title')}
			message={t('Form.Success.message')}
		>
			<Button href='/team' variant='outline'>
				{t('Form.Success.teamManagementButton')}
			</Button>
		</MessageBox>
	)
}
