"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operationsController_1 = require("../controllers/operationsController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authMiddleware);
// Create new operation
router.post('/', validation_1.createOperationValidation, operationsController_1.operationsController.createOperation);
// Get operations by site
router.get('/site/:siteId', operationsController_1.operationsController.getOperationsBySite);
// Get operation by ID
router.get('/:id', operationsController_1.operationsController.getOperationById);
// Update operation
router.put('/:id', operationsController_1.operationsController.updateOperation);
// Delete operation (ADMIN or MANAGER only)
router.delete('/:id', (0, auth_1.roleMiddleware)(['ADMIN', 'MANAGER']), operationsController_1.operationsController.deleteOperation);
exports.default = router;
//# sourceMappingURL=operationRoutes.js.map