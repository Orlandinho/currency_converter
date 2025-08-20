import express from 'express';
import dotenv from 'dotenv';
import Database from "better-sqlite3";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import {createTransactionsTable} from "./config/dbSetup.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.json());

const db = new Database('./backend/database/data.db');

createTransactionsTable();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Server is running')
});

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