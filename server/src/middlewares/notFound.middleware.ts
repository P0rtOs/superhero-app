import { Request, Response, NextFunction } from 'express';
// @ts-ignore, idk how to fix this
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Route not found' });
}
