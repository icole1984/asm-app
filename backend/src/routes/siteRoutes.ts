import { Router } from 'express';
import { siteController } from '../controllers/siteController';
import { authenticate, authorize } from '../middleware/auth';
import { createSiteValidation, updateSiteValidation, paginationValidation, idValidation } from '../utils/validation';
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

// All site routes require authentication
router.use(authenticate);

// Create site (ADMIN and MANAGER only)
router.post(
  '/',
  authorize(['ADMIN', 'MANAGER']),
  createSiteValidation,
  handleValidationErrors,
  siteController.createSite
);

// Get all sites
router.get(
  '/',
  paginationValidation,
  handleValidationErrors,
  siteController.getAllSites
);

// Get sites by manager
router.get(
  '/manager/:managerId',
  idValidation,
  paginationValidation,
  handleValidationErrors,
  siteController.getSitesByManager
);

// Get site by ID
router.get(
  '/:id',
  idValidation,
  handleValidationErrors,
  siteController.getSiteById
);

// Update site (ADMIN and MANAGER only)
router.put(
  '/:id',
  authorize(['ADMIN', 'MANAGER']),
  idValidation,
  updateSiteValidation,
  handleValidationErrors,
  siteController.updateSite
);

// Delete site (ADMIN only)
router.delete(
  '/:id',
  authorize(['ADMIN']),
  idValidation,
  handleValidationErrors,
  siteController.deleteSite
);

export default router;
