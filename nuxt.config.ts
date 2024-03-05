// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', 'nuxt-pdfmake'],
    colorMode: {
        preference: 'light',
    },
    runtimeConfig: {
        apiSecret: {
            EMAIL_USER: process.env.NUXT_MAILER_USER,
            EMAIL_PASS: process.env.NUXT_MAILER_PASS,
        },
    },
})
