const { jsPDF } = require("jspdf");

const path = require("path");
const nodemailer = require("nodemailer");
const pool = require("../database/connection").pool;

module.exports.uploadImages = async (req, res) => {
  const { user_id } = req.params;
  console.log(req.body);
  const groupname = req.body.groupname;
  // const groupname = ["clg friends"];
  console.log("0");
  console.log(groupname);
  console.log("1");
  const data = req.body.images;
  const image1 = data.split(",");
  const template1 = image1[0] + "," + image1[1];
  const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
  const buffer1 = Buffer.from(base64String1, "base64");
  //const buffer1 = Buffer.from(template1, "base64");
  const image2 = data.split(",");
  const template2 = image2[2] + "," + image2[3];
  const base64String2 = template2.substring(template2.indexOf("base64,") + 7);
  const buffer2 = Buffer.from(base64String2, "base64");

  const image3 = data.split(",");
  const template3 = image3[4] + "," + image3[5];
  const base64String3 = template3.substring(template3.indexOf("base64,") + 7);
  const buffer3 = Buffer.from(base64String3, "base64");
  console.log("2");
  //   console.log(buffer3);

  //   const buffer = Buffer.from(template3, "base64");

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("3");
    //mail configuration
    let transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 587,
      // secure: false,
      // auth: {
      //   user: process.env.EMAIL,
      //   pass: process.env.MAIL_PASS,
      // },
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });
    console.log("4");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);
    doc.addPage();
    doc.addImage(buffer2, "PNG", 0, 0, 600, 401);
    doc.addPage();
    doc.addImage(buffer3, "PNG", 0, 0, 600, 401);

    //*********************get guests by group name for a userid  logic start **************** /
    console.log("5");
    // console.log(user_id, groupname);
    console.log("groupname.length");
    let counter = 0;
    for (let group = 0; group < groupname.length; group++) {
      const singleGroup = groupname[group];
      console.log("singleGroup", singleGroup);
      const query = `
      SELECT id, guest_name, mobile_number, email, group_name
      FROM guests
      WHERE user_id = $1 AND group_name = $2
      ORDER BY guest_name;
    `;
      const result = await pool.query(query, [user_id, singleGroup]);
      console.log("6");
      console.log(result.rows);
      console.log("7");
      for (let index = 0; index < result.rows.length; index++) {
        ++counter;
        const element = result.rows[index];
        const newGroupName=element.group_name.replace(" ","%20");
        console.log(element.id);
        console.log(newGroupName);
        console.log(element.email);
        console.log("8");
        const urllink = `https://shivappdev.24livehost.com/shiv_app/${user_id}/${newGroupName}/${element.id}`;
        console.log(urllink);
        doc.textWithLink("Click Here to Submit your RSVP!", 200, 280, {
          url: urllink,
        });
        doc.save(`controllers/newpdf/output${counter}.pdf`);

        let mailOptions = {
          from:"test@shiv.com",
          to: element.email, // list of receivers
          subject: "Shiv App RSVP",
          text: `Please Submit your RSVP for ${element.guest_name} by clicking on the link below \n\n ${urllink} \n\n Thank You`,
          attachments: [
            {
              filename: `newpdf/output${counter}.pdf`,
              path: path.join(
                __dirname,
                `newpdf/output${counter}.pdf`
              ), // <= Here
              contentType: "application/pdf",
            },
          ],
        };
        console.log("9");
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("Error Occurs", err);
            res.json({
              status: "fail",
            }).end();
          } else {
            console.log("Email sent successfully");
            res.json({
              status: "success",
            }).end();
          }
        });
      }
      //insert into rsvp_attendances table inside column "total_invitation_sent" with counter as a value
      await pool.query(
        `INSERT INTO rsvp_attendance (total_invitation_sent,user_id) VALUES ($1,$2)`,
        [counter,user_id]
      );
      //update total_invitation_sent column inside rsvp_attendance table with counter as a value
      // await pool.query(
      //   `UPDATE rsvp_attendance SET total_invitation_sent = $1 WHERE id = $2`,
      //   [counter, user_id]
      // );

    //  res.status(201).json({ msg: "files uploaded successfully" });
      }
  
  } catch (error) {
    res.send(error);
  }
};

module.exports.getImages = (req, res) => {
  res.json("hellp");
};
