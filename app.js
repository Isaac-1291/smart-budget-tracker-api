const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db'); // Import database

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); // Test query
        res.json({ message: 'API is running!', time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Routes
const authRoutes = require('./routes/authRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/auth', authRoutes);          // Authentication routes
app.use('/budgets', budgetRoutes);     // Budget routes
app.use('/transactions', transactionRoutes); // Transaction routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});