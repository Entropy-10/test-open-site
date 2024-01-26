interface UnauthorizedPageProps {
	searchParams: {
		type: 'auth-error'
		message?: string
	}
}

export default function UnauthorizedPage({
	searchParams
}: UnauthorizedPageProps) {
	const { type, message } = searchParams

	if (type === 'auth-error') {
		return (
			<div>
				<h2>Authorization Error</h2>
				<p>{message}</p>
			</div>
		)
	}

	return (
		<div>
			<h2>Unauthorized</h2>
			<p>Please sign in first before accessing this page.</p>
		</div>
	)
}
