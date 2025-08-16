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
            id             INTEGER PRIMARY KEY,
            user_id        INTEGER  NOT NULL,
            amount         INTEGER  NOT NULL,
            currency_from  INTEGER  NOT NULL,
            currency_to    INTEGER  NOT NULL,
            conversion_tax INTEGER  NOT NULL,
            created_at     DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`
    ).run();

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