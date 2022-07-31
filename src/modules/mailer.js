const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

async function send(from, to, subject, text, html) {
  const message = {
    from,
    to,
    subject,
    text,
    html,
  };

  await transport.sendMail(message, function (err) {
    if (err) {
      return {
        error: true,
        nodemailerErrorMessage: err,
        message: "The user was created but cannot send the confirmation email.",
      };
    } else {
      return {
        error: false,
        nodemailerErrorMessage: "",
        message: "User registered. System awaiting email confirmation.",
      };
    }
  });
}

module.exports = { send };
