import { pool } from '../config/db';
import { Superhero, CreateSuperheroDto, UpdateSuperheroDto } from '../shared/types/superhero';
import { QueryResult } from 'pg';

export const SuperheroModel = {

  async getAll(): Promise<Superhero[]> {
    const result = await pool.query('SELECT * FROM superheroes');
    return result.rows;
  },

  async getById(id: string): Promise<Superhero | null> {
    const result = await pool.query('SELECT * FROM superheroes WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async create(data: CreateSuperheroDto): Promise<Superhero> {
  const result = await pool.query(
    `INSERT INTO superheroes 
     (nickname, real_name, origin_description, superpowers, catch_phrase, images)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.nickname,
      data.real_name,
      data.origin_description,
      data.superpowers,
      data.catch_phrase,
      data.images
    ]
    );
    return result.rows[0];
  },


  async update(id: string, data: UpdateSuperheroDto): Promise<Superhero | null> {
    Number(id);
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${idx++}`);
      values.push(value);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE superheroes
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  async delete(id: string): Promise<boolean> {
    Number(id);
    const result: QueryResult = await pool.query('DELETE FROM superheroes WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },

  async getInRange(fromId: number, toId: number): Promise<Superhero[]> {
  const result = await pool.query(
    `SELECT * FROM superheroes WHERE id BETWEEN $1 AND $2 ORDER BY id`,
    [fromId, toId]);
    return result.rows;
  }

};
