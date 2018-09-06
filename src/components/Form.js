import React, { Component } from 'react';
import './../partials/_form.scss';
import { getAlcohol, getCocktails } from './Axios';

class Form extends Component {
  constructor(){
    super();
    this.state = {
      userChoice: ''
    }
  }
  
  handleChange = () => {
    const userChoice = document.querySelector('.form__input:checked').value;
    this.setState({
      userChoice: userChoice
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getUserChoice(this.state.userChoice);
  }



  render(){
    return(
      <form onSubmit={this.handleSubmit} className="form">
        <fieldset onChange={this.handleChange} className="h3">Choose your poison
          <input type="radio" name="alcohol" className="form__input" value="vodka" id="vodka" />
          <label className="form__label" htmlFor="vodka">Vodka</label>

          <input type="radio" name="alcohol" className="form__input" value="tequila" id="tequila" />
          <label htmlFor="tequila">Tequila</label>

          <input type="radio" name="alcohol" className="form__input" value="whiskey" id="whiskey" />
          <label className="form__label" htmlFor="whiskey">Whiskey</label>

          <input type="radio" name="alcohol" className="form__input" value="brandy" id="brandy" />
          <label className="form__label" htmlFor="brandy">Brandy</label>

          <input type="radio" name="alcohol" className="form__input" value="bourbon" id="bourbon" />
          <label className="form__label" htmlFor="bourbon">Bourbon</label>

          <input type="radio" name="alcohol" className="form__input" value="rum" id="rum" />
          <label className="form__label" htmlFor="rum">Rum</label>

          <input type="radio" name="alcohol" className="form__input" value="beer" id="beer" />
          <label className="form__label" htmlFor="beer">Beer</label>
        </fieldset>
        <button className="btn">Submit</button>
      </form>
    )
  }
}

export default Form;