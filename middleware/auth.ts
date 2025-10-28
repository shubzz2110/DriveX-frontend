export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = authStore.token || null;
  const isUserPage = to.path.startsWith("/drive");

  // If no tokens at all -> block drive routes
  if (!token && isUserPage) {
    return navigateTo({
      path: "/auth/signin",
      query: { reason: "no-session" },
    });
  }

  if (!token && isUserPage) {
    return;
  }
});
