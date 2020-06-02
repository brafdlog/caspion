const sgMail = require('@sendgrid/mail');
const config = require('./config'); // eslint-disable-line import/no-unresolved

const MY_EMAIL_ADDRESS = config.monitoring.email.toEmailAddress;

function sendEmail({ to = MY_EMAIL_ADDRESS, from = MY_EMAIL_ADDRESS, subject = 'Fin job status', text, html }) {
  sgMail.setApiKey(config.monitoring.email.sendgridApiKey);
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
