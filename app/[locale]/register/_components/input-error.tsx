interface InputErrorProps {
	message: string
}

export default function InputError({ message }: InputErrorProps) {
	return <p className='text-xs text-red-400'>{message}</p>
}
