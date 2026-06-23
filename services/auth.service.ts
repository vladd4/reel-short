import type { User } from '@/types'
import { HttpClient } from './http.client'

class AuthService extends HttpClient {
  async signIn(email: string): Promise<{ token: string }> {
    return this.post<{ token: string }>('/auth/signin', { email })
  }

  async me(): Promise<User> {
    return this.get<User>('/auth/me')
  }
}

export const authService = new AuthService()
