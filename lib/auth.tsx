'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { ApiUser } from '@/types'
import { authService } from '@/services/auth.service'
import {
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens,
  loadStoredToken,
} from '@/services/http.client'

type AuthStore = {
  user: ApiUser | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthStore | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchMe() {
    try {
      const { user: apiUser } = await authService.me()
      setUser(apiUser)
    } catch {
      clearTokens()
      setUser(null)
    }
  }

  useEffect(() => {
    const token = loadStoredToken()
    if (token) {
      async function init() {
        try {
          await fetchMe()
        } finally {
          setIsLoading(false)
        }
      }
      init()
    } else {
      setIsLoading(false)
    }
  }, [])

  function storeSession(accessToken: string, refreshToken: string, apiUser: ApiUser) {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setUser(apiUser)
  }

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password)
    storeSession(res.tokens.accessToken, res.tokens.refreshToken, res.user)
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    const res = await authService.register(email, password)
    storeSession(res.tokens.accessToken, res.tokens.refreshToken, res.user)
  }, [])

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      try {
        await authService.logout(refreshToken)
      } catch {}
    }
    clearTokens()
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    await fetchMe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
