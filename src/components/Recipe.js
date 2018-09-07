import React, { Component } from 'react';
import { getAlcohol } from './Axios';
import './../partials/_recipe.scss';

class Recipe extends Component {
  constructor(){
    super();
    this.state = {
      bar: []
    }
  }
  componentDidMount(){
    this.getLcbo(); 
  }

  getLcbo = () => {
    let bar = ['testing'];
    // console.log(typeof bar);
    getAlcohol(this.props.alcohol, 'regular_price_in_cents.asc').then((res) => {
      bar.push(res[0]);
    })
    getAlcohol(this.props.alcohol, 'regular_price_in_cents.desc').then((res) => {
      bar.push(res[0]);
    })
    this.setState({
      bar
    })
    console.log(this.state.bar);
    // console.log(typeof bar);
    // this.setState({
    //   bar: 
    // })
    // console.log(typeof this.state.bar);
  }

  // convertPrice = (i) => {
  //   const price = this.state.bar[i].regular_price_in_cents / 100
  //   console.log(price);
  // }

  render(){
    const instructions = this.props.recipe.ingredientLines
    return(
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
          {/* product picture */}
            <figcaption>
              {/* <a href="/">{ this.state.bar ? this.convertPrice(0) : null }</a> */}
            </figcaption>
          </figure>
  
          <figure className="alcoholInfo__box">
            {/* product picture */}
            <figcaption>
              {/* <a href="/">{this.state.bar ? this.convertPrice(1) : null}</a> */}
            </figcaption>
          </figure>
        </div>
  
        <button className="btn">Try again</button>
      </section>
    )
  }

}

export default Recipe;