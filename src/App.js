import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// COMPONENTS
import Landing from './components/Landing';
import Form from './components/Form';
import Results from './components/Results';

class App extends Component {
  constructor() {
    super();
    this.state = {
       alcoholChoice: ''
    }
  }
  
  getUserChoice = (alcoholChoice) => {
    this.setState({
      alcoholChoice
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/form" render={(props) => <Form {...props} getUserChoice={this.getUserChoice} />} />
          <Route path="/results" render={(props) => <Results {...props} alcohol={this.state.alcoholChoice} recipe={this.state.userDrink} />} />
          {/* <Preloader /> */}
        </div>
      </Router>
    )
  }
}

export default App;
