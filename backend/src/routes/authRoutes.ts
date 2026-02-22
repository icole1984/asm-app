import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import { registerValidation, loginValidation } from '../utils/validation';
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

// Register - with rate limiting and validation
router.post(
  '/register',
  authLimiter,
  registerValidation,
  handleValidationErrors,
  authController.register
);

// Login - with rate limiting and validation
router.post(
  '/login',
  authLimiter,
  loginValidation,
  handleValidationErrors,
  authController.login
);

// Get user profile - requires authentication
router.get('/profile', authenticate, authController.getProfile);

export default router;