export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true }, // OPTIMIZED: Disable in production
    future: {
        compatibilityVersion: 4
    },
    experimental: {
        payloadExtraction: false
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/ui',
        '@pinia/nuxt',
        '@vueuse/nuxt'
    ],
    css: [
        // OPTIMIZED: Load in priority order
        'aos/dist/aos.css',
        '~/assets/css/gameplex-style.css',
        '~/assets/css/gameplex-utilities.css',
        '~/assets/css/main.css'
    ],
    components: {
        dirs: [
            {
                path: '~/components',
                extensions: ['vue'],
                pathPrefix: false
            }
        ]
    },
    app: {
        head: {
            title: "GamePlex - Ultimate Gamer's Haven",
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'description',
                    content:
                        "Play, Earn, Enjoy - Ultimate Gamer's Haven for tournaments, teams, and gaming"
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                // Preload critical font(s) (adjust path if self-hosted later)
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: ''
                }
                // Example: ensure early fetch of main stylesheet for layout-critical rules
                // (Browsers may already prioritize, but explicit preload can help LCP)
                // { rel: 'preload', as: 'style', href: '/_nuxt/assets/css/gameplex-style.css' }
            ],
            style: [
                {
                    // Critical inline CSS to prevent flash & prep split animation layers
                    innerHTML: `
            .title-anim, [data-split-type]{visibility:hidden}
            .title-anim[data-split-init], [data-split-type][data-split-init]{visibility:visible}
            .gp-char,.gp-word,.gp-line{will-change:transform,opacity;display:inline-block}
            .title-anim,[data-split-type]{contain:style layout paint}
          `
                }
            ]
        }
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL || 'https://api.gameplex.com'
        }
    },
    ssr: process.env.SSR_MODE !== 'false', // Default to true if not set
    nitro: {
        preset: 'vercel'
    },
    vite: {
        build: {
            sourcemap: false,
            cssCodeSplit: true, // Split CSS for better caching
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true, // Remove console.logs in production
                    drop_debugger: true
                }
            }
        },
        css: {
            devSourcemap: false
        },
        optimizeDeps: {
            include: ['gsap', 'aos', 'swiper'] // Pre-bundle heavy deps
        }
    }
});
