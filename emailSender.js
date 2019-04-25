const sgMail = require('@sendgrid/mail');

const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS;

function sendEmail({ to = MY_EMAIL_ADDRESS, from = MY_EMAIL_ADDRESS, subject = 'Fin job status', text, html }) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from,
    subject,
    text,
    html
  };
  return sgMail.send(msg);
}

module.exports = {
  sendEmail
};
