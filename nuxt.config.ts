// https://nuxt.com/docs/api/configuration/nuxt-config
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
  ui: {
    icons: ["tabler", "ph", "simple-icons"],
  },
  css: [
    "~/assets/css/main.css",
    "~/app/assets/css/gameplex-bootstrap.css",
    "~/app/assets/css/gameplex-style.css",
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
        {
          name: "keywords",
          content:
            "gaming, esports, tournaments, teams, cryptocurrency, blockchain gaming",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "https://api.gameplex.com/v1",
      appName: "GamePlex",
      version: "1.0.0",
    },
  },
  nitro: {
    experimental: {
      wasm: true,
    },
  },
  image: {
    quality: 85,
    format: ["webp", "png", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
