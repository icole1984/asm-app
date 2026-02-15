# Deployment Guide - ASM Backend Application

Complete guide for deploying the ASM Backend Application in various environments.

## 📋 Table of Contents

- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## 🖥️ Local Development

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm or yarn
- Git

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/icole1984/asm-app.git
   cd asm-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="******localhost:5432/asm_db"
   JWT_SECRET="generate-secure-32-char-minimum-secret"
   JWT_EXPIRE=7d
   BCRYPT_ROUNDS=10
   AWS_ACCESS_KEY_ID=your-aws-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=asm-documents
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Set Up Database**
   ```bash
   # Create database
   createdb asm_db

   # Or using psql
   psql -U postgres
   CREATE DATABASE asm_db;
   \q

   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Server will start at `http://localhost:5000`

### Verification

```bash
# Check health
curl http://localhost:5000/health

# Expected: {"status":"healthy","timestamp":"...","database":"connected"}
```

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     postgres:
       image: postgres:14-alpine
       environment:
         POSTGRES_DB: asm_db
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: postgres
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data
       healthcheck:
         test: ["CMD-SHELL", "pg_isready -U postgres"]
         interval: 10s
         timeout: 5s
         retries: 5
   
     backend:
       build:
         context: ./backend
         dockerfile: Dockerfile
       ports:
         - "5000:5000"
       environment:
         NODE_ENV: production
         PORT: 5000
         DATABASE_URL: "******postgres:5432/asm_db"
         JWT_SECRET: ${JWT_SECRET}
         JWT_EXPIRE: 7d
         BCRYPT_ROUNDS: 10
         AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
         AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
         AWS_REGION: ${AWS_REGION}
         AWS_S3_BUCKET: ${AWS_S3_BUCKET}
         CORS_ORIGIN: "*"
       depends_on:
         postgres:
           condition: service_healthy
       restart: unless-stopped
   
   volumes:
     postgres_data:
   ```

2. **Create Dockerfile**
   ```dockerfile
   # backend/Dockerfile
   FROM node:18-alpine AS builder
   
   WORKDIR /app
   
   # Copy package files
   COPY package*.json ./
   COPY prisma ./prisma/
   
   # Install dependencies
   RUN npm ci --only=production
   
   # Generate Prisma client
   RUN npx prisma generate
   
   # Copy source
   COPY . .
   
   # Build TypeScript
   RUN npm run build
   
   # Production stage
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Copy from builder
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/prisma ./prisma
   COPY --from=builder /app/package*.json ./
   
   # Expose port
   EXPOSE 5000
   
   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
     CMD node -e "require('http').get('http://localhost:5000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
   
   # Start application
   CMD ["npm", "start"]
   ```

3. **Create .env for Docker**
   ```bash
   # .env
   JWT_SECRET=your-super-secret-key-minimum-32-characters-long
   AWS_ACCESS_KEY_ID=your-aws-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=asm-documents
   ```

4. **Deploy**
   ```bash
   docker-compose up -d
   
   # Check logs
   docker-compose logs -f backend
   
   # Run migrations
   docker-compose exec backend npx prisma migrate deploy
   ```

5. **Verify**
   ```bash
   curl http://localhost:5000/health
   ```

---

## 🚀 Production Deployment

### Prerequisites

- Linux server (Ubuntu 20.04+ recommended)
- Node.js 18+
- PostgreSQL 14+
- Nginx (for reverse proxy)
- SSL certificate (Let's Encrypt recommended)

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: Database Setup

```bash
# Create database user
sudo -u postgres psql
CREATE USER asm_user WITH PASSWORD 'secure_password';
CREATE DATABASE asm_db OWNER asm_user;
GRANT ALL PRIVILEGES ON DATABASE asm_db TO asm_user;
\q

# Configure PostgreSQL to allow connections
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Add: local   asm_db   asm_user   md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Step 3: Application Setup

```bash
# Create application directory
sudo mkdir -p /var/www/asm-app
sudo chown $USER:$USER /var/www/asm-app

# Clone and setup
cd /var/www/asm-app
git clone https://github.com/icole1984/asm-app.git .
npm install

# Configure environment
cd backend
cp .env.example .env
nano .env
```

**Production .env:**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL="******localhost:5432/asm_db"
JWT_SECRET="generate-strong-secret-with-openssl-rand-base64-32"
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12
AWS_ACCESS_KEY_ID=your-production-aws-key
AWS_SECRET_ACCESS_KEY=your-production-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=asm-production-documents
CORS_ORIGIN=https://yourdomain.com
```

### Step 4: Build and Deploy

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate deploy

# Build application
npm run build

# Start with PM2
pm2 start dist/index.js --name asm-backend
pm2 save
pm2 startup
```

### Step 5: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/asm-app
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Logging
    access_log /var/log/nginx/asm-app-access.log;
    error_log /var/log/nginx/asm-app-error.log;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # File upload size limit
    client_max_body_size 10M;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/asm-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: SSL Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.yourdomain.com
```

### Step 7: Firewall

```bash
# Configure UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## ☁️ Cloud Deployment

### AWS Deployment

1. **EC2 Instance**
   - Launch Ubuntu 20.04 LTS instance
   - Security group: Allow 22, 80, 443
   - Follow production deployment steps above

2. **RDS Database**
   ```bash
   # Create PostgreSQL RDS instance
   # Update DATABASE_URL in .env
   DATABASE_URL="******your-rds-endpoint:5432/asm_db"
   ```

3. **S3 for Documents**
   - Create S3 bucket
   - Configure IAM user with S3 permissions
   - Update .env with credentials

4. **Application Load Balancer (Optional)**
   - Create ALB for high availability
   - Configure health checks: `/health`
   - Enable SSL/TLS termination

### Azure Deployment

1. **Azure App Service**
   ```bash
   # Deploy with Azure CLI
   az webapp up --name asm-backend --resource-group asm-rg
   ```

2. **Azure Database for PostgreSQL**
   - Create managed PostgreSQL
   - Update connection string

3. **Azure Blob Storage**
   - Use for document storage
   - Update environment configuration

### Google Cloud Deployment

1. **Cloud Run**
   ```bash
   # Build and deploy
   gcloud builds submit --tag gcr.io/PROJECT_ID/asm-backend
   gcloud run deploy --image gcr.io/PROJECT_ID/asm-backend --platform managed
   ```

2. **Cloud SQL**
   - Create PostgreSQL instance
   - Configure connection

---

## 🔧 Environment Configuration

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | JWT signing secret (32+ chars) | `generate-with-openssl` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRE` | Token expiration | `7d` |
| `BCRYPT_ROUNDS` | Password hashing rounds | `10` |
| `CORS_ORIGIN` | Allowed origin | `*` |
| `AWS_ACCESS_KEY_ID` | AWS credentials | - |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials | - |
| `AWS_REGION` | AWS region | `us-east-1` |
| `AWS_S3_BUCKET` | S3 bucket name | - |

### Generate Secure Secrets

```bash
# JWT_SECRET
openssl rand -base64 32

# Or with Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 💾 Database Setup

### Create Database

```bash
# Using createdb
createdb asm_db

# Or using psql
psql -U postgres -c "CREATE DATABASE asm_db;"
```

### Run Migrations

```bash
cd backend

# Development
npm run prisma:migrate

# Production
npm run prisma:migrate deploy
```

### Database Backup

```bash
# Backup
pg_dump asm_db > backup_$(date +%Y%m%d).sql

# Restore
psql asm_db < backup_20240215.sql
```

---

## ✅ Verification

### Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-02-15T12:00:00.000Z",
  "database": "connected"
}
```

### API Test

```bash
# Run automated tests
cd backend
./test-api.sh

# Or manual test
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** Can't connect to database

**Solutions:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -U postgres -d asm_db

# Verify DATABASE_URL in .env
echo $DATABASE_URL

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### Port Already in Use

**Problem:** `EADDRINUSE: Port 5000 already in use`

**Solutions:**
```bash
# Find process using port
lsof -ti:5000

# Kill process
kill -9 $(lsof -ti:5000)

# Or change port in .env
```

### PM2 Not Starting

**Problem:** Application won't start with PM2

**Solutions:**
```bash
# Check logs
pm2 logs asm-backend

# Restart
pm2 restart asm-backend

# Delete and re-add
pm2 delete asm-backend
pm2 start dist/index.js --name asm-backend
```

### Nginx 502 Bad Gateway

**Problem:** Nginx shows 502 error

**Solutions:**
```bash
# Check backend is running
curl http://localhost:5000/health

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Issues

**Problem:** SSL certificate errors

**Solutions:**
```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# View metrics
pm2 status
```

### System Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop

# Check resources
htop

# Check disk space
df -h

# Check memory
free -h
```

---

## 🔄 Updates

### Updating Application

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Run migrations
npm run prisma:migrate deploy

# Rebuild
npm run build

# Restart with PM2
pm2 restart asm-backend
```

---

## 📞 Support

- **Documentation:** [README.md](README.md)
- **API Guide:** [FEATURE_TESTING.md](FEATURE_TESTING.md)
- **Security:** [backend/SECURITY.md](backend/SECURITY.md)
- **Issues:** [GitHub Issues](https://github.com/icole1984/asm-app/issues)

---

**Your deployment is complete!** 🎉

For quick verification, see [QUICK_START.md](QUICK_START.md)
