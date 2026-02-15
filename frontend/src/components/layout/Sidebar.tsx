import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Activity, 
  FileText, 
  CheckSquare,
  Users,
  Settings,
  BarChart3
} from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/sites', icon: MapPin, label: 'Sites' },
    { path: '/operations', icon: Activity, label: 'Operations' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/checklists', icon: CheckSquare, label: 'Checklists' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>ASM</h1>
        <p>Site Management</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
