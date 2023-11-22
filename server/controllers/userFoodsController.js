const pool = require("../database/connection").pool;

// Create a user food
const createUserFood = async (req, res) => {
  const { user_id, food_name } = req.body;

  if (!food_name || !Array.isArray(food_name)) {
    return res
      .status(400)
      .json({ error: "Food names must be provided as an array" });
  }

  try {
    const query =
      "INSERT INTO user_foods (user_id, food_name) VALUES ($1, $2) RETURNING *";
    const values = [user_id, food_name];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user food:", error);
    res
      .status(500)
      .json({ error: "Failed to create user food", msg: error.detail });
  }
};

// Read all user foods
const getAllUserFoods = async (req, res) => {
  try {
    const query = "SELECT * FROM user_foods";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting user foods:", error);
    res.status(500).json({ error: "Failed to retrieve user foods" });
  }
};

// Read a user food by ID
const getUserFoodById = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = "SELECT * FROM user_foods WHERE user_id = $1";
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User food not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting user food:", error);
    res.status(500).json({ error: "Failed to retrieve user food" });
  }
};

// Update a user food by ID
const updateUserFood = async (req, res) => {
  //const foodId = req.params.id;
  const { user_id, food_name } = req.body;
  if(typeof user_id!='number')return res.status(400).json({Error_msg:"user_id must be integer"});
  if (!food_name || !Array.isArray(food_name)) {
    return res
      .status(400)
      .json({ error: "Food names must be provided as an array" });
  }

  try {
    const query =
      "UPDATE user_foods SET  food_name = $1 WHERE user_id = $2 RETURNING *";
    const values = [food_name, user_id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
       const query =
         "INSERT INTO user_foods (user_id, food_name) VALUES ($1, $2) RETURNING *";
       const values = [user_id, food_name];

       const result = await pool.query(query, values);
      return res.status(201).json(result.rows[0]);
     // return res.status(404).json({ error: "User food not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user food:", error);
    res.status(500).json({ error: "Failed to update user food" });
  }
};

// Delete a user food by ID
const deleteUserFood = async (req, res) => {
  const foodId = req.params.id;

  try {
    const query = "DELETE FROM user_foods WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [foodId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User food not found" });
    }

    res.json({ message: "User food deleted successfully" });
  } catch (error) {
    console.error("Error deleting user food:", error);
    res.status(500).json({ error: "Failed to delete user food" });
  }
};

module.exports = {
  createUserFood,
  getAllUserFoods,
  getUserFoodById,
  updateUserFood,
  deleteUserFood,
};
