import express from "express";
import type { Express, Request, Response } from "express";
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;


dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Routes will be added here
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'ASM API v1.0' });
});
app.get('/api/sites', async (_req: Request, res: Response, next) => {
  try {
    const sites = await prisma.site.findMany();
    res.json(sites);
  } catch (e) { next(e); }
});

app.get('/api/operations', async (_req: Request, res: Response, next) => {
  try {
    const ops = await prisma.siteOperation.findMany();
    res.json(ops);
  } catch (e) { next(e); }
});

app.get('/api/documents', async (_req: Request, res: Response, next) => {
  try {
    const docs = await prisma.document.findMany();
    res.json(docs);
  } catch (e) { next(e); }
});

app.get('/api/checklists', async (_req: Request, res: Response, next) => {
  try {
    const checklists = await prisma.checklist.findMany();
    res.json(checklists);
  } catch (e) { next(e); }
});


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`ASM Backend running on http://localhost:${PORT}`);
});

// --- API Routes (basic read endpoints for dashboard) ---

// GET all sites
app.get('/api/sites', async (_req: Request, res: Response, next) => {
  try {
    const sites = await prisma.site.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(sites);
  } catch (err) {
    next(err);
  }
});

// GET all operations
app.get('/api/operations', async (_req: Request, res: Response, next) => {
  try {
    const ops = await prisma.siteOperation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(ops);
  } catch (err) {
    next(err);
  }
});

// GET all documents
app.get('/api/documents', async (_req: Request, res: Response, next) => {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

// GET all checklists
app.get('/api/checklists', async (_req: Request, res: Response, next) => {
  try {
    const checklists = await prisma.checklist.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(checklists);
  } catch (err) {
    next(err);
  }
});
