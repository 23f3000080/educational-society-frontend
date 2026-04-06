import { getApiBaseUrl } from './baseUrl'

const BASE_URL = getApiBaseUrl()

export const API_ENDPOINTS = {
  FORGOT_PASSWORD: `${BASE_URL}/api/auth/forgot-password`,
  VERIFY_RESET_CODE: `${BASE_URL}/api/auth/verify-reset-code`,
  RESET_PASSWORD: `${BASE_URL}/api/auth/reset-password`,
};

export default BASE_URL;
