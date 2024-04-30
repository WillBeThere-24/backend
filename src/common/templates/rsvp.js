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
          body {
            background-color: #e0f9fd;
          }
    
          .container {
            display: block;
            margin: 0 auto;
            width: 100%;
            background-color: #ffff;
            max-width: 600px;
            text-align: center;
            padding: 50px;
            color: #4e5254;
            font-family: Avenir, Times, serif;
          }
    
          .container header,
          .container main {
            width: 100%;
            margin: 0 auto;
          }
    
          header img {
            width: 100px;
          }
    
          h1 {
            font-size: 28px;
          }
    
          h1, h2 {
            font-family: "Segoe UI", Inter !important;
          }
    
          .rsvp-link {
            text-align: center;
          }
    
          button {
            color: white;
            font-size: 16px;
            background-color: #45062E;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
          }
    
          button:hover {
            background-color: #45062E70;
            border: 1px solid #45062E;
          }
    
          footer {
            margin-top: 30px;
          }
    
          .floral-decoration img {
            width: 150px;
            height: auto;
            opacity: 0.2;
          }
    
          li {
            list-style: none;
          }
    
          .email-banner img {
            display: block;
            width: 90%;
            max-width: 30rem;
            margin: 0 auto;
            border-radius: 0.8rem;
          }
        </style>
    </head>
    <body>
        <div class="container">
          <header>
            <img src="https://res.cloudinary.com/horllameeday/image/upload/v1714471237/WillBeThere/flowers_kdgeec.png" alt="floral-arrangement" />
          </header>
    
          <h1>You're Invited!</h1>
    
          <div class="email-banner">
            <img src="${data.banner}" />
          </div>
    
          <main>
            <h2>Dear ${data.name},</h2>
            <p>You're cordially invited to ${data.organizerName}'s event on ${formatIsoDate(data.date)} titled ${data.title}.</p>
            <br />
    
            <p><b>Event Details</b></p>
            <p>${data.details}</p>
            <ul>
                <li>Starts: ${data.date.toString()}</li>
                <li>Ends: ${data.endDate.toString()}</li>
            </ul>
            <br />
            
            <p>RSVP to secure your spot at this exclusive event. Simply click below to confirm your attendance and let us know the number of guests accompanying you.</p>
    
          </main>
    
          <footer>
            <div class="rsvp-link">
              <a href="${data.url}" target="_blank">
                <button class="btn">RSVP HERE</button>
              </a>
            </div>
            <br />
    
            <p>We would be honored to have you join us for this memorable occasion. Your presence will truly make the celebration complete!</p>            
          </footer>
    
          <div class="floral-decoration">
            <img src="https://res.cloudinary.com/horllameeday/image/upload/v1714471227/WillBeThere/flowers-footer_azgm8w.png" alt="floral-decor" />
          </div>
        </div>
    </body>
</html>`
}
