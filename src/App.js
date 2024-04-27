import React, { useState } from 'react';
import ExpenseTracker from './Components/ExpenseTracker';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const[ darkMode, setDarkMode] = useState(false);
  const totalIncome = 600; 

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const balance = totalIncome - totalExpenses;
  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // Toggle dark mode state
  };
  const handleDuplicateExpense = (index) => {
    const expenseToDuplicate = expenses[index];
    const duplicatedExpense = { ...expenseToDuplicate }; // Create a copy of the expense
    setExpenses(prevExpenses => [...prevExpenses, duplicatedExpense]); // Add the duplicated expense to the expenses array
    localStorage.setItem('expenses', JSON.stringify([...expenses, duplicatedExpense])); // Update localStorage
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className='title'>
      <h3> Expense Tracker</h3>
      </div>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className='card balance-card'> 
      <p className="balance"> Your balance : $ {balance}</p>
      </div>
      
      <div className="card income-card">
        <p className="income"> Income : $ {totalIncome}</p>
      </div>
      <div className="card expenses-card"> 
      <p className="expenses"> Expenses : $ {totalExpenses}</p>
      </div>
      <div className="history"> 
        <h1> History </h1>
        <ul>
          {expenses.map((expense, index) => (
            <div key={index} className="expense-card">
              <h2>{expense.name}</h2>
              <p>Amount: ${expense.amount}</p>
              <button onClick={() => handleDuplicateExpense(index)}>Duplicate</button> {/* Add this button */}
              <button> Edit</button>
              <button onClick={() => handleDeleteExpense(index)}> Delete</button>
            </div>
  ))}
        </ul>
        <ExpenseTracker expenses={expenses} setExpenses={setExpenses}></ExpenseTracker>
      </div>
    </div>
  );
}

export default App;