# ASM App - Asbestos Site Management Application

Real-time site operation tracking and paperwork digitization system for asbestos management.

## 🎯 Project Overview

ASM App is a comprehensive web application designed to streamline asbestos site management through:
- Real-time operation tracking
- Digital document management
- Safety checklist compliance
- Site progress monitoring
- Interactive data visualization

## 📁 Repository Structure

```
asm-app/
├── frontend/          # React + TypeScript frontend (Vite)
├── backend/           # Node.js + Express backend
├── package.json       # Root workspace configuration
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/icole1984/asm-app.git
   cd asm-app
   ```

2. **Checkout the frontend branch**
   ```bash
   # The frontend is currently in the feature branch
   git checkout copilot/create-advanced-asm-dashboard-ui
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development servers**
   
   **Frontend only:**
   ```bash
   npm run dev -w frontend
   ```
   The frontend will be available at http://localhost:3000

   **Backend only:**
   ```bash
   npm run dev -w backend
   ```
   The backend will be available at http://localhost:5000

   **Both (in separate terminals):**
   ```bash
   # Terminal 1 - Frontend
   npm run dev -w frontend
   
   # Terminal 2 - Backend
   npm run dev -w backend
   ```

## 🎨 Frontend Features

The frontend includes a comprehensive dashboard UI with:

### Pages
- **Dashboard** - Real-time metrics, charts, and activity feed
- **Sites Management** - Track all asbestos management sites
- **Operations** - Log and monitor site operations
- **Documents** - Manage certificates, reports, and photos
- **Checklists** - Safety and compliance tracking

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS variables

### Features
- 📊 Interactive data visualizations (bar, pie, area charts)
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with dark sidebar navigation
- ✅ Progress tracking and status badges
- 🔍 Search and filter functionality
- 📈 Real-time statistics and metrics

## 🔧 Backend Features

The backend provides RESTful APIs for:
- User authentication and authorization
- Site management
- Operation logging
- Document storage
- Checklist tracking

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express
- **Database**: PostgreSQL with Prisma ORM
- **Security**: Helmet, CORS, bcrypt
- **File Upload**: Multer 2.0.2 (secure)

## 📂 Finding the Frontend

### Current Branch Structure

The frontend code is located in the **`copilot/create-advanced-asm-dashboard-ui`** branch.

If you can't find the frontend directory:

1. **Check your current branch:**
   ```bash
   git branch
   ```

2. **Switch to the frontend branch:**
   ```bash
   git checkout copilot/create-advanced-asm-dashboard-ui
   ```

3. **Verify the frontend exists:**
   ```bash
   ls -la frontend/
   ```

You should see:
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🏗️ Building for Production

### Frontend Build
```bash
npm run build -w frontend
```
Output will be in `frontend/dist/`

### Backend Build
```bash
npm run build -w backend
```
Output will be in `backend/dist/`

### Build Both
```bash
npm run build
```

## 🧪 Testing

### Frontend Tests
```bash
npm run test -w frontend
```

### Backend Tests
```bash
npm run test -w backend
```

### All Tests
```bash
npm test
```

## 📊 Database Setup (Backend)

1. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

2. **Generate Prisma client**
   ```bash
   npm run prisma:generate -w backend
   ```

3. **Run migrations**
   ```bash
   npm run prisma:migrate -w backend
   ```

## 🔒 Security

- All dependencies regularly updated
- Multer upgraded to 2.0.2 (patched DoS vulnerabilities)
- TypeScript for type safety
- Input validation with express-validator
- Helmet for security headers
- CORS configured

## 📸 Screenshots

### Dashboard
![Dashboard with charts and metrics](https://github.com/user-attachments/assets/deb368b4-005e-47ec-84da-e55367d8a5f1)

### Sites Management
![Sites management table](https://github.com/user-attachments/assets/2421c0c9-6e88-4e0c-850e-ab9b1b4cd057)

### Operations Tracking
![Operations tracking](https://github.com/user-attachments/assets/0eee08a2-d774-4726-a96b-65415375b070)

## 🤝 Contributing

1. Create a feature branch from `copilot/create-advanced-asm-dashboard-ui`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project is private and proprietary.

## 🆘 Troubleshooting

### "Cannot find frontend directory"
Make sure you're on the correct branch:
```bash
git checkout copilot/create-advanced-asm-dashboard-ui
```

### "Module not found" errors
Install dependencies:
```bash
npm install
```

### Port already in use
Change the port in:
- Frontend: `frontend/vite.config.ts` (default: 3000)
- Backend: `backend/.env` (default: 5000)

### Database connection errors
Check your `backend/.env` file and ensure:
- PostgreSQL is running
- DATABASE_URL is correct
- Database exists

## 📞 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Current Version**: 1.0.0  
**Last Updated**: February 2026  
**Branch**: copilot/create-advanced-asm-dashboard-ui
