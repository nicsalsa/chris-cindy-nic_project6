import React, { Component } from 'react';
import { getAlcohol } from './Axios';
import './../partials/_recipe.scss';
// import { Link } from 'react-router-dom';

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
        // console.log(product.regular_price_in_cents, '|', product.name);
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
    const noRepeatInstructions = Array.from(newInstructions);

    return (
      <section className="recipe">

        {this.state.cheap && this.state.expensive ?
          <div className="container clearfix">

            <div className="recipe__description">
              <h2 className="h2">Ingredients</h2>
              <ul>
                {noRepeatInstructions.map((ingredient) => {
                  return (<li key={ingredient} >{ingredient}</li>)
                })} 
              </ul>
            </div>

            <div className="recipe__alcoholInfo clearfix">
              <figure className="alcoholInfo__box clearfix">
                <img className="alcoholInfo__box--img" src={this.state.cheap.image_thumb_url} alt={this.state.cheap.tasting_note} /> 
                <figcaption className="alcoholInfo__box--description clearfix">
                <div className="alcoholInfo__text">
                  <h3>{this.state.cheap.name}</h3>
                    <p className="alcohoInfo__price"><span className="alcohol__price--lrg">${this.convertPrice(this.state.cheap).toFixed(2)}</span> / {this.state.cheap.volume_in_milliliters}mL</p>
                  <a href={`http://www.lcbo.com/lcbo/product/${this.state.cheap.name.replace(/['\s+]/g, '-').toLowerCase()}/${this.state.cheap.id}`}>Order on lcbo.com</a>
                </div>
                </figcaption>
              </figure>

              <figure className="alcoholInfo__box clearfix">
                <img src={this.state.expensive.image_thumb_url} alt={this.state.expensive.tasting_note}/> 
                <figcaption className="alcoholInfo__box--description clearfix">
                  {/* <a href={`http://www.lcbo.com/lcbo/product/${this.state.expensive.name.replace(/['\s+]/g, '-').toLowerCase()}/${this.state.expensive.id}`}>{this.state.expensive.name} ({this.state.expensive.volume_in_milliliters}mL), ${this.convertPrice(this.state.expensive).toFixed(2)}</a> */}
                  <div className="alcoholInfo__text">
                    <h3>{this.state.expensive.name}</h3>
                    <p className="alcohoInfo__price"><span className="alcohol__price--lrg">${this.convertPrice(this.state.expensive).toFixed(2)}</span> / {this.state.expensive.volume_in_milliliters}mL</p>
                    <a href={`http://www.lcbo.com/lcbo/product/${this.state.expensive.name.replace(/['\s+]/g, '-').toLowerCase()}/${this.state.expensive.id}`}>Order on lcbo.com</a>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        : null }

      </section>
    )
  }
}

export default Recipe;