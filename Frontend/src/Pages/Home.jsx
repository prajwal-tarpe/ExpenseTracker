import React, { useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm';
import {useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';
import ExpenseData from './ExpenseData';
import ExpenseDetails from './ExpenseDetails';
import TransactionFilter from './TransactionFilter';

function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [filteredExpense,setFilteredExpense] = useState([]);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [incomeAmt, setIncomeAmt] = useState(0);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[]);

  useEffect(() => {
    const totalIncome = expenses
  .filter(exp => exp.type === 'income')
  .reduce((sum, exp) => sum + Number(exp.amount), 0);
  setIncomeAmt(totalIncome);

    const totalExpense = expenses
  .filter(exp => exp.type === 'expense')
  .reduce((sum, exp) => sum + Number(exp.amount), 0);
  setExpenseAmt(totalExpense);

  },[expenses]);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('user Logged out');
    setTimeout(() => {
      navigate('/login');
    },1000);
  };

  const addExpenses = async (data) => {
    const token = localStorage.getItem('token');
    if(!token){
      handleError('Unauthorized Please Login...!');
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(
        'https://expense-tracker-api-beige.vercel.app/expenses',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      handleSuccess(response.data?.message);
      console.log('--result', response.data.data);
      setExpenses(response.data.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        handleError(error.response.data.message || 'Unauthorized');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
      } else {
        // Network or other error
        handleError('Failed to add expense');
        console.error(error);
    }
}
  };

  const fetchExpenses = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    handleError('Unauthorized. Please login.');
    navigate('/login');
    return;
  }

    try {
      const response = await axios.get('https://expense-tracker-api-beige.vercel.app/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,  
          'Content-Type': 'application/json',
        }
      });
      console.log("Expenses fetched:", response.data.data);
      setExpenses(response.data.data);
      setFilteredExpense(response.data.data);

    } catch (error) {
      // Axios error handling
      if (error.response) {
        // Server responded with a status outside 2xx
        handleError(error.response.data.message || 'Session expired');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
      } else {
        // Other errors (network, etc)
        handleError('Failed to fetch expenses');
        console.error(error);
      }
    }
  };

  const handleDeleteExpense = async (expenseId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    handleError('Unauthorized. Please login.');
    navigate('/login');
    return;
  }

  try {
    const response = await axios.delete(`https://expense-tracker-api-beige.vercel.app/expenses/${expenseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    handleSuccess(response.data?.message);
    console.log('--result', response.data.data);
    setExpenses(response.data.data); // Update the state with the remaining expenses
  } catch (error) {
    if (error.response) {
      handleError(error.response.data.message || 'Unauthorized');
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
      }
    } else {
      handleError('Failed to delete expense');
      console.error(error);
    }
  }
  };

  const handleFilterChange = (type) => {
  if (type === 'all') {
    setFilteredExpense(expenses);
  } else {
    const filtered = expenses.filter(exp => exp.type === type);
    setFilteredExpense(filtered);
  }
};

  useEffect(() => {
    fetchExpenses()
  },[]);

  return (
<div
      className="min-h-screen px-4 py-6"
      style={{
        background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
      }}
    >
      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-lg px-4 py-2 mb-8 flex items-center justify-between">
        <h1 className="text-base font-medium text-gray-800">
          Welcome, <span className="text-blue-600">{loggedInUser || 'User'}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
        CashClarity
      </h1>

      <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
      <ExpenseForm addExpenses={addExpenses} />
      <TransactionFilter onFilterChange={handleFilterChange} />
      <ExpenseData expenses={filteredExpense} handleDeleteExpense={handleDeleteExpense} />
    </div>

  );
}

export default Home;
