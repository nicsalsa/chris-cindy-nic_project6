import React, { Component } from 'react';
import { getAlcohol, filterAlcohol } from './Axios';
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
    const calls = [];
    for (let page = 1; page <= 11; page++) {
      calls.push(getAlcohol(this.props.alcohol, page));
    }
    
    Promise.all(calls).then((res) => {
      const allProduct = [];
      res.forEach((response) => {
        response.data.result.forEach((product) => {
          allProduct.push(product);
        });
      })
      
      console.log('filter my alcohol');
      
      const spirits = allProduct.filter((product) => {
        return product.primary_category === "Spirits" 
        && product.volume_in_milliliters >= 700 
        && product.image_thumb_url
        && (product.tertiary_category === null || !product.tertiary_category.includes("Flavoured")) 
        && !product.name.includes("Mott's")
        && product.name.search(/[fF]ruit/) === -1;
      })
  
      const descending = spirits.sort(function(a, b) {
        return a.regular_price_in_cents - b.regular_price_in_cents;
      });

      this.setState({
        cheap: descending[0],
        expensive: descending[(descending.length - 1)]
      })

      console.log(descending);
    })
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
    // console.log(newInstructions);
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