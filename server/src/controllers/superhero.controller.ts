import { Request, Response, NextFunction } from 'express';
import superheroService from '../services/superhero.service';
import fs from 'fs';

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
  },

  
async updateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // лог про повний шлях
    console.log('🛠 Checking file on disk:', req.file.path);
    if (!fs.existsSync(req.file.path)) {
      console.error('❌ File not found at path:', req.file.path);
      res.status(500).json({ error: 'Uploaded file not found on server' });
      return;
    }
    console.log('✅ File exists, ready to update DB');

    const heroId = req.params.id;
    const imageUrl = `/uploads/${req.file.filename}`;
    const updatedHero = await superheroService.updateSuperhero(heroId, { images: [imageUrl] });

    if (!updatedHero) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }
    res.json(updatedHero);
  } catch (error) {
    next(error);
  }
}

};
