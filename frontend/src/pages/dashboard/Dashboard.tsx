import { 
  MapPin, 
  Activity, 
  Users, 
  CheckCircle, 
  FileText,
  Clock,
  AlertCircle,
  Plus,
  Calendar,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

function Dashboard() {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Active Sites',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: MapPin,
      color: 'primary'
    },
    {
      title: "Today's Operations",
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'success'
    },
    {
      title: 'Active Workers',
      value: '156',
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'info'
    },
    {
      title: 'Completed Today',
      value: '12',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'success'
    },
    {
      title: 'Pending Documents',
      value: '7',
      change: '-3%',
      trend: 'down',
      icon: FileText,
      color: 'warning'
    },
    {
      title: 'Safety Alerts',
      value: '2',
      change: '-50%',
      trend: 'down',
      icon: AlertCircle,
      color: 'danger'
    },
  ];

  const operationsData = [
    { name: 'Mon', operations: 12, completed: 10 },
    { name: 'Tue', operations: 15, completed: 13 },
    { name: 'Wed', operations: 18, completed: 15 },
    { name: 'Thu', operations: 14, completed: 12 },
    { name: 'Fri', operations: 20, completed: 17 },
    { name: 'Sat', operations: 8, completed: 8 },
    { name: 'Sun', operations: 5, completed: 5 },
  ];

  const siteStatusData = [
    { name: 'Active', value: 24, color: '#10b981' },
    { name: 'Planning', value: 8, color: '#f59e0b' },
    { name: 'Paused', value: 3, color: '#ef4444' },
    { name: 'Completed', value: 45, color: '#6b7280' },
  ];

  const operationTypesData = [
    { type: 'Removal', count: 45 },
    { type: 'Inspection', count: 32 },
    { type: 'Testing', count: 28 },
    { type: 'Encapsulation', count: 18 },
    { type: 'Monitoring', count: 15 },
  ];

  const weeklyTrendData = [
    { week: 'Week 1', sites: 18, operations: 65 },
    { week: 'Week 2', sites: 20, operations: 72 },
    { week: 'Week 3', sites: 22, operations: 78 },
    { week: 'Week 4', sites: 24, operations: 85 },
  ];

  const recentActivities = [
    {
      id: '1',
      title: 'New site added',
      description: 'Riverside Construction - Manchester',
      time: '5 minutes ago',
      icon: MapPin,
      color: 'primary'
    },
    {
      id: '2',
      title: 'Operation completed',
      description: 'Asbestos removal at Building A',
      time: '15 minutes ago',
      icon: CheckCircle,
      color: 'success'
    },
    {
      id: '3',
      title: 'Document uploaded',
      description: 'Safety certificate for Site #12',
      time: '1 hour ago',
      icon: FileText,
      color: 'info'
    },
    {
      id: '4',
      title: 'Checklist completed',
      description: 'Pre-work safety check - Site #8',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'success'
    },
    {
      id: '5',
      title: 'Safety alert',
      description: 'Equipment maintenance required',
      time: '3 hours ago',
      icon: AlertCircle,
      color: 'warning'
    },
  ];

  const upcomingSites = [
    { name: 'Riverside Construction', location: 'Manchester', date: '2024-02-20', status: 'Planning' },
    { name: 'City Center Renovation', location: 'Birmingham', date: '2024-02-22', status: 'Planning' },
    { name: 'Industrial Park Site', location: 'Leeds', date: '2024-02-25', status: 'Active' },
    { name: 'School Refurbishment', location: 'Liverpool', date: '2024-02-28', status: 'Planning' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className={`trend ${stat.trend}`}>
                  {stat.change} from last week
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <a href="/sites" className="action-card">
          <Plus size={48} />
          <h4>New Site</h4>
          <p>Register a new asbestos site</p>
        </a>
        <a href="/operations" className="action-card">
          <Activity size={48} />
          <h4>Log Operation</h4>
          <p>Record site activities</p>
        </a>
        <a href="/documents" className="action-card">
          <FileText size={48} />
          <h4>Upload Document</h4>
          <p>Add certificates & reports</p>
        </a>
        <a href="/checklists" className="action-card">
          <CheckCircle size={48} />
          <h4>Safety Check</h4>
          <p>Complete safety checklist</p>
        </a>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Operations Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Weekly Operations</h3>
            <div className="card-actions">
              <button className="btn btn-secondary btn-sm">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="operations" fill="#2563eb" name="Total Operations" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Site Status Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Site Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={siteStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {siteStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Operation Types */}
        <div className="card">
          <div className="card-header">
            <h3>Operation Types (This Month)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operationTypesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend */}
        <div className="card">
          <div className="card-header">
            <h3>Monthly Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sites" stackId="1" stroke="#2563eb" fill="#2563eb" name="Active Sites" />
              <Area type="monotone" dataKey="operations" stackId="2" stroke="#10b981" fill="#10b981" name="Operations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity and Upcoming Sites */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button className="btn btn-secondary btn-sm">View All</button>
          </div>
          <ul className="activity-list">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <li key={activity.id} className="activity-item">
                  <div className={`activity-icon stat-icon ${activity.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <div className="activity-time">
                      <Clock size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      {activity.time}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Upcoming Sites */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Sites</h3>
            <button className="btn btn-secondary btn-sm">
              <Calendar size={16} />
              Calendar
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Site Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingSites.map((site, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 600 }}>{site.name}</td>
                  <td>{site.location}</td>
                  <td>{new Date(site.date).toLocaleDateString('en-GB')}</td>
                  <td>
                    <span className={`badge badge-${site.status === 'Active' ? 'success' : 'warning'}`}>
                      {site.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
