import { Router } from 'express';
import { operationsController } from '../controllers/operationsController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { createOperationValidation } from '../utils/validation';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create new operation
router.post('/', createOperationValidation, operationsController.createOperation);

// Get operations by site
router.get('/site/:siteId', operationsController.getOperationsBySite);

// Get operation by ID
router.get('/:id', operationsController.getOperationById);

// Update operation
router.put('/:id', operationsController.updateOperation);

// Delete operation (ADMIN or MANAGER only)
router.delete('/:id', roleMiddleware(['ADMIN', 'MANAGER']), operationsController.deleteOperation);

export default router;
