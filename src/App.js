import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// COMPONENTS
import { getCocktails, getRecipe } from './components/Axios';
import Landing from './components/Landing';
import Form from './components/Form';
import Results from './components/Results';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alcoholChoice: '',
      cocktailArray: [],
      userDrink: ''
    }
  }
  
  randomizer = (max, min = 0) => {
    return Math.floor(Math.random() * max + min);
  }

  getRandomCocktail = () => {
    const userDrink = this.state.cocktailArray[this.randomizer(this.state.cocktailArray.length)];
    this.getRecipeDetails(userDrink.id);
  }

  getUserChoice = (alcoholChoice) => {
    this.setState({
      alcoholChoice
    });
    getCocktails(alcoholChoice).then((cocktailArray) => {
      const uniqueCocktailSet = new Set(cocktailArray);
      const uniqueCocktailArray = Array.from(uniqueCocktailSet);
      this.setState({
        cocktailArray: uniqueCocktailArray
      }, () => { this.getRandomCocktail(); });  
    })
  }

  getRecipeDetails = (drink) => {
    getRecipe(drink).then((res) => {
      const userDrink = res.data
      this.setState({
        userDrink
      });
    })
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/form" render={(props) => <Form {...props} getUserChoice={this.getUserChoice} />} />
          <Route path="/results" render={(props) => <Results {...props} alcohol={this.state.alcoholChoice} recipe={this.state.userDrink}/>} />
        </div>
      </Router>
    )
  }
}

export default App;
