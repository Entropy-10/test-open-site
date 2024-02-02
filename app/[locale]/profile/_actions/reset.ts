import { redirect } from 'next/navigation'

export async function reset(formData: FormData) {
	const pathname = formData.get('pathname')?.toString()
	redirect(pathname ?? '/profile')
}
