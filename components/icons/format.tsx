import type { SVGProps } from 'react'

interface FormatIconProps extends SVGProps<SVGSVGElement> {
	className?: string
}

export default function FormatIcon({ className, ...props }: FormatIconProps) {
	return (
		<svg
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 49 49'
			fill='none'
			{...props}
		>
			<title>Format</title>
			<path
				d='M42.5 13.1374V35.8624C42.14 35.7949 41.7575 35.7499 41.375 35.7499C38.27 35.7499 35.75 38.2699 35.75 41.3749C35.75 41.7574 35.795 42.1399 35.8625 42.4999H13.1375C13.205 42.1399 13.25 41.7574 13.25 41.3749C13.25 38.2699 10.73 35.7499 7.625 35.7499C7.2425 35.7499 6.86 35.7949 6.5 35.8624V13.1374C6.86 13.2049 7.2425 13.2499 7.625 13.2499C10.73 13.2499 13.25 10.7299 13.25 7.62486C13.25 7.24236 13.205 6.85986 13.1375 6.49986H35.8625C35.795 6.85986 35.75 7.24236 35.75 7.62486C35.75 10.7299 38.27 13.2499 41.375 13.2499C41.7575 13.2499 42.14 13.2049 42.5 13.1374Z'
				stroke='#FFFEFA'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.25 7.625C13.25 10.73 10.73 13.25 7.625 13.25C7.2425 13.25 6.86 13.205 6.5 13.1375C3.935 12.62 2 10.3475 2 7.625C2 4.52 4.52 2 7.625 2C10.3475 2 12.62 3.935 13.1375 6.5C13.205 6.86 13.25 7.2425 13.25 7.625Z'
				stroke='#FFFEFA'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M47 7.625C47 10.3475 45.065 12.62 42.5 13.1375C42.14 13.205 41.7575 13.25 41.375 13.25C38.27 13.25 35.75 10.73 35.75 7.625C35.75 7.2425 35.795 6.86 35.8625 6.5C36.38 3.935 38.6525 2 41.375 2C44.48 2 47 4.52 47 7.625Z'
				stroke='#FFFEFA'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.25 41.375C13.25 41.7575 13.205 42.14 13.1375 42.5C12.62 45.065 10.3475 47 7.625 47C4.52 47 2 44.48 2 41.375C2 38.6525 3.935 36.38 6.5 35.8625C6.86 35.795 7.2425 35.75 7.625 35.75C10.73 35.75 13.25 38.27 13.25 41.375Z'
				stroke='#FFFEFA'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M47 41.375C47 44.48 44.48 47 41.375 47C38.6525 47 36.38 45.065 35.8625 42.5C35.795 42.14 35.75 41.7575 35.75 41.375C35.75 38.27 38.27 35.75 41.375 35.75C41.7575 35.75 42.14 35.795 42.5 35.8625C45.065 36.38 47 38.6525 47 41.375Z'
				stroke='#FFFEFA'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
