import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// COMPONENTS
import { getCocktails, getRecipe, getAlcohol } from './components/Axios';
import Landing from './components/Landing';
import Form from './components/Form';
import Results from './components/Results';
import Recipe from './components/Recipe';


class App extends Component {
  constructor() {
    super();
    this.state = {
      choiceOfAlcohol: '',
      cocktailArray: [],
      userDrink: ''
    }
  }
  
  randomizer = (arr) => {
    const item = arr[Math.floor(Math.random() * arr.length)];
    return item;
  }
  getUserChoice = (choiceOfAlcohol) => {
    this.setState({
      choiceOfAlcohol
    });
    getCocktails(choiceOfAlcohol).then((cocktailArray) => {

      const uniqueCocktailArray = new Set(cocktailArray);
      const uniqueCocktailArray2 = Array.from(uniqueCocktailArray)
      this.setState({
        cocktailArray: uniqueCocktailArray2
      }, () => {
        this.getRandomCocktail();
      }
    )  
    })
  }

  getRandomCocktail = () => {
    const userDrink = this.randomizer(this.state.cocktailArray);
    this.getRecipeDetails(userDrink.id);
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
          <Route exact path="/results" render={(props) => <Results {...props} recipe={this.state.userDrink} alcohol={this.state.choiceOfAlcohol} />} />
          
          <Route exact path ="/recipe" render={(props) => <Recipe {...props} recipe={this.state.userDrink} alcohol={this.state.choiceOfAlcohol} />} />
        </div>
      </Router>
    )
  }
}

export default App;
