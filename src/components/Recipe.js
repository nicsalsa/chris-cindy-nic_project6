import React, { Component } from 'react';
import { getAlcohol } from './Axios';
import './../partials/_recipe.scss';

class Recipe extends Component {
  constructor(){
    super();
    this.state = {
      bar: [],
      page: 1
    }
  }
  
  componentDidMount(){
    this.getLcbo();
  }
  
  getNextPage = (order) => {
    if (!res[0]) {
      const page = this.state.page + 1;
      this.setState({
        page
      });
      getAlcohol(this.props.alcohol, order, page).then((res) => {
        bar.push(res[0])
      });
  }

  getLcbo = () => {
    const bar = []
    getAlcohol(this.props.alcohol, 'regular_price_in_cents.asc').then((res) => {
      getNextPage();
      bar.push(res[0]);
    });
    getAlcohol(this.props.alcohol, 'regular_price_in_cents.desc').then((res) => {
      bar.push(res[0]);
    });

  }

  render(){
    const instructions = this.props.recipe.ingredientLines
    return(
      <section className="recipe">
        <h2 className="h2">{this.props.recipe.name}</h2>
  
        <div className="recipe__description">
          <ul>
            {instructions ? instructions.map((ingredient) => {
              return (<li key={this.props.recipe.id} >{ingredient}</li>)
            }): null} 
          </ul>
        </div>
  
        <div className="recipe__alcoholInfo">
          <figure className="alcoholInfo__box">
          {/* product picture */}
            <figcaption>
              <a href="/">basic</a>
            </figcaption>
          </figure>
  
          <figure className="alcoholInfo__box">
            {/* product picture */}
            <figcaption>
              <a href="/">expensive</a>
            </figcaption>
          </figure>
        </div>
  
        <button className="btn">Try again</button>
      </section>
    )
  }

}

export default Recipe;