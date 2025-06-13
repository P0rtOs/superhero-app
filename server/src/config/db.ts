import { Pool } from 'pg';

const pool: Pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'superheroes',
  password: 'your_password',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err: Error) => {
  console.error('PostgreSQL error:', err.message);
});

export { pool };
