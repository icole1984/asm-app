import { Bell, Search } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2>ASM Dashboard</h2>
        <p>{new Date().toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>
      <div className="header-right">
        <button className="btn btn-secondary btn-sm">
          <Search size={16} />
          Search
        </button>
        <button className="btn btn-secondary btn-sm">
          <Bell size={16} />
          <span className="badge badge-danger" style={{ marginLeft: '-0.5rem', padding: '0.125rem 0.375rem' }}>3</span>
        </button>
        <div className="user-info">
          <div className="user-avatar">JD</div>
          <div className="user-details">
            <h4>John Doe</h4>
            <p>Site Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
