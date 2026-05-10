const FALLBACK_BASE_URL = 'http://51.20.136.36'

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || FALLBACK_BASE_URL
}

export default getApiBaseUrl