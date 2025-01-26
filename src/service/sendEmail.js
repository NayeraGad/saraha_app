import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html, attachments) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Mail content
  const info = await transporter.sendMail({
    from: `"Saraha ✉️" <${process.env.EMAIL}>`,
    to: to ? to : "nayera.mohamed9876@gmail.com",
    subject: subject ? subject : "Hello",
    html: html ? html : "<b>Hello world?</b>",
    attachments: attachments ? attachments : [],
  });

  if (info.accepted.length) {
    return true;
  }
  return false;
};

export default sendEmail;
