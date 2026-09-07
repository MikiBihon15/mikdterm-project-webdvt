import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './screens/dashboard';
import AddTransactions from './screens/Addtransactions';
import Summary from './screens/summary';
import TransactDetail from './screens/transactdetail';
import { useTheme } from './global-state/ThemeContext';

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-10 px-4">
      
      {/* Navigation Bar with Theme Toggle */}
      <nav className="max-w-3xl mx-auto mb-6 flex justify-between items-center px-6">
        <div className="flex gap-6 font-medium text-blue-600 dark:text-blue-400">
          <Link to="/" className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Dashboard</Link>
          <Link to="/add" className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Add</Link>
          <Link to="/summary" className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Summary</Link>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl text-sm font-medium transition-colors"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 w-full transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransactions />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/transaction/:id" element={<TransactDetail />} />
        </Routes>
      </main>

    </div>
  );
}