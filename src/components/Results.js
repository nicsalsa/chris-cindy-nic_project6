import React, { Component } from 'react';
import './../partials/_results.scss';
import { Route, Link, Redirect } from 'react-router-dom';
import Recipe from './Recipe';
import { getCocktails, getRecipe } from './Axios';
// import Preloader from './Preloader'

class Results extends Component {
  constructor() {
    console.log('constructor');
    super();
    this.state = {
      cocktailArray: [],
      userDrink: '',
      redirect: false,
      // preloader: false
    }
  }
  
  randomizer = (max, min = 0) => {
    return Math.floor(Math.random() * max + min);
  }

  getRandomCocktail = () => {
    let index = this.randomizer(this.state.cocktailArray.length);
    const userDrink = this.state.cocktailArray[index];
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

  // renderPreloader = () => {
  //   this.setState({
  //     preloader: true
  //   })
  // }

  // recipeDidMount = () => {
  //   this.setState({
  //     preloader: false
  //   })
  // }


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
          <div className="resultsWrap" style={{ backgroundImage: `url(${this.state.userDrink.images[0].imageUrlsBySize[360]})` }}>
            
            <div className="nav clearfix">
              <Link to="/form" >
                <button className="nav--back"><i className="fas fa-chevron-left"></i></button>
              </Link>
              <Link to="/">
                <button className="nav--home"><i className="fas fa-home"></i></button>
              </Link>
            </div>
          
            <div className="resultsItem clearfix">
              <h2 className="h2 resultsItem__title">{this.state.userDrink.name}</h2>
              <p className="resultsItem__description--beverages">
                featuring <span className="fontYellow"> Moondollars Coffee </span> and <span className="fontYellow"> {`${this.props.alcohol}`}</span>
              </p>
            </div>

            <Route path="/results/recipe" render={(props) => <Recipe {...props} recipeDidMount={this.recipeDidMount} alcohol={this.props.alcohol} recipe={this.state.userDrink}/>} />
            {/* {this.state.preloader ? <Preloader /> : null} */}

            <div className="buttons">
              <button onClick={this.getRandomCocktail} className="btn btn--shake">Shake it up</button>
              <Link to="/results/recipe">
                {/*onClick={this.renderPreloader */}
                <button className="btn btn--serve">Serve it up</button>
              </Link> 
            </div>
          </div>
          : this.redirectToHome() }    
      </section>
    )
  }
}

export default Results;