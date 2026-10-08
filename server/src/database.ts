import Database from 'better-sqlite3';

export const db = new Database('database.db');

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(25) NOT NULL,
        brand TEXT,
        price NUMERIC(5, 2) NOT NULL,
        sku TEXT UNIQUE NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL
    );

`);


