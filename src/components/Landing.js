import React from 'react';
import './../partials/_landing.scss';
import { Link } from 'react-router-dom';


const Landing = () => {
  return(
    <section className="landing">
      <div className="landing__description clearfix">
        <h1 className="h1">Moon Shadow Cocktails</h1>
        <div className="floatLeft">
          <p className="textblock">Taking the comfort of coffee and the warmth of spirits to your next holiday mixer</p>
          <p className="textblock">
            You've tasted our perfectly roasted, carefully crafted <span className="fontYellow"> Moon Dollar Dark Roast Coffee</span>, now we invite you to take those quality arabica beans to the next level. Let us help you create the ultimate signature beverage this holiday season. Fragrant coffee with smooth alcohol? What could be better?
          </p>
          <Link to="/form" className="landingBtn">
            <button className="btn">Inspire Me</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Landing;