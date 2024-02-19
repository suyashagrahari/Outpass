const nodemailer = require('nodemailer');
const OutpassModel = require("../models/outpassSchema");

const sendMail = async(req,res,next)=>{

    console.log("Mail check kr rha huin");
    console.log(req.body);
    console.log(req.body.status);
    console.log(req.body.studentId);

    const user = await OutpassModel.findById(req.body.studentId);
    console.log("user agya");
    console.log(user);
    // Create a transporter using your SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'backendtest1234@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });


  // //   Create an email message with the recipient's email address, subject, and content:
const mailOptions = {
    from: 'backendtest1234@gmail.com',
    to: `${user.email}`,
    subject: `Regarding College Outpass`,
    text: `Dear ${user.name}, your outpass is ${req.body.status} for ${user.visitpurpose}`,
  };

//   Use the transporter to send the email:
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  next();

}

module.exports = sendMail;