import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const dodaj = (event)=>{
    event.preventDefault();
    alert('dodalem');
    axios.post('http://localhost:8080/api/temperature', {
      value: '10.10',
      dataTime: '123'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const odczytaj = (event)=>{
    event.preventDefault();
    axios.get('http://localhost:8080/api/temperature')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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
          <div onClick={(e)=>dodaj(e)}>Dodaj</div>
          <div onClick={(e)=>odczytaj(e)}>Odczytaj</div>
        </a>
      </header>
    </div>
  );
}

export default App;
