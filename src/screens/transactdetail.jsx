import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function TransactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();

  const transaction = transactions.find((tx) => tx.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(transaction?.description || '');
  const [amount, setAmount] = useState(transaction?.amount ? (transaction.amount / (transaction.quantity || 1)).toString() : '');
  const [quantity, setQuantity] = useState(transaction?.quantity?.toString() || '1');
  const [type, setType] = useState(transaction?.type || 'expense');
  const [category, setCategory] = useState(transaction?.category || '');

  if (!transaction) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-gray-500 mb-4">Transaction not found.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity || 1);
    const calculatedAmount = parseFloat(amount) * qty;

    updateTransaction(id, {
      description,
      amount: calculatedAmount,
      quantity: qty,
      type,
      category,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTransaction(id);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {isEditing ? 'Edit Transaction' : 'Transaction Details'}
        </h2>
        <button 
          onClick={() => navigate('/')}
          className="text-sm text-blue-500 hover:underline"
        >
          ← Back
        </button>
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Description</span>
            <p className="text-lg font-medium text-gray-800">{transaction.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Total Amount</span>
              <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Quantity & Unit</span>
              <p className="text-lg font-medium text-gray-700">
                {transaction.quantity || 1} {transaction.quantity > 1 && <span className="text-xs text-gray-400">(₱{(transaction.amount / transaction.quantity).toFixed(2)} each)</span>}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Type</span>
              <span className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium mt-1 ${transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {transaction.type.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Category</span>
              <span className="inline-block px-2.5 py-1 text-xs bg-gray-200 text-gray-700 rounded-full font-medium mt-1">
                {transaction.category}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Date Logged</span>
            <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleString()}</p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl font-medium hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <input 
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Price per item (₱)</label>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace('-', ''))}
              required
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
            <input 
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value.replace('-', ''))}
              required
              min="1"
              className="w-full p-3 border border-gray-200 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <input 
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-xl bg-white"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}