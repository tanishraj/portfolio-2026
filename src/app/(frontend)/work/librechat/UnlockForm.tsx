'use client'

import React, { useActionState } from 'react'

import { unlockStudy, type UnlockState } from './actions'

export function UnlockForm() {
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlockStudy, {})

  return (
    <form action={action} className="mt-6 grid min-w-0 grid-cols-1 gap-3 sm:max-w-md">
      <label className="text-sm" htmlFor="access-code">
        Access code
      </label>
      <div className="flex min-w-0 flex-wrap gap-2">
        <input
          aria-describedby={state.error ? 'access-error' : undefined}
          aria-invalid={state.error ? true : undefined}
          autoCapitalize="none"
          autoComplete="off"
          className="min-w-0 flex-[1_1_10rem] rounded-full border border-line-strong bg-bg px-4 py-2.5 font-mono text-sm tracking-wide placeholder:text-muted focus:border-accent"
          id="access-code"
          name="code"
          placeholder="xxxx-xxxx-xxxx"
          required
          spellCheck={false}
        />
        <button
          className="shrink-0 rounded-full bg-highlight px-5 py-2.5 text-sm font-medium text-highlight-ink transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Checking…' : 'Open'}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm text-accent" id="access-error" role="status">
        {state.error}
      </p>
    </form>
  )
}
