export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'nuxt-nodemailer', '@vee-validate/nuxt', 'vuetify-nuxt-module', '@vueuse/nuxt'],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        jsx: true,
        arrowParens: true,
        braceStyle: 'stroustrup',
      },
    },
  },
  nodemailer: {
    from: process.env.NUXT_NODEMAILER_FROM,
    host: process.env.NUXT_NODEMAILER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NUXT_NODEMAILER_AUTH_USER,
      pass: process.env.NUXT_NODEMAILER_AUTH_PASS,
    },
  },
  veeValidate: {
    autoImports: false,
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
    },
  },
})
