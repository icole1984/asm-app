import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Sites from './pages/sites/Sites';
import Operations from './pages/operations/Operations';
import Documents from './pages/documents/Documents';
import Checklists from './pages/checklists/Checklists';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/checklists" element={<Checklists />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
