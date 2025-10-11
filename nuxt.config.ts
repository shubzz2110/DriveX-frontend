// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "DriveX",
      meta: [
        {
          name: "description",
          content: "",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@primevue/nuxt-module",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  primevue: {
    options: {
      theme: "none",
    },
  },
})
