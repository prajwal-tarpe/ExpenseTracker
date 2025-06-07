import React, { useState } from 'react';

const TransactionFilter = ({ onFilterChange }) => {
  const [active, setActive] = useState('all');

  const handleClick = (type) => {
    setActive(type);
    onFilterChange(type);
  };

  const options = ['all', 'income', 'expense'];

  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1 text-sm font-medium shadow-sm">
      {options.map((type) => (
        <button
          key={type}
          onClick={() => handleClick(type)}
          className={`px-3 py-1 rounded-md transition-all duration-150 capitalize ${
            active === type
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TransactionFilter;
