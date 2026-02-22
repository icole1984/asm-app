import { Router } from 'express';
import {
  createOperation,
  getOperationsBySite,
  getOperationById,
  updateOperation,
  deleteOperation,
} from '../controllers/operationsController';
import { authenticate, authorize } from '../middleware/auth';
import { createOperationValidation, updateOperationValidation, idValidation } from '../utils/validation';
import { validationResult } from 'express-validator';

const router = Router();

// Middleware to handle validation errors
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// All operation routes require authentication
router.use(authenticate);

// Create operation
router.post(
  '/',
  createOperationValidation,
  handleValidationErrors,
  createOperation
);

// Get operations by site
router.get(
  '/site/:siteId',
  idValidation,
  handleValidationErrors,
  getOperationsBySite
);

// Get operation by ID
router.get(
  '/:id',
  idValidation,
  handleValidationErrors,
  getOperationById
);

// Update operation
router.put(
  '/:id',
  idValidation,
  updateOperationValidation,
  handleValidationErrors,
  updateOperation
);

// Delete operation (ADMIN and MANAGER only)
router.delete(
  '/:id',
  authorize(['ADMIN', 'MANAGER']),
  idValidation,
  handleValidationErrors,
  deleteOperation
);

export default router;
