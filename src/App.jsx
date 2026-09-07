import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './screens/dashboard';
import AddTransactions from './screens/Addtransactions';
import Summary from './screens/summary';
import TransactDetail from './screens/transactdetail';
import { ThemeProvider, useTheme } from './global-state/ThemeContext';

function NavBar() {
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center py-4 mb-6 relative">
      <div className="hidden md:flex gap-6 font-medium">
        <Link 
          to="/" 
          className={`transition-colors ${isActive('/') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/add" 
          className={`transition-colors ${isActive('/add') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'}`}
        >
          Add
        </Link>
        <Link 
          to="/summary" 
          className={`transition-colors ${isActive('/summary') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'}`}
        >
          Summary
        </Link>
      </div>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="Toggle Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-medium transition-colors"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl p-4 flex flex-col gap-3 md:hidden z-50">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={`p-2 rounded-lg transition-colors ${isActive('/') ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-200'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/add" 
            onClick={() => setMobileMenuOpen(false)}
            className={`p-2 rounded-lg transition-colors ${isActive('/add') ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-200'}`}
          >
            Add Transaction
          </Link>
          <Link 
            to="/summary" 
            onClick={() => setMobileMenuOpen(false)}
            className={`p-2 rounded-lg transition-colors ${isActive('/summary') ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-200'}`}
          >
            Summary
          </Link>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-10 transition-colors">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 transition-colors">
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransactions />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/transaction/:id" element={<TransactDetail />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}