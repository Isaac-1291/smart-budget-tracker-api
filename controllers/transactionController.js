const pool = require('../config/db');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { budget_id, type, amount, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO transactions (budget_id, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [budget_id, type, amount, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all transactions for a budget
exports.getTransactions = async (req, res) => {
    const { budget_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM transactions WHERE budget_id = $1',
            [budget_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { type, amount, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE transactions SET type = $1, amount = $2, description = $3 WHERE id = $4 RETURNING *',
            [type, amount, description, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};