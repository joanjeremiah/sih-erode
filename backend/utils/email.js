const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require("dotenv").config();

async function sendMail(mailOptions) {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLEINT_SECRET,
        process.env.REDIRECT_URI
      );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'joanjeremiah04@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLEINT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      // console.log(accessToken)
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  module.exports = sendMail