interface ErrorPageProps {
  searchParams: {
    message: string
  }
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  const { message } = searchParams
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}
