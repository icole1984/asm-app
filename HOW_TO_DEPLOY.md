# How to Deploy and Verify the ASM Backend Application

This guide answers the question: **"How do I deploy and check for myself?"**

## 📚 Table of Contents

1. [Quick Start (5 Minutes)](#quick-start-5-minutes)
2. [Detailed Setup](#detailed-setup)
3. [Deployment Options](#deployment-options)
4. [Verification Steps](#verification-steps)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start (5 Minutes)

### Option 1: Local Development (Fastest)

```bash
# 1. Clone repository
git clone https://github.com/icole1984/asm-app.git
cd asm-app

# 2. Install dependencies
npm install

# 3. Set up environment
cd backend
cp .env.example .env

# Edit .env - MINIMUM required:
# - DATABASE_URL: Your PostgreSQL connection string
# - JWT_SECRET: Change to a secure 32+ character string

# 4. Set up database
createdb asm_db
npm run prisma:generate
npm run prisma:migrate

# 5. Start server
npm run dev

# 6. Verify it's working
curl http://localhost:5000/health
```

**Expected output:**
```json
{"status":"healthy","timestamp":"...","database":"connected"}
```

✅ **If you see this, it's working!**

### Option 2: Docker (Easiest - No local setup needed)

```bash
# 1. Clone repository
git clone https://github.com/icole1984/asm-app.git
cd asm-app

# 2. Start with Docker
docker-compose up -d

# 3. Wait for startup (30 seconds)
sleep 30

# 4. Verify
curl http://localhost:5000/health
```

✅ **Docker handles everything automatically!**

---

## 📖 Detailed Setup

### Step 1: Prerequisites

**Check if you have the required software:**

```bash
# Check Node.js version (need 18+)
node --version

# Check PostgreSQL (need 14+)
psql --version

# Check npm
npm --version
```

**Don't have them? Install:**

- **Node.js:** [nodejs.org/download](https://nodejs.org/download)
- **PostgreSQL:** [postgresql.org/download](https://www.postgresql.org/download)

### Step 2: Clone and Install

```bash
# Clone the repository
git clone https://github.com/icole1984/asm-app.git
cd asm-app

# Install all dependencies
npm install

# This will install dependencies for the backend
```

### Step 3: Configure Environment

```bash
cd backend

# Copy the example environment file
cp .env.example .env

# Open in your editor
nano .env  # or code .env, vim .env, etc.
```

**Required changes in .env:**

```env
# Change this line (use your actual PostgreSQL connection):
DATABASE_URL="******localhost:5432/asm_db"

# Change this line (generate a secure secret):
JWT_SECRET="your-actual-secure-secret-minimum-32-chars"
```

**Generate a secure JWT_SECRET:**

```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and paste it as your JWT_SECRET in .env
```

### Step 4: Database Setup

```bash
# Create the database
createdb asm_db

# Or if you need to use PostgreSQL user:
sudo -u postgres createdb asm_db

# Or using psql:
psql -U postgres
CREATE DATABASE asm_db;
\q

# Generate Prisma client (this creates the database client code)
npm run prisma:generate

# Run migrations (this creates the tables)
npm run prisma:migrate
```

**Expected output:**
```
Your database is now in sync with your schema.
✔ Generated Prisma Client
```

### Step 5: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

**Expected output:**
```
✅ Environment variables validated
✅ Database connected successfully
🚀 ASM Backend running on http://localhost:5000
```

---

## 🔄 Deployment Options

### Option A: Local Development

**Best for:** Testing, development, learning

```bash
npm run dev
```

**Pros:**
- Quick to start
- Auto-reloads on code changes
- Easy debugging

### Option B: Docker Compose

**Best for:** Consistent environments, easy setup

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

**Pros:**
- Database included
- No local PostgreSQL setup needed
- Isolated environment

### Option C: Production Server

**Best for:** Real deployment, public access

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete production setup including:
- Server configuration
- Nginx reverse proxy
- SSL/TLS setup
- PM2 process management
- Database backups

---

## ✅ Verification Steps

### Step 1: Check Health Endpoint

```bash
curl http://localhost:5000/health
```

**Expected:**
```json
{
  "status": "healthy",
  "timestamp": "2024-02-15T12:00:00.000Z",
  "database": "connected"
}
```

✅ Server is running  
✅ Database is connected

### Step 2: Check API Root

```bash
curl http://localhost:5000/api
```

**Expected:**
```json
{
  "message": "ASM API v1.0",
  "endpoints": {
    "auth": "/api/auth",
    "sites": "/api/sites",
    "operations": "/api/operations",
    "documents": "/api/documents"
  }
}
```

✅ API is responding  
✅ Routes are configured

### Step 3: Test Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Expected:**
```json
{
  "user": {
    "id": "...",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User"
  },
  "token": "eyJhbGc..."
}
```

✅ Authentication working  
✅ Database writes working  
✅ Validation working

### Step 4: Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

**Expected:**
```json
{
  "user": {
    "id": "...",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User"
  },
  "token": "eyJhbGc..."
}
```

✅ Login working  
✅ Password verification working  
✅ JWT generation working

### Step 5: Run Automated Verification

```bash
# Run the comprehensive verification script
./verify-deployment.sh

# Or run the API test suite
cd backend
./test-api.sh
```

**Expected:**
```
✓ All tests passed! Deployment is verified.
```

✅ All features verified

### Step 6: Run Feature Demo

```bash
./demo-features.sh
```

This shows all features in a nice formatted display.

---

## 🔍 How to Check Everything is Working

### Method 1: Browser

Open your browser and go to:
- http://localhost:5000/health
- http://localhost:5000/api

You should see JSON responses.

### Method 2: Postman/Insomnia

1. Download [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/)
2. Import the API endpoints
3. Test each endpoint manually

### Method 3: Automated Scripts

```bash
# Quick health check
curl http://localhost:5000/health

# Full verification (10 tests)
./verify-deployment.sh

# API endpoint tests
cd backend && ./test-api.sh

# Feature demonstration
./demo-features.sh
```

### Method 4: Check Logs

**Local development:**
```bash
# Logs appear in your terminal where you ran npm run dev
```

**Docker:**
```bash
docker-compose logs -f backend
```

**Production (PM2):**
```bash
pm2 logs asm-backend
```

---

## 🐛 Troubleshooting

### Problem: "Can't connect to database"

**Solution:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Start if not running
sudo systemctl start postgresql  # Linux
brew services start postgresql  # macOS

# Check if database exists
psql -l | grep asm_db

# Create if missing
createdb asm_db

# Verify DATABASE_URL in .env is correct
cat backend/.env | grep DATABASE_URL
```

### Problem: "Port 5000 already in use"

**Solution:**
```bash
# Find what's using port 5000
lsof -ti:5000

# Kill it
kill -9 $(lsof -ti:5000)

# Or change port in .env
echo "PORT=5001" >> backend/.env
```

### Problem: "JWT_SECRET validation failed"

**Solution:**
```bash
# Generate a new secure secret
openssl rand -base64 32

# Update .env
nano backend/.env
# Replace JWT_SECRET with the generated value
```

### Problem: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: "Prisma migrations fail"

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or manually reset
dropdb asm_db
createdb asm_db
npm run prisma:migrate
```

### Problem: "Docker container won't start"

**Solution:**
```bash
# Check logs
docker-compose logs

# Restart fresh
docker-compose down -v
docker-compose up -d

# Check if database is ready
docker-compose exec postgres pg_isready
```

---

## 📚 Additional Resources

### Documentation
- [QUICK_START.md](QUICK_START.md) - 5-minute quick start
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [backend/README.md](backend/README.md) - API documentation
- [FEATURE_TESTING.md](FEATURE_TESTING.md) - Feature examples
- [backend/SECURITY.md](backend/SECURITY.md) - Security guide

### Scripts
- `./verify-deployment.sh` - Verify deployment is working
- `./demo-features.sh` - Show all features
- `backend/test-api.sh` - Test API endpoints

### Support
- **GitHub Issues:** [github.com/icole1984/asm-app/issues](https://github.com/icole1984/asm-app/issues)
- **Documentation:** See files above

---

## ✨ Success Checklist

After deployment, you should be able to:

- ✅ Access http://localhost:5000/health and see "healthy"
- ✅ Access http://localhost:5000/api and see endpoint list
- ✅ Register a new user via API
- ✅ Login with the user and get a JWT token
- ✅ Run `./verify-deployment.sh` and see all tests pass

**If all checks pass, your deployment is successful!** 🎉

---

## 🚀 Next Steps

1. **Configure AWS S3** for document uploads
2. **Set up production environment** (see DEPLOYMENT.md)
3. **Configure HTTPS** with SSL certificate
4. **Set up monitoring** and logging
5. **Create your first admin user**
6. **Test all features** with demo-features.sh

---

**You're ready to use the ASM Backend Application!** 🎊
