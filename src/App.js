import React, {useState, useEffect} from 'react';
import Table from './components/Table';
import Form from './components/Form';
import Search from './components/Search';
import './App.css';


function App() {

  //Declared variables for transaction and search
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the deployed bank data API using fetch 

    fetch('https://bank-data-szbr.onrender.com/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle form submission

  const handleAddTransaction = (newTransaction) => {
    fetch('https://bank-data-szbr.onrender.com/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {setTransactions([...transactions, data]);
      })
      .catch((error) => console.error('Error adding transaction:', error));
  };

  //function to delete from deployed DB 

  const handleDeleteTransaction = (id) => {
    fetch(`https://bank-data-szbr.onrender.com/transactions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting transaction:', error));
  };

   // Function for the search box
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter transactions based on the search term
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    //The User displayed DOM
    <div className="App-header">
      <h1>Bank of Flatiron</h1>
      <Form onAddTransaction={handleAddTransaction} />
      <h2>Transaction Data:</h2>
      <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Table
        transactions={filteredTransactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default App;