import express from 'express';
import Database from "better-sqlite3";

const db = new Database('./backend/database/data.db');
const router = express.Router();

router.post('/', async(req, res) => {
    const transaction = req.body;
    const availableCurrencies = ['EUR', 'BRL', 'JPY', 'USD'];

    transaction.user_id = Math.floor(Math.random() * 10) + 1;
    transaction.created_at = new Date().toISOString();

    if (!availableCurrencies.includes(transaction.currency_from.toUpperCase()) || !availableCurrencies.includes(transaction.currency_to.toUpperCase())) {
        return res.status(400).json({ success: false,  error: 'Not Available! Only EUR, BRL, JPY and USD are available' });
    }

    if (!transaction.currency_from || !transaction.currency_to || !transaction.amount) {
        return res.status(400).json({ success: false,  error: 'Missing required fields' });
    }

    if (transaction.amount <= 0) {
        return res.status(400).json({ success: false,  error: 'Amount must be greater than 0' });
    }

    try {

        const response = await fetch(process.env.API_LINK);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const currency_from = data.rates[transaction.currency_from.toUpperCase()];
        const currency_to = data.rates[transaction.currency_to.toUpperCase()];

        transaction.conversion_tax = currency_to / currency_from;
        transaction.conversion_tax = Math.round(transaction.conversion_tax * 1000) / 1000;

        const newTransaction = db.prepare('INSERT INTO transactions (user_id, currency_from, currency_to, amount, conversion_tax, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(transaction.user_id, transaction.currency_from, transaction.currency_to, transaction.amount, transaction.conversion_tax, transaction.created_at);
        const lastTransaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(newTransaction.lastInsertRowid);

        lastTransaction.result = ((currency_to / currency_from) * transaction.amount).toFixed(2) * (1 + (transaction.conversion_tax / 100));

        res.status(201).json({ success: true,  data: lastTransaction });
    } catch (err) {
        console.error('Error when trying to create transaction: ', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
})
export default router;