import { Link } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function Dashboard() {
  const { transactions, deleteTransaction } = useTransactions();

  const balance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      
      {/* total balan */}
      <div className="text-3xl font-bold text-gray-800 mb-8">
        Balance: ₱{balance.toFixed(2)}
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">Your transactions will appear here.</p>
      ) : (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 mb-2">Recent Transactions</h3>
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <p className="font-medium text-gray-800">{tx.description}</p>
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">{tx.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}₱{tx.amount.toFixed(2)}
                </span>
                <button 
                  onClick={() => deleteTransaction(tx.id)}
                  className="text-gray-400 hover:text-red-500 font-bold px-2 py-1 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}