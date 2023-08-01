const nodemailer = require("nodemailer");

const SendOtp = (email, otp, sub) => {
  console.log(otp);

  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
        secure: true,
      });

      const mailData = {
        to: email,
        subject: `You have received OTP from YKONNECT`,
        text: `${otp} is your YKONNECT OTP. Please do not share the OTP with others.
        Regards,
        Team YKONNECT`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          reject(err);
        } else {
          resolve("email sent");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { SendOtp };
