import { Superhero, CreateSuperheroDto, SuperheroLittle } from '../shared/types/superhero';
import { SuperheroModel } from '../models/superhero.model';

// Тут можна додавати логіку, але її немає :)
const superheroService = {
  getAllSuperheroes(): Promise<Superhero[]> {
    return SuperheroModel.getAll();
  },

  getSuperheroById(id: string): Promise<Superhero | null> {
    return SuperheroModel.getById(Number(id));
  },

  createSuperhero(data: CreateSuperheroDto): Promise<Superhero> {
    return SuperheroModel.create(data);
  },

  updateSuperhero(id: string, data: Partial<CreateSuperheroDto>): Promise<Superhero | null> {
    return SuperheroModel.update(Number(id), data);
  },

  deleteSuperhero(id: string): Promise<boolean> {
    return SuperheroModel.delete(Number(id));
  },

  getRange(from: string, to: string): Promise<Superhero[]> {
    return SuperheroModel.getInRange(Number(from), Number(to));
  },

  getPaginated(page: string): Promise<Superhero[]> {
    return SuperheroModel.getPaginated(Number(page));
  },

  getQuickPaginated(page: string): Promise<SuperheroLittle[]> {
    return SuperheroModel.getQuickPaginated(Number(page));
  },
};

export default superheroService;
