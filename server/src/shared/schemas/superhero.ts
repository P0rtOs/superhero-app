import { z } from 'zod';

export const createSuperheroSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required'),
  real_name: z.string().min(1, 'Real name is required'),
  origin_description: z.string().min(1, 'Description is required'),
  superpowers: z.array(z.string()).min(1, 'At least one superpower is required'),
  catch_phrase: z.string().min(1, 'Catch phrase is required'),
  images: z.array(z.string()).optional(), // заглушка
});

export const updateSuperheroSchema = createSuperheroSchema.partial(); // всі поля необов'язкові

export type CreateSuperheroDto = z.infer<typeof createSuperheroSchema>;
export type UpdateSuperheroDto = z.infer<typeof updateSuperheroSchema>;
export type Superhero = CreateSuperheroDto & { id: number };
