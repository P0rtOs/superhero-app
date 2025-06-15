import { Request, Response, NextFunction } from 'express';

export const handleImageUpload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    res.status(400).json({ error: 'Image file is required' });
    return;
  }

  // Додаємо до тіла запиту поле images як масив з одного URL
  req.body.images = [`/uploads/${req.file.filename}`];

  next();
};
