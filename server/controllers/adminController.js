const { body, validationResult } = require("express-validator");
const pool = require("../database/connection.js").pool;



const getUsersListForAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userDetails = await pool.query(
      "SELECT users.username, users.id, users.email,  users.number,  user_payment.package,  user_payment.amount,  user_payment.date FROM users LEFT JOIN user_payment ON users.id = user_payment.user_id WHERE users.id != 208;"
    );

    if (userDetails.rows[0] === 0) {
      res.end("no user details available");
    }
    res.status(200).json(userDetails.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const deleteUsers = async (req, res) => {
//   const { guestId } = req.params;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const deleteUser = await pool.query("DELETE FROM users WHERE id = 104");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const deleteUser = async (req, res) => {
  const userId = req.params.user_id;

  try {
      // First, get the list of guest_ids
      const guestIdsQuery = `SELECT id as guest_id FROM guests WHERE user_id = $1`;
      const guestIdsResult = await pool.query(guestIdsQuery, [userId]);
      const guestIds = guestIdsResult.rows.map(row => row.guest_id);

      // Now, perform delete operations in series
      await pool.query('DELETE FROM ceremony_groups WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM ceremony WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM rsvp_attendance WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM event_images WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM responses WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM ceremony_attendance WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM events WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM guest_of_guests WHERE guest_id = ANY($1)', [guestIds]);
      await pool.query('DELETE FROM wedding_reminder_list WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM guests WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM group_invitation_type WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM groups WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM selected_drinks WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM selected_foods WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM user_payment WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM user_gifts WHERE user_id = $1', [userId]);
      await pool.query('DELETE FROM marriage_details WHERE user_id = $1', [userId]);
      
      // Finally, delete the user
      await pool.query('DELETE FROM users WHERE id = $1', [userId]);

      res.status(200).json({ message: 'User and related data deleted successfully.' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting user.' });
  }
};

module.exports = { getUsersListForAdmin,deleteUser };
