
import React, { useState } from 'react';

 export default function Form({ onAddTransaction }) {
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    description: '',
    amount: '',
    date: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTransaction(newTransaction);
    setNewTransaction({
      category: '',
      description: '',
      amount: '',
      date: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello there, Transact with us</h1>
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        name="category"
        value={newTransaction.category}
        onChange={handleInputChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={newTransaction.description}
        onChange={handleInputChange}
      />

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        name="amount"
        value={newTransaction.amount}
        onChange={handleInputChange}
      />

      <label htmlFor="date">Enter date:</label>
      <input
        type="date"
        name="date"
        value={newTransaction.date}
        onChange={handleInputChange}
      />

      <input type="submit" />
    </form>
  );
}


