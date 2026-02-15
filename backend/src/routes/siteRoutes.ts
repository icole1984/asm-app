import { Router } from 'express';
import { siteController } from '../controllers/siteController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { createSiteValidation, updateSiteValidation, paginationValidation } from '../utils/validation';
import { apiLimiter, writeLimiter } from '../middleware/rateLimiter';

const router = Router();

// All routes require authentication
router.use(authMiddleware);
router.use(apiLimiter);

// Create new site (ADMIN or MANAGER only)
router.post('/', writeLimiter, roleMiddleware(['ADMIN', 'MANAGER']), createSiteValidation, siteController.createSite);

// Get all sites with pagination
router.get('/', paginationValidation, siteController.getAllSites);

// Get sites by manager
router.get('/manager/:managerId', paginationValidation, siteController.getSitesByManager);

// Get site by ID
router.get('/:id', siteController.getSiteById);

// Update site (ADMIN or MANAGER only)
router.put('/:id', writeLimiter, roleMiddleware(['ADMIN', 'MANAGER']), updateSiteValidation, siteController.updateSite);

// Delete site (ADMIN only)
router.delete('/:id', writeLimiter, roleMiddleware(['ADMIN']), siteController.deleteSite);

export default router;
