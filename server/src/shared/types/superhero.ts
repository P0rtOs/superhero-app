//базова структура героя
export interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export type SuperheroLittle = {
  id: number;
  nickname: string;
  image: string;
}

export interface CreateSuperheroDto extends Omit<Superhero, 'id'> {}

//для оновлення — всі поля необов'язкові
export type UpdateSuperheroDto = Partial<CreateSuperheroDto>;