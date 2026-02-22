import { body, param, query, ValidationChain } from 'express-validator';

// Auth validation rules
export const registerValidation: ValidationChain[] = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/)
    .withMessage('Password must contain lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain number'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];

export const loginValidation: ValidationChain[] = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Site validation rules
export const createSiteValidation: ValidationChain[] = [
  body('name').notEmpty().withMessage('Site name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('postcode').notEmpty().withMessage('Postcode is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required'),
  body('managerId').notEmpty().withMessage('Manager ID is required'),
];

export const updateSiteValidation: ValidationChain[] = [
  body('name').optional().notEmpty().withMessage('Site name cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty'),
  body('postcode').optional().notEmpty().withMessage('Postcode cannot be empty'),
  body('startDate').optional().isISO8601().withMessage('Valid start date required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required'),
  body('status').optional().isIn(['PLANNING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'])
    .withMessage('Invalid status'),
];

// Operation validation rules
export const createOperationValidation: ValidationChain[] = [
  body('siteId').notEmpty().withMessage('Site ID is required'),
  body('operationType').notEmpty().withMessage('Operation type is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('startTime').isISO8601().withMessage('Valid start time is required'),
  body('workersCount').isInt({ min: 1 }).withMessage('Workers count must be at least 1'),
  body('recordedBy').notEmpty().withMessage('Recorded by user ID is required'),
];

export const updateOperationValidation: ValidationChain[] = [
  body('status').optional().isIn(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED'])
    .withMessage('Invalid status'),
  body('endTime').optional().isISO8601().withMessage('Valid end time required'),
  body('duration').optional().isInt({ min: 0 }).withMessage('Duration must be positive'),
];

// Document validation rules
export const createDocumentValidation: ValidationChain[] = [
  body('siteId').notEmpty().withMessage('Site ID is required'),
  body('docType').isIn(['FORM', 'PHOTO', 'REPORT', 'CERTIFICATE', 'SAFETY_PLAN', 'OTHER'])
    .withMessage('Invalid document type'),
];

// Pagination validation
export const paginationValidation: ValidationChain[] = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100'),
];

// ID parameter validation
export const idValidation: ValidationChain[] = [
  param('id').notEmpty().withMessage('ID parameter is required'),
];
