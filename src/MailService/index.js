const Email = require('email-templates');
require('dotenv').config()

const email = new Email({
 message: {
   from: process.env.PLATAFORM_EMAIL
 },
 send: true,
 transport: {
   host: process.env.SMTP_HOST,
   port: process.env.SMTP_PORT,
   ssl: false,
   tls: true,
   auth: {
     user: process.env.SMTP_USERNAME, // your Mailtrap username
     pass: process.env.SMTP_PASSWORD //your Mailtrap password
   }
 }
});

module.exports = email;
