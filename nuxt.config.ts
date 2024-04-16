import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql', '@nuxtjs/tailwindcss', 'nuxt-swiper', 'nuxt-mapbox'],
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYm9uam91cnRhcmRpZiIsImEiOiJjbG1lbzYwaDEyMjc2M2NvNTJwYXh6eXN2In0.jloyJlQj0KNjKhfYEDQNXQ'
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.vol-plane.com',
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

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'vp--main' :'rgb(var(--color-vp-main))',
            'vp--secondary' :'rgb(var(--color-vp-secondary))',
            'vp--main-light' :'rgba(var(--color-vp-main), .5)',
            'vp--secondary-light' :'rgba(var(--color-vp-secondary), .5)',
          },
          container: {
            center: true,
            padding: {
               DEFAULT:  '1rem',
            },
          },
        },
      }
    }
  }
})