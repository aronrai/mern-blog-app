const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendVerificationEmail = async (name, email, verificationToken) => {
  const verifyUrl = `https://blogspot-29yc.onrender.com/verify/${verificationToken}`;
  const mailOptions = {
    from: `"Blogspot" <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: "Action Required: Verify your email address",
    html: `
      <div style="
        background-color: #f9fafb;
        padding: 50px 0;
        font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        ">
          <div style="background-color: #000000; padding: 30px; text-align: center">
            <h1 style="
              color: #ffffff;
              margin: 0;
              font-size: 24px;
              letter-spacing: -0.5px;
            ">
              Blogspot
            </h1>
          </div>
          <div style="padding: 40px; text-align: center">
            <h2 style="
              color: #111827;
              font-size: 28px;
              margin-bottom: 16px;
              font-weight: 700;
            ">
              Confirm your email
            </h2>
            <p style="
              color: #4b5563;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 32px;
            ">
              Hi <strong>${name}</strong>,<br />
              Welcome to the community! We're excited to see what you'll write. Before
              we get started, please confirm your email address to activate your
              account.
            </p>
            <div style="margin-bottom: 32px">
              <a href="${verifyUrl}" style="
                background-color: #000000;
                color: #ffffff;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                display: inline-block;
                transition: all 0.3s ease;
              ">
                Verify Account
              </a>
            </div>
            <p style="color: #9ca3af; font-size: 13px; line-height: 1.5">
              This link will expire in 2 hours. If you did not sign up for a Blogspot
              account, you can safely ignore this email.
            </p>
          </div>
          <div style="
            background-color: #f3f4f6;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          ">
          <p style="color: #6b7280; font-size: 12px; margin: 0">
            Trouble clicking the button? Copy and paste this link:
            <br />
            <a href="${verifyUrl}" style="color: #2563eb; text-decoration: underline">${verifyUrl}</a>
          </p>
          </div>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
