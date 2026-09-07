import { useState, useEffect } from 'react';

export default function useTransac() {
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('budget_transactions');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('budget_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    const transactionWithId = { ...newTransaction, id: Date.now().toString() };
    setTransactions([...transactions, transactionWithId]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return { 
    transactions, 
    addTransaction, 
    deleteTransaction 
  };
}