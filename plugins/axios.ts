import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
    withCredentials: true,
  });

  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) promise.reject(error);
      else promise.resolve(token);
    });
    failedQueue = [];
  };

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      // skip auth routes
      if (
        originalRequest.url?.includes("/accounts/login") ||
        originalRequest.url?.includes("/accounts/signup/")
      )
        return Promise.reject(error);

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosInstance(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;
        try {
          await axiosInstance.post("/accounts/token/refresh/");
          processQueue(null, null);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed → session expired
          processQueue(refreshError, null);

          if (typeof window !== "undefined") {
            const params = new URLSearchParams({ reason: "expired" });
            window.location.href = `/auth/login?${params.toString()}`;
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
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
