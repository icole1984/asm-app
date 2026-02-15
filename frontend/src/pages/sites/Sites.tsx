import { Plus, Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import { SiteStatus } from '../../types';

function Sites() {
  const sites = [
    {
      id: '1',
      name: 'Riverside Construction',
      location: 'Manchester',
      address: '123 High Street',
      postcode: 'M1 1AA',
      startDate: '2024-01-15',
      endDate: '2024-04-30',
      status: SiteStatus.ACTIVE,
      manager: 'John Smith',
      workersCount: 12,
      operationsCount: 45,
      completionProgress: 65
    },
    {
      id: '2',
      name: 'City Center Renovation',
      location: 'Birmingham',
      address: '456 Market Street',
      postcode: 'B2 4BB',
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      status: SiteStatus.ACTIVE,
      manager: 'Sarah Johnson',
      workersCount: 18,
      operationsCount: 32,
      completionProgress: 45
    },
    {
      id: '3',
      name: 'Industrial Park Site',
      location: 'Leeds',
      address: '789 Industrial Estate',
      postcode: 'LS10 1XY',
      startDate: '2024-01-20',
      endDate: null,
      status: SiteStatus.PAUSED,
      manager: 'Mike Brown',
      workersCount: 8,
      operationsCount: 28,
      completionProgress: 30
    },
    {
      id: '4',
      name: 'School Refurbishment',
      location: 'Liverpool',
      address: '321 Education Road',
      postcode: 'L7 8AB',
      startDate: '2024-02-10',
      endDate: '2024-05-20',
      status: SiteStatus.PLANNING,
      manager: 'Emma Davis',
      workersCount: 0,
      operationsCount: 0,
      completionProgress: 0
    },
    {
      id: '5',
      name: 'Office Complex Removal',
      location: 'Manchester',
      address: '555 Business Park',
      postcode: 'M3 3CD',
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      status: SiteStatus.COMPLETED,
      manager: 'David Wilson',
      workersCount: 15,
      operationsCount: 78,
      completionProgress: 100
    },
  ];

  const getStatusBadge = (status: SiteStatus) => {
    const statusMap = {
      [SiteStatus.ACTIVE]: 'success',
      [SiteStatus.PLANNING]: 'info',
      [SiteStatus.PAUSED]: 'warning',
      [SiteStatus.COMPLETED]: 'primary',
      [SiteStatus.ARCHIVED]: 'secondary'
    };
    return statusMap[status] || 'secondary';
  };

  const stats = [
    { label: 'Total Sites', value: sites.length, icon: MapPin, color: 'primary' },
    { label: 'Active Sites', value: sites.filter(s => s.status === SiteStatus.ACTIVE).length, icon: MapPin, color: 'success' },
    { label: 'Planning', value: sites.filter(s => s.status === SiteStatus.PLANNING).length, icon: Calendar, color: 'info' },
    { label: 'Total Workers', value: sites.reduce((sum, s) => sum + s.workersCount, 0), icon: Users, color: 'warning' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Sites Management</h2>
        <p style={{ color: 'var(--gray-600)' }}>Manage and monitor all asbestos management sites</p>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search sites..."
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.875rem'
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            </div>
            <button className="btn btn-secondary">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add New Site
          </button>
        </div>
      </div>

      {/* Sites Table */}
      <div className="card">
        <div className="card-header">
          <h3>All Sites</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            {sites.length} sites found
          </span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Site Name</th>
              <th>Location</th>
              <th>Manager</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Workers</th>
              <th>Operations</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id}>
                <td>
                  <div>
                    <div style={{ fontWeight: 600 }}>{site.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>{site.postcode}</div>
                  </div>
                </td>
                <td>{site.location}</td>
                <td>{site.manager}</td>
                <td>
                  <span className={`badge badge-${getStatusBadge(site.status)}`}>
                    {site.status}
                  </span>
                </td>
                <td>
                  <div>
                    <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      {site.completionProgress}%
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${site.completionProgress === 100 ? 'success' : site.completionProgress > 50 ? '' : 'warning'}`}
                        style={{ width: `${site.completionProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>{site.workersCount}</td>
                <td>{site.operationsCount}</td>
                <td>{new Date(site.startDate).toLocaleDateString('en-GB')}</td>
                <td>
                  <button className="btn btn-secondary btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sites;
