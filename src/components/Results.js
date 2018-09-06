import React, { Component } from 'react';
import './../partials/_results.scss';
import { Link } from 'react-router-dom';

class Results extends Component {

  render(){
    return(
      <section className="results">
        <h2 className="h2">{this.props.recipe.name}</h2>

        <div className="results__item">
        { this.props.recipe ? <img src={this.props.recipe.images[0].imageUrlsBySize[360]} alt={`image of ${this.props.recipe.name}`}/> : null }
        </div>

        <div className="results__description">
          <h3 className="h3">Featuring</h3>
          <p class="results__beverages">{`Moon Dollar Coffee & ${this.props.alcohol}`}</p>
        </div>

        <div className="btn-container">
          <Link to="/Form">
            <button className="btn">Shake it up</button>
          </Link>
          <Link to="/Recipe">
            <button className="btn">Serve it up</button>
          </Link>
        </div>
      </section>
    )
  }
}

export default Results;