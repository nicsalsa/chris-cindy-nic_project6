import React, { Component } from 'react';
import { getAlcohol } from './components/Axios';
import './App.css';

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

      </div>
    );
  }
}

export default App;
