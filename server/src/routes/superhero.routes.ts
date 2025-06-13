import { Router } from 'express';
import controller from '../controllers/superhero.controller';
import {
  validateCreateSuperhero,
  validateUpdateSuperhero,
} from '../dtos/superhero.validation';

const router = Router();

router.post('/', validateCreateSuperhero, controller.createSuperhero);
router.get('/', controller.getSuperheroes);
router.get('/:id', controller.getSuperheroById);
router.patch('/:id', validateUpdateSuperhero, controller.updateSuperhero);
router.delete('/:id', controller.deleteSuperhero);

export default router;
