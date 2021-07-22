const Email = require('email-templates');
const moment = require('moment');
const pug = require('pug')
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
     user: process.env.SMTP_USERNAME, 
     pass: process.env.SMTP_PASSWORD
   }
 }
});

module.exports = async (variables) => {
    if (!variables) return;
    const messageJSON = JSON.parse(variables);
    console.log(messageJSON);
    const total = messageJSON[0].toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    });
    const emails = messageJSON[1];
    const data = moment(messageJSON[2].created_at).format('DD/MM/YYYY, hh:mm:ss a');
    const name = messageJSON[2].user.name;
    const games = messageJSON.filter(({ id }) => id);
  
    const html = pug.renderFile(`${__dirname}/views/newbet/newbet.pug`, {
        total,
        data,
        name,
        games,
    });

    await email
    .send({
        message: {
            to: emails,
            html,
            subject: `O usuário ${name} realizou um jogo`,
            text: html.toString()
        }
    })
    .then(console.log)
    .catch(console.error);
}
