import { d as defineEventHandler, a as readMultipartFormData, g as getRequestHeader, u as useStorage, c as createError, b as useRuntimeConfig } from '../../../runtime.mjs';
import { OAuth2Client } from 'google-auth-library';
import handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';

dotenv.config();
const config = useRuntimeConfig();
const myOAuth2Client = new OAuth2Client(
  config.public.google.GOOGLE_MAILER_CLIENT_ID,
  config.public.google.GOOGLE_MAILER_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
myOAuth2Client.setCredentials({
  refresh_token: config.public.google.GOOGLE_MAILER_REFRESH_TOKEN
});
const sendMail = async (data) => {
  const getAccessTokenObject = await myOAuth2Client.getAccessToken();
  const accessToken = getAccessTokenObject == null ? void 0 : getAccessTokenObject.token;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      type: "OAuth2",
      user: config.public.email.EMAIL_USER,
      clientId: config.public.google.GOOGLE_MAILER_CLIENT_ID,
      clientSecret: config.public.google.GOOGLE_MAILER_CLIENT_SECRET,
      refreshToken: config.public.google.GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken,
      expires: 1484314697598
    }
  });
  const compileSource = handlebars.compile(data.source);
  const mailOptions = {
    from: "Trung t\xE2m NQH <work.huypui@gmail.com>",
    to: data.head.to,
    subject: data.head.subject,
    html: compileSource(data.body),
    attachments: [
      {
        // utf-8 string as an attachment
        filename: data.fileName,
        content: data.pdf
      }
    ]
  };
  await transporter.sendMail(mailOptions);
};
const emailSender_post = defineEventHandler(async (event) => {
  try {
    const payload = await readMultipartFormData(event);
    const fileName = getRequestHeader(event, "fileName");
    let bodyJson = {};
    payload.forEach((item) => {
      bodyJson = { ...bodyJson, [item.name]: item.data };
    });
    const name = bodyJson.name.toString();
    const email = bodyJson.email.toString();
    const subject = bodyJson.subject.toString();
    const body = bodyJson.subject.toString();
    const pdf = bodyJson.pdf;
    const source = await useStorage().getItem(
      "root:assets:email-templates:email.html"
    );
    const emailHeading = {
      to: email,
      subject
    };
    const emailBody = {
      name,
      body
    };
    if (source) {
      await sendMail({
        source,
        head: emailHeading,
        body: emailBody,
        pdf,
        fileName
      });
    }
    return 200;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong."
    });
  }
});

export { emailSender_post as default };
//# sourceMappingURL=email-sender.post.mjs.map
