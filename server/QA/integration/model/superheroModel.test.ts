import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { SuperheroModel } from '../../../src/models/superhero.model';
import '../../../src/config/db';
import type { Superhero } from '../../../src/shared/schemas/superhero';


const mockHero: Omit<Superhero, 'id'> = {
  nickname: 'Test Hero',
  real_name: 'Test Real Name',
  origin_description: 'Test Description',
  superpowers: ['testing', 'jest'],
  catch_phrase: 'I am test!',
  images: ['image1.jpg'],
};

let createdId: number;

describe('SuperheroModel', () => {
  it('should create a new superhero', async () => {
    const newHero: Superhero = await SuperheroModel.create(mockHero);
    createdId = newHero.id;
    expect(newHero).toMatchObject({
      ...mockHero,
      id: expect.any(Number),
    });
  });

  it('should update a superhero', async () => {
    const updatedHero = await SuperheroModel.update(createdId, {
      nickname: 'Updated Hero',
    });
    expect(updatedHero?.nickname).toBe('Updated Hero');
  });

  it('should get quick paginated superheroes', async () => {
  const page = 1;
  const heroes = await SuperheroModel.getQuickPaginated(page);
  expect(Array.isArray(heroes)).toBe(true);
  expect(heroes.length).toBeLessThanOrEqual(5);
  if (heroes.length) {
    expect(heroes[0]).toHaveProperty('nickname');
    expect(heroes[0]).toHaveProperty('image');
    expect(typeof heroes[0].image).toBe('string');
  }
    });

  it('should delete a superhero', async () => {
    const result = await SuperheroModel.delete(createdId);
    expect(result).toBe(true);
  });
});
