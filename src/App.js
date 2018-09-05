import React, { Component } from 'react';
import './App.css';
import { getCocktails } from './components/Axios';

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount called');
    getCocktails('vodka');
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
