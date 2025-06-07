import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addExpenses }) {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: '',
    description: '',
    category: '',
    type: 'expense'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpenses = (e) => {
    e.preventDefault();
    const { amount, description, category } = expenseInfo;
    if (!amount || !description || !category) {
      handleError('All fields are required');
      return;
    }
    addExpenses(expenseInfo);
    setExpenseInfo({
      amount: '',
      description: '',
      category: '',
      type: 'income'
    });
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow p-4 space-y-4 text-sm font-medium">
      <h2 className="text-lg font-semibold text-gray-800">
        Add New {expenseInfo.type === 'income' ? 'Income' : 'Expense'}
      </h2>

      <div className="relative flex w-48 bg-gray-200 rounded-lg p-1">
        <button
          type="button"
          className={`w-1/2 py-1 rounded-md transition-all duration-300 ${expenseInfo.type === 'income' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          onClick={() => setExpenseInfo((prev) => ({ ...prev, type: 'income' }))}
        >
          Income
        </button>
        <button
          type="button"
          className={`w-1/2 py-1 rounded-md transition-all duration-300 ${expenseInfo.type === 'expense' ? 'bg-white shadow text-red-600' : 'text-gray-500'}`}
          onClick={() => setExpenseInfo((prev) => ({ ...prev, type: 'expense' }))}
        >
          Expense
        </button>
      </div>

      <form onSubmit={handleExpenses} className="space-y-3">
        <input
          type="number"
          name="amount"
          value={expenseInfo.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="description"
          value={expenseInfo.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="category"
          value={expenseInfo.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add {expenseInfo.type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
