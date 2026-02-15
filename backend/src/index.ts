import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { validateEnv, env } from './utils/env';
import { prisma } from './utils/prisma';

// Import routes
import authRoutes from './routes/authRoutes';
import siteRoutes from './routes/siteRoutes';
import operationRoutes from './routes/operationRoutes';
import documentRoutes from './routes/documentRoutes';

dotenv.config();

// Validate environment variables before starting
try {
  validateEnv();
  console.log('✅ Environment variables validated');
} catch (error: any) {
  console.error('❌ Environment validation failed:', error.message);
  process.exit(1);
}

const app: Express = express();
const PORT = env.PORT;

// Middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
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

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({ 
    message: 'ASM API v1.0',
    endpoints: {
      auth: '/api/auth',
      sites: '/api/sites',
      operations: '/api/operations',
      documents: '/api/documents',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/documents', documentRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File size exceeds limit' });
  }
  
  // Handle Prisma errors
  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'A record with this value already exists' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' });
  }
  
  res.status(err.status || 500).json({ 
    error: env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

let server: any;

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    server = app.listen(PORT, () => {
      console.log(`🚀 ASM Backend running on http://localhost:${PORT}`);
      console.log(`📚 API documentation available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received, shutting down gracefully...`);
  
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');
      
      try {
        await prisma.$disconnect();
        console.log('Database disconnected');
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    });
  }
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

startServer();
