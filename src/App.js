import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link } from 'react-route-dom';

// COMPONENTS
import Landing from './components/Landing';
import Form from './components/Form';
import Results from './components/Results';
import Recipe from './components/Recipe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <Form />
        <Results />
        <Recipe />
      </div>
    )
  }
}

export default App;
