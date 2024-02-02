import * as Select from '@radix-ui/react-select'
import { utcOptions } from '@siteConfig'
import { forwardRef } from 'react'

import ChevronDownIcon from '~/components/icons/chevron-down'

import type { UseFormRegisterReturn } from 'react-hook-form'

const UtcPicker = forwardRef<HTMLButtonElement, UseFormRegisterReturn>(
	({ name, onChange, required, disabled }, forwardedRef) => (
		<Select.Root
			name={name}
			onValueChange={value => onChange({ target: { name, value } })}
			required={required}
			disabled={disabled}
		>
			<Select.Trigger
				ref={forwardedRef}
				className='focus:-outline-offset-2 flex w-28 justify-between border-[1.5px] border-dark-blue pl-1 text-dark-blue'
			>
				<Select.Value />
				<Select.Icon>
					<ChevronDownIcon
						className='size-6'
						pathClassName='stroke-dark-blue'
					/>
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className='overflow-hidden border-[1.5px] border-dark-blue bg-milky-white'>
					<Select.ScrollUpButton className='flex h-[20px] cursor-default items-center justify-center'>
						<ChevronDownIcon
							className='size-6 rotate-180'
							pathClassName='stroke-dark-blue'
						/>
					</Select.ScrollUpButton>
					<Select.Viewport>
						{utcOptions.map(utcOption => (
							<Select.Item
								key={utcOption}
								value={utcOption}
								className='flex h-[25px] cursor-pointer items-center pl-1 data-[highlighted]:bg-light-blue/10 data-[state=checked]:font-bold data-[highlighted]:text-light-blue data-[state=checked]:text-light-blue data-[highlighted]:outline-none'
							>
								<Select.ItemText>{utcOption}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Viewport>
					<Select.ScrollDownButton className='flex h-[20px] cursor-default items-center justify-center'>
						<ChevronDownIcon
							className='size-6'
							pathClassName='stroke-dark-blue'
						/>
					</Select.ScrollDownButton>
					<Select.Arrow />
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	)
)

UtcPicker.displayName = 'UtcPicker'

export default UtcPicker
