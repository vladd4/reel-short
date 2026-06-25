import type { ApiUser, AuthResponse } from '@/types'
import { HttpClient } from './http.client'

class AuthService extends HttpClient {
  async register(email: string, password: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/register', { email, password })
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/login', { email, password })
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    return this.post<{ accessToken: string }>('/auth/refresh', { refreshToken })
  }

  async logout(refreshToken: string): Promise<void> {
    return this.post<void>('/auth/logout', { refreshToken })
  }

  async me(): Promise<{ user: ApiUser }> {
    return this.get<{ user: ApiUser }>('/auth/me')
  }

  async updateEmail(newEmail: string, currentPassword: string): Promise<{ user: ApiUser }> {
    return this.patch<{ user: ApiUser }>('/auth/email', { newEmail, currentPassword })
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    return this.patch<void>('/auth/password', { currentPassword, newPassword })
  }
}

export const authService = new AuthService()
