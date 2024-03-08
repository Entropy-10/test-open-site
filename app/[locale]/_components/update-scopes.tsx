import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CsrfInput } from '~/components/csrf-input'
import Button from '~/components/ui/button'

export default function UpdateScopes() {
	const csrfToken = headers().get('X-CSRF-Token') ?? 'missing'

	async function updateScopes() {
		'use server'
		redirect('/profile')
	}

	return (
		<div className='flex flex-col items-center justify-center gap-1 border-[#1E92F4] border-y-2 bg-[#1E92F4]/40 p-2'>
			<p className='text-center text-sm sm:text-base'>
				The requested oauth scopes for Discord have changed! Please visit your
				profile and click the relink button.
			</p>

			<form action={updateScopes}>
				<CsrfInput token={csrfToken} />
				<Button>PROFILE</Button>
			</form>
		</div>
	)
}
