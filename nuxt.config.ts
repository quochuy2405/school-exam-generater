// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', 'nuxt-pdfmake', 'nuxt-server-utils'],
    colorMode: {
        preference: 'light',
    },
    runtimeConfig: {
        public: {
            google: {
                GOOGLE_MAILER_CLIENT_ID:
                    '434231631925-a6e8h6s0e5d9l6kj12rp2iq76ca6knr4.apps.googleusercontent.com',
                GOOGLE_MAILER_CLIENT_SECRET:
                    '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',
                GOOGLE_MAILER_REFRESH_TOKEN:
                    '1//04-HL2-d6pPS9CgYIARAAGAQSNwF-L9IrZTMFWK5KVaMIZ2ROVR79izPtnYISPOoiwHmHVeuPlSYnOHNH5ED9x0L48glEonM2KIE',
            },
            apiSecret: {
                EMAIL_USER: 'work.huypui@gmail.com',
                EMAIL_PASS: '240501@@@@',
            },
            mongodbUri:
                'mongodb+srv://workhuypui:workhuypui@nqhschool.5r2gsq5.mongodb.net/nqhschool',
        },
    },
    nitro: {
        plugins: ['~/server/plugins/mongodb.ts'],
    },
})
