import { Plus, Search, Filter, CheckSquare, Clock, CheckCircle } from 'lucide-react';
import { ChecklistStatus } from '../../types';

function Checklists() {
  const checklists = [
    {
      id: '1',
      name: 'Pre-Work Safety Check',
      site: 'Riverside Construction',
      status: ChecklistStatus.COMPLETED,
      totalItems: 12,
      completedItems: 12,
      createdAt: '2024-02-15T08:00:00',
      updatedAt: '2024-02-15T08:30:00'
    },
    {
      id: '2',
      name: 'Equipment Inspection',
      site: 'City Center Renovation',
      status: ChecklistStatus.IN_PROGRESS,
      totalItems: 15,
      completedItems: 9,
      createdAt: '2024-02-15T09:00:00',
      updatedAt: '2024-02-15T11:45:00'
    },
    {
      id: '3',
      name: 'Site Decommissioning',
      site: 'Office Complex Removal',
      status: ChecklistStatus.COMPLETED,
      totalItems: 20,
      completedItems: 20,
      createdAt: '2024-02-14T10:00:00',
      updatedAt: '2024-02-14T16:00:00'
    },
    {
      id: '4',
      name: 'Weekly Safety Audit',
      site: 'Industrial Park Site',
      status: ChecklistStatus.PENDING,
      totalItems: 18,
      completedItems: 0,
      createdAt: '2024-02-15T07:00:00',
      updatedAt: '2024-02-15T07:00:00'
    },
    {
      id: '5',
      name: 'Air Quality Monitoring',
      site: 'Riverside Construction',
      status: ChecklistStatus.IN_PROGRESS,
      totalItems: 8,
      completedItems: 5,
      createdAt: '2024-02-15T10:00:00',
      updatedAt: '2024-02-15T12:30:00'
    },
    {
      id: '6',
      name: 'PPE Compliance Check',
      site: 'City Center Renovation',
      status: ChecklistStatus.COMPLETED,
      totalItems: 10,
      completedItems: 10,
      createdAt: '2024-02-14T08:00:00',
      updatedAt: '2024-02-14T09:00:00'
    },
  ];

  const checklistItems: Record<string, Array<{ id: string; description: string; completed: boolean }>> = {
    '1': [
      { id: 'i1', description: 'Verify all workers have valid licenses', completed: true },
      { id: 'i2', description: 'Check PPE equipment availability', completed: true },
      { id: 'i3', description: 'Inspect containment area setup', completed: true },
      { id: 'i4', description: 'Test decontamination unit', completed: true },
      { id: 'i5', description: 'Verify emergency procedures', completed: true },
    ],
    '2': [
      { id: 'i6', description: 'Inspect negative air machines', completed: true },
      { id: 'i7', description: 'Check HEPA filter status', completed: true },
      { id: 'i8', description: 'Verify air monitoring equipment', completed: true },
      { id: 'i9', description: 'Test emergency shut-off systems', completed: false },
      { id: 'i10', description: 'Inspect personal air samplers', completed: false },
    ]
  };

  const getStatusBadge = (status: ChecklistStatus) => {
    const statusMap = {
      [ChecklistStatus.PENDING]: 'info',
      [ChecklistStatus.IN_PROGRESS]: 'warning',
      [ChecklistStatus.COMPLETED]: 'success'
    };
    return statusMap[status] || 'secondary';
  };

  const getStatusIcon = (status: ChecklistStatus) => {
    switch (status) {
      case ChecklistStatus.COMPLETED:
        return CheckCircle;
      case ChecklistStatus.IN_PROGRESS:
        return Clock;
      default:
        return CheckSquare;
    }
  };

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const stats = [
    { 
      label: 'Total Checklists', 
      value: checklists.length, 
      icon: CheckSquare, 
      color: 'primary' 
    },
    { 
      label: 'In Progress', 
      value: checklists.filter(c => c.status === ChecklistStatus.IN_PROGRESS).length, 
      icon: Clock, 
      color: 'warning' 
    },
    { 
      label: 'Completed', 
      value: checklists.filter(c => c.status === ChecklistStatus.COMPLETED).length, 
      icon: CheckCircle, 
      color: 'success' 
    },
    { 
      label: 'Pending', 
      value: checklists.filter(c => c.status === ChecklistStatus.PENDING).length, 
      icon: CheckSquare, 
      color: 'info' 
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Checklists</h2>
        <p style={{ color: 'var(--gray-600)' }}>Manage safety checklists and compliance checks</p>
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
                placeholder="Search checklists..."
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
            Create Checklist
          </button>
        </div>
      </div>

      {/* Checklists Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {checklists.map((checklist) => {
          const StatusIcon = getStatusIcon(checklist.status);
          const progress = calculateProgress(checklist.completedItems, checklist.totalItems);
          
          return (
            <div key={checklist.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {checklist.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    {checklist.site}
                  </p>
                </div>
                <div className={`stat-icon ${getStatusBadge(checklist.status)}`} style={{ width: '40px', height: '40px' }}>
                  <StatusIcon size={20} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    Progress: {checklist.completedItems}/{checklist.totalItems}
                  </span>
                  <span className={`badge badge-${getStatusBadge(checklist.status)}`}>
                    {checklist.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${progress === 100 ? 'success' : progress > 50 ? '' : 'warning'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>
                  {progress}% complete
                </div>
              </div>

              {checklistItems[checklist.id] && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Items:</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {checklistItems[checklist.id].slice(0, 3).map((item) => (
                      <li key={item.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--gray-200)',
                        fontSize: '0.875rem'
                      }}>
                        <input 
                          type="checkbox" 
                          checked={item.completed} 
                          readOnly 
                          style={{ width: '16px', height: '16px' }}
                        />
                        <span style={{ 
                          textDecoration: item.completed ? 'line-through' : 'none',
                          color: item.completed ? 'var(--gray-500)' : 'inherit'
                        }}>
                          {item.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {checklistItems[checklist.id].length > 3 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginTop: '0.5rem' }}>
                      +{checklistItems[checklist.id].length - 3} more items
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                <span>Created: {new Date(checklist.createdAt).toLocaleDateString('en-GB')}</span>
                <button className="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Table */}
      <div className="card">
        <div className="card-header">
          <h3>Checklist Summary</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Checklist Name</th>
              <th>Site</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Items</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {checklists.map((checklist) => {
              const progress = calculateProgress(checklist.completedItems, checklist.totalItems);
              return (
                <tr key={checklist.id}>
                  <td style={{ fontWeight: 600 }}>{checklist.name}</td>
                  <td>{checklist.site}</td>
                  <td>
                    <span className={`badge badge-${getStatusBadge(checklist.status)}`}>
                      {checklist.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${progress === 100 ? 'success' : progress > 50 ? '' : 'warning'}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {progress}%
                      </div>
                    </div>
                  </td>
                  <td>{checklist.completedItems}/{checklist.totalItems}</td>
                  <td>{new Date(checklist.updatedAt).toLocaleString('en-GB', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Checklists;
