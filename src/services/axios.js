import axios from "axios";
import { logout } from "../utils/auth.js";
import { getApiBaseUrl } from "./baseUrl";
import { startGlobalLoading, stopGlobalLoading } from "../utils/globalLoading.js";

const api = axios.create({
  baseURL: getApiBaseUrl()
});

api.interceptors.request.use(config => {
  const skipGlobalLoader = config.meta?.skipGlobalLoader === true;

  if (!skipGlobalLoader) {
    startGlobalLoading();
  }

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.request.use(
  config => config,
  error => {
    if (error.config?.meta?.skipGlobalLoader !== true) {
      stopGlobalLoading();
    }
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  res => {
    if (res.config?.meta?.skipGlobalLoader !== true) {
      stopGlobalLoading();
    }
    return res;
  },
  err => {
    if (err.config?.meta?.skipGlobalLoader !== true) {
      stopGlobalLoading();
    }

    const status = err.response?.status;
    const serverError = String(err.response?.data?.error || "").toLowerCase();
    const isAuthFailure =
      serverError.includes("token missing") ||
      serverError.includes("token expired") ||
      serverError.includes("invalid token") ||
      serverError.includes("user not found");

    if (status === 401 && isAuthFailure) {
      logout();
    }
    return Promise.reject(err);
  }
);

export default api;
