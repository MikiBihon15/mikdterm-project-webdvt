import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function TransactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();

  const transaction = transactions.find((tx) => tx.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(transaction ? transaction.description : '');
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [category, setCategory] = useState(transaction ? transaction.category : '');

  if (!transaction) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p>Transaction not found.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back to Dashboard</Link>
      </div>
    );
  }

  const formatMoney = (val) => {
    return Number(val).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const handleDelete = () => {
    deleteTransaction(id);
    navigate('/');
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateTransaction(id, {
      ...transaction,
      description,
      amount: parseFloat(amount),
      category
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditing ? 'Edit Transaction' : 'Transaction Details'}
        </h2>
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">← Back</Link>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Total Amount (₱)</label>
            <input 
              type="number" 
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-lg">
          <p>
            <span className="font-semibold mr-2">Description:</span> 
            {transaction.description}
          </p>
          
          <p>
            <span className="font-semibold mr-2">Amount:</span> 
            <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {transaction.type === 'income' ? '+' : '-'}₱{formatMoney(transaction.amount)}
            </span>
          </p>
          
          {transaction.quantity > 1 && (
            <p>
              <span className="font-semibold mr-2">Quantity:</span> 
              {transaction.quantity}
            </p>
          )}
          
          <p>
            <span className="font-semibold mr-2">Category:</span> 
            {transaction.category}
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Logged on: {new Date(transaction.date).toLocaleString()}
          </p>

          <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button 
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
            >
              Delete
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}