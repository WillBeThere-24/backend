export const sendRSVPMailTemplate = (data) => {
    return `<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CashCard Receipt</title>
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
                height: 36px;
                width: 100px;
                background-color: #45062E;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                margin-bottom: 20px;
            }

            ul {
                margin-left: 20px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
    <div class="container">
        <p>Dear Busari,</p>

        <p>You're cordially invited to join us in celebrating ${data.name}'s milestone ${data.date}</p>

        <p>🎉 Event Details 🎉</p>
        <ul>
            <li>Date: ${data.date}</li>
            <li>Time: ${data.date} onwards</li>
        </ul>

        <p>RSVP to secure your spot at this exclusive event. Simply click below to confirm your attendance and let us know the number of guests accompanying you.</p>

        <a id="click">RSVP</a>

        <p>We can't wait to see you there and make memories that will last a lifetime!</p>

        <p>Warm regards, <br>${data.name}</p>
    </div>
    </body>
</html>`
}
