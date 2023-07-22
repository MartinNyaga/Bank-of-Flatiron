import React, {useState, useEffect} from 'react';
import './App.css';


function App() {


  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    category:'',
    description: '',
    amount: '',
    date: '',
  });

  useEffect(() => {
    // Fetch data from the deployed bank data API using fetch 
    fetch('https://bank-data-szbr.onrender.com/transactions') 
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

   // Function to handle form submission
   const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the API to add the new transaction
    fetch('https://bank-data-szbr.onrender.com/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state to include the newly added transaction
        setTransactions([...transactions, data]);
        // Clear the form fields after successful submission
        setNewTransaction({ category:'', description: '', amount: '', date: '' });
      })
      .catch((error) => console.error('Error adding transaction:', error));
  };
  

   // Function to handle form input changes
   const newChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction((updateTrans) => ({
      ...updateTrans,
      [name]: value,
    }));
  };

  // Function to handle transaction deletion
  const deleteTransaction = (id) => {
    // Delete Request to the bank data API
    fetch(`https://bank-data-szbr.onrender.com/transactions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Update the state to remove the deleted transaction
        setTransactions((deleteTrans) =>
          deleteTrans.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting transaction:', error));
  };


  return (
    <div className="App-header">
       {/* Input form for adding transactions */}
      <form onSubmit={handleSubmit}>
      <h1>Hello there, Transact with us</h1>
      <label htmlFor="category">Category:</label>
      <input  type="text"
      name='category'
      value={newTransaction.category}
      onChange={newChange}/>

      <label htmlFor="description">Description:</label>
      <input  type="text"
      name='description'
      value={newTransaction.description}
      onChange={newChange}/>

      <label htmlFor="amount">Amount:</label>
      <input  type="number"
      name='amount'
      value={newTransaction.amount}
      onChange={newChange}/>

      <label htmlFor="date">Enter date:</label>
      <input  type="date"
      name='date'
      value={newTransaction.date}
      onChange={newChange}/>

      <input type="submit"  />
      </form>

      {/* Dom for fetched data from API */}
      <h2>Transaction Data:</h2>
      <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Delete Transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;


{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}