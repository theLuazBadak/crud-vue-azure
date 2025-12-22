type RuntimeConfig = {
  apiUrl: string | null
  useMock: boolean
}

let cachedConfig: RuntimeConfig | null = null

export async function getRuntimeConfig(): Promise<RuntimeConfig> {
  if (cachedConfig) return cachedConfig

  const res = await fetch('/api/config')
  if (!res.ok) {
    cachedConfig = { apiUrl: null, useMock: true }
    return cachedConfig
  }

  const data = await res.json()

  cachedConfig = {
    apiUrl: data.API_URL ?? null,
    useMock: Boolean(data.USE_MOCK),
  }

  return cachedConfig
}