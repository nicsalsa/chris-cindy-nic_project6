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
            
      const spirits = allProduct.filter((product) => {
        console.log(product.regular_price_in_cents, '|', product.name);
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
    })
  }
  
  convertPrice = (obj) => {
      const price = obj.regular_price_in_cents / 100
      return price;
    }
    
  componentDidMount(){
    this.getLcbo(); 
  }
  
render() {

    const instructions = this.props.recipe.ingredientLines;
    const newInstructions = new Set(instructions);
    // console.log(newInstructions);
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