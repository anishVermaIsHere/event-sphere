import nodemailer from "nodemailer";
import AppConfig from "../config/app.config.js";

function generateEmailTemplate(recipient) {
  const { registerUrl } = recipient;
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitation - ${AppConfig.appName}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: auto;
        background: #f6f5f5;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
      }
      .logo {
        text-align: center;
      }
      .logo img {
        height: 100px;
      }
      .header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      #user-name {
        font-size: 24px;
        font-weight: 600;
        text-align: center;
      }
      .foreground {
        background-color: #fff;
        padding: 40px;
      }
      .content {
        line-height: 1.6;
        font-size: 16px;
        color: #555;
      }
      .content p {
        line-height: 2.2;
      }
      .content ul li {
        list-style-type: square;
        line-height: 2.2;
      }
      .register {
        padding: 50px;
        text-align: center;
        margin: 20px 0;
      }
      .register h2 {
        font-size: 18px;
        color: #333;
      }
      .register a {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 18px 40px;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
        font-size: 1.2rem;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .table th,
      .table td {
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
        color: #888;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }

      @media (width >= 640px) {
        .email-container {
          padding: 20px 60px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="https://res.cloudinary.com/dnyp1e0zo/image/upload/v1738675226/event-sphere/ob57lkpaqcernkdykuii.png"
          alt="Company Logo"
        />
      </div>

      <div class="foreground">
        <div class="content">
          <h1>Join us - ${AppConfig.appName}</h1>

          <p>
            We are thrilled to invite you to register ${AppConfig.appName},
            where managing and organizing events is made effortless.
          </p>
        </div>

        <div class="content">
          <p>Join us today to experience:</p>
          <ul>
            <li>Easy event creation and management</li>
            <li>Real-time updates and notifications</li>
            <li>Collaborative features for team coordination</li>
            <li>Insights and analytics for informed decision-making</li>
            <li>Easy event creation and management</li>
          </ul>

          <p>
            Click below button to register and start managing your events with
            us
          </p>

          <p>We look forward to seeing you onboard!</p>
        </div>

        <div class="register">
          <a href=${registerUrl}>Register now</a>
        </div>

        <p>PS: This invitation link is valid for 72 hrs</p>
      </div>

      <div class="footer">
        <p>
          Copyright © <span>{{year}}</span> {{companyName}}. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;
}

export async function sendMail(recipient) {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: AppConfig.mail.senderMail,
      pass: AppConfig.mail.password,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `${AppConfig.mail.senderName} <${AppConfig.mail.senderMail}>`,
    to: recipient.email,
    subject: `Join us - ${AppConfig.appName}`,
    text: ``,
    html: generateEmailTemplate(recipient),
  });

  console.log("Message sent: %s", info.messageId);
}
