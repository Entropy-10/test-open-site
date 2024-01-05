interface MessageBoxProps {
  title: string
  message: string
  children: React.ReactNode
}

export default function MessageBox({
  title,
  message,
  children
}: MessageBoxProps) {
  return (
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    <div className='flex h-[195px] w-[90vw] max-w-[595px] flex-col items-center justify-center bg-gradient-to-bl from-lavender from-[-9%] to-light-blue to-[109%] p-[25px] drop-shadow-lg'>
      <div className='text-base font-bold text-milky-white sm:text-lg'>
        {title}
      </div>
      <p className='py-2 text-center text-xs font-medium text-milky-white sm:pb-5 sm:text-sm'>
        {message}
      </p>
      {children}
    </div>
  )
}
