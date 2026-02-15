import { Plus, Search, Filter, FileText, Image, FileSpreadsheet, Download, Eye } from 'lucide-react';
import { DocumentType } from '../../types';

function Documents() {
  const documents = [
    {
      id: '1',
      fileName: 'Safety_Certificate_Site12.pdf',
      docType: DocumentType.CERTIFICATE,
      site: 'Riverside Construction',
      uploadedBy: 'John Smith',
      fileSize: 2458000,
      createdAt: '2024-02-15T10:30:00',
      fileType: 'application/pdf'
    },
    {
      id: '2',
      fileName: 'Asbestos_Survey_Report.pdf',
      docType: DocumentType.REPORT,
      site: 'City Center Renovation',
      uploadedBy: 'Sarah Johnson',
      fileSize: 5842000,
      createdAt: '2024-02-15T09:15:00',
      fileType: 'application/pdf'
    },
    {
      id: '3',
      fileName: 'Site_Photo_BuildingA.jpg',
      docType: DocumentType.PHOTO,
      site: 'Riverside Construction',
      uploadedBy: 'Mike Brown',
      fileSize: 3120000,
      createdAt: '2024-02-15T08:45:00',
      fileType: 'image/jpeg'
    },
    {
      id: '4',
      fileName: 'Safety_Plan_2024.pdf',
      docType: DocumentType.SAFETY_PLAN,
      site: 'Industrial Park Site',
      uploadedBy: 'Emma Davis',
      fileSize: 4256000,
      createdAt: '2024-02-14T16:20:00',
      fileType: 'application/pdf'
    },
    {
      id: '5',
      fileName: 'Removal_Checklist.pdf',
      docType: DocumentType.FORM,
      site: 'Office Complex Removal',
      uploadedBy: 'David Wilson',
      fileSize: 1024000,
      createdAt: '2024-02-14T14:00:00',
      fileType: 'application/pdf'
    },
    {
      id: '6',
      fileName: 'Air_Quality_Results.xlsx',
      docType: DocumentType.REPORT,
      site: 'Riverside Construction',
      uploadedBy: 'John Smith',
      fileSize: 856000,
      createdAt: '2024-02-14T11:30:00',
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
  ];

  const getDocTypeIcon = (type: DocumentType) => {
    switch (type) {
      case DocumentType.PHOTO:
        return Image;
      case DocumentType.REPORT:
      case DocumentType.FORM:
        return FileSpreadsheet;
      default:
        return FileText;
    }
  };

  const getDocTypeBadge = (type: DocumentType) => {
    const typeMap = {
      [DocumentType.FORM]: 'info',
      [DocumentType.PHOTO]: 'success',
      [DocumentType.REPORT]: 'primary',
      [DocumentType.CERTIFICATE]: 'warning',
      [DocumentType.SAFETY_PLAN]: 'danger',
      [DocumentType.OTHER]: 'secondary'
    };
    return typeMap[type] || 'secondary';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const stats = [
    { label: 'Total Documents', value: documents.length, icon: FileText, color: 'primary' },
    { label: 'Reports', value: documents.filter(d => d.docType === DocumentType.REPORT).length, icon: FileSpreadsheet, color: 'info' },
    { label: 'Certificates', value: documents.filter(d => d.docType === DocumentType.CERTIFICATE).length, icon: FileText, color: 'warning' },
    { label: 'Photos', value: documents.filter(d => d.docType === DocumentType.PHOTO).length, icon: Image, color: 'success' },
  ];

  const documentsByType = [
    { type: 'Forms', count: documents.filter(d => d.docType === DocumentType.FORM).length },
    { type: 'Photos', count: documents.filter(d => d.docType === DocumentType.PHOTO).length },
    { type: 'Reports', count: documents.filter(d => d.docType === DocumentType.REPORT).length },
    { type: 'Certificates', count: documents.filter(d => d.docType === DocumentType.CERTIFICATE).length },
    { type: 'Safety Plans', count: documents.filter(d => d.docType === DocumentType.SAFETY_PLAN).length },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Documents</h2>
        <p style={{ color: 'var(--gray-600)' }}>Manage site documents, reports, and certificates</p>
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

      {/* Document Types Overview */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h3>Document Categories</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', padding: '1rem 0' }}>
          {documentsByType.map((item, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{item.count}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>{item.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search documents..."
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
            Upload Document
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card">
        <div className="card-header">
          <h3>All Documents</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            {documents.length} documents found
          </span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Site</th>
              <th>Size</th>
              <th>Uploaded By</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const DocIcon = getDocTypeIcon(doc.docType);
              return (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className={`stat-icon ${getDocTypeBadge(doc.docType)}`} style={{ width: '36px', height: '36px' }}>
                        <DocIcon size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{doc.fileName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                          {doc.fileType.split('/')[1].toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${getDocTypeBadge(doc.docType)}`}>
                      {doc.docType.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{doc.site}</td>
                  <td>{formatFileSize(doc.fileSize)}</td>
                  <td>{doc.uploadedBy}</td>
                  <td>{new Date(doc.createdAt).toLocaleDateString('en-GB', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary btn-sm">
                        <Eye size={14} />
                      </button>
                      <button className="btn btn-primary btn-sm">
                        <Download size={14} />
                      </button>
                    </div>
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

export default Documents;
