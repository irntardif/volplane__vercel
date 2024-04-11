import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: 'https://kirby-nuxt-starter.pages.dev',
    },
  },

  kql: {
    auth: 'bearer',
    prefetch: {
      // Currently only used to infer the type of the `site` query
      kirbySite: siteQuery,
    },
  },

  nitro: {
    prerender: {
      // Prerender the index page
      routes: ['/'],
    },
  },
})
