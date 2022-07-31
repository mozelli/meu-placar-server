const nodemailer = require("nodemailer");

// async function main(from, to, subject, text, html) {

//   let transporter = nodemailer.createTransport({
//     host: process.env.MAILER_HOST,
//     port: process.env.MAILER_PORT,
//     // secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.MAILER_USER, // generated ethereal user
//       pass: process.env.MAILER_PASSWORD, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from, // sender address
//     to, // list of receivers
//     subject, // Subject line
//     text, // plain text body
//     html // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

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
