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
        <h2 className="h2">Ingredients</h2>
  
        <div className="recipe__description">
          <ul>
            {instructions ? instructions.map((ingredient) => {
              return (<li key={ingredient} >{ingredient}</li>)
            }): null} 
          </ul>
        </div>
  
        <div className="recipe__alcoholInfo">
          {this.state.cheap 
            ? 
            <figure className="alcoholInfo__box">
              <img className="alcoholInfo__box--img" src={this.state.cheap.image_thumb_url} alt={this.state.cheap.description} /> 
              <figcaption className="alcoholInfo__box--description">
                <a href={`http://www.lcbo.com/lcbo/product/${this.state.cheap.name.replace(/\s+/g, '-').toLowerCase()}/${this.state.cheap.id}`}>{this.state.cheap ? this.convertPrice(this.state.cheap).toFixed(2) : null}</a>
              </figcaption>
            </figure>
            : null }

            {this.state.expensive 
            ?
            <figure className="alcoholInfo__box">
              <img src={this.state.expensive.image_thumb_url} alt={this.state.expensive.description}/> 
              <figcaption>
                <a href={`http://www.lcbo.com/lcbo/product/${this.state.expensive.name.replace(/[\s+\']/g, '-').toLowerCase()}/${this.state.expensive.id}`}>{this.convertPrice(this.state.expensive).toFixed(2)}</a>
              </figcaption>
            </figure>
            : null }
            


  
        </div>
            
        <Link to="/">
          <button className="btn">Try again</button>
        </Link>
      </section>
    )
  }
}

export default Recipe;