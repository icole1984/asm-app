import { Router } from 'express';
import { operationsController } from '../controllers/operationsController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { createOperationValidation } from '../utils/validation';
import { apiLimiter, writeLimiter } from '../middleware/rateLimiter';

const router = Router();

// All routes require authentication
router.use(authMiddleware);
router.use(apiLimiter);

// Create new operation
router.post('/', writeLimiter, createOperationValidation, operationsController.createOperation);

// Get operations by site
router.get('/site/:siteId', operationsController.getOperationsBySite);

// Get operation by ID
router.get('/:id', operationsController.getOperationById);

// Update operation
router.put('/:id', writeLimiter, operationsController.updateOperation);

// Delete operation (ADMIN or MANAGER only)
router.delete('/:id', writeLimiter, roleMiddleware(['ADMIN', 'MANAGER']), operationsController.deleteOperation);

export default router;
