"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
});
exports.pool = pool;
pool.connect()
    .then(() => {
    console.log('✅ Connected to PostgreSQL database');
})
    .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
});
