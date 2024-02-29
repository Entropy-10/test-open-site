'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { acceptedImageTypes, createTeamForm } from '@schemas'
import { ModalError } from '@types'
import { cn, getFlagPathFromUrl } from '@utils/client'
import { diff } from 'deep-object-diff'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ImagePicker from '~/components/image-picker'
import TextModal from '~/components/text-modal'
import Button from '~/components/ui/Button'
import UtcPicker from '~/components/utc-picker'
import { deleteItem } from '../_actions/delete'
import { deleteTeam } from '../_actions/delete-team'
import updateTeam from '../_actions/update-team'
import uploadImage from '../_actions/upload-image'
import DeleteButton from './delete-button'

interface EditorProps {
	userId: string
	isCaptain: boolean
	team: {
		acronym: string
		created_at: string
		flag: string
		id: number
		name: string
		timezone: string
		updated_at: string
	}
}

export default function Editor({ userId, isCaptain, team }: EditorProps) {
	const t = useTranslations('TeamPage')
	const registerT = useTranslations('RegistrationPage')
	const [editing, setEditing] = useState(false)
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [isCurrentImage, setIsCurrentImage] = useState(false)
	const [modalMessage, setModalMessage] = useState<ModalError | null>(null)
	const [open, setOpen] = useState(false)
	const [csrfToken, setCsrfToken] = useState<string>('loading...')

	const {
		register,
		handleSubmit,
		watch,
		resetField,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<z.infer<typeof createTeamForm>>({
		resolver: zodResolver(createTeamForm),
		defaultValues: {
			name: team.name,
			acronym: team.acronym,
			timezone: team.timezone
		}
	})

	useEffect(() => {
		const el = document.querySelector(
			'meta[name="x-csrf-token"]'
		) as HTMLMetaElement | null
		if (el) setCsrfToken(el.content)
		else setCsrfToken('missing')
	}, [])

	useEffect(() => {
		async function getFlagFile() {
			const flagResponse = await fetch(team.flag)
			const flagBlob = await flagResponse.blob()
			const flagFile = new File(
				[flagBlob],
				`flag.${team.flag.split(/[#?]/)[0].split('.').pop()?.trim()}`,
				{ type: flagBlob.type }
			)
			if (!flagFile) return
			setValue('flag', flagFile)
			setIsCurrentImage(true)
		}
		getFlagFile()
	}, [setValue, team])

	watch((data, { name }) => {
		if (name !== 'flag') return
		const file =
			data.flag instanceof File
				? data.flag
				: (data.flag as unknown as FileList)?.item(0)
		if (!file || !acceptedImageTypes.includes(file.type)) {
			return setPreviewImage(null)
		}
		setPreviewImage(URL.createObjectURL(file))
	})

	function clearPreviewImage() {
		setPreviewImage(null)
		setIsCurrentImage(false)
		resetField('flag')
	}

	async function onSubmit(data: z.infer<typeof createTeamForm>) {
		let newFlag: string | undefined
		let updatedTeam = false

		function formatFlagName(name: string) {
			return name.toLowerCase().replaceAll(' ', '-')
		}

		const oldFlagInfo = getFlagPathFromUrl(team.flag)
		const oldFlagPath = `${oldFlagInfo?.folder}/${oldFlagInfo?.filename}`

		if (!isCurrentImage) {
			if (!data.flag) {
				setModalMessage({
					title: registerT('Errors.UploadFailed.title'),
					message: registerT('Errors.UploadFailed.message')
				})
				return setOpen(true)
			}

			const flagBlob = new Blob([await data.flag.arrayBuffer()])
			const imageForm = new FormData()
			imageForm.append('file', flagBlob)
			imageForm.append('file_type', data.flag.type)
			imageForm.append('old_flag_path', oldFlagPath)
			imageForm.append('team_name', formatFlagName(data.name))
			imageForm.append('csrf_token', csrfToken)

			try {
				const { url: flagUrl, error: imageUploadError } =
					await uploadImage(imageForm)

				if (!flagUrl || imageUploadError) throw Error
				newFlag = flagUrl
				updatedTeam = true
			} catch (err) {
				setModalMessage({
					title: registerT('Errors.UploadFailed.title'),
					message: registerT('Errors.UploadFailed.message')
				})
				return setOpen(true)
			}
		}

		const { flag, id, created_at, updated_at, ...originalTeam } = team
		const { flag: f, ...newTeam } = data
		const newTeamData = diff(originalTeam, newTeam)

		if (Object.keys(newTeamData).length === 0 && isCurrentImage) {
			if (!updatedTeam) {
				setModalMessage({
					title: t('Errors.NoChanges.title'),
					message: t('Errors.NoChanges.message')
				})
				return setOpen(true)
			}
		}

		const teamForm = new FormData()
		teamForm.append('csrf_token', csrfToken)
		teamForm.append(
			'teamData',
			JSON.stringify({
				...newTeamData,
				id,
				flag: {
					new: !!newFlag,
					newPath: `${formatFlagName(data.name)}/${
						newFlag
							? `${getFlagPathFromUrl(newFlag)?.filename}`
							: `${oldFlagInfo?.filename}`
					}`,
					oldPath: oldFlagPath
				}
			})
		)

		const { error: updateTeamError } = await updateTeam(teamForm)
		if (updateTeamError) {
			setModalMessage({
				title: updateTeamError.title,
				message: updateTeamError.message
			})
			return setOpen(true)
		}

		setModalMessage({
			title: t('TeamUpdated.title'),
			message: t('TeamUpdated.message')
		})
		setEditing(false)
		return setOpen(true)
	}

	return (
		<section className='padding relative h-[128px] space-y-4'>
			<div className='flex gap-3'>
				{editing ? (
					<ImagePicker
						uploadText={registerT('Form.ImagePicker.upload')}
						recommendedText={registerT('Form.ImagePicker.recommended')}
						previewImage={previewImage}
						clearPreviewImage={clearPreviewImage}
						defaultValue={team.flag}
						className='h-[80px] w-[180px] border-milky-white'
						{...register('flag')}
					/>
				) : (
					<Image
						width={180}
						height={80}
						src={team.flag}
						alt='team flag'
						className='h-[80px] w-[180px]'
					/>
				)}

				<form
					onSubmit={handleSubmit(onSubmit)}
					className={cn(
						'flex flex-col justify-center font-extrabold',
						editing && 'w-52 gap-1'
					)}
				>
					{editing ? (
						<input
							className='h-6 border border-dashed bg-transparent px-1 font-semibold focus:outline-none'
							{...register('name')}
						/>
					) : (
						<div className='text-lg uppercase md:text-xl'>{team.name}</div>
					)}
					{editing ? (
						<input
							className='h-6 border border-dashed bg-transparent px-1 font-semibold focus:outline-none'
							{...register('acronym')}
						/>
					) : (
						<div className='text-xs md:text-sm'>{team.acronym}</div>
					)}
					<div className={cn(editing && 'flex items-center gap-1')}>
						<span className='text-xs md:text-sm'>{t('timezone')}:</span>{' '}
						{editing ? (
							<UtcPicker
								defaultValue={team.timezone}
								className={{
									trigger:
										'h-6 w-full border-milky-white border-dashed stroke-milky-white font-semibold text-milky-white focus:outline-none'
								}}
								{...register('timezone')}
							/>
						) : (
							team.timezone
						)}
					</div>

					{editing && (
						<div className='padding absolute bottom-0 left-0 flex gap-3'>
							<Button
								className='w-[180px]'
								loading={isSubmitting}
								type='submit'
							>
								UPDATE
							</Button>
							<Button
								type='button'
								onClick={() => setEditing(false)}
								className='w-[180px]'
								variant='outline'
							>
								CANCEL
							</Button>
						</div>
					)}
				</form>
				<div className='flex flex-col'>
					{Object.entries(errors).map(([type, error]) => (
						<p key={type}>{error.message}</p>
					))}
				</div>
			</div>

			{isCaptain && !editing && (
				<div className='flex gap-3'>
					<>
						<Button onClick={() => setEditing(true)} className='w-[180px]'>
							{t('Buttons.edit')}
						</Button>
						<form action={deleteTeam}>
							<input name='csrf_token' value={csrfToken} hidden readOnly />
							<input name='team_id' defaultValue={team.id} hidden />
							<input name='team_flag' defaultValue={team.flag} hidden />
							<input name='user_id' defaultValue={userId} hidden />
							<DeleteButton
								className='w-[180px]'
								variant='outline'
								text={t('Buttons.delete')}
							/>
						</form>
					</>
				</div>
			)}

			{!isCaptain && (
				<form action={deleteItem}>
					<input name='csrf_token' value={csrfToken} hidden readOnly />
					<input name='id' defaultValue={userId} hidden />
					<input name='type' defaultValue='player' hidden />
					<Button className='w-[180px]'>{t('Buttons.leave')}</Button>
				</form>
			)}

			{modalMessage && (
				<TextModal
					open={open}
					setOpen={() => setOpen(!open)}
					title={modalMessage.title}
					message={modalMessage.message}
				/>
			)}
		</section>
	)
}
