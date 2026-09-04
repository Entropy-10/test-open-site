"use client"
import { catchError } from "next/error"
import type { ErrorInfo } from "next/error"

import { log } from "evlog/next/client"

function ErrorFallback(props: { title: string }, { error, retry }: ErrorInfo) {
  log.error({ error })

  return (
    <div>
      <h2>{props.title}</h2>
      <button type="button" onClick={() => retry()}>
        Try again
      </button>
    </div>
  )
}

export default catchError(ErrorFallback)
