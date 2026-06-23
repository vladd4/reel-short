export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class HttpClient {
  protected baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    })

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText)
      throw new ApiError(res.status, text)
    }

    return res.json() as Promise<T>
  }

  protected get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'GET' })
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
