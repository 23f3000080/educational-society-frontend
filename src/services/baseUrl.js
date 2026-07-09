const FALLBACK_BASE_URL = 'http://127.0.0.1:5000'

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || FALLBACK_BASE_URL
}
// https://educationalsociety.duckdns.org
export default getApiBaseUrl