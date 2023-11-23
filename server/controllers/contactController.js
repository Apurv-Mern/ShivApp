const { log } = require("console");
const nodemailer = require("nodemailer");
require("dotenv").config();

const contactUs = async (req, res) => {
 // let name="jaideep" , email="singhjai0555@gmail.com", phone= "999999969" , query="this the query", comment =" for test need to resolve the query";
const {name,email,phone,query,comment}=req.body;


let transporter = nodemailer.createTransport({
  host: process.env.SERVER_EMAIL_HOST,
  port:process.env.SERVER_PORT,
  secure: false,
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_EMAIL_PASS,
  },
});

console.log("15");
  let mailOptions = {
    from:   process.env.EMAIL,
    to:email, // list of receivers
    subject: query,
    text: `You have a new submission from your contact form... \n\n Name: ${name} \n Email: ${email} \n Phone: ${phone} \n Looking for: ${query} \n Comment: ${comment}`,
  };
console.log("22");
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("25");
      console.log("Error Occurs", err);
      res.json({
        status: "fail",
      });
    } else {
      console.log("31");
      console.log("Email sent successfully");
      res.json({
        status: "success",
      });
    }
  });
};
module.exports = {
  contactUs,
};
