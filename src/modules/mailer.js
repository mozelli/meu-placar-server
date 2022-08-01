const nodemailer = require("nodemailer");
const path = require("path");
const { errorLog, successLog } = require("../utils/logRegister");

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

  await transport.sendMail(message, function (error) {
    if (error) {
      errorLog(error.message, "mailer.js, transport.sendMail()");
      return {
        error: true,
        nodemailerErrorMessage: error,
        message: "The user was created but cannot send the confirmation email.",
      };
    } else {
      successLog(
        "User registered. System awaiting email confirmation.",
        "mailer.js, transport.sendMail()"
      );
      return {
        error: false,
        nodemailerErrorMessage: "",
        message: "User registered. System awaiting email confirmation.",
      };
    }
  });
}

module.exports = { send };
