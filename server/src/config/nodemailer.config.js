const nodemailer = require("nodemailer");

const transporter = async () => {
    
  
    const tran = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  
    return tran;
  };

module.exports = transporter;