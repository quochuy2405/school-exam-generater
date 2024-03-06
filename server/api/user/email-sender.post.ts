import { OAuth2Client } from 'google-auth-library'
import handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const config = useRuntimeConfig()
interface IEmailData {
    source: string
    head: { to: string; subject: string }
    body: any
    pdf?: any
    fileName?: any
}

const myOAuth2Client = new OAuth2Client(
    config.public.google.GOOGLE_MAILER_CLIENT_ID,
    config.public.google.GOOGLE_MAILER_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
)

myOAuth2Client.setCredentials({
    refresh_token: config.public.google.GOOGLE_MAILER_REFRESH_TOKEN,
})

const sendMail = async (data: IEmailData): Promise<void> => {
    const getAccessTokenObject = await myOAuth2Client.getAccessToken()
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
        from: 'Trung tâm NQH <work.huypui@gmail.com>',
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
}
export default defineEventHandler(async (event) => {
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
        const subject = bodyJson.subject.toString()
        const body = bodyJson.subject.toString()
        const pdf = bodyJson.pdf
        // const keys = useStorage().getKeys() - Get list of all keys available to your app.
        const source = await useStorage().getItem(
            'root:assets:email-templates:email.html'
        )
        const emailHeading: { to: string; subject: string } = {
            to: email,
            subject: subject,
        }
        const emailBody: { name: string; body: string } = {
            name: name,
            body: body,
        }

        if (source) {
            await sendMail({
                source: source as string,
                head: emailHeading,
                body: emailBody,
                pdf: pdf,
                fileName,
            })
        }
        return 200 // Success
    } catch (error: unknown) {
        return createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.',
        })
    }
})
