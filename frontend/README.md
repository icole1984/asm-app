# ASM Frontend

Modern React + TypeScript dashboard for Asbestos Site Management.

## 🚀 Quick Start

```bash
# Install dependencies (from project root)
npm install

# Run development server
npm run dev

# Or from project root
npm run dev -w frontend
```

The app will be available at **http://localhost:3000**

## 🎯 Features

### Dashboard Page
- **6 Key Metrics**: Active Sites, Operations, Workers, Completed Tasks, Documents, Alerts
- **4 Interactive Charts**: 
  - Weekly Operations (Bar Chart)
  - Site Status Distribution (Pie Chart)
  - Operation Types (Horizontal Bar)
  - Monthly Trends (Area Chart)
- **Recent Activity Feed**: Real-time updates
- **Quick Actions**: Fast access to common tasks
- **Upcoming Sites**: Schedule preview

### Sites Management
- Comprehensive site listing with search/filter
- Progress tracking with visual indicators
- Status badges (Active, Planning, Paused, Completed)
- Worker and operation counts
- Detailed site information

### Operations Tracking
- Operation type categorization
- Status tracking (Planned, In Progress, Completed, On Hold)
- Duration and worker count
- Color-coded status indicators
- Searchable and filterable

### Documents Management
- File type categorization (Forms, Photos, Reports, Certificates, Safety Plans)
- Upload date and size tracking
- View and download actions
- Document statistics

### Checklists
- Card-based layout with progress bars
- Item completion tracking
- Status overview (Pending, In Progress, Completed)
- Detailed summary table

## 🛠️ Technology Stack

- **React 18.2.0** - UI framework
- **TypeScript 5.3.3** - Type safety
- **Vite 5.0.8** - Build tool & dev server
- **React Router 6.20.1** - Navigation
- **Recharts 2.10.3** - Data visualization
- **Lucide React 0.303.0** - Icons
- **Axios 1.6.5** - HTTP client

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   └── layout/          # Layout components
│   │       ├── Layout.tsx   # Main layout wrapper
│   │       ├── Sidebar.tsx  # Navigation sidebar
│   │       └── Header.tsx   # Top header bar
│   ├── pages/               # Page components
│   │   ├── dashboard/       # Dashboard page
│   │   ├── sites/           # Sites management
│   │   ├── operations/      # Operations tracking
│   │   ├── documents/       # Document management
│   │   └── checklists/      # Checklist tracking
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types and enums
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: `#2563eb` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)
- **Info**: `#06b6d4` (Cyan)
- **Dark**: `#0f172a` (Navy)
- **Light**: `#f8fafc` (Off-white)

### Components
- **Stats Cards**: Metric display with icons and trend indicators
- **Charts**: Bar, Pie, Area, Horizontal Bar (powered by Recharts)
- **Tables**: Sortable, searchable data tables
- **Badges**: Status indicators with color coding
- **Progress Bars**: Visual progress tracking
- **Buttons**: Primary, Secondary, Success, Warning, Danger variants
- **Cards**: Container component with header and actions

## 📝 Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

## 🔧 Configuration

### Vite Config (`vite.config.ts`)
- Port: 3000
- Proxy: API requests to backend at http://localhost:5000

### TypeScript Config
- Strict mode enabled
- JSX: react-jsx
- Module: ESNext
- Target: ES2020

## 🌐 API Integration

The frontend is configured to connect to the backend API:

```typescript
// API Base URL (via Vite proxy)
const API_URL = '/api'

// Example API call
import axios from 'axios'

const fetchSites = async () => {
  const response = await axios.get('/api/sites')
  return response.data
}
```

## 📊 Data Models

TypeScript interfaces align with backend Prisma schema:

```typescript
interface Site {
  id: string
  name: string
  location: string
  status: SiteStatus
  startDate: string
  endDate?: string
  manager?: User
}

enum SiteStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}
```

## 🎯 Routing

Routes are defined in `App.tsx`:

- `/` - Dashboard
- `/sites` - Sites Management
- `/operations` - Operations Tracking
- `/documents` - Document Management
- `/checklists` - Checklist Tracking
- `/analytics` - Analytics (placeholder)
- `/users` - User Management (placeholder)
- `/settings` - Settings (placeholder)

## 🖼️ Screenshots

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/deb368b4-005e-47ec-84da-e55367d8a5f1)

Comprehensive dashboard with metrics, charts, and activity feed.

### Sites Table
![Sites](https://github.com/user-attachments/assets/2421c0c9-6e88-4e0c-850e-ab9b1b4cd057)

Detailed site management with progress tracking.

### Operations
![Operations](https://github.com/user-attachments/assets/0eee08a2-d774-4726-a96b-65415375b070)

Operation tracking with status indicators.

### Documents
![Documents](https://github.com/user-attachments/assets/69cb3da0-f66a-4f7a-8941-f5dbd6f82aca)

Document management with type categorization.

### Checklists
![Checklists](https://github.com/user-attachments/assets/a6cddbcd-1f9d-4108-9db8-81e6f120dd11)

Checklist tracking with progress visualization.

## 🔍 Development Tips

### Hot Reload
Vite provides instant hot module replacement (HMR) - changes appear immediately.

### Type Checking
Run TypeScript compiler in watch mode:
```bash
tsc --noEmit --watch
```

### Debugging
Use React DevTools browser extension for component inspection.

### Code Organization
- Keep components small and focused
- Use TypeScript for all new code
- Follow existing patterns for consistency
- Add types to `src/types/index.ts` when needed

## 🚀 Production Build

```bash
# Build optimized production bundle
npm run build

# Output directory: dist/
# Bundle size: ~618 KB (gzipped: ~173 KB)
```

The build includes:
- Minified JavaScript
- CSS optimization
- Asset optimization
- Source maps (optional)

## 📱 Responsive Design

The UI is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

On mobile, the sidebar collapses and the layout adapts.

## 🧪 Testing (Coming Soon)

Test infrastructure with Vitest is configured but tests need to be added.

```bash
# Run tests (when available)
npm test
```

## 🐛 Troubleshooting

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001  // Change to available port
}
```

### TypeScript errors
Clear cache and rebuild:
```bash
rm -rf dist
npm run build
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Recharts Documentation](https://recharts.org)
- [React Router Documentation](https://reactrouter.com)

## 🤝 Contributing

When adding new features:
1. Create types in `src/types/index.ts`
2. Follow existing component patterns
3. Maintain TypeScript strict mode compliance
4. Update this README if adding major features
5. Test on multiple screen sizes

---

**Version**: 1.0.0  
**React**: 18.2.0  
**TypeScript**: 5.3.3  
**Last Updated**: February 2026
