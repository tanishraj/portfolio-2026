'use server'

import { redirect } from 'next/navigation'

import { unlock } from '@/lib/access'

export type UnlockState = { error?: string }

export async function unlockStudy(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const code = String(formData.get('code') ?? '')
  const result = await unlock('librechat', code)
  if (!result.ok) return { error: result.error }
  redirect('/work/librechat')
}
