import { OAuth2Client } from 'google-auth-library'
import handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'
import { html_template } from '~/assets/html_email_template'

interface IEmailData {
    source: string
    head: { to: string; subject: string }
    body: any
    pdf?: any
    fileName?: any
}
const sendMail = async (data: IEmailData, event: any): Promise<void> => {
    try {
        const config = useRuntimeConfig(event)
        const oAuthClient = new OAuth2Client(
            config.public.google.GOOGLE_MAILER_CLIENT_ID,
            config.public.google.GOOGLE_MAILER_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        )

        oAuthClient.setCredentials({
            refresh_token: config.public.google.GOOGLE_MAILER_REFRESH_TOKEN,
        })
        const getAccessTokenObject = await oAuthClient.getAccessToken()
        const accessToken = getAccessTokenObject?.token

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: config.public.email.EMAIL_USER,
                clientId: config.public.google.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: config.public.google.GOOGLE_MAILER_CLIENT_SECRET,
                refreshToken: config.public.google.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken,
                expires: 1484314697598,
            },
        } as any)
        const compileSource = handlebars.compile(data.source)

        const mailOptions = {
            from: 'Hệ Thống Giáo Dục NQH <hethonggiaoducnqh@gmail.com>',
            to: data.head.to,
            subject: data.head.subject,
            html: compileSource(data.body),
            attachments: [
                {
                    // utf-8 string as an attachment
                    filename: data.fileName,
                    content: data.pdf,
                },
            ],
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw error
    }
}
export default defineEventHandler(async (event) => {
    const source = html_template

    try {
        const payload: any | null = await readMultipartFormData(event)
        const fileName = getRequestHeader(event, 'fileName')
        // if (!body) {
        //     return createError({
        //         statusCode: 400,
        //         statusMessage: 'Bad request.',
        //     })
        // }
        let bodyJson: any = {}
        payload.forEach((item: any) => {
            bodyJson = { ...bodyJson, [item.name]: item.data }
        })
        const name = bodyJson.name.toString()
        const email = bodyJson.email.toString()
        const mon = bodyJson.mon.toString()
        const sbd = bodyJson.sbd.toString()
        const diem = bodyJson.diem.toString()
        const pdf = bodyJson.pdf
        // const keys = useStorage().getKeys() - Get list of all keys available to your app.
        const emailHeading: { to: string; subject: string } = {
            to: email,
            subject: mon,
        }
        const emailBody = {
            name: name,
            sbd: sbd,
            diem: diem,
            mon: mon,
        }

        await sendMail(
            {
                source,
                head: emailHeading,
                body: emailBody,
                pdf: pdf,
                fileName,
            },
            event
        )
            .then(() => {
                return 200
            })
            .catch((error) => {
                return createError({
                    statusCode: 500,
                    statusMessage: error,
                })
            })

        return 200 // Success
    } catch (error: unknown) {
        return createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.',
        })
    }
})
