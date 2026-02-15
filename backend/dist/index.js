"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = require("./utils/env");
const prisma_1 = require("./utils/prisma");
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const siteRoutes_1 = __importDefault(require("./routes/siteRoutes"));
const operationRoutes_1 = __importDefault(require("./routes/operationRoutes"));
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
dotenv_1.default.config();
// Validate environment variables before starting
try {
    (0, env_1.validateEnv)();
    console.log('✅ Environment variables validated');
}
catch (error) {
    console.error('❌ Environment validation failed:', error.message);
    process.exit(1);
}
const app = (0, express_1.default)();
const PORT = env_1.env.PORT;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.env.CORS_ORIGIN }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Check database connection
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            status: 'healthy',
            timestamp: new Date(),
            database: 'connected',
        });
    }
    catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date(),
            database: 'disconnected',
        });
    }
});
// API Routes
app.get('/api', (req, res) => {
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
app.use('/api/auth', authRoutes_1.default);
app.use('/api/sites', siteRoutes_1.default);
app.use('/api/operations', operationRoutes_1.default);
app.use('/api/documents', documentRoutes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handling middleware
app.use((err, req, res, next) => {
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
        error: env_1.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        ...(env_1.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});
let server;
// Start server
const startServer = async () => {
    try {
        // Test database connection
        await prisma_1.prisma.$connect();
        console.log('✅ Database connected successfully');
        server = app.listen(PORT, () => {
            console.log(`🚀 ASM Backend running on http://localhost:${PORT}`);
            console.log(`📚 API documentation available at http://localhost:${PORT}/api`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
// Graceful shutdown
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received, shutting down gracefully...`);
    if (server) {
        server.close(async () => {
            console.log('HTTP server closed');
            try {
                await prisma_1.prisma.$disconnect();
                console.log('Database disconnected');
                process.exit(0);
            }
            catch (error) {
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
//# sourceMappingURL=index.js.map