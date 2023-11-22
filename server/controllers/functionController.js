// controllers/userFunctionController.js

const pool = require('../database/connection.js').pool;

const getAllUserFunctions = async (req, res) => {
    try {
        const userFunctions = await pool.query('SELECT * FROM user_functions');
        res.json(userFunctions.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUserFunction = async (req, res) => {
    const { function_name } = req.body;
    if (!function_name) {
        return res.status(400).json({ error: 'Function name is required' });
    }
    try {
        const newUserFunction = await pool.query('INSERT INTO user_functions (function_name) VALUES ($1) RETURNING *', [function_name]);
        res.status(201).json(newUserFunction.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserFunctionById = async (req, res) => {
    const { id } = req.params;
    try {
        const userFunction = await pool.query('SELECT * FROM user_functions WHERE id = $1', [id]);
        if (userFunction.rows.length === 0) {
            return res.status(404).json({ message: 'Function not found' });
        }
        res.json(userFunction.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserFunction = async (req, res) => {
    const { id } = req.params;
    const { function_name } = req.body;
    if (!function_name) {
        return res.status(400).json({ error: 'Function name is required' });
    }
    try {
        await pool.query('UPDATE user_functions SET function_name = $1 WHERE id = $2', [function_name, id]);
        res.json({ message: 'Function updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserFunction = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM user_functions WHERE id = $1', [id]);
        res.json({ message: 'Function deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUserFunctions,
    createUserFunction,
    getUserFunctionById,
    updateUserFunction,
    deleteUserFunction
};
