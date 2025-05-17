import { store } from '@/store';
import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add auth token here
        const token = store.getState().auth.token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImM1NzdmMjFlLWQ1YzMtNDAzMC1iZGEwLWE5OGViOGUzNTQwZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQ5OTc2NjQ0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjg0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODQvIn0.xqELkE71dZDsY1PpG4AplYnRRM0gP0LwIkJAd3pq7mU'
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
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
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

    patch: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
        axiosInstance.patch<T>(url, data, config),
};

export default axiosInstance;