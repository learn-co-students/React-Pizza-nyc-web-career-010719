import React, { Component, Fragment } from 'react';
import Pizza from '../components/Pizza';
import PizzaForm from '../components/PizzaForm';

class PizzaList extends Component {
  state = {
    pizzas: [],
    edit: null,
    topping: null,
    size: null,
    vegetarian: null,
  };

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(r => r.json())
    .then(pizzas => {
      this.setState({ pizzas });
    });
  };

  edit = pizza => {
    this.state.edit === pizza
      ?
    this.setState({ edit: null })
      :
    (
      this.setState({
        edit: pizza,
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian,
      })
    );
  };

  handleSubmit = () => {
    let index;
    index = this.state.pizzas.findIndex(p => {
      return p.id === this.state.edit.id;
    });

    fetch(`http://localhost:3000/pizzas/${this.state.edit.id}`, {
      method: 'PATCH',
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
      this.setState({
        pizzas: [
          ...this.state.pizzas.slice(0, index),
          newPizza,
          ...this.state.pizzas.slice(index + 1)
        ]
      });
    });
  };

  handleChange = e => {
    let bool;
    e.target.value === 'true'
      ?
    bool = true
      :
    bool = false

    e.target.name === 'vegetarian' || e.target.name === 'not-vegetarian'
      ?
    this.setState({
      vegetarian: bool
    }, () => { console.log('setState', this.state) })
      :
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  renderPizzas = () => {
    return this.state.pizzas.map(p => {
      return (
        this.state.edit === p
          ?
        <Fragment key={p.id}>
          <Pizza
            edit={() => this.edit(p)}
            { ...p }
          />
          <PizzaForm
            change={this.handleChange}
            submit={this.handleSubmit}
            { ...p }
            vegetarian={this.state.vegetarian}
          />
        </Fragment>
          :
        <Pizza
          key={p.id}
          edit={() => this.edit(p)}
          { ...p }
        />
      );
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPizzas()}
          {
            this.props.newPizza
              ?
            <Pizza
              edit={() => this.edit(this.props.newPizza)}
              { ...this.props.newPizza }
            />
              :
            <Fragment />
          }
        </tbody>
      </table>
    );
  };
};

export default PizzaList;
