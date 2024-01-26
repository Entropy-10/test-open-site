import { cn } from '@utils/client'
import { Loader2 } from 'lucide-react'

interface SectionLoaderProps {
	className?: string
}

export default function SectionLoader({ className }: SectionLoaderProps) {
	return (
		<div
			className={cn('flex h-48 items-center justify-center gap-2', className)}
		>
			<Loader2 size={25} strokeWidth={3} className='animate-spin' />
		</div>
	)
}
