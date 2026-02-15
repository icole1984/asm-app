"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.post('/register', validation_1.registerValidation, authController_1.authController.register);
router.post('/login', validation_1.loginValidation, authController_1.authController.login);
router.get('/profile', auth_1.authenticate, authController_1.authController.getProfile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map