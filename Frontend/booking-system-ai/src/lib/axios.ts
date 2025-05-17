import { store } from "@/store";
import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth token here
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && originalRequest) {
      // we don't have refresh token here just return unauthorized error
      return Promise.reject(error);
    }

    // Handle other errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Type-safe API methods
export const api = {
  get: <T>(url: string, config?: InternalAxiosRequestConfig) =>
    axiosInstance.get<T>(url, config),

  post: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config),

  delete: <T>(url: string, config?: InternalAxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ) => axiosInstance.patch<T>(url, data, config),
};

export default axiosInstance;
