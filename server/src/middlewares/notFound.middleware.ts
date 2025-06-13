import { Request, Response, NextFunction } from 'express';
// @ts-ignore
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Route not found' });
}
