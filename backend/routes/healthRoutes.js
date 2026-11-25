import { Router } from 'express';
import { getHealth, getReadiness, getApiInfo } from '../controllers/petController.js';

const router = Router();

router.get('/', getApiInfo);
router.get('/health', getHealth);
router.get('/health/ready', getReadiness);

export default router;
