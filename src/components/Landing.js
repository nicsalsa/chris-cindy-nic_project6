import React from 'react';
import './../partials/_landing.scss';
import { Link } from 'react-router-dom';


const Landing = () => {
  return(
    <section className="landing">
      <h1 className="h1">Moon Shadow Cocktails</h1>

      <p className="textblock">You've tasted our perfectly roasted, carefully crafted coffee in each bag of our Moon Dollar Dark Roast, now we invite you to take those quality arabica beans to the next level. Let us help you create the ultimate signature beverage this holiday season. Fragrant coffee with smooth alcohol? What could be better?</p>
      <Link to="/form">
        <button className="btn">Inspire Me</button>
      </Link>
    </section>
  )
}

export default Landing;