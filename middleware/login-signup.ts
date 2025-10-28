export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const isAuthPage =
    to.path.startsWith("/auth/signin") ||
    to.path.startsWith("/auth/signup");

  if (token && isAuthPage) {
    return navigateTo("/drive");
  }
});
