import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { useToast } from "primevue/usetoast";

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 10000,
    withCredentials: true,
  });

  const toast = useToast();

  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) promise.reject(error);
      else promise.resolve(token);
    });
    failedQueue = [];
  };

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = authStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;
      const backend = error.response?.data as any;

      const isAuthEndpoint =
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/signup/");

      if (
        !isAuthEndpoint &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosInstance(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axiosInstance.post("/auth/token/refresh/");
          authStore.setToken(response?.data?.access);
          processQueue(null, null);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          if (typeof window !== "undefined") {
            const params = new URLSearchParams({ reason: "expired" });
            window.location.href = `/auth/signin?${params.toString()}`;
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (backend?.errors) {
        const allErrors = Object.entries(backend.errors)
          .map(
            ([field, messages]: [string, any]) =>
              `${field}: ${messages.join(", ")}`
          )
          .join("\n");

        toast.add({
          severity: "error",
          summary: backend.message || "Validation Error",
          detail: allErrors,
          life: 6000,
        });
      } else if (backend?.message) {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: backend.message,
          life: 6000,
        });
      } else if (!error.response) {
        toast.add({
          severity: "warn",
          summary: "Network Error",
          detail: "Please check your internet connection.",
          life: 6000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong. Please try again.",
          life: 6000,
        });
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
