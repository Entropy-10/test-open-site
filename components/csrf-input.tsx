interface CsrfInputProps {
	token: string
}

export function CsrfInput({ token }: CsrfInputProps) {
	return <input name='csrf_token' defaultValue={token} hidden />
}
