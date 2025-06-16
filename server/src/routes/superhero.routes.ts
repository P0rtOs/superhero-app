import { Router } from 'express';
import controller from '../controllers/superhero.controller';
import {
  validateCreateSuperhero,
  validateUpdateSuperhero,
  validateIdRange,
} from '../dtos/superhero.validation';
import { upload } from '../middlewares/upload.middleware';
import { handleImageUpload } from '../middlewares/imageUpload.middleware';
import { handleOptionalImageUpload } from '../middlewares/handleOptionalImageUpload';
const router = Router();

router.get('/pages/total', controller.getPagesAmount);
router.post('/', upload.single('image'), handleImageUpload, validateCreateSuperhero, controller.createSuperhero);
router.get('/', controller.getSuperheroes);
router.get('/:id', controller.getSuperheroById);
router.patch('/:id', upload.single('image'), handleOptionalImageUpload, validateUpdateSuperhero, controller.updateSuperhero);
router.delete('/:id', controller.deleteSuperhero);
router.get('/range/:fromId/:toId', validateIdRange, controller.getByIdRange);
router.get('/paginated/:id', controller.getPaginatedSuperheroes);
router.get('/paginated/quick/:id', controller.getQuickPaginatedSuperheroes);
export default router;
