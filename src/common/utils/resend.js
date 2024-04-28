import { Resend } from 'resend'
import AppError from './appError'
const resendApiKey = 're_AYyrQZ6K_JPQsjc9FYpYcaXc7ZGkJ2hnK' // Replace with your Resend API key

const client = new Resend(resendApiKey)

// Function to send email with template
export const sendEmail = async (to, subject, template) => {
    try {
        const email = await client.emails.send({
            from: 'ejioforcelestine77@gmail.com', // Replace with your sender email
            to: to,
            subject: subject,
            html: template,
        })
        console.log(`Email sent to ${to}`)
        console.log(email)
    } catch (error) {
        throw new AppError('Error sending mail to invitee. Please try again later')
    }
}
