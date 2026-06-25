import type { ApiUser } from './user.types'

export type AuthResponse = {
  user: ApiUser
  token: string
  expiresAt: string
}
