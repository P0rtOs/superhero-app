import { Superhero, CreateSuperheroDto } from '../shared/types/superhero';
import { SuperheroModel } from '../models/superhero.model';

// Тут можна додавати логіку, але її немає :)
const superheroService = {
  getAllSuperheroes(): Promise<Superhero[]> {
    return SuperheroModel.getAll();
  },

  getSuperheroById(id: string): Promise<Superhero | null> {
    return SuperheroModel.getById(id);
  },

  createSuperhero(data: CreateSuperheroDto): Promise<Superhero> {
    return SuperheroModel.create(data);
  },

  updateSuperhero(id: string, data: Partial<CreateSuperheroDto>): Promise<Superhero | null> {
    return SuperheroModel.update(id, data);
  },

  deleteSuperhero(id: string): Promise<boolean> {
    return SuperheroModel.delete(id);
  },

  getRange(from: string, to: string) {
  return SuperheroModel.getInRange(Number(from), Number(to));
  },

};

export default superheroService;
