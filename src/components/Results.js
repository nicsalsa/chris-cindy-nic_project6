import React, { Component } from 'react';
import './../partials/_results.scss';
import { Route, Link, Redirect } from 'react-router-dom';
import Recipe from './Recipe';
import { getCocktails, getRecipe } from './Axios';


class Results extends Component {
  constructor() {
    console.log('constructor');
    super();
    this.state = {
      cocktailArray: [],
      userDrink: '',
      // index: -1,
      redirect: false
    }
  }
  
  randomizer = (max, min = 0) => {
    return Math.floor(Math.random() * max + min);
  }

  getRandomCocktail = () => {
    let index = this.randomizer(this.state.cocktailArray.length);
    // let userDrink;
    // if (index === this.state.index) {
    //   this.randomizer(this.state.cocktailArray.length)
    // } else {
    const userDrink = this.state.cocktailArray[index];
    // }
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

  redirectToHome = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    } else {
      return null
    }
  }

  componentDidMount() {
    console.log('component did mount');
    if (this.props.alcohol) {
      getCocktails(this.props.alcohol).then((cocktailArray) => {
        const uniqueCocktailSet = new Set(cocktailArray);
        const uniqueCocktailArray = Array.from(uniqueCocktailSet);
        this.setState({
          cocktailArray: uniqueCocktailArray
        }, () => { this.getRandomCocktail(); });
      })
    } else {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    console.log('render');
    return(
      <section className="results">
      
        {this.state.userDrink ? 
          <div className="resultsWrap wrapper">
            
            <h2 className="h2">{this.state.userDrink.name}</h2>

            <figure className="resultsItem">
              <img className="resultsItem__image" src={this.state.userDrink.images[0].imageUrlsBySize[360]} alt={`${this.state.userDrink.name}`}/>
              <figcaption className="resultsItem__description clearfix">
                <h3 className="h3">Featuring</h3>
                <p className="resultsItem__description--beverages">
                  <span className="fontYellow"> Moon Dollar Coffee</span> & 
                  <span className="capitalize">{`${this.props.alcohol}`}</span>
                </p>
              </figcaption>
            </figure>

            <Link to="/form" >
              <button className="btn btn--shake">Stir it up</button>
            </Link>
            
            <button onClick={this.getRandomCocktail} className="btn btn--shake">Shake it up</button>

            <Link to="/results/recipe">
              <button className="btn btn--serve">Serve it up</button>
            </Link>

            <Route path="/results/recipe" render={(props) => <Recipe {...props} alcohol={this.props.alcohol} recipe={this.state.userDrink}/>} />
          </div>
          : this.redirectToHome() }
      
        <Link to="/">
          <button className="btn">Take me home</button>
        </Link>
      </section>
    )
  }
}

export default Results;