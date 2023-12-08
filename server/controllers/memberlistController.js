const pool = require("../database/connection").pool;

module.exports.WeddingGuests = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT DISTINCT r.guest_id,  g.guest_name,g.email,g.group_name
FROM responses as r
LEFT JOIN guests as g ON g.id = r.guest_id 
WHERE r.user_id = $1`,
      [user_id]
    );
    for (let index = 0; index < result.rowCount; index++) {
      const element = result.rows[index];
      const existingResponse = await pool.query(
        `select id from wedding_reminder_list where user_id=$1 and guest_id=$2 `,
        [user_id, element.guest_id]
      );

      if (existingResponse.rowCount < 1) {
        await pool.query(
          `INSERT INTO wedding_reminder_list (user_id,guest_id,guest_name,guest_email,guest_submitted_response) VALUES($1,$2,$3,$4,$5)`,
          [user_id, element.guest_id, element.guest_name, element.email, true]
        );
      }
      // if (existingResponse.rowCount > 0){
      //   await pool.query(`UPDATE wedding_reminder_list SET guest_submitted_response=true`);
      // }
    }
    const resultAll = await pool.query(
      `SELECT id as guest_id, guest_name, email, group_name
  FROM guests
WHERE user_id = $1
  AND NOT EXISTS (
    SELECT 1
    FROM responses as r
    WHERE r.user_id = $2
      AND r.guest_id = guests.id
  );
`,
      [user_id, user_id]
    );
    for (let index = 0; index < resultAll.rowCount; index++) {
      const element = resultAll.rows[index];
      const existingResponse = await pool.query(
        `select id from wedding_reminder_list where user_id=$1 and guest_id=$2 `,
        [user_id, element.guest_id]
      );

      if (existingResponse.rowCount === 0) {
        await pool.query(
          `INSERT INTO wedding_reminder_list (user_id,guest_id,guest_name,guest_email,guest_submitted_response) VALUES($1,$2,$3,$4,$5)`,
          [user_id, element.guest_id, element.guest_name, element.email, false]
        );
      }
    }

    const finallist = await pool.query(
      `select * from wedding_reminder_list where user_id=$1`,
      [user_id]
    );

    res.status(200).json({ Data: finallist.rows }).end();
  } catch (error) {
    console.error("Error handling response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
