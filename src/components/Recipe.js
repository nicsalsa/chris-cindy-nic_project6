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
    getAlcohol(this.props.alcohol).then((res) => {
      this.setState({
        // call lcbo api twice in order to get the descending order of regular price in cents and the ascending. to get the cheaper brand and the most expensive brand.
        bar: res
      })

    })
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