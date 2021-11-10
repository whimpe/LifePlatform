import  nodemailer  from "nodemailer";

// import * as Logo from './logo_aet_gold.png';

// async..await is not allowed in global scope, must use a wrapper
export async function SendMessage(name:string,email:string,tel:string,message:string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  
  // let voorbeeld levensverhaal = await nodemailer.createvoorbeeld levensverhaal();
  // console.log('voorbeeld levensverhaal', voorbeeld levensverhaal);


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.zxcs.nl",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@aeterna.be',
      pass: 'rememberme'
    },
  });




  // forgot_password_email
  let info = await transporter.sendMail({
    from: ' <info@aeterna.be>', // sender address
    to: 'info@aeterna.be', // list of receivers
    subject: "Bericht Aeterna.be", // Subject line
    html:`<>${name}, </br> ${email},</br> ${tel},</br> ${message} </>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}

//    sendEmail("willemhimpe@hotmail.com","Fa");
