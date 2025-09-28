const pool = require('../config/db');

// Create a new budget
exports.createBudget = async (req, res) => {
    const { name, total_amount } = req.body;
    const user_id = req.user.id; // from authenticateToken middleware
    try {
        const result = await pool.query(
            'INSERT INTO budgets (user_id, name, total_amount) VALUES ($1, $2, $3) RETURNING *',
            [user_id, name, total_amount || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all budgets for the user
exports.getBudgets = async (req, res) => {
    const user_id = req.user.id;
    try {
        const result = await pool.query(
            'SELECT * FROM budgets WHERE user_id = $1',
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a budget
exports.updateBudget = async (req, res) => {
    const { id } = req.params;
    const { name, total_amount } = req.body;
    try {
        const result = await pool.query(
            'UPDATE budgets SET name = $1, total_amount = $2 WHERE id = $3 RETURNING *',
            [name, total_amount, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM budgets WHERE id = $1', [id]);
        res.json({ message: 'Budget deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};