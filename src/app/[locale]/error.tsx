"use client"

import { useEffect } from "react"

import { useTranslations } from "next-intl"

import { Background } from "~/components/ui/background"
import { Button } from "~/components/ui/button"
import { MessageBox } from "~/components/ui/message-box"
import { Link } from "~/i18n/navigation"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations("ErrorPage")
  useEffect(() => {
    console.error(error) // switch to evlog
  }, [error])

  return (
    <Background className="flex min-h-screen items-center justify-center">
      <MessageBox title={t("title")} message={t("message")}>
        <div className="max-xs:grid max-xs:w-full max-xs:grid-cols-2 flex gap-6">
          <Button onClick={() => reset()} className="max-xs:w-full">
            {t("retryButton")}
          </Button>

          <Button
            variant="outline"
            className="max-xs:w-full"
            nativeButton={false}
            render={<Link href="/" />}
          >
            {t("goHomeButton")}
          </Button>
        </div>
      </MessageBox>
    </Background>
  )
}
