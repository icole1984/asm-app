# ASM Backend API

Asbestos Site Management Application - Backend API for real-time site operation tracking and paperwork digitization.

## Features

- ✅ **Authentication & Authorization** - JWT-based auth with role-based access control (ADMIN, MANAGER, WORKER, OFFICE_ADMIN)
- ✅ **Site Management** - Create and manage asbestos remediation sites with full lifecycle tracking
- ✅ **Operations Tracking** - Record and monitor site operations with worker tracking
- ✅ **Document Management** - Upload and organize compliance documents with AWS S3 integration
- ✅ **Checklist System** - Safety and compliance checklists with item-level tracking
- ✅ **Input Validation** - Comprehensive request validation using express-validator
- ✅ **Pagination** - Built-in pagination for all list endpoints
- ✅ **Security** - Helmet.js, CORS, password hashing, environment validation

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (jsonwebtoken) with bcryptjs
- **File Storage:** AWS S3
- **Validation:** express-validator
- **Security:** Helmet.js, CORS

## Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- AWS Account (for S3 document storage)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/icole1984/asm-app.git
cd asm-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure the required variables:

```env
# Required
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/asm_db
JWT_SECRET=your_secure_jwt_secret_here  # MUST be changed from default
CORS_ORIGIN=http://localhost:3000

# Optional (defaults provided)
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10

# AWS S3 (required for document uploads)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-west-2
AWS_S3_BUCKET=asm-documents
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to explore the database
npm run prisma:studio
```

## Running the Application

### Development
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Production
```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Site Endpoints

All site endpoints require authentication.

#### Create Site (ADMIN/MANAGER only)
```http
POST /api/sites
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Site Alpha",
  "location": "London",
  "address": "123 Main St",
  "postcode": "SW1A 1AA",
  "startDate": "2024-01-01",
  "managerId": "user_id_here"
}
```

#### Get All Sites (with pagination)
```http
GET /api/sites?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Site by ID
```http
GET /api/sites/:id
Authorization: Bearer <token>
```

#### Update Site (ADMIN/MANAGER only)
```http
PUT /api/sites/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

#### Delete Site (ADMIN only)
```http
DELETE /api/sites/:id
Authorization: Bearer <token>
```

### Operation Endpoints

#### Create Operation
```http
POST /api/operations
Authorization: Bearer <token>
Content-Type: application/json

{
  "siteId": "site_id_here",
  "operationType": "Asbestos Removal",
  "description": "Removal from Building A",
  "startTime": "2024-01-15T09:00:00Z",
  "workersCount": 5,
  "recordedBy": "user_id_here"
}
```

#### Get Operations by Site
```http
GET /api/operations/site/:siteId
Authorization: Bearer <token>
```

### Document Endpoints

#### Upload Document
```http
POST /api/documents
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
siteId: <site_id>
docType: REPORT
uploadedBy: <user_id>
```

#### Get All Documents (with pagination and filtering)
```http
GET /api/documents?page=1&limit=10&siteId=<site_id>
Authorization: Bearer <token>
```

## Database Schema

### Models

- **User** - System users with role-based permissions
- **Site** - Asbestos remediation sites
- **SiteOperation** - Work operations performed at sites
- **Document** - Uploaded documents with S3 storage
- **Checklist** - Safety/compliance checklists
- **ChecklistItem** - Individual checklist items

### User Roles

- `ADMIN` - Full system access
- `MANAGER` - Manage sites and operations
- `WORKER` - Record operations and view assigned sites
- `OFFICE_ADMIN` - View and manage documents

### Site Statuses

- `PLANNING` - Site in planning phase
- `ACTIVE` - Active operations
- `PAUSED` - Operations temporarily paused
- `COMPLETED` - Work completed
- `ARCHIVED` - Historical record

## Security Features

- ✅ Environment variable validation on startup
- ✅ JWT secret validation (prevents default values in production)
- ✅ Password strength requirements (min 8 chars, uppercase, lowercase, number)
- ✅ Request validation on all endpoints
- ✅ Role-based access control
- ✅ File type and size validation for uploads
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Graceful shutdown handling
- ✅ Prisma Client singleton pattern

## Development

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth and validation middleware
│   ├── utils/           # Utilities (prisma, env, validation)
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── dist/                # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software.

## Support

For issues and questions, please open an issue on GitHub.
