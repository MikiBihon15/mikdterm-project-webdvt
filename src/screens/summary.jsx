import { useMemo } from 'react';
import useTransactions from '../hooks/useTransac';

export default function Summary() {
  const { transactions } = useTransactions();

  const summaryData = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else if (tx.type === 'expense') {
        totalExpense += tx.amount;
        
        if (!categoryTotals[tx.category]) {
          categoryTotals[tx.category] = 0;
        }
        categoryTotals[tx.category] += tx.amount;
      }
    });

    const netBalance = totalIncome - totalExpense;
    const categories = Object.keys(categoryTotals);

    return { totalIncome, totalExpense, netBalance, categoryTotals, categories };
  }, [transactions]);

  const { totalIncome, totalExpense, netBalance, categoryTotals, categories } = summaryData;

  const formatMoney = (amount) => {
    return amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">
        Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Income</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">₱{formatMoney(totalIncome)}</p>
        </div>
        <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">₱{formatMoney(totalExpense)}</p>
        </div>
        <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Balance</p>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-gray-800 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
            ₱{formatMoney(netBalance)}
          </p>
        </div>
      </div>

      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Expense Breakdown</h3>

        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm">No expense data available.</p>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => {
              const amount = categoryTotals[cat];
              
              let percentage = 0;
              if (totalExpense > 0) {
                percentage = (amount / totalExpense) * 100;
              }

              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{cat}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-semibold">
                      ₱{formatMoney(amount)} <span className="text-xs text-gray-400 font-normal">({percentage.toFixed(1)}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}