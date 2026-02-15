# Quick Start Guide - ASM Backend Application

This guide will help you get the ASM Backend Application running in **less than 10 minutes**.

## 🚀 Quick Start (5 Minutes)

### Prerequisites

Before starting, make sure you have:
- Node.js 18+ installed ([Download](https://nodejs.org/))
- PostgreSQL 14+ installed ([Download](https://www.postgresql.org/download/))
- Git installed

### Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/icole1984/asm-app.git
cd asm-app

# Install dependencies
npm install
```

### Step 2: Configure Environment (1 minute)

```bash
# Copy environment template
cd backend
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your favorite editor
```

**Minimum required settings:**
```env
DATABASE_URL="******localhost:5432/asm_db"
JWT_SECRET="your-super-secret-key-minimum-32-characters-long"
PORT=5000
```

### Step 3: Set Up Database (1 minute)

```bash
# Create database
createdb asm_db

# Run migrations
npm run prisma:generate
npm run prisma:migrate
```

### Step 4: Start the Server (30 seconds)

```bash
# Development mode (with auto-reload)
npm run dev

# Or build and start production
npm run build
npm start
```

### Step 5: Verify It's Working (30 seconds)

Open your browser or use curl:

```bash
# Check health
curl http://localhost:5000/health

# Expected response:
# {"status":"healthy","timestamp":"...","database":"connected"}
```

---

## ✅ Quick Verification

Test the API is working:

```bash
# 1. Check health
curl http://localhost:5000/health

# 2. Check API root
curl http://localhost:5000/api

# 3. Register a test user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "firstName": "Test",
    "lastName": "User"
  }'

# 4. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

If you see responses with user data and tokens, **it's working!** 🎉

---

## 🐳 Docker Quick Start (Alternative)

If you prefer Docker:

```bash
# Using docker-compose (includes database)
docker-compose up -d

# Wait for startup (30 seconds)
sleep 30

# Check health
curl http://localhost:5000/health
```

---

## 🔧 Common Issues

### Database Connection Failed

**Problem:** `Error: P1001: Can't reach database server`

**Solution:**
```bash
# Make sure PostgreSQL is running
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS

# Check if database exists
psql -l | grep asm_db

# Create if missing
createdb asm_db
```

### Port Already in Use

**Problem:** `Error: Port 5000 is already in use`

**Solution:**
```bash
# Change port in .env
echo "PORT=5001" >> backend/.env

# Or kill the process using port 5000
lsof -ti:5000 | xargs kill -9
```

### JWT_SECRET Validation Failed

**Problem:** `JWT_SECRET must be changed from the default value`

**Solution:**
```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
echo "JWT_SECRET=<generated-value>" >> backend/.env
```

---

## 📱 Next Steps

Now that your server is running:

1. **Test Features:**
   ```bash
   cd backend
   ./test-api.sh
   ```

2. **Explore API:**
   - Open [http://localhost:5000/api](http://localhost:5000/api)
   - See all available endpoints

3. **Read Documentation:**
   - [FEATURE_TESTING.md](FEATURE_TESTING.md) - Complete API guide
   - [backend/README.md](backend/README.md) - Detailed documentation
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment

4. **Configure AWS S3** (for document uploads):
   ```env
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=asm-documents
   ```

---

## 🎯 What's Next?

### For Development
- Read [backend/README.md](backend/README.md) for API documentation
- Check [FEATURE_TESTING.md](FEATURE_TESTING.md) for feature examples
- Run `./demo-features.sh` to see all features

### For Production
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Configure HTTPS reverse proxy (nginx)
- Set up proper database backups
- Configure monitoring and logging

---

## 📞 Need Help?

- **Documentation:** [backend/README.md](backend/README.md)
- **API Examples:** [FEATURE_TESTING.md](FEATURE_TESTING.md)
- **Security:** [backend/SECURITY.md](backend/SECURITY.md)
- **Issues:** [GitHub Issues](https://github.com/icole1984/asm-app/issues)

---

**You're all set!** The ASM Backend is now running and ready for use. 🚀
