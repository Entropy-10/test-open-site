interface MessageBoxProps {
	title: string
	message: string
	children?: React.ReactNode
}

export default function MessageBox({
	title,
	message,
	children
}: MessageBoxProps) {
	return (
		// eslint-disable-next-line tailwindcss/no-contradicting-classname
		<div className='flex h-[195px] w-[90vw] max-w-[595px] flex-col items-center justify-center bg-gradient-to-bl from-[-9%] from-lavender to-[109%] to-light-blue p-[25px] drop-shadow-lg'>
			<div className='font-bold text-base text-milky-white sm:text-lg'>
				{title}
			</div>
			<p className='py-2 text-center font-medium text-milky-white text-xs sm:pb-5 sm:text-sm'>
				{message}
			</p>
			{children}
		</div>
	)
}
