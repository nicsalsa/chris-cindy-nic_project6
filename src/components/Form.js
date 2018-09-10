import React, { Component } from 'react';
import './../partials/_form.scss';

class Form extends Component {
  constructor(){
    super();
    this.state = {
      userChoice: ''
    }
  }
  
  
  handleChange = (e) => {
    const userChoice = e.target.value;
    this.setState({
      userChoice: userChoice
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.userChoice){
    this.props.getUserChoice(this.state.userChoice);
    this.props.history.push('/results');
    }
  }



  render(){
    return(
      // <div className="formWrapper">
        <form onSubmit={this.handleSubmit} className="form wrapper">
          <h2 className="h2">Pick your poison</h2>
          <fieldset onChange={this.handleChange} className="clearfix fieldset">
            <input type="radio" name="alcohol" className="form__input" value="vodka" id="vodka" />
            <label className="form__label" htmlFor="vodka">Vodka</label>

            <input type="radio" name="alcohol" className="form__input" value="tequila" id="tequila" />
            <label htmlFor="tequila">Tequila</label>

            <input type="radio" name="alcohol" className="form__input" value="whiskey" id="whiskey" />
            <label className="form__label" htmlFor="whiskey">Whiskey</label>

            <input type="radio" name="alcohol" className="form__input" value="brandy" id="brandy" />
            <label className="form__label" htmlFor="brandy">Brandy</label>

            <input type="radio" name="alcohol" className="form__input" value="gin" id="gin" />
            <label className="form__label" htmlFor="gin">Gin</label>

            <input type="radio" name="alcohol" className="form__input" value="rum" id="rum" />
            <label className="form__label" htmlFor="rum">Rum</label>
          </fieldset>
          <button className="btn">Submit</button>
        </form>
      // </div>
    )
  }
}

export default Form;