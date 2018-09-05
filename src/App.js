import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link } from 'react-route-dom';

// COMPONENTS
import { getAlcohol } from './components/Axios';
import Landing from './components/Landing';
import Form from './components/Form';
import Results from './components/Results';
import Recipe from './components/Recipe';

class App extends Component {
  
  componentDidMount(){
    console.log('componentDidMount called');
    getAlcohol('vodka').then((res) => {
      console.log(res.data.result);
    });
    getAlcohol('wine');
    getAlcohol('beer');
  }
  
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
