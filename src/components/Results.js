import React, { Component } from 'react';
import './../partials/_results.scss';
import { Route, Link } from 'react-router-dom';
import Recipe from './Recipe';

class Results extends Component {
  render(){
    return(
      <section className="results">
        <div className="resultsWrap wrapper">
          <h2 className="h2">{this.props.recipe.name}</h2>

          <figure className="resultsItem">

            { this.props.recipe ? <img className="resultsItem__image" src={this.props.recipe.images[0].imageUrlsBySize[360]} alt={`${this.props.recipe.name}`}/> : null }

            <figcaption className="resultsItem__description clearfix">
              <h3 className="h3">Featuring</h3>
              <p className="resultsItem__description--beverages"><span className="fontYellow"> Moon Dollar Coffee</span> & <span className="capitalize">{`${this.props.alcohol}`}</span></p>

            </figcaption>
          </figure>

          <Link to="/form" >
            <button className="btn btn--shake">Shake it up</button>
          </Link>

          <Link to="/results/recipe">
            <button className="btn btn--serve">Serve it up</button>
          </Link>
          
          <Route path="/results/recipe" render={(props) => <Recipe {...props} alcohol={this.props.alcohol} recipe={this.props.recipe}/>} />
        </div>
      </section>
    )
  }
}

export default Results;