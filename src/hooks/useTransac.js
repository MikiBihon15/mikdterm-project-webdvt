import { useState, useEffect } from 'react';

export default function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTx) => {
    const txWithId = { ...newTx, id: Date.now().toString() };
    setTransactions((prev) => [txWithId, ...prev]);
  };

  const updateTransaction = (id, updatedFields) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedFields } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return { transactions, addTransaction, updateTransaction, deleteTransaction };
}