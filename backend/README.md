# ASM Backend Application

Complete Asset/Site Management backend API built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Features

- 🔐 **Authentication** - JWT-based auth with bcrypt password hashing
- 🏗️ **Site Management** - Full CRUD for construction sites
- 📋 **Operations Tracking** - Track worker operations and time
- 📁 **Document Management** - AWS S3 integration for file storage
- 🛡️ **Security** - Rate limiting, RBAC, input validation
- 📊 **Pagination** - Efficient data retrieval
- ✅ **TypeScript** - Full type safety

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- AWS Account (for S3 document storage)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Build TypeScript
npm run build

# Start development server
npm run dev
```

### Environment Variables

See `.env.example` for all required variables. Key ones:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens (min 32 chars)
- `AWS_ACCESS_KEY_ID` - AWS credentials for S3
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_S3_BUCKET` - S3 bucket name for documents

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (auth required)

### Sites

- `POST /api/sites` - Create site (ADMIN/MANAGER)
- `GET /api/sites` - List all sites with pagination
- `GET /api/sites/:id` - Get site details
- `PUT /api/sites/:id` - Update site (ADMIN/MANAGER)
- `DELETE /api/sites/:id` - Delete site (ADMIN only)
- `GET /api/sites/manager/:managerId` - Get sites by manager

### Operations

- `POST /api/operations` - Create operation
- `GET /api/operations/site/:siteId` - Get operations by site
- `GET /api/operations/:id` - Get operation details
- `PUT /api/operations/:id` - Update operation
- `DELETE /api/operations/:id` - Delete operation (ADMIN/MANAGER)

### Documents

- `POST /api/documents` - Upload document (multipart/form-data)
- `GET /api/documents` - List documents with filtering
- `GET /api/documents/:id` - Get document details
- `GET /api/documents/:id/download` - Get presigned download URL
- `PUT /api/documents/:id` - Update document metadata
- `DELETE /api/documents/:id` - Delete document from S3 and DB

## Security

### Rate Limiting

- **Auth endpoints**: 5 requests per 15 minutes
- **API endpoints**: 100 requests per 15 minutes  
- **Write operations**: 10 requests per minute

### Role-Based Access Control (RBAC)

Four user roles with different permissions:

- **ADMIN** - Full access to all resources
- **MANAGER** - Manage sites and operations
- **WORKER** - Record operations, view sites
- **OFFICE_ADMIN** - Manage documents

### Input Validation

All endpoints validate:
- Email format
- Password strength (8+ chars, mixed case, numbers)
- Date formats (ISO 8601)
- File types and sizes (10MB limit)
- Required fields

## Database Schema

Key models:
- **User** - Users with roles
- **Site** - Construction sites
- **SiteOperation** - Work operations
- **Document** - File metadata (files in S3)
- **Checklist** - Site checklists
- **ChecklistItem** - Individual checklist items

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start

# Open Prisma Studio
npm run prisma:studio

# Create migration
npm run prisma:migrate
```

## Production Deployment

1. Set all environment variables
2. Ensure DATABASE_URL points to production database
3. Run migrations: `npm run prisma:migrate deploy`
4. Build: `npm run build`
5. Start: `npm start`

## Architecture

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── routes/         # Route definitions
│   ├── middleware/     # Auth, rate limiting
│   ├── utils/          # Helpers, validation
│   ├── types/          # TypeScript types
│   └── index.ts        # App entry point
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **File Storage**: AWS S3
- **Validation**: express-validator
- **Security**: Helmet.js, express-rate-limit

## License

MIT
