import React, { useState, useEffect } from "react";
import axios from "axios";
import './ExpenseTracker.css'

function ExpenseTracker({ expenses, setExpenses }) {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  useEffect(() => {
    // Load expenses from localStorage on component mount
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, [setExpenses]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (expenseName.trim() !== '' && expenseAmount.trim() !== '') {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount)
      };
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newExpense);
        const { data } = response;
        setExpenses(prevExpenses => [...prevExpenses, data]);
        localStorage.setItem('expenses', JSON.stringify([...expenses, data]));
        setExpenseName('');
        setExpenseAmount('');
      } catch (error) {
        console.error('Error adding expense:', error)
      }
      
    }
  };

  const handleNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };
    const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return (
    <form onSubmit={handleSubmit}> 
      <h1> Add new expense </h1>
      <label> Name</label>
      <input type='text' name='expensename' onChange={handleNameChange} value={expenseName}/>
      <label> Amount</label>
      <input type='number' name='expenseAmount' onChange={handleAmountChange} value={expenseAmount}/>
      <button type='submit'> Submit</button>
    </form>
  );
}

export default ExpenseTracker;
