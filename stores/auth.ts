import type { User } from "~/lib/definations";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);

    const setUser = (payload: User | null) => {
      user.value = payload;
    };

    const setToken = (newToken: string | null) => {
      token.value = newToken
    }

    const fetchUser = async () => {
      const { $axios } = useNuxtApp();
      try {
        console.log("Fetching user in store")
        const response = await $axios.get("/auth/user/");
        setUser(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    return {
      user,
      token,
      setToken,
      setUser,
      fetchUser,
    };
  },
  { persist: true }
);
