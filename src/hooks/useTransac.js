import { useState, useEffect } from 'react';

export default function useTransac() {
  // 1. INITIALIZE DATA: When the app loads, check the browser's memory (localStorage)
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('budget_transactions');
    // If there is saved data, parse it back into a JavaScript array. Otherwise, start empty [].
    return savedData ? JSON.parse(savedData) : [];
  });

  // 2. AUTO-SAVE: The useEffect hook watches for changes. 
  // Whenever the 'transactions' array updates, it automatically saves to the browser.
  useEffect(() => {
    localStorage.setItem('budget_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 3. ACTION: Add a new transaction
  const addTransaction = (newTransaction) => {
    // We add a unique ID using the current time so we can find it later (like for deleting)
    const transactionWithId = { ...newTransaction, id: Date.now().toString() };
    setTransactions([...transactions, transactionWithId]);
  };

  // 4. ACTION: Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // 5. EXPORT: Make these available to any screen that calls this hook
  return { 
    transactions, 
    addTransaction, 
    deleteTransaction 
  };
}