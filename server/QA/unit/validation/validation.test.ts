import { createSuperheroSchema } from '../../../src/shared/schemas/superhero';

describe('Superhero Validation Schema', () => {
  it('validates correct superhero data', () => {
    const validData = {
      nickname: 'Test Hero',
      real_name: 'Clark Kent',
      origin_description: 'Reporter turned superhero',
      superpowers: ['Flying', 'Super strength'],
      catch_phrase: 'Up, up and away!',
      images: ['image1.jpg'],
    };

    const result = createSuperheroSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails with missing required fields', () => {
    const invalidData = {
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: [],
      catch_phrase: '',
      images: [],
    };

    const result = createSuperheroSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
