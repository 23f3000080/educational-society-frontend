const FALLBACK_BASE_URL = 'https://educational-society.onrender.com'

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || FALLBACK_BASE_URL
}

export default getApiBaseUrl