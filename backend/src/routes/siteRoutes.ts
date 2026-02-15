import { Router } from 'express';
import { siteController } from '../controllers/siteController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { createSiteValidation, updateSiteValidation, paginationValidation } from '../utils/validation';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create new site (ADMIN or MANAGER only)
router.post('/', roleMiddleware(['ADMIN', 'MANAGER']), createSiteValidation, siteController.createSite);

// Get all sites with pagination
router.get('/', paginationValidation, siteController.getAllSites);

// Get sites by manager
router.get('/manager/:managerId', paginationValidation, siteController.getSitesByManager);

// Get site by ID
router.get('/:id', siteController.getSiteById);

// Update site (ADMIN or MANAGER only)
router.put('/:id', roleMiddleware(['ADMIN', 'MANAGER']), updateSiteValidation, siteController.updateSite);

// Delete site (ADMIN only)
router.delete('/:id', roleMiddleware(['ADMIN']), siteController.deleteSite);

export default router;
