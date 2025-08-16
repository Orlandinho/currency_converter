import express from 'express';
import Database from "better-sqlite3";

const app = express();

const PORT = 8000;
app.use(express.json());

const db = new Database('./backend/database/data.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS users
        (
            id INTEGER PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at DATETIME NOT NULL
        )`
    ).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS transactions
        (
            id             INTEGER NOT NULL PRIMARY KEY,
            user_id        INTEGER NOT NULL,
            currency_from  VARCHAR(3) NOT NULL,
            currency_to    VARCHAR(3) NOT NULL,
            amount         REAL NOT NULL,
            conversion_tax REAL NOT NULL,
            created_at     DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`
    ).run();

app.get('/', (req, res) => {
    res.send('Server is running')
});

app.get('/api/users', (req, res) => {
    const users = db.prepare('SELECT * FROM users').all();

    if(!users) {
        return res.status(404).json({ success: false,  error: 'No users in the database!' });
    }

    res.status(200).json({ success: true,  data: users });
});

app.post('/api/users', (req, res) => {
    const user = req.body;

    if(!user.email) {
        return res.status(400).json({ success: false,  error: 'Email is required'});
    }

    try {
        const newUser = db.prepare('INSERT INTO users (email, created_at) VALUES (?, ?)').run(user.email, new Date().toISOString());
        const lastUser = db.prepare('SELECT * FROM users WHERE id = ?').get(newUser.lastInsertRowid);

        res.status(201).json({ success: true,  data: lastUser });
    } catch (err) {
        console.error('Error when trying to create user: ', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});

app.get('/api/users/:id/transactions', (req, res) => {
    const id = req.params.id;

    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
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

app.post('/api/transactions', (req, res) => {
    const transaction = req.body;
    transaction.created_at = new Date().toISOString();

    if (!transaction.user_id || !transaction.currency_from || !transaction.currency_to || !transaction.amount || !transaction.conversion_tax) {
        return res.status(400).json({ success: false,  error: 'Missing required fields' });
    }

    try {
        const newTransaction = db.prepare('INSERT INTO transactions (user_id, currency_from, currency_to, amount, conversion_tax, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(transaction.user_id, transaction.currency_from, transaction.currency_to, transaction.amount, transaction.conversion_tax, transaction.created_at);
        const lastTransaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(newTransaction.lastInsertRowid);

        res.status(201).json({ success: true,  data: lastTransaction });
    } catch (err) {
        console.error('Error when trying to create transaction: ', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }

})

app.listen(PORT, () => {
    try {
        db.prepare('SELECT 1').get();
        console.log('Database is working!');
    } catch (err) {
        console.error('Error when trying to open database: ', err);
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`)
});