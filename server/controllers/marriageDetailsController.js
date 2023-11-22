const pool = require("../database/connection.js").pool;

const createMarriageDetail = async (req, res) => {
  try {
    const {
      bride_name,
      groom_name,
      bride_fathers_name,
      bride_mothers_name,
      groom_fathers_name,
      groom_mothers_name,
      user_id,
    } = req.body;

    const query = `
          INSERT INTO marriage_details (bride_name, groom_name, bride_fathers_name, bride_mothers_name, groom_fathers_name, groom_mothers_name, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;

    const values = [
      bride_name,
      groom_name,
      bride_fathers_name,
      bride_mothers_name,
      groom_fathers_name,
      groom_mothers_name,
      user_id,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating marriage detail:", error);
    res.status(500).json({ error: "Failed to create marriage detail" });
  }
};

const getMarriageDetailsByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = `
      SELECT *
      FROM marriage_details
      WHERE user_id = $1;
    `;

    const result = await pool.query(query, [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving marriage details:", error);
    res.status(500).json({ error: "Failed to retrieve marriage details" });
  }
};

const updateMarriageDetail = async (req, res) => {
  console.log("hellloooooo");
  const { user_id } = req.params;
  const { bride_name, groom_name } = req.body;

  // console.log({ ...req.body, u: user_id });

  try {
    const isData = await pool.query(
      "select id from marriage_details where user_id=$1; ",
      [user_id]
    );

    if (isData.rowCount > 0) {
      const query = `
      UPDATE marriage_details
      SET bride_name = $1, groom_name = $2
      WHERE user_id = $3
      RETURNING *;
    `;

      const values = [bride_name, groom_name, user_id];

      const result = await pool.query(query, values);
      return res.json(result.rows[0]);
    }
    const query = `
    INSERT INTO marriage_details (bride_name, groom_name, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

    const values = [bride_name, groom_name, user_id];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);

    console.log(result.rows[0]);
  } catch (error) {
    console.error("Error updating marriage detail:", error);
    res.status(500).json({ error: "Failed to update marriage detail" });
  }
};

const deleteMarriageDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM marriage_details WHERE id = $1";
    await pool.query(query, [id]);
    res.json({ message: "Marriage detail deleted successfully" });
  } catch (error) {
    console.error("Error deleting marriage detail:", error);
    res.status(500).json({ error: "Failed to delete marriage detail" });
  }
};

module.exports = {
  createMarriageDetail,
  getMarriageDetailsByUser,
  updateMarriageDetail,
  deleteMarriageDetail,
};
