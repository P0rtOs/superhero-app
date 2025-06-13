import { pool } from './db';

async function initDb(): Promise<void> {
  try {
    const res = await pool.query(`
      SELECT to_regclass('public.superheroes') as table_exists;
    `);

    if (!res.rows[0].table_exists) {
      console.log('Table "superheroes" does not exist. Creating...');
      
      await pool.query('DROP TABLE IF EXISTS superheroes CASCADE');

      await pool.query(
      `CREATE TABLE superheroes (
      id SERIAL PRIMARY KEY,
      nickname VARCHAR(100) NOT NULL,
      real_name VARCHAR(100) NOT NULL,
      origin_description TEXT NOT NULL,
      superpowers TEXT[] NOT NULL,
      catch_phrase TEXT NOT NULL,
      images TEXT[] NOT NULL
      );`
      );


      console.log('Table "superheroes" created successfully');
    } else {
      console.log('Table "superheroes" already exists');
    }
  } catch (error) {
    console.error('Error during DB initialization:', error);
  }
}

export { initDb };
