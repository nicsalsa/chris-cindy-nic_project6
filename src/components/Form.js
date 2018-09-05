import React, { Component } from 'react';
import './../partials/_form.scss';

class Form extends Component {
  constructor(){
    super();
    this.state = {
      userChoice: ''
    }
  }
  render(){
    return(
      <form className="form">
        <fieldset className="h3">Choose your poison</fieldset>
        <label className="form__label" htmlFor="vodka">Vodka</label>
        <input type="radio" className="form__input" value="vodka" id="vodka" />

        <label htmlFor="tequila">Tequila</label>
        <input type="radio" className="form__input" value="tequila" id="tequila" />

        <label className="form__label" htmlFor="whiskey">Whiskey</label>
        <input type="radio" className="form__input" value="whiskey" id="whiskey" />

        <label className="form__label" htmlFor="brandy">Brandy</label>
        <input type="radio" className="form__input" value="brandy" id="brandy" />

        <label className="form__label" htmlFor="bourbon">Bourbon</label>
        <input type="radio" className="form__input" value="bourbon" id="bourbon" />

        <label className="form__label" htmlFor="rum">Rum</label>
        <input type="radio" className="form__input" value="rum" id="rum" />

        <label className="form__label" htmlFor="beer">Beer</label>
        <input type="radio" className="form__input" value="beer" id="beer" />
      </form>
    )
  }
}

export default Form;