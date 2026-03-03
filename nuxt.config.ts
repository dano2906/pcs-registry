import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 5,
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Our Pieces',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/logo.svg',
          sizes: 'any',
        },
      ],
    },
  },
  modules: [
    'shadcn-nuxt',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-svgo',
    '@nuxtjs/i18n',
  ],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        preload: true,
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ['normal'],
        display: 'swap',
        fallbacks: ['system-ui'],
        global: true,
      },
    ],
    devtools: true,
  },
  components: {
    dirs: ['~/registry', '~/components'],
  },
  imports: {
    dirs: ['~/registry', '~/components', '~/lib', '~/utils'],
  },
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
    ],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'vue', 'vue-html', 'typescript', 'javascript', 'json', 'js', 'ts', 'css', 'html', 'md', 'mdc'],
          theme: {
            default: 'github-dark',
            light: 'github-light',
            dark: 'github-dark',
          },
        },
      },
    },
  },
  routeRules: {
    '/docs/**': {
      appLayout: 'docs',
    },
  },
})
