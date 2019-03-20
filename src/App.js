import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    id: "",
    topping: "",
    size: "",
    vegetarian: ""
    // selectedPizza: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then( json => {
      this.setState({ pizzas: json })
    })
  }

  selectPizza = (pizza) => {
    this.setState({
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  edit = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  vegetarianEdit = (e) => {
    // console.log("hit the vegetarianEdit", e.target.value);
    if (e.target.value === "Vegetarian") {
      this.setState({ vegetarian: true })
    } else {
      this.setState({ vegetarian: false })
    }
  }

  editPizza = (id) => {
    // this.set
    let pizza = this.state.pizzas.find( p => p.id === id)
    pizza.topping = this.state.topping
    pizza.size = this.state.size
    pizza.vegetarian = this.state.vegetarian
    // console.log("edit this pizza", pizza);
    let newPizzas = this.state.pizzas.map( p => {
      if ( p.id === id ) {
        return pizza
      } else {
        return p
      }
    })

    this.fetchPatch(pizza, newPizzas)
  }

  fetchPatch(pizza, newPizzas) {
    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(pizza)
    })
    .then(res => res.json())
    .then( () => {
      this.setState({
        pizzas: newPizzas,
        id: "",
        topping: "",
        size: "",
        vegetarian: ""
      })
    })

  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          id={this.state.id}
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
          edit={this.edit}
          editPizza={this.editPizza}
          vegetarianEdit={this.vegetarianEdit}
        />

        <PizzaList
          pizzas={this.state.pizzas}
          selectPizza={this.selectPizza}
        />
      </Fragment>
    );
  }
}

export default App;
