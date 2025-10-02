export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  css: [
    "~/assets/css/main.css",
    "~/assets/css/gameplex-style.css",
    "aos/dist/aos.css",
  ],
  app: {
    head: {
      title: "GamePlex - Ultimate Gamer's Haven",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Play, Earn, Enjoy - Ultimate Gamer's Haven for tournaments, teams, and gaming",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "https://api.gameplex.com",
    },
  },
  ssr: true,
  nitro: {
    preset: "vercel",
  },
  vite: {
    build: {
      sourcemap: false,
    },
    css: {
      devSourcemap: false,
    },
  },
});
