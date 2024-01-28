interface InputErrorProps {
	message: string
}

export default function InputError({ message }: InputErrorProps) {
	return <p className='text-red-400 text-xs'>{message}</p>
}
