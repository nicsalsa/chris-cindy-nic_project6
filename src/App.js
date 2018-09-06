import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// COMPONENTS
import { getAlcohol, getCocktails, getRecipe } from './components/Axios';
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
    this.setState({
      choiceOfAlcohol
    });
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
          <Landing />
          <Route exact path="/Form" render={() => <Form getUserChoice={this.getUserChoice} />} />
          <Results recipe={this.state.userDrink} alcohol={this.state.choiceOfAlcohol}/>
          <Route exact path ="/Recipe" component={Recipe} />
        </div>
      </Router>
    )
  }
}

export default App;
