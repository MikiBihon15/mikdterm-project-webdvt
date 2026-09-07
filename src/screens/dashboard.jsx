import { Link } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function Dashboard() {
  const { transactions, deleteTransaction } = useTransactions();

  let balance = 0;
  transactions.forEach((tx) => {
    if (tx.type === 'income') {
      balance += tx.amount;
    } else {
      balance -= tx.amount;
    }
  });

  const formatMoney = (amount) => {
    return amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Dashboard</h2>

      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Balance: ₱{formatMoney(balance)}
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You have no transactions</p>
      ) : (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Recent Transactions</h3>
          {transactions.map((tx) => (
            <Link key={tx.id} to={`/transaction/${tx.id}`} className="block transition-transform hover:scale-[1.01]">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {tx.description} {tx.quantity > 1 && <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">(x{tx.quantity})</span>}
                  </p>
                  <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">{tx.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`font-bold block ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {tx.type === 'income' ? '+' : '-'}₱{formatMoney(tx.amount)}
                    </span>
                    {tx.quantity > 1 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ₱{formatMoney(tx.amount / tx.quantity)} each
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      deleteTransaction(tx.id);
                    }}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-bold px-2 py-1 transition-colors"
                    title="Delete transaction"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}