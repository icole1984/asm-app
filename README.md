# ASM (Asset/Site Management) Application

Production-ready construction site management system with complete backend API.

## 🚀 Features

✅ **Complete Backend API** - Fully implemented with TypeScript, Express, and Prisma  
✅ **Authentication & Authorization** - JWT auth with role-based access control  
✅ **Site Management** - Full CRUD for construction sites  
✅ **Operations Tracking** - Track workers, time, and progress  
✅ **Document Management** - AWS S3 integration for file storage  
✅ **Security Hardened** - Rate limiting, input validation, secure defaults  
✅ **Docker Ready** - One-command deployment with Docker Compose  
✅ **Production Ready** - TypeScript, error handling, graceful shutdown  

## 📚 Quick Start

### Option 1: Docker (Easiest - 2 minutes)

```bash
# Clone repository
git clone https://github.com/icole1984/asm-app.git
cd asm-app

# Start with Docker Compose
docker-compose up -d

# Check health
curl http://localhost:5000/health
```

### Option 2: Local Development (5 minutes)

```bash
# Clone repository
git clone https://github.com/icole1984/asm-app.git
cd asm-app/backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database and AWS credentials

# Create database
createdb asm_db

# Run migrations
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

## 📖 Documentation

- **[Backend README](backend/README.md)** - Complete API documentation
- **[API Endpoints](#api-endpoints)** - All available endpoints
- **[Environment Variables](#environment-variables)** - Configuration guide
- **[Docker Deployment](#docker-deployment)** - Container deployment

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT token)
- `GET /api/auth/profile` - Get user profile

### Sites
- `POST /api/sites` - Create site (ADMIN/MANAGER)
- `GET /api/sites` - List sites (with pagination)
- `GET /api/sites/:id` - Get site details
- `PUT /api/sites/:id` - Update site
- `DELETE /api/sites/:id` - Delete site (ADMIN)

### Operations
- `POST /api/operations` - Create operation
- `GET /api/operations/site/:siteId` - Get by site
- `GET /api/operations/:id` - Get operation
- `PUT /api/operations/:id` - Update operation
- `DELETE /api/operations/:id` - Delete operation

### Documents
- `POST /api/documents` - Upload file to S3
- `GET /api/documents` - List documents
- `GET /api/documents/:id` - Get document
- `GET /api/documents/:id/download` - Get download URL
- `DELETE /api/documents/:id` - Delete from S3 & DB

## 🔐 Security Features

### Rate Limiting
- Auth endpoints: 5 requests / 15 minutes
- API endpoints: 100 requests / 15 minutes
- Write operations: 10 requests / minute

### Access Control
Four user roles:
- **ADMIN** - Full system access
- **MANAGER** - Manage sites and operations
- **WORKER** - Record operations
- **OFFICE_ADMIN** - Manage documents

### Input Validation
- Email format validation
- Password strength requirements (8+ chars, mixed case, numbers)
- File type and size restrictions (10MB limit)
- All endpoints validated

## 🛠️ Tech Stack

**Backend:**
- Node.js 18+ & TypeScript
- Express.js framework
- Prisma ORM
- PostgreSQL database
- JWT authentication
- AWS S3 storage
- express-validator
- express-rate-limit

**DevOps:**
- Docker & Docker Compose
- Multi-stage builds
- Health checks
- Graceful shutdown

## 🌍 Environment Variables

Key variables (see `.env.example` for full list):

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/asm_db

# Authentication (CHANGE THIS!)
JWT_SECRET=your-secure-secret-minimum-32-characters

# AWS S3 (for document storage)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=asm-documents
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Stop and remove data
docker-compose down -v
```

### Manual Docker Build

```bash
# Build image
cd backend
docker build -t asm-backend .

# Run container
docker run -p 5000:5000 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=your-secret \
  asm-backend
```

## 📊 Project Structure

```
asm-app/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, rate limiting
│   │   ├── utils/          # Utilities, validation
│   │   ├── types/          # TypeScript types
│   │   └── index.ts        # App entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── Dockerfile          # Docker build
│   └── README.md           # Backend docs
├── docker-compose.yml       # Container orchestration
└── README.md               # This file
```

## 🧪 Development

```bash
cd backend

# Start dev server with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Create new migration
npm run prisma:migrate
```

## 📈 API Testing

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manager@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manager@example.com",
    "password": "SecurePass123"
  }'
```

### Create Site
```bash
curl -X POST http://localhost:5000/api/sites \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Downtown Construction",
    "location": "New York",
    "address": "123 Main St",
    "postcode": "10001",
    "startDate": "2024-01-01",
    "managerId": "USER_ID"
  }'
```

## 🔒 Security

- **No default secrets** - Environment validation enforces secure configuration
- **Password hashing** - bcrypt with configurable rounds
- **JWT tokens** - Secure authentication
- **Rate limiting** - Prevents abuse
- **Input validation** - All endpoints validated
- **RBAC** - Role-based permissions
- **Helmet.js** - Security headers
- **CORS** - Configurable origins

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 💬 Support

For issues or questions, please open a GitHub issue.
