import { Plus, Search, Filter, Activity, Clock, CheckCircle, XCircle } from 'lucide-react';
import { OperationStatus } from '../../types';

function Operations() {
  const operations = [
    {
      id: '1',
      site: 'Riverside Construction',
      operationType: 'Asbestos Removal',
      description: 'Remove asbestos from ceiling tiles in Building A',
      startTime: '2024-02-15T08:00:00',
      endTime: '2024-02-15T16:30:00',
      duration: 510,
      workersCount: 6,
      status: OperationStatus.COMPLETED,
      recordedBy: 'John Smith'
    },
    {
      id: '2',
      site: 'City Center Renovation',
      operationType: 'Safety Inspection',
      description: 'Pre-work safety inspection and air quality testing',
      startTime: '2024-02-15T09:00:00',
      endTime: null,
      duration: null,
      workersCount: 3,
      status: OperationStatus.IN_PROGRESS,
      recordedBy: 'Sarah Johnson'
    },
    {
      id: '3',
      site: 'Industrial Park Site',
      operationType: 'Encapsulation',
      description: 'Encapsulate asbestos pipes in basement area',
      startTime: '2024-02-16T08:00:00',
      endTime: null,
      duration: null,
      workersCount: 4,
      status: OperationStatus.PLANNED,
      recordedBy: 'Mike Brown'
    },
    {
      id: '4',
      site: 'Riverside Construction',
      operationType: 'Air Monitoring',
      description: 'Post-removal air quality monitoring',
      startTime: '2024-02-15T14:00:00',
      endTime: null,
      duration: null,
      workersCount: 2,
      status: OperationStatus.IN_PROGRESS,
      recordedBy: 'Emma Davis'
    },
    {
      id: '5',
      site: 'Office Complex Removal',
      operationType: 'Documentation',
      description: 'Complete all certification and compliance paperwork',
      startTime: '2024-02-14T10:00:00',
      endTime: '2024-02-14T15:00:00',
      duration: 300,
      workersCount: 1,
      status: OperationStatus.COMPLETED,
      recordedBy: 'David Wilson'
    },
    {
      id: '6',
      site: 'Industrial Park Site',
      operationType: 'Equipment Setup',
      description: 'Set up containment area and decontamination unit',
      startTime: '2024-02-15T07:00:00',
      endTime: null,
      duration: null,
      workersCount: 5,
      status: OperationStatus.ON_HOLD,
      recordedBy: 'Mike Brown'
    },
  ];

  const getStatusBadge = (status: OperationStatus) => {
    const statusMap = {
      [OperationStatus.PLANNED]: 'info',
      [OperationStatus.IN_PROGRESS]: 'warning',
      [OperationStatus.COMPLETED]: 'success',
      [OperationStatus.ON_HOLD]: 'danger',
      [OperationStatus.CANCELLED]: 'secondary'
    };
    return statusMap[status] || 'secondary';
  };

  const getStatusIcon = (status: OperationStatus) => {
    switch (status) {
      case OperationStatus.COMPLETED:
        return CheckCircle;
      case OperationStatus.IN_PROGRESS:
        return Clock;
      case OperationStatus.ON_HOLD:
      case OperationStatus.CANCELLED:
        return XCircle;
      default:
        return Activity;
    }
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const stats = [
    { 
      label: 'Total Operations', 
      value: operations.length, 
      icon: Activity, 
      color: 'primary' 
    },
    { 
      label: 'In Progress', 
      value: operations.filter(o => o.status === OperationStatus.IN_PROGRESS).length, 
      icon: Clock, 
      color: 'warning' 
    },
    { 
      label: 'Completed Today', 
      value: operations.filter(o => o.status === OperationStatus.COMPLETED).length, 
      icon: CheckCircle, 
      color: 'success' 
    },
    { 
      label: 'Planned', 
      value: operations.filter(o => o.status === OperationStatus.PLANNED).length, 
      icon: Activity, 
      color: 'info' 
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Operations</h2>
        <p style={{ color: 'var(--gray-600)' }}>Track and manage site operations and activities</p>
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
                placeholder="Search operations..."
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
            Log New Operation
          </button>
        </div>
      </div>

      {/* Operations Table */}
      <div className="card">
        <div className="card-header">
          <h3>All Operations</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            {operations.length} operations found
          </span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Operation Type</th>
              <th>Site</th>
              <th>Description</th>
              <th>Status</th>
              <th>Workers</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Recorded By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => {
              const StatusIcon = getStatusIcon(operation.status);
              return (
                <tr key={operation.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className={`stat-icon ${getStatusBadge(operation.status)}`} style={{ width: '32px', height: '32px' }}>
                        <StatusIcon size={16} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{operation.operationType}</span>
                    </div>
                  </td>
                  <td>{operation.site}</td>
                  <td>
                    <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {operation.description}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${getStatusBadge(operation.status)}`}>
                      {operation.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{operation.workersCount}</td>
                  <td>{new Date(operation.startTime).toLocaleString('en-GB', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</td>
                  <td>{formatDuration(operation.duration)}</td>
                  <td>{operation.recordedBy}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm">View</button>
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

export default Operations;
