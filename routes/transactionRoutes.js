const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');

// CREATE Transaction
router.post('/', authenticateToken, async (req, res) => {
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
});

// GET Transactions by Budget
router.get('/:budget_id', authenticateToken, async (req, res) => {
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
});

module.exports = router;