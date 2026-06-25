export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const ACCESS_KEY = 'nd-access-token'
const REFRESH_KEY = 'nd-refresh-token'
const AUTH_COOKIE = 'nd-authed'
const TOKEN_COOKIE = 'nd-token'

function setAuthCookie(value: boolean) {
  if (typeof document === 'undefined') return
  if (value) {
    document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=604800; SameSite=Lax`
  } else {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`
  }
}

function setTokenCookie(token: string | null) {
  if (typeof document === 'undefined') return
  if (token) {
    document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=604800; SameSite=Lax`
  } else {
    document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`
  }
}

let _accessToken: string | null = null
let _refreshPromise: Promise<boolean> | null = null

function storage() {
  return typeof window !== 'undefined' ? localStorage : null
}

export function setAccessToken(token: string | null) {
  _accessToken = token
  if (token) {
    storage()?.setItem(ACCESS_KEY, token)
    setAuthCookie(true)
    setTokenCookie(token)
  } else {
    storage()?.removeItem(ACCESS_KEY)
    setAuthCookie(false)
    setTokenCookie(null)
  }
}

export function setRefreshToken(token: string | null) {
  if (token) storage()?.setItem(REFRESH_KEY, token)
  else storage()?.removeItem(REFRESH_KEY)
}

export function getRefreshToken(): string | null {
  return storage()?.getItem(REFRESH_KEY) ?? null
}

export function clearTokens() {
  _accessToken = null
  storage()?.removeItem(ACCESS_KEY)
  storage()?.removeItem(REFRESH_KEY)
  setAuthCookie(false)
  setTokenCookie(null)
}

export function loadStoredToken(): string | null {
  const token = storage()?.getItem(ACCESS_KEY) ?? null
  if (token) _accessToken = token
  return token
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) {
      clearTokens()
      return false
    }
    const data = (await res.json()) as { tokens: { accessToken: string; refreshToken?: string } }
    setAccessToken(data.tokens.accessToken)
    if (data.tokens.refreshToken) setRefreshToken(data.tokens.refreshToken)
    return true
  } catch {
    clearTokens()
    return false
  }
}

export class HttpClient {
  protected baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

  private async request<T>(
    path: string,
    init: RequestInit = {},
    isRetry = false,
    asText = false,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`

    let token = _accessToken
    if (!token && typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const jar = await cookies()
      token = jar.get(TOKEN_COOKIE)?.value ?? null
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(init.headers as Record<string, string>),
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(url, { ...init, headers })

    if (res.status === 401 && !isRetry) {
      if (!_refreshPromise) {
        _refreshPromise = tryRefresh().finally(() => {
          _refreshPromise = null
        })
      }
      const refreshed = await _refreshPromise
      if (refreshed) return this.request<T>(path, init, true, asText)
      let text: string
      try {
        text = await res.text()
      } catch {
        text = res.statusText
      }
      throw new ApiError(401, text)
    }

    if (!res.ok) {
      let text: string
      try {
        text = await res.text()
      } catch {
        text = res.statusText
      }
      throw new ApiError(res.status, text)
    }

    if (asText) return res.text() as Promise<T>
    return res.json() as Promise<T>
  }

  protected get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'GET' })
  }

  protected getText(path: string, init?: RequestInit): Promise<string> {
    return this.request<string>(path, { ...init, method: 'GET' }, false, true)
  }

  protected post<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'POST', body: JSON.stringify(body) })
  }

  protected patch<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'PATCH', body: JSON.stringify(body) })
  }

  protected delete<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'DELETE' })
  }
}
