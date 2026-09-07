import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function AddTransactions() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [error, setError] = useState('');
  const [isMultiple, setIsMultiple] = useState(false);
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !category || (category === 'other' && !otherCategory)) {
      setError('Please fill out all required fields.');
      return;
    }

    const finalCategory = category === 'other' ? otherCategory : category;
    const qty = isMultiple ? parseInt(quantity || 1) : 1;
    const calculatedAmount = parseFloat(amount) * qty;

    addTransaction({
      description,
      amount: calculatedAmount,
      quantity: qty,
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Eggs"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        {/* Checkbox right below Description */}
        <div className="flex items-center gap-2 pt-1">
          <input 
            type="checkbox" 
            id="multipleCheck"
            checked={isMultiple}
            onChange={(e) => {
              setIsMultiple(e.target.checked);
              if (!e.target.checked) setQuantity('1');
            }}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="multipleCheck" className="text-sm font-medium text-gray-700 cursor-pointer">
            Buy more than 1 quantity?
          </label>
        </div>

        {/* Quantity Input */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isMultiple ? 'text-gray-600' : 'text-gray-400'}`}>
            Quantity
          </label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value.replace('-', ''))}
            disabled={!isMultiple}
            placeholder="1" 
            min="1"
            className={`w-full p-3 border rounded-xl focus:outline-none transition-colors ${
              isMultiple 
                ? 'border-gray-200 bg-white focus:border-blue-500 text-gray-900' 
                : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Price per item (₱)</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400">₱</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace('-', ''))}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full p-3 pl-8 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-1">
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
            <label className="block text-sm font-medium text-gray-600 mb-1">Specify Category</label>
            <input 
              type="text"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              placeholder="e.g., Computer Parts"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
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