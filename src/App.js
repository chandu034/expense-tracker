import React, { useState } from 'react';
import ExpenseTracker from './Components/ExpenseTracker';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const totalIncome = 600; 

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const balance = totalIncome - totalExpenses;
  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return (
    <div className="App">
      <h3> Expense Tracker</h3>
      <p className="balance"> Your balance : $ {balance}</p>
      <div className="income-expenses">
        <p className="income"> Income : $ {totalIncome}</p>
        <p className="expenses"> Expenses : $ {totalExpenses}</p>
      </div>
      <div className="history"> 
        <h1> History </h1>
        <ul>
          {expenses.map((expense, index) => (
            <div key={index} className="expense-card">
              <h2>{expense.name}</h2>
              <p>Amount: ${expense.amount}</p>
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