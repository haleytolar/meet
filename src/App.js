// App.js

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Make a GET request to the server
      const response = await fetch('http://localhost:8080/');
      const data = await response.json();
      console.log('Data from server:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
