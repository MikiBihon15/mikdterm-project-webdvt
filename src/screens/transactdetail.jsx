import { useParams, useNavigate, Link } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function TransactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, deleteTransaction } = useTransactions();

  const transaction = transactions.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <p>Transaction not found.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back to Dashboard</Link>
      </div>
    );
  }

  const formatMoney = (amount) => {
    return amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const handleDelete = () => {
    deleteTransaction(id);
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Simple Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Transaction Details</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">← Back</Link>
      </div>

      {/* Simple Text Layout */}
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
        
        <p>
          <span className="font-semibold mr-2">Quantity:</span> 
          {transaction.quantity}
        </p>
        
        <p>
          <span className="font-semibold mr-2">Type:</span> 
          {transaction.type === 'income' ? 'Income' : 'Expense'}
        </p>
        
        <p>
          <span className="font-semibold mr-2">Category:</span> 
          {transaction.category}
        </p>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Logged on: {new Date(transaction.date).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
        >
          Delete
        </button>
        <button 
          onClick={() => alert("Edit feature coming soon!")}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
}