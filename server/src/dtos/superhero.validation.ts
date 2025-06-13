import { Request, Response, NextFunction } from 'express';
import { createSuperheroSchema, updateSuperheroSchema } from '../shared/schemas/superhero';

export function validateCreateSuperhero(req: Request, res: Response, next: NextFunction): void {
  const result = createSuperheroSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: 'Validation failed' });
    return
  }
  req.body = result.data;
  next();
}

export function validateUpdateSuperhero(req: Request, res: Response, next: NextFunction): void {
  const result = updateSuperheroSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: 'Validation failed' });
    return
  }

  req.body = result.data;
  next();
}
