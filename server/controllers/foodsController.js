const pool = require('../database/connection.js').pool;

const getAllFoods = async (req, res) => {
    try {
        const foods = await pool.query('SELECT * FROM foods');
        res.json(foods.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFood = async (req, res) => {
    const { food_name, user_id } = req.body;
    if(food_name.length === 0 || !user_id){
      return res.status(400).json({message: "Please provide all required fields"});
    }
    
    for (let index = 0; index < food_name.length; index++) {
        const food_element = food_name[index];

        
        try {
            const newFood = await pool.query('INSERT INTO foods (food_name, user_id) VALUES ($1, $2) RETURNING *', [food_element,user_id]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    res.status(201).json({msg:"Foods Inserted"});
    
};

//upload selected foods array along with user_id and food_id to "selected foods" table in database
const uploadfoods = async (req, res) => {
    const {  user_id } = req.params;
    const { selected ,food_id} = req.body;
    if(!selected || !user_id || !food_id){
        return res.status(400).json({message: "Please provide all required fields"});
      }
      //if selected and food_id are not the same length, then return 400 error
      if(selected.length !== food_id.length){
        return res.status(400).json({message: "selected and food_id are not the same length"});
      }
      for (let index = 0; index < selected.length; index++) {
        const selectedfood = selected[index];
        const food_idElement = food_id[index];
    
        try {
            //if value for user_id and food_id already exists in selected_foods table, then update the value to food_element
            const selected_food = await pool.query('SELECT * FROM selected_foods WHERE food_id = $1 AND user_id = $2', [food_idElement,user_id]);
            if(selected_food.rows.length > 0){
                await pool.query('UPDATE selected_foods SET selected = $1 WHERE food_id = $2 AND user_id = $3', [selectedfood,food_idElement,user_id]);
            }
            else{
            await pool.query('INSERT INTO selected_foods (food_id, user_id, selected) VALUES ($1, $2, $3) RETURNING *', [food_idElement,user_id,selectedfood]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        
      }
      res.status(201).json({message:"foods Status Inserted"});
}

//get all selected foods for a user
const getselectedfoods = async (req, res) => {
    const { user_id } = req.params;
    try {
        const selected_foods = await pool.query('SELECT * FROM selected_foods AS sf LEFT JOIN foods AS f ON f.id = sf.food_id WHERE user_id = $1', [user_id]);
        res.json(selected_foods.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFoodById = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await pool.query('SELECT * FROM foods WHERE id = $1', [id]);
        if (food.rows.length > 0) {
            res.json(food.rows[0]);
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFoodByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const food = await pool.query('SELECT * FROM foods WHERE User_id = $1', [user_id]);
        if (food.rows.length > 0) {
            res.json(food.rows);
        } else {
            res.status(404).json({ message: `No Food found for user with id:  ${user_id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFood = async (req, res) => {
    const { id } = req.params;
    const { food_name, user_id } = req.body;
    if(!food_name || !user_id){
        const missingField= !food_name ? "food_name" : "user_id";
      return res.status(400).json({message: `Please provide all required fields ${missingField}`});
    }
    try {
        await pool.query(
          "UPDATE foods SET food_name = $1, user_id = $2 WHERE id = $3",
          [food_name, user_id, id]
        );
        res.json({ message: 'Food updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM foods WHERE id = $1', [id]);
        res.json({ message: 'Food deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllFoods,
    createFood,
    getselectedfoods,
    uploadSelectedfoods:uploadfoods,
    getFoodById,
    getFoodByUserId,
    updateFood,
    deleteFood
};
