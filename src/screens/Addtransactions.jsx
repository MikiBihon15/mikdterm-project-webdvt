import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function AddTransactions() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const [description, setDescription] = useState('');
  const [hasMultiple, setHasMultiple] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalQuantity = hasMultiple ? parseInt(quantity) : 1;
    const finalAmount = parseFloat(price) * finalQuantity;

    addTransaction({
      description,
      amount: finalAmount,
      quantity: finalQuantity,
      type,
      category,
      date: new Date().toISOString()
    });

    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description(General or Specific)</label>
          <input 
            type="text" 
            placeholder="e.g., Grocery or Eggs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="multiple"
            checked={hasMultiple}
            onChange={(e) => setHasMultiple(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="multiple" className="text-sm text-gray-700 dark:text-gray-200">
            Edit quantity
          </label>
        </div>

        {hasMultiple && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Quantity</label>
            <input 
              type="number" 
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value.replace(/\./g, ''))}
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Price per item (₱)</label>
          <input 
            type="number" 
            step="0.01"
            min="0"
            placeholder="₱ 0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex gap-4 items-center py-2">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input 
              type="radio" 
              name="type" 
              value="expense" 
              checked={type === 'expense'} 
              onChange={() => setType('expense')} 
            /> 
            Expense
          </label>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input 
              type="radio" 
              name="type" 
              value="income" 
              checked={type === 'income'} 
              onChange={() => setType('income')} 
            /> 
            Income
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="" disabled>Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors mt-4">
          Save Transaction
        </button>
      </form>
    </div>
  );
}