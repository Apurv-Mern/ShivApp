// controllers/eventController.js

const pool = require('../database/connection.js').pool;

const getAllEvents = async (req, res) => {
    try {
        const events = await pool.query('SELECT * FROM events');
        res.json(events.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEvent = async (req, res) => {
    const { user_id, event_name, event_time, event_venue ,event_type} = req.body;

    try {
      const query =
        "INSERT INTO events (user_id, event_name, event_time, event_venue ,event_type) VALUES ($1, $2, $3, $4,$5) RETURNING *";
      const values = [user_id, event_name, event_time, event_venue,event_type];
  
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating user event:", error);
      res
        .status(500)
        .json({ error: "Failed to create user event", msg: error.detail });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await pool.query(
          `SELECT e.id,e.event_name,e.user_id,e.event_time,e.event_venue,e.email_sent_timestamp,e.is_email_sent,ei.icon_link FROM events as e LEFT JOIN event_icons as ei on ei.id=e.event_icon WHERE e.user_id = $1 order by e.id;`,
          [parseInt(id)]
        );
        if (event.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { event_name, event_time, event_venue ,event_type } = req.body;
    if (!event_name) {
        return res.status(400).json({ error: 'Event name is required' });
    }
    try {
        await pool.query('UPDATE events SET event_name = $1, event_time=$2, event_venue=$3 ,event_type=$4 WHERE id = $5', [event_name, event_time, event_venue ,event_type, id]);
        res.json({ message: 'Event updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM events WHERE id = $1', [id]);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
};
