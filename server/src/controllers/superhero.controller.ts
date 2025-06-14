import { Request, Response, NextFunction } from 'express';
import superheroService from '../services/superhero.service';

export default {
  async createSuperhero(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newHero = await superheroService.createSuperhero(req.body);
      res.status(201).json(newHero);
      } catch (error) {
        next(error);
      }
    },
  // _req заглушка
  async getSuperheroes(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const heroes = await superheroService.getAllSuperheroes();
      res.json(heroes);
      } catch (error) {
        next(error);
      }
    },

  async getSuperheroById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hero = await superheroService.getSuperheroById(req.params.id);

      if (!hero) {
        res.status(404).json({ error: 'Superhero not found' });
        return; // просто вийти з функції, нічого не повертати
      }

      res.json(hero);
      } catch (error) {
        next(error);
      }
    },

  async updateSuperhero(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedHero = await superheroService.updateSuperhero(req.params.id, req.body);
      if (!updatedHero) {
        res.status(404).json({ error: 'Superhero not found' });
        return;
      }
      res.json(updatedHero);
      } catch (error) {
        next(error);
      }
    },

  async deleteSuperhero(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await superheroService.deleteSuperhero(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: 'Superhero not found' });
        return;
      }
      res.status(204).send();
      } catch (error) {
        next(error);
      }
    },

  async getByIdRange(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const heroes = await superheroService.getRange(req.params.fromId, req.params.toId);
    if (!heroes) {
      res.status(404).json({ error: 'No heroes in this range' });
        return;
    }
    res.json(heroes);
    } catch (error) {
      next(error);
    }
  },

  async getPaginatedSuperheroes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const heroes = await superheroService.getPaginated(req.params.id);
    if (!heroes.length) {
      res.status(404).json({ error: 'No heroes on this page' });
      return;
    }
    res.json(heroes);
    } catch (error) {
      next(error);
    }
  },
  
  async getQuickPaginatedSuperheroes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const heroes = await superheroService.getQuickPaginated(req.params.id);
      if (!heroes.length) {
        res.status(404).json({ error: 'No heroes on this page' });
        return;
      }
      res.json(heroes);
    } catch (error) {
      next(error);
    }
  }

};
