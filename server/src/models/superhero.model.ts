import { pool } from '../config/db';
import { Superhero, CreateSuperheroDto } from '../shared/types/superhero';

export const SuperheroModel = {
  async getAll(): Promise<Superhero[]> {
    // Заглушка: повертаємо один хардкодний об’єкт супергероя для тесту
    return [
      {
        id: 1,
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'Він народився Кал-Ел на планеті Криптон...',
        superpowers: ['solar energy absorption', 'flight', 'heat vision'],
        catch_phrase: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
        images: [],
      },
    ];
    
    // Пізніше замінимо на справжній запит до БД:
    // const result = await pool.query('SELECT * FROM superheroes');
    // return result.rows;
  },

  async getById(id: string): Promise<Superhero | null> {
    const result = await pool.query('SELECT * FROM superheroes WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async create(data: CreateSuperheroDto): Promise<Superhero> {
    const result = await pool.query(
      `INSERT INTO superheroes (nickname, real_name, origin_description, superpowers, catch_phrase)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.nickname, data.real_name, data.origin_description, data.superpowers, data.catch_phrase]
    );
    return result.rows[0];
  },

    // @ts-ignore
  async update(id: string, data: Partial<CreateSuperheroDto>): Promise<Superhero | null> {
    // @ts-ignore
    const fields = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
  },
  // @ts-ignore
  async delete(id: string): Promise<boolean> {
    // @ts-ignore
    const result = await pool.query('DELETE FROM superheroes WHERE id = $1', [id]);
  }
  // update, delete, etc...
};
