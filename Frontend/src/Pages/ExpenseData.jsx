import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";

function ExpenseData({ expenses, handleDeleteExpense }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {expenses.map((expense) => (
        
        <div
        key={expense._id}
        className={`
            relative rounded-lg p-5 border 
            ${expense.type === 'income' 
            ? 'bg-white border border-gray-300' 
            : 'bg-red-50 border-dashed border-red-200'}
            shadow-md transition-shadow duration-300
        `}
        >

          {/* Delete Button (Top Right) */}
          <button
            onClick={() => handleDeleteExpense(expense._id)}
            className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-full transition cursor-pointer"
            title="Delete"
          >
            <TiDeleteOutline />
          </button>

          {/* Amount */}
          <p className="text-2xl font-bold text-gray-800 mb-1">
            ₹{Math.abs(expense.amount).toFixed(2)}
          </p>

          {/* Category */}
          <p className="text-blue-600 font-semibold mb-2">
            {expense.category || 'Uncategorized'}
          </p>

          {/* Date and Description */}
          <div className="text-sm text-gray-600 flex flex-col">
            <div className="mb-1">
              {expense.createdAt ? new Date(expense.createdAt).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-xs text-gray-500">
              {expense.description || 'No Description'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseData;
