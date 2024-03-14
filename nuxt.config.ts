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
                    '888501734074-slel7thgrmaqntmtv75m0mthlrirgsiq.apps.googleusercontent.com',
                GOOGLE_MAILER_CLIENT_SECRET: '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',
                GOOGLE_MAILER_REFRESH_TOKEN:
                    '1//04SqcAcuLt0soCgYIARAAGAQSNwF-L9IrJBo9A8-xl-hmHq84_4-_1BcCgQSJK79KCYK0r6yobtIEa9i_HQrmLa-NlXrZDTaT0fg',
            },
            email: {
                EMAIL_USER: 'hethonggiaoducnqh@gmail.com',
                EMAIL_PASS: 'Khatvonglamtoicung',
            },
            mongodbUri:
                'mongodb+srv://workhuypui:workhuypui@nqhschool.5r2gsq5.mongodb.net/nqhschool',
        },
    },
})
