import { cn } from '@utils/client'
import { forwardRef } from 'react'

import type { UseFormRegisterReturn } from 'react-hook-form'

const Input = forwardRef<HTMLInputElement, UseFormRegisterReturn>(
	({ ...props }, forwardedRef) => (
		<input
			{...props}
			ref={forwardedRef}
			className={cn(
				'w-full border-[1.5px] border-dark-blue text-dark-blue focus:-outline-offset-2'
			)}
		/>
	)
)

Input.displayName = 'Input'

export default Input
