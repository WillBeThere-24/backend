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

export const sendRSVPConfirmationMailTemplate = (data) => {
    return `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSVP CONFIRMATION - WBT</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
    
        <style>
          body {
            background-color: #d6b7dc;
            font-family: "Inter", sans-serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            font-variation-settings: "slnt" 0;
            color: rgb(80, 77, 77);
          }
    
          .container {
            display: block;
            margin: 0 10px;
            height: 100%;
            padding: 20px;
          }
    
          .head-section {
            height: 200px;
            background-color: rgba(138, 43, 226, 0.5);
            display: block;
            justify-items: center;
          }

          .confirm-header {
            padding-top: 80px;
          }
    
          header img {
            width: 5rem;
            padding: 20px;
            margin-left: 50px;
          }
    
          h1 {
            text-align: center;
            padding-bottom: 20px;
            color: #ffff;
          }
    
          h2 {
            font-family: cursive;
          }
    
          .confirmation-details {
            background-color: #ffff;
            padding: 50px;
          }
    
          hr {
            height: 4px;
            background: #312c8e;
          }
    
          ul {
            list-style: none;
            font-size: 14px;
            text-align: left;
          }
    
          p strong {
            text-align: left;
          }
    
          .floral-decoration img {
            width: 100px;
            height: auto;
            opacity: 0.2;
            display: block;
            margin: 0 auto;
          }
        </style>
      </head>
    
      <body>
        <div class="container">
          <div class="head-section">
            <h1 class="confirm-header">RSVP CONFIRMATION!</h1>
          </div>
          <hr />
    
          <div class="confirmation-details">
            <main>
              <h2>Dear ${data.guest},</h2>
              <p>
                Thank you for accepting the invitation to ${data.organizerName}'s ${data.eventName}!
                ${data.plusMessage}. Kindly
                find the important details you'll need below.
              </p>
              <br />
              
              <p>
                <strong>
                  <ul>
                    <li>🗓️ : ${data.date.toString()}</li>
                    <li>🌐 : ${data.location}</li>
                  </ul>
                </strong>
              </p>
              <br />

              <p>
                ${data.reminderMessage}
                Please mark your calendar and feel free to arrive at most 30 minutes
                before the event start time. In the meantime, if you need additional
                information about the event, you are not a stranger and now is not
                the time to be one. Please reach out to ${data.organizerName} or email us at
                eventsatwbt@gmail.com.
              </p>
            </main>
            <div class="floral-decoration">
              <img src="https://res.cloudinary.com/horllameeday/image/upload/v1714471227/WillBeThere/flowers-footer_azgm8w.png" alt="floral-decor" />
            </div>
          </div>
        </div>
      </body>
    </html>`
}
