const { jsPDF } = require("jspdf");
const path = require("path");
const fs = require("fs/promises");
const nodemailer = require("nodemailer");
// const aws= require('aws-sdk');
const pool = require("../database/connection").pool;
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { url } = require("inspector");
// aws.config.update({
//   accessKeyId: 'AKIAV6RD45SCZLBFFXKV',
//   secretAccessKey: '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',
//   region: 'ap-south-1',
// });

//  const s3 = new aws.S3();

module.exports.uploadImages = async (req, res) => {
  const { user_id, event_id } = req.params;
  const guest_id = req.body.guest_id;
  const ceremony_invited_for = req.body.ceremony_invited_for;
  // const ceremony_invited_for= ["Hindu Wedding","Reception","Bride's Vidhi"]
  console.log(req.body);
  const groupname = req.body.groupname;

  console.log("0");
  console.log(groupname);
  console.log("1");
  const data = req.body.images;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");

    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: "AKIAV6RD45SCZLBFFXKV",
        secretAccessKey: "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",
      },
    });
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });

    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");

    const image2 = data.split(",");
    const template2 = image2[2] + "," + image2[3];
    const base64String2 = template2.substring(template2.indexOf("base64,") + 7);
    const buffer2 = Buffer.from(base64String2, "base64");

    const image3 = data.split(",");
    const template3 = image3[4] + "," + image3[5];
    const base64String3 = template3.substring(template3.indexOf("base64,") + 7);
    const buffer3 = Buffer.from(base64String3, "base64");
    console.log("3");

    console.log("4");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);
    doc.addPage();
    doc.addImage(buffer2, "PNG", 0, 0, 600, 401);
    doc.addPage();
    doc.addImage(buffer3, "PNG", 0, 0, 600, 401);

     const query = `
      SELECT bride_name,groom_name
      FROM marriage_details
      WHERE user_id = $1;
    `;

     const couplename = await pool.query(query, [user_id]);
    // Array to store PDF URLs
    const pdfURLs = [];
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
        const newGroupName = element.group_name.replace(" ", "%20");
        console.log(element.id);
        console.log(newGroupName);
        console.log(element.email);
        console.log("8");
        const urllink = `https://shivappdev.24livehost.com/shiv_app/${user_id}/${newGroupName}/${event_id}/${element.id}`;
        console.log(urllink);
        await pool.query(
          "UPDATE guests SET rsvp_link=$1 WHERE user_id=$2 AND id=$3",
          [urllink, user_id, result.rows[0].id]
        );
        doc.textWithLink("Click Here to Submit your RSVP!", 200, 380, {
          url: urllink,
        });
        //  doc.textWithLink("Check our wedding website", 200, 395, {
        //    url: "https://shivappdev.24livehost.com/shiv_app/wedding_website/",
        //  });
        doc.save(`controllers/newpdf/Shiv RSVP Invitation${counter}.pdf`);

        const pdfKey = `newpdf/Shiv RSVP Invitation${counter}.pdf`;
        const pdfBuffer = await fs.readFile(
          `controllers/newpdf/Shiv RSVP Invitation${counter}.pdf`
        );

        const uploadParams = {
          Bucket: "shivapp",
          Key: pdfKey,
          Body: pdfBuffer,
        };
        try {
          const result = await s3Client.send(
            new PutObjectCommand(uploadParams)
          );
          const pdfURL = `https://shivapp.s3.amazonaws.com/${pdfKey}`;
          pdfURLs.push(pdfURL);
          console.log(`Uploaded PDF to S3: ${pdfURL}`);
        } catch (err) {
          console.error(`Error uploading PDF to S3: ${err.message}`);
        }
        // const result = await s3Client.send(new PutObjectCommand(uploadParams));

        // // Get the URL of the uploaded PDF
        // const pdfURL = `https://your-s3-bucket-name.s3.amazonaws.com/${pdfKey}`;
        // pdfURLs.push(pdfURL);

        let mailOptions = {
          from: "info@shiv-worldwide.com",
          to: element.email, // list of receivers
          subject: `Please Submit you RSVP for ${couplename.rows[0].bride_name} And  ${couplename.rows[0].groom_name}`,
          html: `<h3><a href='https://shivapp.s3.amazonaws.com/${pdfKey}' style='text-decoration:'underline';'>Click here to get RSVP</a></h3>`,
          text: `Please Submit your RSVP for ${element.guest_name} in the attached PDF \n\n Thank You`,
          attachments: [
            {
              filename: `Shiv RSVP Invitation${counter}.pdf`,
              path: path.join(
                __dirname,
                `./newpdf/Shiv RSVP Invitation${counter}.pdf`
              ), // <= Here
              contentType: "application/pdf",
            },
          ],
        };
        console.log("9");
        transporter.sendMail(mailOptions, async function (err, data) {
          if (err) {
            console.log("10");
            console.log("Error Occurs", err);
            throw err;
          } else {
            // to check if ceremony attedance already exists of a guest for a event of a user
            const ceremony_attendance = await pool.query(
              `SELECT * FROM ceremony_attendance WHERE user_id=$1 AND event_id=$2 AND guest_id=$3;`,
              [user_id, event_id, element.id]
            );
            console.log("11");
            if (ceremony_attendance.rowCount > 0) {
              console.log("12");
              //if yes then update the ceremony_invited_for
              await pool.query(
                `UPDATE ceremony_attendance SET ceremony_invited_for=$1 WHERE user_id=$2 AND event_id=$3 AND guest_id=$4;`,
                [ceremony_invited_for, user_id, event_id, element.id]
              );
            } else {
              console.log("13");
              //if no then insert the ceremony_attendance
              await pool.query(
                `
            INSERT INTO ceremony_attendance (user_id, event_id, guest_id, ceremony_invited_for)
            VALUES ($1, $2, $3, $4);
        `,
                [user_id, event_id, element.id, ceremony_invited_for]
              );
            }
            console.log("Email sent successfully", counter);
          }
        });
      }
    }
    console.log(counter);
    await pool.query(
      "UPDATE rsvp_attendance SET total_invitation_sent=$1 WHERE user_id=$2 AND event_id=$3;",
      [counter, user_id, event_id]
    );
    await pool.query(
      `UPDATE events
      SET is_email_sent = $1, email_sent_timestamp = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND id = $3;`,
      [true, user_id, event_id]
    );
    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.uploadImage = async (req, res) => {
  const { user_id, event_id } = req.params;
  const guest_id = req.body.guest_id;
  // const ceremony_invited_for= req.body.ceremony_invited_for;

  console.log(req.body);
  const groupname = req.body.groupname;

  console.log("0");
  console.log(groupname);
  console.log("1");
  const data = req.body.images;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });

    // const element = array[index];

    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");

    console.log("3");

    console.log("4");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);


     const query = `
      SELECT bride_name,groom_name
      FROM marriage_details
      WHERE user_id = $1;
    `;

     const couplename = await pool.query(query, [user_id]);

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
        const newGroupName = element.group_name.replace(" ", "%20");
        console.log(element.id);
        console.log(newGroupName);
        console.log(element.email);
        console.log("8");
        // const urllink = `https://shivappdev.24livehost.com/shiv_app/${user_id}/${newGroupName}/${event_id}/${element.id}`;
        // console.log(urllink);
        // doc.textWithLink("Click Here to Submit your RSVP!", 200, 280, {
        //   url: urllink,
        // });
        doc.save(`controllers/newpdf/Shiv RSVP Invitation${counter}.pdf`);

        // const s3Params = {
        //   Bucket: 'shivapp',
        //   Key: `rsvp_invitation/Shiv RSVP Invitation${counter}.pdf`,
        //   Body: fs.createReadStream(pdfFilePath),
        //   ACL: 'public-read', // You can change the ACL as needed
        // };

        // s3.upload(s3Params, function (err, data) {
        //   if (err) {
        //     console.log("Error uploading to S3", err);
        //   } else {
        //     console.log("PDF uploaded to S3 successfully");
        //     // Now, you can send the email with a link to the S3 object
        //     const pdfUrl = data.Location; // Get the URL of the uploaded PDF
        //     sendEmailWithLink(pdfUrl, element.email, counter);
        //   }
        // });

        let mailOptions = {
          from: "info@shiv-worldwide.com",
          to: element.email, // list of receivers
          subject: `${couplename.rows[0].bride_name} And  ${couplename.rows[0].groom_name} are Engaged!`,
          text: `"Announcing Our Journey Together: We're Engaged!" \n Check the   Card \n\n Thank You`,
          attachments: [
            {
              filename: `Shiv RSVP Invitation${counter}.pdf`,
              path: path.join(
                __dirname,
                `./newpdf/Shiv RSVP Invitation${counter}.pdf`
              ), // <= Here
              contentType: "application/pdf",
            },
          ],
        };
        console.log("9");
        transporter.sendMail(mailOptions, async function (err, data) {
          if (err) {
            console.log("10");
            console.log("Error Occurs", err);
            throw err;
          } else {
            console.log("Email sent successfully", counter);
          }
        });
      }
    }
    console.log(counter);
    await pool.query(
      "UPDATE rsvp_attendance SET total_invitation_sent=$1 WHERE user_id=$2 AND event_id=$3;",
      [counter, user_id, event_id]
    );
      await pool.query(
        `UPDATE events
      SET is_email_sent = $1, email_sent_timestamp = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND id = $3;`,
        [true, user_id, event_id]
      );
    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.thankyou = async (req, res) => {
  const { user_id, event_id } = req.params;
  const guest_id = req.body.guest_id;
  // const ceremony_invited_for= req.body.ceremony_invited_for;

  console.log(req.body);
  const groupname = req.body.groupname;

  console.log("0");
  console.log(groupname);
  console.log("1");
  const data = req.body.images;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });

    // const element = array[index];

    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");

    console.log("3");

    console.log("4");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);

    const query = `
      SELECT bride_name,groom_name
      FROM marriage_details
      WHERE user_id = $1;
    `;

    const couplename = await pool.query(query, [user_id]);

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
        const newGroupName = element.group_name.replace(" ", "%20");
        console.log(element.id);
        console.log(newGroupName);
        console.log(element.email);
        console.log("8");
        // const urllink = `https://shivappdev.24livehost.com/shiv_app/${user_id}/${newGroupName}/${event_id}/${element.id}`;
        // console.log(urllink);
        // doc.textWithLink("Click Here to Submit your RSVP!", 200, 280, {
        //   url: urllink,
        // });
        doc.save(`controllers/newpdf/Shiv RSVP Thankyou${counter}.pdf`);

        // const s3Params = {
        //   Bucket: 'shivapp',
        //   Key: `rsvp_invitation/Shiv RSVP Invitation${counter}.pdf`,
        //   Body: fs.createReadStream(pdfFilePath),
        //   ACL: 'public-read', // You can change the ACL as needed
        // };

        // s3.upload(s3Params, function (err, data) {
        //   if (err) {
        //     console.log("Error uploading to S3", err);
        //   } else {
        //     console.log("PDF uploaded to S3 successfully");
        //     // Now, you can send the email with a link to the S3 object
        //     const pdfUrl = data.Location; // Get the URL of the uploaded PDF
        //     sendEmailWithLink(pdfUrl, element.email, counter);
        //   }
        // });

        let mailOptions = {
          from: "info@shiv-worldwide.com",
          to: element.email, // list of receivers
          subject: `Thanks from ${couplename.rows[0].bride_name} And ${couplename.rows[0].groom_name}`,
          text: `Thanks for attending our Wedding`,
          attachments: [
            {
              filename: `Shiv RSVP Invitation${counter}.pdf`,
              path: path.join(
                __dirname,
                `./newpdf/Shiv RSVP Thankyou${counter}.pdf`
              ), // <= Here
              contentType: "application/pdf",
            },
          ],
        };
        console.log("9");
        transporter.sendMail(mailOptions, async function (err, data) {
          if (err) {
            console.log("10");
            console.log("Error Occurs", err);
            throw err;
          } else {
            console.log("Email sent successfully", counter);
          }
        });
      }
    }
    console.log(counter);
    await pool.query(
      "UPDATE rsvp_attendance SET total_invitation_sent=$1 WHERE user_id=$2 AND event_id=$3;",
      [counter, user_id, event_id]
    );
    await pool.query(
      `UPDATE events
      SET is_email_sent = $1, email_sent_timestamp = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND id = $3;`,
      [true, user_id, event_id]
    );
    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.savethedate = async (req, res) => {
  const { user_id ,event_id} = req.params;

  // const ceremony_invited_for= req.body.ceremony_invited_for;

  console.log(req.body);
  const groupname = req.body.groupname;

  console.log("0");
  console.log(groupname);
  console.log("1");
  const data = req.body.images;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });

    // const element = array[index];

    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");

    console.log("3");

    console.log("4");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);

     const query = `
      SELECT bride_name,groom_name
      FROM marriage_details
      WHERE user_id = $1;
    `;

     const couplename = await pool.query(query, [user_id]);

    //  const urllink = `https://shivappdev.24livehost.com/shiv_app/guest/contact/form`;
    //     console.log(urllink);
    //     doc.textWithLink("Click Here!", 200, 280, {
    //       url: urllink,
    //     });

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
        const newGroupName = element.group_name.replace(" ", "%20");
        console.log(element.id);
        console.log(newGroupName);
        console.log(element.email);
        console.log("8");

        doc.save(`controllers/newpdf/Shiv RSVP Invitation${counter}.pdf`);

        // const s3Params = {
        //   Bucket: 'shivapp',
        //   Key: `rsvp_invitation/Shiv RSVP Invitation${counter}.pdf`,
        //   Body: fs.createReadStream(pdfFilePath),
        //   ACL: 'public-read', // You can change the ACL as needed
        // };

        // s3.upload(s3Params, function (err, data) {
        //   if (err) {
        //     console.log("Error uploading to S3", err);
        //   } else {
        //     console.log("PDF uploaded to S3 successfully");
        //     // Now, you can send the email with a link to the S3 object
        //     const pdfUrl = data.Location; // Get the URL of the uploaded PDF
        //     sendEmailWithLink(pdfUrl, element.email, counter);
        //   }
        // });

        let mailOptions = {
          from: "info@shiv-worldwide.com",
          to: element.email, // list of receivers
          subject: `Save the date for ${couplename.rows[0].bride_name} And ${couplename.rows[0].groom_name}`,
          text: `"Mark Your Calendar: Our Special Day is Approaching!" \n Check the   Card \n\n Thank You`,
          attachments: [
            {
              filename: `Shiv RSVP Invitation${counter}.pdf`,
              path: path.join(
                __dirname,
                `./newpdf/Shiv RSVP Invitation${counter}.pdf`
              ), // <= Here
              contentType: "application/pdf",
            },
          ],
        };
        console.log("9");
        transporter.sendMail(mailOptions, async function (err, data) {
          if (err) {
            console.log("10");
            console.log("Error Occurs", err);
            throw err;
          } else {
            console.log("Email sent successfully", counter);
          }
        });
      }
    }
    console.log(counter);
      await pool.query(
        `UPDATE events
      SET is_email_sent = $1, email_sent_timestamp = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND id = $3;`,
        [true, user_id, event_id]
      );
    // await pool.query('UPDATE rsvp_attendance SET total_invitation_sent=$1 WHERE user_id=$2 AND event_id=$3;', [counter, user_id, event_id]);
    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.saveTheDateTestMail = async (req, res) => {
  const email = req.body.email;
  const data = req.body.images;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });
    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");
    console.log("3");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);

    //*********************get guests by group name for a userid  logic start **************** /
    console.log("5");
    // console.log(user_id, groupname);
    console.log("groupname.length");
    let counter = 0;
    doc.save(`controllers/newpdf/Shiv RSVP Invitation test.pdf`);
    let mailOptions = {
      from: "info@shiv-worldwide.com",
      to: email, // list of receivers
      subject: "Shiv App RSVP",
      text: `"Mark Your Calendar: Our Special Day is Approaching!" \n Check the   Card \n\n Thank You`,
      attachments: [
        {
          filename: `Shiv RSVP Invitation test.pdf`,
          path: path.join(__dirname, `./newpdf/Shiv RSVP Invitation test.pdf`), // <= Here
          contentType: "application/pdf",
        },
      ],
    };
    console.log("9");
    transporter.sendMail(mailOptions, async function (err, data) {
      if (err) {
        console.log("10");
        console.log("Error Occurs", err);
        throw err;
      } else {
        console.log("Email sent successfully", counter);
      }
    });

    // await pool.query('UPDATE rsvp_attendance SET total_invitation_sent=$1 WHERE user_id=$2 AND event_id=$3;', [counter, user_id, event_id]);
    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.uploadImageTestMail = async (req, res) => {
  const email = req.body.email;
  const data = req.body.images;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });
    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");
    console.log("3");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);

    //*********************get guests by group name for a userid  logic start **************** /
    console.log("5");
    // console.log(user_id, groupname);
    console.log("groupname.length");
    let counter = 0;
    doc.save(`controllers/newpdf/Shiv RSVP Invitation test.pdf`);
    let mailOptions = {
      from: "info@shiv-worldwide.com",
      to: email, // list of receivers
      subject: "Shiv App RSVP",
      text: `"Announcing Our Journey Together: We're Engaged!" \n Check the   Card \n\n Thank You`,
      attachments: [
        {
          filename: `Shiv RSVP Invitation test.pdf`,
          path: path.join(__dirname, `./newpdf/Shiv RSVP Invitation test.pdf`), // <= Here
          contentType: "application/pdf",
        },
      ],
    };
    console.log("9");
    transporter.sendMail(mailOptions, async function (err, data) {
      if (err) {
        console.log("10");
        console.log("Error Occurs", err);
        throw err;
      } else {
        console.log("Email sent successfully", counter);
      }
    });

    // await pool.query('UPDATE rsvp_attendance SET total_invitation_sent=$1 WHERE user_id=$2 AND event_id=$3;', [counter, user_id, event_id]);
    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports.uploadImagesTestMail = async (req, res) => {
  const email = req.body.email;
  const data = req.body.images;
  const user_id = req.body.user_id;
  const newGroupName = req.body.newGroupName;
  const event_id = req.body.event_id;
  const guest_id = req.body.guest_id;

  try {
    //pdf configuration
    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [600, 400],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });
    console.log("2");

    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: "AKIAV6RD45SCZLBFFXKV",
        secretAccessKey: "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",
      },
    });
    //mail configuration
    let transporter = nodemailer.createTransport({
      host: "us2.24livehost.com",
      port: 587,
      secure: false,
      auth: {
        user: "ds20@24livehost.com",
        pass: "Dsmtp@909#",
      },
    });

    const image1 = data.split(",");
    const template1 = image1[0] + "," + image1[1];
    const base64String1 = template1.substring(template1.indexOf("base64,") + 7);
    const buffer1 = Buffer.from(base64String1, "base64");

    const image2 = data.split(",");
    const template2 = image2[2] + "," + image2[3];
    const base64String2 = template2.substring(template2.indexOf("base64,") + 7);
    const buffer2 = Buffer.from(base64String2, "base64");

    const image3 = data.split(",");
    const template3 = image3[4] + "," + image3[5];
    const base64String3 = template3.substring(template3.indexOf("base64,") + 7);
    const buffer3 = Buffer.from(base64String3, "base64");
    console.log("3");

    console.log("4");
    doc.addImage(buffer1, "PNG", 0, 0, 600, 401);
    doc.addPage();
    doc.addImage(buffer2, "PNG", 0, 0, 600, 401);
    doc.addPage();
    doc.addImage(buffer3, "PNG", 0, 0, 600, 401);

    // Array to store PDF URLs
    const pdfURLs = [];
    //*********************get guests by group name for a userid  logic start **************** /
    console.log("5");
    // console.log(user_id, groupname);
    console.log("groupname.length");
    let counter = 0;

    const urllink = `https://shivappdev.24livehost.com/shiv_app/${user_id}/${newGroupName}/${event_id}/${guest_id}`;
    console.log(urllink);
    doc.textWithLink("Click Here to Submit your RSVP!", 200, 380, {
      url: urllink,
    });
    // doc.textWithLink("Check our wedding website", 200, 395, {
    //   url: "https://shivappdev.24livehost.com/shiv_app/wedding_website/",
    // });
    doc.save(`controllers/newpdf/Shiv RSVP Invitation test.pdf`);

    const pdfKey = `newpdf/Shiv RSVP Invitation test.pdf`;
    const pdfBuffer = await fs.readFile(
      `controllers/newpdf/Shiv RSVP Invitation test.pdf`
    );

    const uploadParams = {
      Bucket: "shivapp",
      Key: pdfKey,
      Body: pdfBuffer,
    };
    try {
      const result = await s3Client.send(new PutObjectCommand(uploadParams));
      const pdfURL = `https://shivapp.s3.amazonaws.com/${pdfKey}`;
      pdfURLs.push(pdfURL);
      console.log(`Uploaded PDF to S3: ${pdfURL}`);
    } catch (err) {
      console.error(`Error uploading PDF to S3: ${err.message}`);
    }

    let mailOptions = {
      from: "info@shiv-worldwide.com",
      to: email, // list of receivers
      subject: "Shiv App RSVP",
      html: `<h3><a href='https://shivapp.s3.amazonaws.com/${pdfKey}' style='text-decoration:'underline';'>Click here to get RSVP</a></h3>`,
      text: `Please Submit your RSVP in the attached PDF \n\n Thank You`,
      // attachments: [
      //   {
      //     filename: `Shiv RSVP Invitation test.pdf`,
      //     path: path.join(__dirname, `./newpdf/Shiv RSVP Invitation test.pdf`), // <= Here
      //     contentType: "application/pdf",
      //   },
      // ],
    };
    console.log("9");
    transporter.sendMail(mailOptions, async function (err, data) {
      if (err) {
        console.log("10");
        console.log("Error Occurs", err);
        throw err;
      } else {
        console.log("Email sent successfully", counter++);
      }
    });

    res.status(201).json({ msg: "files uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
