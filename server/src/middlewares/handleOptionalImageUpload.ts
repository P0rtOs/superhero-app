// middleware/handleOptionalImageUpload.ts
import { Request, Response, NextFunction } from 'express';

export function handleOptionalImageUpload(req: Request, _res: Response, next: NextFunction) {
  if (req.file) {
    const imagePath = `/uploads/${req.file.filename}`;
    req.body.images = [imagePath]; // як і в create
  }
  next();
}
