export interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

// версія для списку
export interface SuperheroListItem {
  id: number;
  nickname: string;
  image: string;
}

export type CreateSuperheroDto = Omit<Superhero, 'id'>;