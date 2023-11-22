const cron = require("node-cron");
const nodemailer = require("nodemailer");

const pool = require('../database/connection.js').pool;

// Create a nodemailer transporter (configure this based on your email provider)
let transporter = nodemailer.createTransport({
  host: "us2.24livehost.com",
  port: 587,
  secure: false,
  auth: {
    user: "ds20@24livehost.com",
    pass: "Dsmtp@909#",
  },
});


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

        // https://shivappdev.24livehost.com/shiv_app/${user_id}/${newGroupName}/${event_id}/${element.id}
        const mailOptions = {
          from: "info@shiv-worldwide.com",
          to: element.email,
          subject: "Reminder To Submit Your RSVP",
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

