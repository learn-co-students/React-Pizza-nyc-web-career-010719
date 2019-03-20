import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import PizzaForm from './components/PizzaForm';
import PizzaList from './containers/PizzaList';

class App extends Component {
  state = {
    topping: null,
    size: null,
    vegetarian: null,
    newPizza: null,
  };

  createPizza = e => {
    fetch('http://localhost:3000/pizzas', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({
        'topping': this.state.topping,
        'size': this.state.size,
        'vegetarian': this.state.vegetarian,
      }),
    })
    .then(r => r.json())
    .then(newPizza => {
      this.setState({ newPizza });
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <Header/>
        { /* <PizzaForm
          change={this.handleChange}
          submit={this.createPizza}
        /> */}
        <PizzaList
          newPizza={this.state.newPizza}
        />
      </Fragment>
    );
  };
};

export default App;
