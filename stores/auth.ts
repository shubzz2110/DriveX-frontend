import axios from "axios";
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

    return {
      user,
      token,
      setToken,
      setUser,
    };
  },
  { persist: true }
);
