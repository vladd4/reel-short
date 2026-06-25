'use client'

import { useState } from 'react'
import { z } from 'zod'
import { authService } from '@/services/auth.service'

const changeEmailSchema = z.object({
  newEmail: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  currentPassword: z.string().min(1, 'Current password is required'),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
})

function collectErrors(issues: z.ZodIssue[]): Record<string, string> {
  const errs: Record<string, string> = {}
  for (const issue of issues) {
    const key = issue.path[0] as string
    if (!errs[key]) errs[key] = issue.message
  }
  return errs
}

export function useAccountSettings(refreshUser: () => Promise<void>) {
  const [activeEdit, setActiveEdit] = useState<'email' | 'password' | null>(null)

  const [newEmail, setNewEmail] = useState('')
  const [emailCurrentPw, setEmailCurrentPw] = useState('')
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({})
  const [emailApiError, setEmailApiError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({})
  const [pwApiError, setPwApiError] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwSuccess, setPwSuccess] = useState(false)

  function openEdit(section: 'email' | 'password') {
    setActiveEdit((prev) => (prev === section ? null : section))
    setNewEmail('')
    setEmailCurrentPw('')
    setEmailErrors({})
    setEmailApiError('')
    setEmailSuccess(false)
    setCurrentPw('')
    setNewPw('')
    setPwErrors({})
    setPwApiError('')
    setPwSuccess(false)
  }

  async function submitEmailChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEmailApiError('')
    setEmailSuccess(false)
    const result = changeEmailSchema.safeParse({ newEmail, currentPassword: emailCurrentPw })
    if (!result.success) {
      setEmailErrors(collectErrors(result.error.issues))
      return
    }
    setEmailErrors({})
    setEmailLoading(true)
    try {
      await authService.updateEmail(newEmail, emailCurrentPw)
      await refreshUser()
      setEmailSuccess(true)
      setNewEmail('')
      setEmailCurrentPw('')
    } catch (err) {
      setEmailApiError(err instanceof Error ? err.message : 'Failed to update email')
    } finally {
      setEmailLoading(false)
    }
  }

  async function submitPasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPwApiError('')
    setPwSuccess(false)
    const result = changePasswordSchema.safeParse({
      currentPassword: currentPw,
      newPassword: newPw,
    })
    if (!result.success) {
      setPwErrors(collectErrors(result.error.issues))
      return
    }
    setPwErrors({})
    setPwLoading(true)
    try {
      await authService.updatePassword(currentPw, newPw)
      setPwSuccess(true)
      setCurrentPw('')
      setNewPw('')
    } catch (err) {
      setPwApiError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setPwLoading(false)
    }
  }

  return {
    activeEdit,
    openEdit,
    newEmail,
    setNewEmail,
    emailCurrentPw,
    setEmailCurrentPw,
    emailErrors,
    setEmailErrors,
    emailApiError,
    emailLoading,
    emailSuccess,
    submitEmailChange,
    currentPw,
    setCurrentPw,
    newPw,
    setNewPw,
    pwErrors,
    setPwErrors,
    pwApiError,
    pwLoading,
    pwSuccess,
    submitPasswordChange,
  }
}
