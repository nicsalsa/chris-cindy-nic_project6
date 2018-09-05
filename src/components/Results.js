import React, { Component } from 'react';
import './../partials/_results.scss';

class Results extends Component {
  render(){
    return(
      <section className="results">
        <h2 className="h2">Cocktail Name</h2>

        <div className="results__item">
        </div>

        <div className="results__description">
          <h3 className="h3">Featuring</h3>
          <p>Moon Dollar Coffee & alcohol</p>
        </div>

        <div className="btn-container">
          <button className="btn">Shake it up</button>
          <button className="btn">Serve it up</button>
        </div>
      </section>
    )
  }
}

export default Results;