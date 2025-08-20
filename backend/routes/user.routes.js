import express from 'express';
import Database from "better-sqlite3";

const db = new Database('./backend/database/data.db');
const router = express.Router();

router.get('/:id/transactions', (req, res) => {
    const id = req.params.id;

    try {
        const user = db.prepare('SELECT * FROM transactions WHERE user_id = ?').get(id);
        if(!user) {
            return res.status(404).json({ success: false,  error: 'User not found!' });
        }

        const transactions = db.prepare('SELECT * FROM transactions WHERE user_id = ?').all(id);
        res.status(200).json({ success: true,  data: transactions });

    } catch (err) {
        console.error('Error when trying to get user: ', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});

export default router;