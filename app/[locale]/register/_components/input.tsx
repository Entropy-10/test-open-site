import { cn } from '@utils/client'
import { forwardRef } from 'react'

import type { UseFormRegisterReturn } from 'react-hook-form'

const Input = forwardRef<HTMLInputElement, UseFormRegisterReturn>(
	({ ...props }, forwardedRef) => (
		<input
			{...props}
			ref={forwardedRef}
			className={cn(
				'focus:-outline-offset-2 w-full border-[1.5px] border-dark-blue text-dark-blue'
			)}
		/>
	)
)

Input.displayName = 'Input'

export default Input
