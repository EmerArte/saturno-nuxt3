// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vuestic/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  vuestic: {
    config: {
      colors: {
        variables: {
          primary: "#FF9800",
          secondary: "#666E75",
          backgroundElement: "#ECF0F1",
          backgroundBorder:"#DEE5F2",
          textPrimary:"#262824",
          textInverted:"#FFFFFF",
          backgroundPrimary: "#FFFFFF",
          backgroundSecondary: "#FFFFFF",
          focus: "#49A8FF",
          success: "#3D9209",
          info: "#158DE3",
          danger: "#E42222",
          warning: "#FFD43A",
        },
      },
      components:{
        VaModal:{
          mobileFullscreen:false
        }
      }
      // Vuestic config here
    },
  },
})
