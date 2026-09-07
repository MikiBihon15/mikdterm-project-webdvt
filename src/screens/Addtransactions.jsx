import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function Addtransactions() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState(''); 
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!description || !amount || !category || (category === 'other' && !otherCategory)) {
      setError('Please fill out all required fields.');
      return;
    }

    const finalCategory = category === 'other' ? otherCategory : category;

    addTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category: finalCategory,
      date: new Date().toISOString()
    });

    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Transaction</h2>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Groceries" 
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Amount (₱)</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400">₱</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace('-', ''))}
              placeholder="0.00" 
              min="0"
              step="0.01"
              className="w-full p-3 pl-8 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              value="expense" 
              checked={type === 'expense'} 
              onChange={(e) => setType(e.target.value)}
              className="accent-blue-500"
            />
            <span className="text-sm text-gray-700">Expense</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              value="income" 
              checked={type === 'income'} 
              onChange={(e) => setType(e.target.value)}
              className="accent-blue-500"
            />
            <span className="text-sm text-gray-700">Income</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
          >
            <option value="" disabled>Select a category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary / Allowance</option>
            <option value="other">Other(specify)</option>
          </select>
        </div>

        {category === 'other' && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">Please specify</label>
            <input 
              type="text" 
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              placeholder="e.g., Computer Parts" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        )}

        <button 
          type="submit" 
          className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}