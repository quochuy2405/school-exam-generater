// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', 'nuxt-pdfmake', 'nuxt-server-utils'],
    colorMode: {
        preference: 'light',
    },
    runtimeConfig: {
        apiSecret: {
            EMAIL_USER: process.env.NUXT_MAILER_USER,
            EMAIL_PASS: process.env.NUXT_MAILER_PASS,
        },
        mongodbUri: process.env.NUXT_MONGO_DB,
    },
    nitro: {
        plugins: ['~/server/plugins/mongodb.ts'],
    },
})
