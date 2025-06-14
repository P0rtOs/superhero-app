import { Router } from 'express';
import controller from '../controllers/superhero.controller';
import {
  validateCreateSuperhero,
  validateUpdateSuperhero,
  validateIdRange,
} from '../dtos/superhero.validation';

const router = Router();

router.post('/', validateCreateSuperhero, controller.createSuperhero);
router.get('/', controller.getSuperheroes);
router.get('/:id', controller.getSuperheroById);
router.patch('/:id', validateUpdateSuperhero, controller.updateSuperhero);
router.delete('/:id', controller.deleteSuperhero);
router.get('/range/:fromId/:toId', validateIdRange, controller.getByIdRange);

export default router;
