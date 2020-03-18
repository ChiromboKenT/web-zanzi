const nodemailer = require('nodemailer')

const sendEmail = async options =>{
   
   const mail = nodemailer.createTransport({
      service: 'SendGrid',
       auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
       }
     });
     var maillist = [
      'kenmbi290@gmail.com',
      'shorai@penyesa.co.za',
   ]
     const mailOptions = {
      from: `Zanzibar Website <${options.request.email}>`,
      to: maillist,
      subject: `RSVP From: ${options.request.name}`,
      html: `<body style="box-sizing: border-box;margin: 0;">
      <section class="body" style="background-color: #eeeeee;font-size: 1.1em;word-break: break-word;color: #666666;font-weight: 400;padding: 3rem;">
         <div class="heading" style="font-size: 1.5em;font-weight: 700;margin: 4rem 0;margin-bottom: 1.5rem;">
            Dear Shorai Chirombo,
         </div>
         <div class="text-1" style="font-size: 1.1em;font-weight: 700;text-align: left;width: 60%;padding: 2rem 0;">
            You have received an email from <span stlye="font-weight:700">${options.request.name}</span>
            Please find More Information about the email below:
         </div>
         <div class="text2" style="text-align: left;background-color: rgb(136, 192, 214);padding: 3rem;width: 40%;">
            Name              :  ${options.request.name} <br><br>
            Preffered Options :  ${options.request.option}<br><br>
            No. Of People     :  ${options.request.guest}<br><br>
            Message           :  ${options.request.message}<br><br>
            Email             :  ${options.request.email}<br><br>
            Cell              :  ${options.request.number}<br>
         </div>
      </section>
   </body>`
      
   };

   await mail.sendMail(mailOptions);
};

module.exports = sendEmail;

