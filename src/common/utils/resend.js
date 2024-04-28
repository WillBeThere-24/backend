import { Resend } from 'resend'
import readFileSync from 'fs'
const resendApiKey = 're_AYyrQZ6K_JPQsjc9FYpYcaXc7ZGkJ2hnK' // Replace with your Resend API key

const client = new Resend(resendApiKey)

// Function to send email with template
export const sendEmail = async (to, subject, template, data) => {
    const html = await readFileSync(`templates/${template}.html`, 'utf8')
    // Replace placeholders with data
    Object.entries(data).forEach(([key, value]) => {
        html.replace(new RegExp(`{{ ${key} }}`, 'g'), value)
    })

    try {
        await client.send({
            from: 'noreply@willbethere.com', // Replace with your sender email
            to,
            subject,
            html,
        })
        console.log(`Email sent to ${to}`)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
