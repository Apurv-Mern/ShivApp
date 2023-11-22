const { log } = require("console");
const nodemailer = require("nodemailer");
const contactUs = async (req, res) => {
 // let name="jaideep" , email="singhjai0555@gmail.com", phone= "999999969" , query="this the query", comment =" for test need to resolve the query";
const {name,email,phone,query,comment}=req.body;


  let transporter = nodemailer.createTransport({
    host: "us2.24livehost.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "ds20@24livehost.com",
      pass: "Dsmtp@909#",
    },
  });

console.log("15");
  let mailOptions = {
    from:  "shivworldwideltd@gmail.com",
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
