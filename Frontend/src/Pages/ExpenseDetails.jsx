function ExpenseDetails({ incomeAmt, expenseAmt }) {
  const balance = incomeAmt - expenseAmt;

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-4 space-y-2 text-sm font-medium mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Summary</h2>

      <div className="flex justify-between items-center">
        <span className="text-blue-600">Total Income:</span>
        <span className="font-semibold text-blue-700">₹{incomeAmt.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-pink-600">Total Expense:</span>
        <span className="font-semibold text-pink-600">₹{expenseAmt.toFixed(2)}</span>
      </div>

      <div
        className="flex justify-between items-center border-t pt-2"
        style={{
          borderImageSlice: 1,
          borderWidth: '2px 0 0 0',
          borderImageSource:
            'linear-gradient(to right, #2563EB, #8B5CF6, #EC4899)', // blue → purple → pink
          borderStyle: 'solid',
        }}
      >
        <span className="text-gray-700">Balance:</span>
        <span
          className={`font-semibold ${
            balance >= 0
              ? 'text-blue-700'
              : 'text-pink-700'
          }`}
        >
          ₹{balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default ExpenseDetails;