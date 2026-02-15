import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Auth validation rules
export const registerValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  handleValidationErrors,
];

export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

// Site validation rules
export const createSiteValidation = [
  body('name').trim().notEmpty().withMessage('Site name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('postcode').trim().notEmpty().withMessage('Postcode is required'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
  body('managerId').notEmpty().withMessage('Manager ID is required'),
  handleValidationErrors,
];

export const updateSiteValidation = [
  param('id').notEmpty().withMessage('Site ID is required'),
  body('name').optional().trim().notEmpty().withMessage('Site name cannot be empty'),
  body('location').optional().trim().notEmpty().withMessage('Location cannot be empty'),
  body('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
  body('postcode').optional().trim().notEmpty().withMessage('Postcode cannot be empty'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
  handleValidationErrors,
];

// Operation validation rules
export const createOperationValidation = [
  body('siteId').notEmpty().withMessage('Site ID is required'),
  body('operationType').trim().notEmpty().withMessage('Operation type is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('startTime').isISO8601().withMessage('Invalid start time'),
  body('endTime').optional().isISO8601().withMessage('Invalid end time'),
  body('workersCount').isInt({ min: 1 }).withMessage('Workers count must be at least 1'),
  body('recordedBy').notEmpty().withMessage('Recorded by user ID is required'),
  handleValidationErrors,
];

// Pagination validation
export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  handleValidationErrors,
];
