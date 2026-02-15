"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const siteController_1 = require("../controllers/siteController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authMiddleware);
// Create new site (ADMIN or MANAGER only)
router.post('/', (0, auth_1.roleMiddleware)(['ADMIN', 'MANAGER']), validation_1.createSiteValidation, siteController_1.siteController.createSite);
// Get all sites with pagination
router.get('/', validation_1.paginationValidation, siteController_1.siteController.getAllSites);
// Get sites by manager
router.get('/manager/:managerId', validation_1.paginationValidation, siteController_1.siteController.getSitesByManager);
// Get site by ID
router.get('/:id', siteController_1.siteController.getSiteById);
// Update site (ADMIN or MANAGER only)
router.put('/:id', (0, auth_1.roleMiddleware)(['ADMIN', 'MANAGER']), validation_1.updateSiteValidation, siteController_1.siteController.updateSite);
// Delete site (ADMIN only)
router.delete('/:id', (0, auth_1.roleMiddleware)(['ADMIN']), siteController_1.siteController.deleteSite);
exports.default = router;
//# sourceMappingURL=siteRoutes.js.map