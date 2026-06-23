export type User = {
  id: string
  email: string
  coins: number
  isSubscribed: boolean
}

export type ApiUser = {
  id: string
  email: string
  credits: number
  isSubscribed: boolean
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}
