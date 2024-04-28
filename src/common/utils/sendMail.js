import { createTransport } from 'nodemailer'
import { ENVIRONMENT } from '../config/environment.js'

let transporter = createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: ENVIRONMENT?.MAILER?.EMAIL,
        pass: ENVIRONMENT.MAILER.PASS,
    },
})

// test transporter
transporter.verify(function (error, success) {
    if (error) {
        console.error(error)
        console.log('this is where its happening')
    } else {
        console.log('Ready for messages', success)
    }
})

export async function sendMail(mailOptions) {
    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')
    } catch (error) {
        console.log(error)
    }
}
