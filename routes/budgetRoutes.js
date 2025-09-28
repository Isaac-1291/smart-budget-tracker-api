const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');

// CREATE Budget
router.post('/', authenticateToken, async (req, res) => {
    const { name, total_amount } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO budgets (user_id, name, total_amount) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, name, total_amount]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET All Budgets
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM budgets WHERE user_id = $1', [req.user.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;