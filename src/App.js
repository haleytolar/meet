import React, { useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';

const App = () => {
  const [currentNOE, setCurrentNOE] = useState(32);
  const [errorAlert, setErrorAlert] = useState("");

  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
    </div>
  );
}

export default App;
