import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// COMPONENTS
import { getAlcohol, getCocktails } from './components/Axios';
import Landing from './components/Landing';
import Form from './components/Form';
import Results from './components/Results';
import Recipe from './components/Recipe';


class App extends Component {
  constructor() {
    super();
    this.state = {
      cocktailArray: [],
      userDrink: ''
    }
  }
  
  // componentDidMount(){
  //   console.log('componentDidMount called');
  //   getAlcohol('vodka').then((res) => {
  //     console.log(res.data.result);
  //   });
  //   getAlcohol('wine');
  //   getAlcohol('beer');
  //   getCocktails('vodka');
  // }
  randomizer = (arr) => {
    const item = arr[Math.floor(Math.random() * arr.length)];
    console.log(item);
    return item;
  }
  getUserChoice = (choiceOfAlcohol) => {
    getCocktails(choiceOfAlcohol).then ((cocktailArray) => {
      this.setState({
        cocktailArray
      }, () => {
        this.getRandomCocktail();
      }
    )  
    })
  }

  getRandomCocktail = () => {
    const cocktailChoice = this.randomizer(this.state.cocktailArray);
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Landing />
          <Route exact path="/Form" render={() => <Form getUserChoice={this.getUserChoice} />} />
          <Results />
          <Route exact path ="/Recipe" component={Recipe} />
        </div>
      </Router>
    )
  }
}

export default App;
