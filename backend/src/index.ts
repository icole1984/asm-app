import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import prisma from './utils/prisma';
import { validateEnv } from './utils/env';
import { apiLimiter } from './middleware/rateLimiter';

// Import routes
import authRoutes from './routes/authRoutes';
import siteRoutes from './routes/siteRoutes';
import operationRoutes from './routes/operationRoutes';
import documentRoutes from './routes/documentRoutes';

dotenv.config();

// Validate environment variables
try {
  validateEnv();
} catch (error: any) {
  console.error('Environment validation failed:', error.message);
  process.exit(1);
}

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Health check endpoint (no rate limiting)
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      timestamp: new Date(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date(),
      database: 'disconnected',
    });
  }
});

// API root
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'ASM API v1.0',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      sites: '/api/sites',
      operations: '/api/operations',
      documents: '/api/documents',
    },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/documents', documentRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  
  // Handle multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
  }
  
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ ASM Backend running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Database connected`);
});

export default app;

