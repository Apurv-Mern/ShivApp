// const nodemailer = require("nodemailer");
const pool = require("../database/connection").pool;

module.exports.RSVPQuestion = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM questions");
    res.status(200).json({ Data: result.rows }).end();
  } catch (error) {
    console.error("Error handling response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.handleResponse = async (req, res) => {
  try {
    // Extract necessary data from the request
    const {
      user_id,
      event_id,
      guest_id,
      question_id,
      response,
      extra_details,
      attending,
    } = req.body;

    if (question_id.length != response.length) {
      res
        .status(400)
        .json({ Error: "No. of questions and responses does not match" });
    }

    for (let index = 0; index < question_id.length; index++) {
      const singleQuestion = question_id[index];
      const singleResponse = response[index];
      const singleExtraDetails = extra_details[index];
      const existingResponse = await pool.query(
        `SELECT * FROM responses WHERE user_id = $1 AND guest_id = $2 AND question_id=$3 `,
        [user_id, guest_id, singleQuestion]
      );
      if (existingResponse.rowCount > 0) {
        res
          .status(400)
          .json({ Error: `Response already submitted for this for guest ` })
          .end();
        return;
      }
      const query = `
           INSERT INTO responses (user_id, guest_id, question_id, response, extra_details)
           VALUES ($1, $2, $3, $4, $5)
       `;
      await pool.query(query, [
        user_id,
        guest_id,
        singleQuestion,
        singleResponse,
        singleExtraDetails,
      ]);
    }
    await pool.query(
      `UPDATE ceremony_attendance SET ceremony_attending=$1 WHERE user_id=$2 AND event_id=$3 AND guest_id=$4`,
      [attending, user_id, event_id, guest_id]
    ); // Insert the response into the database

    res.status(201).json({ message: "Response submitted successfully" });
  } catch (error) {
    console.error("Error handling response:", error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

module.exports.handleAdditionalGuest = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      user_id,
      guest_id,
      event_id,
      question_id,
      response,
      extra_details,
      gog_details, // Object containing additional guest detailss
      relation,
    } = req.body;

    //console.log(guest_id);
    // Insert the additional guest into the guest_of_guests table
    const { first_name, last_name, email, mobile_number } = gog_details;
    // console.log(first_name, last_name, email, mobile_number );
    const guestOfGuestQuery = `
      INSERT INTO guest_of_guests (gog_name,guest_id, relation, mobile_number, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;

    const guestOfGuestValues = [
      `${first_name} ${last_name}`,
      guest_id,
      relation,
      mobile_number,
      email,
    ];
    const guestOfGuestResult = await pool.query(
      guestOfGuestQuery,
      guestOfGuestValues
    );

    // Get the generated gog_id
    const gog_id = guestOfGuestResult.rows[0].id;

    // Insert the RSVP response for the additional guest
    const guestOfGuestResponseQuery = `
      INSERT INTO guest_of_guests_response (user_id, event_id, gog_id, question_id, response, extra_details)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const guestOfGuestResponseQueryWithoutArray = `
      INSERT INTO guest_of_guests_response_withohut_array (user_id, event_id, gog_id, question_id, response, extra_details)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    // Assuming question_id and response are arrays of the same length
    for (let i = 0; i < question_id.length; i++) {
      const values = [
        user_id,
        event_id,
        gog_id,
        question_id[i],
        response[i],
        extra_details[i],
      ];
      await pool.query(guestOfGuestResponseQueryWithoutArray, values);
    }

    res.status(200).json({
      message: "Additional guest and RSVP response added successfully",
    });
  } catch (error) {
    console.error("Error handling additional guest RSVP:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

module.exports.handleGuestResponse = async (req, res) => {
  try {
    // Extract necessary data from the request
    const user_id = parseInt(req.params.user_id);
    //console.log(typeof(user_id))
    const responseData = await pool.query(
      `SELECT * FROM responses WHERE user_id = $1`,
      [user_id]
    );
    //console.log(responseData);
    res.status(200).json({ Data: responseData.rows }).end();
  } catch (error) {
    console.error("Error handling response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
