import React, { Component } from 'react';
import { getAlcohol } from './Axios';
import './../partials/_recipe.scss';
import { Link } from 'react-router-dom';

class Recipe extends Component {

  constructor(){
    super();
    this.state = {
      cheap: null,
      expensive: null,
    }
  }
    
  getLcbo = () => {
    console.log('calling to lcbo');
    for (let page = 1; page < 4; page++) {
      if (!this.state.cheap) {
        getAlcohol(this.props.alcohol, 'regular_price_in_cents.asc', page).then((res) => {
          if (res) {
            console.log(res[0]);
            this.setState({
              cheap: res[0]
            })
          }
        });
      }
    }
    
    for (let page = 1; page < 4; page++) {
      if (!this.state.expensive) {
        getAlcohol(this.props.alcohol, 'regular_price_in_cents.desc', page).then((res) => {
          if (res) {
            console.log(res[0]);
            this.setState({
              expensive: res[0]
            })
          }
        });
      }
    }
  }
  
  convertPrice = (obj) => {
      const price = obj.regular_price_in_cents / 100
      return price;
    }
    
  componentDidMount(){
    console.log('component did mount');
    this.getLcbo(); 
  }
  
render() {

    const instructions = this.props.recipe.ingredientLines;
    const newInstructions = new Set(instructions);
    console.log(newInstructions);
    return (
      <section className="recipe">
        <h2 className="h2">{this.props.recipe.name}</h2>
  
        <div className="recipe__description">
          <ul>
            {instructions ? instructions.map((ingredient) => {
              return (<li key={ingredient} >{ingredient}</li>)
            }): null} 
          </ul>
        </div>
  
        <div className="recipe__alcoholInfo">
          <figure className="alcoholInfo__box">
          {this.state.cheap ? <img src={this.state.cheap.image_thumb_url} alt={this.state.cheap.description}/> : null }
            <figcaption>
              <a href="/">{ this.state.cheap ? this.convertPrice(this.state.cheap).toFixed(2) : null }</a>
            </figcaption>
          </figure>
  
          <figure className="alcoholInfo__box">
          {this.state.expensive ? <img src={this.state.expensive.image_thumb_url} alt={this.state.expensive.description}/> : null }
            <figcaption>
              <a href="/">{this.state.expensive ? this.convertPrice(this.state.expensive).toFixed(2) : null }</a>
            </figcaption>
          </figure>
        </div>
            
        <Link to="/">
          <button className="btn">Try again</button>
        </Link>
      </section>
    )
  }
}

export default Recipe;