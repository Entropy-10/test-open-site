/* eslint-disable @typescript-eslint/require-await */
import { redirect } from 'next/navigation'

export async function reset(formData: FormData) {
  const pathname = formData.get('pathname')?.toString()
  redirect(pathname ?? '/team')
}
