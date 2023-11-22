const pool = require("../database/connection").pool;

// Create a user event
const createUserEvent = async (req, res) => {
  const { user_id, event_name } = req.body;

  try {
    const query =
      "INSERT INTO user_events (user_id, event_name) VALUES ($1, $2) RETURNING *";
    const values = [user_id, event_name];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user event:", error);
    res
      .status(500)
      .json({ error: "Failed to create user event", msg: error.detail });
  }
};

// Read all user events
const getAllUserEvents = async (req, res) => {
  try {
    const query = "SELECT * FROM user_events";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting user events:", error);
    res.status(500).json({ error: "Failed to retrieve user events" });
  }
};


const getUserEventsAndCeremonies = async (req, res) => {
  const user_id = req.params.id;
  // console.log(req.params);
  // console.log(user_id);
  try {
    const query =
      `SELECT u.id as user_id, e.id as event_id, e.event_name as event_name,
    e.event_time as event_time,e.event_venue as event_venue,
     c.ceremony_name as ceremony_name, c.ceremony_time as ceremony_time, c.ceremony_venue as ceremony_venue
   FROM users u
   LEFT JOIN events e ON u.id = e.user_id
   LEFT JOIN ceremony c ON e.id = c.event_id
   WHERE u.id = $1`;
    const result = await pool.query(query, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found or no events and ceremonies available for the user' });
    }

    const formattedData = formatUserEventsAndCeremonies(result.rows);
    res.json(formattedData);
  } catch (error) {
    console.error('Error retrieving user events and ceremonies:', error);
    res.status(500).json({ error: 'Failed to retrieve user events and ceremonies' });
  }
};

// Helper function to format the result
const formatUserEventsAndCeremonies = (rows) => {
  const formattedData = {
    user_id: rows[0].user_id,
    Events: []
  };

  let currentEvent = null;
  for (const row of rows) {
    if (!currentEvent || currentEvent.event_id !== row.event_id) {
      currentEvent = {
        event_id: row.event_id,
        event_name: row.event_name,
        event_time: row.event_time,
        event_venue: row.event_venue,
        event_ceremonies: []
      };
      formattedData.Events.push(currentEvent);
    }

    currentEvent.event_ceremonies.push({
      ceremony_id: row.ceremony_id,
      ceremony_name: row.ceremony_name,
      ceremony_time: row.ceremony_time,
      ceremony_venue: row.ceremony_venue
    });
  }

  return formattedData;
};



// Update a user event by ID
const updateUserEvent = async (req, res) => {
  // const eventId = req.params.id;
  const { user_id, event_name, event_venue, event_time } = req.body;
  console.log(event_time);
  if (typeof user_id != 'number') return res.status(400).json({ Error_msg: "user_id must be integer" });
  try {
    const query =
      "UPDATE user_events SET  event_name = $1, event_venue=$2,event_time=$3 WHERE user_id = $4 RETURNING *";
    const values = [event_name, event_venue, event_time, user_id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      const query =
        "INSERT INTO user_events (user_id, event_name,event_venue,event_time) VALUES ($1, $2,$3,$4) RETURNING *";
      const values = [user_id, event_name, event_venue, event_time];
      const result = await pool.query(query, values);
      return res.status(201).json(result.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user event:", error);
    res.status(500).json({ error: "Failed to update user event", msg: error.detail });
  }
};

// Delete a user event by ID
const deleteUserEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const query = "DELETE FROM user_events WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [eventId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User event not found" });
    }

    res.json({ message: "User event deleted successfully" });
  } catch (error) {
    console.error("Error deleting user event:", error);
    res.status(500).json({ error: "Failed to delete user event" });
  }
};

const getUserEventData = async (req, res) => {
  const user_id = req.params.id;

  try {
    const query = `
    SELECT
    u.id AS user_id,
    e.id AS event_id,
    e.event_name AS event_name,
    e.event_time AS event_time,
    e.event_venue AS event_venue,
    c.ceremony_name AS ceremony_name,
    c.ceremony_time AS ceremony_time,
    c.ceremony_venue AS ceremony_venue,
    g.groupname AS group_name,
    i.inviataion_type AS group_invitaion_type
  FROM users u
  INNER JOIN user_events ue ON u.id = ue.user_id
  INNER JOIN events e ON ue.event_id = e.id
  INNER JOIN ceremony c ON e.event_ceremony_id = c.id
  INNER JOIN groups g ON g.user_id = u.id
  INNER JOIN invitation_type i ON i.user_id = u.id AND i.event_id = e.id
  WHERE u.id = $1;
    `;

    const result = await pool.query(query, [user_id]);

    const formattedData = [];

    result.rows.forEach((row) => {
      const eventData = formattedData.find((data) => data.event_id === row.event_id);

      if (!eventData) {
        formattedData.push({
          event_id: row.event_id,
          event_name: row.event_name,
          event_time: row.event_time,
          event_venue: row.event_venue,
          event_ceremonies: [{
            ceremony_name: row.ceremony_name,
            ceremony_time: row.ceremony_time,
            ceremony_venue: row.ceremony_venue,
            ceremony_groups: [{
              group_name: row.group_name,
              group_invitaion_type: row.group_invitaion_type,
            }],
          }],
        });
      } else {
        const ceremonyData = eventData.event_ceremonies.find(
          (ceremony) => ceremony.ceremony_name === row.ceremony_name
        );

        if (!ceremonyData) {
          eventData.event_ceremonies.push({
            ceremony_name: row.ceremony_name,
            ceremony_time: row.ceremony_time,
            ceremony_venue: row.ceremony_venue,
            ceremony_groups: [{
              group_name: row.group_name,
              group_invitaion_type: row.group_invitaion_type,
            }],
          });
        } else {
          ceremonyData.ceremony_groups.push({
            group_name: row.group_name,
            group_invitaion_type: row.group_invitaion_type,
          });
        }
      }
    });

   res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user events data' });
    console.error('Error retrieving user event data:', error);
    throw error;
  }
};



module.exports = {
  createUserEvent,
  getAllUserEvents,
  updateUserEvent,
  deleteUserEvent,
  getUserEventsAndCeremonies,
  getUserEventData,
};
