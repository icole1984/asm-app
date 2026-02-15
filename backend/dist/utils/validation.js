"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidation = exports.createOperationValidation = exports.updateSiteValidation = exports.createSiteValidation = exports.loginValidation = exports.registerValidation = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
// Auth validation rules
exports.registerValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    (0, express_validator_1.body)('firstName').trim().notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').trim().notEmpty().withMessage('Last name is required'),
    exports.handleValidationErrors,
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    exports.handleValidationErrors,
];
// Site validation rules
exports.createSiteValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Site name is required'),
    (0, express_validator_1.body)('location').trim().notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('address').trim().notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('postcode').trim().notEmpty().withMessage('Postcode is required'),
    (0, express_validator_1.body)('startDate').isISO8601().withMessage('Invalid start date'),
    (0, express_validator_1.body)('endDate').optional().isISO8601().withMessage('Invalid end date'),
    (0, express_validator_1.body)('managerId').notEmpty().withMessage('Manager ID is required'),
    exports.handleValidationErrors,
];
exports.updateSiteValidation = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('Site ID is required'),
    (0, express_validator_1.body)('name').optional().trim().notEmpty().withMessage('Site name cannot be empty'),
    (0, express_validator_1.body)('location').optional().trim().notEmpty().withMessage('Location cannot be empty'),
    (0, express_validator_1.body)('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
    (0, express_validator_1.body)('postcode').optional().trim().notEmpty().withMessage('Postcode cannot be empty'),
    (0, express_validator_1.body)('startDate').optional().isISO8601().withMessage('Invalid start date'),
    (0, express_validator_1.body)('endDate').optional().isISO8601().withMessage('Invalid end date'),
    exports.handleValidationErrors,
];
// Operation validation rules
exports.createOperationValidation = [
    (0, express_validator_1.body)('siteId').notEmpty().withMessage('Site ID is required'),
    (0, express_validator_1.body)('operationType').trim().notEmpty().withMessage('Operation type is required'),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('startTime').isISO8601().withMessage('Invalid start time'),
    (0, express_validator_1.body)('endTime').optional().isISO8601().withMessage('Invalid end time'),
    (0, express_validator_1.body)('workersCount').isInt({ min: 1 }).withMessage('Workers count must be at least 1'),
    (0, express_validator_1.body)('recordedBy').notEmpty().withMessage('Recorded by user ID is required'),
    exports.handleValidationErrors,
];
// Pagination validation
exports.paginationValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    exports.handleValidationErrors,
];
//# sourceMappingURL=validation.js.map