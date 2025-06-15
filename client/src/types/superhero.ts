export interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

// версія для списку (головна сторінка)
export interface SuperheroListItem {
  id: number;
  nickname: string;
  image: string; // тільки одне зображення
}

export type CreateSuperheroDto = Omit<Superhero, 'id'>;