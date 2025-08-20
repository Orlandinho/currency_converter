import Database from "better-sqlite3";

const db = new Database("./backend/database/data.db");

export function createTransactionsTable() {
    const stmt = `
    CREATE TABLE IF NOT EXISTS transactions
    (
        id             INTEGER NOT NULL PRIMARY KEY,
        user_id        INTEGER NOT NULL,
        currency_from  VARCHAR(3) NOT NULL,
        currency_to    VARCHAR(3) NOT NULL,
        amount         REAL NOT NULL,
        conversion_tax REAL NOT NULL,
        created_at     DATETIME NOT NULL
    )
  `;
    db.prepare(stmt).run();
    console.log("Transactions table created or already exists");
}
