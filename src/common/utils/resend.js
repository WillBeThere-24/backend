import { Resend } from 'resend'
const resendApiKey = 're_AYyrQZ6K_JPQsjc9FYpYcaXc7ZGkJ2hnK' // Replace with your Resend API key

const client = new Resend(resendApiKey)

// Function to send email with template
export const sendEmail = async (to, subject, template) => {
    try {
        await client.emails.send({
            from: 'noreply@willbethere.com', // Replace with your sender email
            to: to,
            subject: subject,
            html: template,
        })
        console.log(`Email sent to ${to}`)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
