
const pool = require('../database/connection.js').pool;

const handleCoordinates = async (req,res)=>{

    const { user_id, event_id, pages, x_coordinates, y_coordinates, font_sizes, font_styles } = req.body;

    try {
        // Loop through the provided arrays of pages, x_coordinates, and y_coordinates
        for (let i = 0; i < pages.length; i++) {
            const page_number = pages[i];
            const x_coordinate = x_coordinates[i];
            const y_coordinate = y_coordinates[i];
            const font_size=font_sizes[i];
            const font_style=font_styles[i];

            // Check if data already exists for the user, event, and page
            const existingData = await pool.query(
                'SELECT * FROM box_coordinates WHERE user_id = $1 AND event_id = $2 AND page_number = $3',
                [user_id, event_id, page_number]
            );

            if (existingData.rows.length > 0) {
                // Data exists, update it
                await pool.query(
                    'UPDATE box_coordinates SET x_coordinate = $1, y_coordinate = $2, font_size = $3, font_style = $4 WHERE user_id = $5 AND event_id = $6 AND page_number = $7',
                    [x_coordinate, y_coordinate, font_size, font_style, user_id, event_id, page_number]
                );
            } else {
                // Data doesn't exist, insert new record
                await pool.query(
                    'INSERT INTO box_coordinates (user_id, event_id, page_number, x_coordinate, y_coordinate, font_size, font_style) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                    [user_id, event_id, page_number, x_coordinate, y_coordinate, font_size, font_style]
                );
            }
        }

        res.status(201).json({ message: 'Data inserted/updated successfully.' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while inserting/updating data.' });
    }
}



//funtion to retrieve data basedx on user_id and event_id
const retrieveCoordinates =async (req,res)=>{
    const { user_id, event_id } = req.params;

    try {
        // Retrieve box coordinates for the specified user_id and event_id
        const coordinates = await pool.query(
            'SELECT page_number, x_coordinate, y_coordinate, font_size, font_style FROM box_coordinates WHERE user_id = $1 AND event_id = $2',
            [user_id, event_id]
        );

        res.status(200).json(coordinates.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while retrieving data.' });
    }
}

module.exports = {handleCoordinates,retrieveCoordinates};