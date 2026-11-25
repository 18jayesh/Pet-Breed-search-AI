import { Router } from 'express';
import { analyzePet } from '../controllers/petController.js';
import { upload } from '../middlewares/upload.js';
import { validateAndOptimizeImage } from '../middlewares/imageValidator.js';
import { aiLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post(
  '/analyze',
  aiLimiter,
  upload.single('image'),
  validateAndOptimizeImage,
  analyzePet
);

export default router;
