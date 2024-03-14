import { OAuth2Client } from 'google-auth-library'
import handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'

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
            from: 'Trung tâm NQH <hethonggiaoducnqh@gmail.com>',
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
const source = `
                    <!doctype html>
                      <html lang="en">

                      <head>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>{{subject}}</title>
                      </head>

                      <body>
                        <div>
                          <table>
                            <tr>
                              <td>Hello {{name}}</td>
                            </tr>
                            <td>
                              <h3>{{ body }}</h3>
                            </td>
                          </table>
                        </div>
                      </body>

                      </html>
                      `
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
        const emailHeading: { to: string; subject: string } = {
            to: email,
            subject: subject,
        }
        const emailBody: { name: string; body: string } = {
            name: name,
            body: body,
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
