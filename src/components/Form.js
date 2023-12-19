
import React, { useState } from 'react';
import  './Form.css'

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
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="form-title">Hello there, Transact with us</h1>
      <label className="form-label" htmlFor="category">Category:</label>
      <input
        className="form-input"
        type="text"
        name="category"
        required
        value={newTransaction.category}
        onChange={handleInputChange}
      />

      <label className="form-label" htmlFor="description">Description:</label>
      <input
        className="form-input"
        type="text"
        name="description"
        required
        value={newTransaction.description}
        onChange={handleInputChange}
      />

      <label className="form-label" htmlFor="amount">Amount:</label>
      <input
        className="form-input"
        type="number"
        name="amount"
        required
        value={newTransaction.amount}
        onChange={handleInputChange}
      />

      <label className="form-label" htmlFor="date">Enter date:</label>
      <input
        className="form-input"
        type="date"
        name="date"
        required
        value={newTransaction.date}
        onChange={handleInputChange}
      />

      <input className="form-submit" type="submit" />
    </form>
  );
}


