'use client'

import { Link, usePathname } from '@navigation'
import { localesMetadata } from '@siteConfig'
import { cn } from '@utils/client'
import Image from 'next/image'
import ChevronDown from '~/components/icons/chevron-down'
import RadialProgress from '~/components/radial-progress'
import * as Dropdown from '~/components/ui/dropdown'

interface LanguagePickerProps {
	locale: string
	progress:
		| {
				code: string
				progress: number
		  }[]
		| null
}

export default function LanguagePicker({
	locale,
	progress
}: LanguagePickerProps) {
	const pathname = usePathname()

	return (
		<Dropdown.Root>
			<Dropdown.Trigger className='group flex select-none items-center space-x-1 focus:outline-none'>
				<Image
					width={20}
					height={15}
					alt={locale}
					src={`/flags/${locale}.svg`}
					className='h-[15px] w-[20px] drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.25)]'
				/>
				<ChevronDown
					className='size-6 transition-all duration-300 group-data-[state=open]:rotate-180'
					pathClassName='stroke-medium-blue'
				/>
			</Dropdown.Trigger>

			<Dropdown.Content className='w-48'>
				{localesMetadata.map(({ code, editorCode, flag, name }) => {
					const langProgress = progress?.find(
						lang => lang.code === (editorCode ?? code)
					)?.progress

					return (
						<Dropdown.Item key={code} className='p-0'>
							<Link
								href={pathname}
								locale={code}
								className={cn(
									'flex h-full w-full cursor-pointer select-none items-center justify-between px-3 py-0.5 focus:outline-none',
									locale === code && 'bg-light-blue font-bold text-milky-white'
								)}
							>
								<div className='flex items-center'>
									<Image
										width={16}
										height={12}
										alt={name}
										src={`/flags/${flag}`}
										className='mr-2 h-[12px] w-[16px] drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.25)]'
									/>
									{name}
								</div>

								{code !== 'en' && langProgress !== undefined && (
									<div className='flex items-center gap-1'>
										<span className='text-xs'>{langProgress}%</span>
										<RadialProgress progress={langProgress} />
									</div>
								)}
							</Link>
						</Dropdown.Item>
					)
				})}
			</Dropdown.Content>
		</Dropdown.Root>
	)
}
