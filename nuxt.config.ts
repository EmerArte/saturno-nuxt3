// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vuestic/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  vuestic: {
    config: {
      components:{
        VaModal:{
          mobileFullscreen:false
        }
      }
      // Vuestic config here
    },
  },
})
