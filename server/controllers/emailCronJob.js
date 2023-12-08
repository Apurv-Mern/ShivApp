const nodemailer = require("nodemailer");
require("dotenv").config();
const pool = require('../database/connection.js').pool;



const setcronjob = async (req, res) => {

  const { data, scheduledTime } = req.body;
  console.log("1");
  console.log(data, scheduledTime);
  // Schedule a cron job based on the provided scheduled time
  try {
    console.log("2");

      // Send email to each recipient in the list
      console.log("3");
      console.log(scheduledTime);
      for (let index = 0; index < data.length; index++) {
        console.log("4");
        const element = data[index];
        console.log(element.id, element.email);
        console.log("5");

        const link = await pool.query(
          "select rsvp_link from guests where id=$1",
          [element.id]
        );
        console.log("6");
        console.log(link.rows[0]);
        let transporter = nodemailer.createTransport({
            host: process.env.SERVER_EMAIL_HOST,
            port:process.env.SERVER_PORT,
            secure: false,
            auth: {
              user: process.env.SERVER_EMAIL,
              pass: process.env.SERVER_EMAIL_PASS,
            },
          });
          
          
        let mailOptions = {
          from: "info@shiv-worldwide.com",
          to: element.email,
          subject: "Reminder To Submit Your RSVP",
          html: `<div>
          <p>
          It’s finally here! We are so excited to share our wedding invitation with you!</br>
          Please find our invitation attached and click on the RSVP link to let us know if you can attend within the next 4 weeks. </br>
          <p/>
          <a href='${link.rows[0].rsvp_link}' style='text-decoration:'underline';'>Click here to get RSVP</a>
          <p style="font-size:14px">Brought to you by SHIV</br>
          Please ensure you save this email address to receive further event details.
          </p>
          </div>`,
          text: `Please Submit your RSVP by clicking on ${link.rows[0].rsvp_link}`,
        };
        console.log("7");
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("8");
            console.error("Error sending email:", error);
          } else {
            console.log("9");
            console.log("Email sent:", info.response);
          }
        });
      };
      console.log("10");
      console.log("Scheduled email job executed.");
   

    console.log("11");
    res.send({ message: "Emails scheduled successfully" });

  } catch (error) {
    console.log("12");
    console.log(error);
    res.status(500).send(error.message);
  }


};

module.exports = { setcronjob };

