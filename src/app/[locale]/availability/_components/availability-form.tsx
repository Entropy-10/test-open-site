'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { availabilityForm } from '@schemas'
import { utcTimes } from '@siteConfig'
import type { ModalError } from '@types'

import MessageBox from '~/components/message-box'
import TextModal from '~/components/text-modal'
import Button from '~/components/ui/button'
import Heading from '~/components/ui/heading'
import UtcPicker from '~/components/utc-picker'
import { updateAvailability } from '../_actions/update-availability'
import InputError from './input-error'
import Label from './label'

export default function AvailabilityForm() {
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<ModalError | null>(null)
	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<z.infer<typeof availabilityForm>>({
		resolver: zodResolver(availabilityForm)
	})

	async function onSubmit(data: z.infer<typeof availabilityForm>) {
		const availabilityForm = new FormData()
		availabilityForm.append(
			'availability',
			JSON.stringify({
				saturday: {
					startingTime: data.saturdayStartingTime,
					endingTime: data.saturdayEndingTime
				},
				sunday: {
					startingTime: data.sundayStartingTime,
					endingTime: data.sundayEndingTime
				}
			})
		)

		const { error } = await updateAvailability(availabilityForm)

		if (error) {
			setError({
				title: error.title,
				message: error.message
			})
			return setOpen(true)
		}

		setSuccess(true)
	}

	return !success ? (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-6 bg-milky-white px-6 py-4'
		>
			<Heading className='text-light-blue sm:text-md' padding={false} sub>
				YOUR AVAILABILITY.
			</Heading>

			<div>
				<h3 className='font-bold text-dark-blue'>Saturday</h3>
				<div className='group mb-1'>
					<Label htmlFor='timezone'>*Starting Time</Label>
					<UtcPicker
						{...register('saturdayStartingTime')}
						values={utcTimes}
						className={{ trigger: 'w-full' }}
					/>
					{errors.saturdayStartingTime?.message && (
						<InputError message={errors.saturdayStartingTime.message} />
					)}
				</div>

				<div className='group'>
					<Label htmlFor='timezone'>*Ending Time</Label>
					<UtcPicker
						{...register('saturdayEndingTime')}
						values={utcTimes}
						className={{ trigger: 'w-full' }}
					/>
					{errors.saturdayEndingTime?.message && (
						<InputError message={errors.saturdayEndingTime.message} />
					)}
				</div>
			</div>

			<div>
				<h3 className='font-bold text-dark-blue'>Sunday</h3>
				<div className='group mb-1'>
					<Label htmlFor='timezone'>*Starting Time</Label>
					<UtcPicker
						{...register('sundayStartingTime')}
						values={utcTimes}
						className={{ trigger: 'w-full' }}
					/>
					{errors.sundayStartingTime?.message && (
						<InputError message={errors.sundayStartingTime.message} />
					)}
				</div>

				<div className='group'>
					<Label htmlFor='timezone'>*Ending Time</Label>
					<UtcPicker
						{...register('sundayEndingTime')}
						values={utcTimes}
						className={{ trigger: 'w-full' }}
					/>
					{errors.sundayEndingTime?.message && (
						<InputError message={errors.sundayEndingTime.message} />
					)}
				</div>
			</div>

			<Button
				loading={isSubmitting}
				type='submit'
				className='mt-2 w-full'
				variant='invertedOutline'
			>
				{isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
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
			title='AVAILABILITY UPDATED!'
			message="Your team's availability has been updated. This will be used for all future default schedules."
		>
			<Button href='/team' variant='outline'>
				TEAM MANAGEMENT
			</Button>
		</MessageBox>
	)
}
