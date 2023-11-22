const pool = require('../database/connection.js').pool;

const getAlldrinks = async (req, res) => {
    try {
        const drinks = await pool.query('SELECT * FROM drinks');
        res.json(drinks.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createdrink = async (req, res) => {
    const { drink_name, user_id } = req.body;
    let newdrink;
    if(drink_name.length === 0 || !user_id){
        return res.status(400).json({message: "Please provide all required fields"});
      }

      for (let index = 0; index < drink_name.length; index++) {
        const drink_element = drink_name[index];

        try {
            newdrink = await pool.query('INSERT INTO drinks (drink_name, user_id) VALUES ($1, $2) RETURNING *', [drink_element,user_id]);
          
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        
      }
      res.status(201).json({mgs:"Drinks inserted"});
};


//upload selected drinks array along with user_id and drink_id to "selected drinks" table in database
const uploaddrinks = async (req, res) => {
    const {  user_id } = req.params;
    const { selected ,drink_id} = req.body;
    if(!selected || !user_id || !drink_id){
        return res.status(400).json({message: "Please provide all required fields"});
      }
      //if selected and drink_id are not the same length, then return 400 error
      if(selected.length !== drink_id.length){
        return res.status(400).json({message: "selected and drink_id are not the same length"});
      }
      for (let index = 0; index < selected.length; index++) {
        const selectedDrink = selected[index];
        const drink_idElement = drink_id[index];
    
        try {
            //if value for user_id and drink_id already exists in selected_drinks table, then update the value to drink_element
            const selected_drink = await pool.query('SELECT * FROM selected_drinks WHERE drink_id = $1 AND user_id = $2', [drink_idElement,user_id]);
            if(selected_drink.rows.length > 0){
                await pool.query('UPDATE selected_drinks SET selected = $1 WHERE drink_id = $2 AND user_id = $3', [selectedDrink,drink_idElement,user_id]);
            }
            else{
            await pool.query('INSERT INTO selected_drinks (drink_id, user_id, selected) VALUES ($1, $2, $3) RETURNING *', [drink_idElement,user_id,selectedDrink]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        
      }
      res.status(201).json({message:"Drinks Status Inserted"});
}

//get all selected drinks for a user
const getselecteddrinks = async (req, res) => {
    const { user_id } = req.params;
    try {
        const selected_drinks = await pool.query('SELECT * FROM selected_drinks AS sf LEFT JOIN drinks AS f ON f.id = sf.drink_id WHERE user_id = $1', [user_id]);
        res.json(selected_drinks.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getdrinkById = async (req, res) => {
    const { id } = req.params;
    try {
        const drink = await pool.query('SELECT * FROM drinks WHERE id = $1', [id]);
        if (drink.rows.length > 0) {
            res.json(drink.rows[0]);
        } else {
            res.status(404).json({ message: 'drink not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getdrinkByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const drink = await pool.query('SELECT * FROM drinks WHERE User_id = $1', [user_id]);
        if (drink.rows.length > 0) {
            res.json(drink.rows);
        } else {
            res.status(404).json({ message: `No drink found for user with id:  ${user_id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatedrink = async (req, res) => {
    const { id } = req.params;
    const { drink_name, user_id } = req.body;
    if(!drink_name || !user_id){
        const missingField= !drink_name ? "drink_name" : "user_id";
      return res.status(400).json({message: `Please provide all required fields ${missingField}`});
    }
    try {
        await pool.query(
          "UPDATE drinks SET drink_name = $1, user_id = $2 WHERE id = $3",
          [drink_name, user_id, id]
        );
        res.json({ message: 'drink updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletedrink = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM drinks WHERE id = $1', [id]);
        res.json({ message: 'drink deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAlldrinks,
    createdrink,
    getselecteddrinks,
    uploadSelectedDrinks:uploaddrinks,
    getdrinkById,
    getdrinkByUserId,
    updatedrink,
    deletedrink
};
