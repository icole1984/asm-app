import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
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

// API Routes
app.get('/api/sites', (req: Request, res: Response) => {
  // Mock data for sites
  const sites = [
    {
      id: '1',
      name: 'Downtown Office Building',
      location: 'Downtown',
      address: '123 Main St',
      postcode: '12345',
      startDate: new Date('2024-01-15'),
      status: 'ACTIVE',
      managerId: 'user1'
    },
    {
      id: '2',
      name: 'Residential Complex A',
      location: 'Suburbs',
      address: '456 Oak Ave',
      postcode: '67890',
      startDate: new Date('2024-02-01'),
      status: 'PLANNING',
      managerId: 'user1'
    }
  ];
  res.json(sites);
});

app.get('/api/operations', (req: Request, res: Response) => {
  // Mock data for operations
  const operations = [
    {
      id: '1',
      siteId: '1',
      operationType: 'Asbestos Removal',
      description: 'Removal of ceiling tiles',
      startTime: new Date('2024-03-01T08:00:00'),
      endTime: new Date('2024-03-01T17:00:00'),
      duration: 9,
      workersCount: 5,
      status: 'COMPLETED',
      recordedBy: 'user1'
    },
    {
      id: '2',
      siteId: '1',
      operationType: 'Air Testing',
      description: 'Post-removal air quality testing',
      startTime: new Date('2024-03-02T09:00:00'),
      status: 'IN_PROGRESS',
      workersCount: 2,
      recordedBy: 'user1'
    }
  ];
  res.json(operations);
});

app.get('/api/documents', (req: Request, res: Response) => {
  // Mock data for documents
  const documents = [
    {
      id: '1',
      siteId: '1',
      uploadedBy: 'user1',
      fileName: 'safety-plan-2024.pdf',
      fileUrl: '/uploads/safety-plan-2024.pdf',
      fileSize: 2048000,
      fileType: 'application/pdf',
      docType: 'SAFETY_PLAN',
      createdAt: new Date('2024-02-15')
    },
    {
      id: '2',
      siteId: '1',
      uploadedBy: 'user1',
      fileName: 'asbestos-report.pdf',
      fileUrl: '/uploads/asbestos-report.pdf',
      fileSize: 1024000,
      fileType: 'application/pdf',
      docType: 'REPORT',
      createdAt: new Date('2024-02-20')
    }
  ];
  res.json(documents);
});

app.get('/api/checklists', (req: Request, res: Response) => {
  // Mock data for checklists
  const checklists = [
    {
      id: '1',
      siteId: '1',
      name: 'Pre-work Safety Checklist',
      status: 'COMPLETED',
      createdAt: new Date('2024-02-28'),
      items: [
        { id: 'item1', description: 'PPE equipment checked', completed: true },
        { id: 'item2', description: 'Site perimeter secured', completed: true },
        { id: 'item3', description: 'Emergency contacts posted', completed: true }
      ]
    },
    {
      id: '2',
      siteId: '1',
      name: 'Daily Work Checklist',
      status: 'IN_PROGRESS',
      createdAt: new Date('2024-03-01'),
      items: [
        { id: 'item4', description: 'Morning safety briefing', completed: true },
        { id: 'item5', description: 'Equipment inspection', completed: true },
        { id: 'item6', description: 'End of day cleanup', completed: false }
      ]
    }
  ];
  res.json(checklists);
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
