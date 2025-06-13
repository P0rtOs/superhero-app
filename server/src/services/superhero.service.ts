import { Superhero, CreateSuperheroDto } from '../shared/types/superhero';
import { SuperheroModel } from '../models/superhero.model';

const superheroService = {
  getAllSuperheroes(): Promise<Superhero[]> {
    return SuperheroModel.getAll();
  },

  getSuperheroById(id: string): Promise<Superhero | null> {
    return SuperheroModel.getById(id);
  },

  createSuperhero(data: CreateSuperheroDto): Promise<Superhero> {
    // Тут можна додати бізнес-логіку, наприклад, перевірки
    return SuperheroModel.create(data);
  },

  updateSuperhero(id: string, data: Partial<CreateSuperheroDto>): Promise<Superhero | null> {
    // Бізнес-логіка оновлення
    return SuperheroModel.update(id, data);
  },

  deleteSuperhero(id: string): Promise<boolean> {
    return SuperheroModel.delete(id);
  },
};

export default superheroService;
