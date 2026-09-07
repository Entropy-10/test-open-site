"use client"

import { Button } from "~/components/ui/button"
import { Link } from "~/i18n/navigation"

export default function NotFound() {
  return (
    <div className="text-medium-blue flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Not Found</h1>
      <p className="text-lg">Sorry, but this page seems to not exist?</p>
      <Button
        variant="invertedOutline"
        nativeButton={false}
        render={<Link href="/">Go Home</Link>}
      />
    </div>
  )
}
