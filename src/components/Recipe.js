import React from 'react';
import './../partials/_recipe.scss';

const Recipe = () => {
  return(
    <section className="recipe">
      <h2 className="h2">Your Signature Cocktail</h2>

      <div className="recipe__description">
      </div>

      <div className="recipe__alcoholInfo">
        <figure className="alcoholInfo__box">
        {/* product picture */}
          <figcaption>
            <a href="#">basic</a>
          </figcaption>
        </figure>

        <figure className="alcoholInfo__box">
          {/* product picture */}
          <figcaption>
            <a href="#">expensive</a>
          </figcaption>
        </figure>
      </div>

      <button className="btn">Try again</button>
    </section>
  )
}

export default Recipe