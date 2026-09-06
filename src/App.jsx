import { Routes, Route, Link } from 'react-router-dom';

// Updated imports to match your exact file and folder names
import Dashboard from './screens/dashboard';
import Addtransactions from './screens/Addtransactions';
import Transactdetail from './screens/transactdetail';
import Summary from './screens/summary';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm p-4 flex gap-6 justify-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">Dashboard</Link>
        <Link to="/add" className="text-blue-500 hover:text-blue-700 font-medium">Add</Link>
        <Link to="/summary" className="text-blue-500 hover:text-blue-700 font-medium">Summary</Link>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<Addtransactions />} />
          <Route path="/transaction/:id" element={<Transactdetail />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;