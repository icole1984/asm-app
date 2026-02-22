import rateLimit from 'express-rate-limit';

// Rate limiter for authentication endpoints (stricter)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for general API endpoints
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for write operations (POST, PUT, DELETE)
export const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Too many write operations, please slow down',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'GET', // Skip GET requests
});
