function formatIsoDate(isoDateStr) {
    // Parse the ISO date string into a Date object
    const dateObj = new Date(isoDateStr)

    // Define options for formatting
    const options = {
        weekday: 'short', // Short weekday name (Tue)
        year: 'numeric', // Year (2024)
        month: 'short', // Short month name (Apr)
        day: 'numeric', // Day of the month (30)
    }

    // Format the date using the options
    const formattedDate = dateObj.toLocaleDateString('en-US', options)

    return formattedDate
}

export const sendRSVPMailTemplate = (data) => {
    return `<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Will Be There</title>
        <style>
            * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            }
        
            body {
                display: flex;
            }

            .container{
                margin: 40px
            }
        
            p {
                font-size: 18px;
                font-style: normal;
                margin-bottom: 20px;
            }

            #click {
                color: white;
                width:30px;
                height:50px;
                background-color: #45062E;
                border-radius: 10px;
                padding: 2px;
            }

            ul {
                margin-left: 20px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
    <div class="container">
        <p>Dear ${data.name},</p>

        <p>You're cordially invited to ${data.organizerName}'s event on ${formatIsoDate(data.date)}</p>

        <p>🎉 Event Details 🎉</p>
        <ul>
            <li>Date: ${data.date.toString()}</li>
        </ul>

        <p>RSVP to secure your spot at this exclusive event. Simply click below to confirm your attendance and let us know the number of guests accompanying you.</p>

        <a id="click" href="${data.url}">RSVP</a>

        <p>We can't wait to see you there and make memories that will last a lifetime!</p>

        <p>Warm regards, <br>${data.organizerName}</p>
    </div>
    </body>
</html>`
}
