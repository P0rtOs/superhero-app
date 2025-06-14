import { Request, Response, NextFunction } from 'express';
import { createSuperheroSchema, updateSuperheroSchema, idRangeSchema } from '../shared/schemas/superhero';

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

export function validateIdRange(req: Request, res: Response, next: NextFunction): void {
  const result = idRangeSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({ error: 'Invalid ID range', details: result.error.errors });
    return;
  }

  // перезаписуємо параметри як числа
  req.params = {
    fromId: result.data.fromId.toString(),
    toId: result.data.toId.toString(),
  };

  next();
}