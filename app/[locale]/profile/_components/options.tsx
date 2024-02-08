'use client'

import { ModalError } from '@types'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import TextModal from '~/components/text-modal'
import Button from '~/components/ui/Button'
import * as Dropdown from '~/components/ui/dropdown'
import { Cancel } from '~/components/ui/modal'
import { deleteAccount } from '../_actions/delete-account'

export default function Options() {
	const [open, setOpen] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [error, setError] = useState<ModalError | null>(null)

	async function handleDelete() {
		setDeleting(true)
		const csrfResp = await fetch('/csrf-token')
		const { csrfToken } = await csrfResp.json()

		const { error } = await deleteAccount(csrfToken)
		if (error) setError({ title: error.title, message: error.message })
		setDeleting(false)
	}

	return (
		<>
			<TextModal
				open={open}
				setOpen={() => setOpen(!open)}
				title={error ? error.title : 'DELETE ACCOUNT?'}
				message={
					error
						? error.message
						: 'Are you sure you would like to delete your account? This will delete any data stored and revoke all your active access tokens for osu! and Discord.'
				}
			>
				{error ? (
					<Cancel onClick={() => setError(null)} variant='outline'>
						CLOSE
					</Cancel>
				) : (
					<div className='flex gap-6 max-xs:grid max-xs:w-full max-xs:grid-cols-2'>
						<Button
							loading={deleting}
							onClick={() => handleDelete()}
							className='text-red-400 max-xs:w-full hover:bg-red-400 hover:text-milky-white'
						>
							{deleting ? 'DELETING' : 'DELETE'}
						</Button>
						<Cancel variant='outline' className='max-xs:w-full'>
							NO THANKS
						</Cancel>
					</div>
				)}
			</TextModal>

			<Dropdown.Root>
				<Dropdown.Trigger className='flex w-4 items-center bg-milky-white hover:bg-medium-blue focus:outline-none'>
					<MoreVertical
						strokeWidth={3}
						className='w-4 stroke-medium-blue hover:stroke-milky-white'
					/>
				</Dropdown.Trigger>

				<Dropdown.Content sideOffset={4} align='start' className='min-w-40'>
					<Dropdown.Item className='p-0'>
						<button
							type='button'
							onClick={() => setOpen(true)}
							className='w-full px-3 py-0.5 text-left text-red-400 hover:bg-red-400 hover:text-milky-white focus:outline-none'
						>
							DELETE ACCOUNT
						</button>
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown.Root>
		</>
	)
}
