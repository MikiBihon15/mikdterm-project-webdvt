import { Link } from 'react-router-dom';
import useTransactions from '../hooks/useTransac';

export default function Dashboard() {
  const { transactions } = useTransactions();

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

      <p className="text-gray-500">Your transactions will appear here.</p>
    </div>
  );
}