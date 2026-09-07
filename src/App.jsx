import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './screens/dashboard';
import Addtransactions from './screens/Addtransactions';
import Summary from './screens/summary';
import TransactDetail from './screens/transactdetail';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* Navigation Links */}
      <nav className="max-w-3xl mx-auto flex justify-end gap-6 mb-8 pr-4 font-medium text-blue-600">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/add" className="hover:underline">Add</Link>
        <Link to="/summary" className="hover:underline">Summary</Link>
      </nav>

      {/* Main Container Card */}
      <main className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<Addtransactions />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/transaction/:id" element={<TransactDetail />} />
        </Routes>
      </main>
    </div>
  );
}