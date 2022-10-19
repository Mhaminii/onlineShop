const nodemailer = require('nodemailer');

const sendEmail = async (options) =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7d983b35b91cef",
          pass: "95236333716201"
        }
      });

     const message = {
        from:`noreplay@onlineshop.com آنلاین شاپ `,
        to:options.email,
        subject:options.subject,
        text:options.message
     } 

    transport.sendMail(message) 
}

module.exports = sendEmail