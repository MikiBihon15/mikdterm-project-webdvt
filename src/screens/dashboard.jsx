import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function Dashboard() {
  const { transactions } = useTransactions();
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const balance = useMemo(() => {
    let total = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        total += tx.amount;
      } else {
        total -= tx.amount;
      }
    });
    return total;
  }, [transactions]);

  const formatMoney = (amount) => {
    return amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
      return matchesType && matchesCategory;
    });
  }, [transactions, typeFilter, categoryFilter]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Dashboard</h2>

      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Balance: ₱{formatMoney(balance)}
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No active transactions</p>
      ) : (
        <div className="space-y-3">
          
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Recent Transactions</h3>
            
            <div className="flex gap-2">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expense Only</option>
              </select>

              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Salary">Salary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No transactions</p>
          ) : (
            filteredTransactions.map((tx) => (
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
                    <span className="text-gray-400 dark:text-gray-500 font-semibold text-lg px-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}