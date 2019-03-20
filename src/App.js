import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    pizza: null,
    topping: "",
    size: "",
    vegetarian: false
  }

  fetchPizzas = () => {
    fetch('http://localhost:3000/pizzas')
    .then(r => r.json())
    .then(p => {
      this.setState({pizzas: p})
    })
  }

  componentDidMount = () => {
    this.fetchPizzas()
  }

  getPizza = (pizzaId) => {
    let p = this.state.pizzas.find(p => p.id === pizzaId)
    this.setState({pizza: p})
  }

  handleChange = (thing) => {
    console.log(thing.name);
    console.log(thing.value);
    this.setState({[thing.name]: thing.value})
  }

  handleClick = (e) => {
    let hold = null
    if (this.state.vegetarian === "false") {
      hold = false
    } else {
      hold = true
    }
    let p = {id: this.state.pizza.id, topping: this.state.topping, size: this.state.size, vegetarian: hold}
    let replaced = [...this.state.pizzas]
    replaced[this.state.pizza.id-1] = p
    this.setState({pizzas: replaced, pizza: p, topping: "", size: "", vegetarian: ""})
    fetch(`http://localhost:3000/pizzas/${this.state.pizza.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"id": p.id,
        "topping": p.topping,
        "size": p.size,
        "vegetarian": p.vegetarian})
    })
    .then(r => r.json())
    .then(pizza => {
    })

  }

  render() {
    console.log("state of pizza: " + this.state.pizza);
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizza} handleChange={this.handleChange}
          topping={this.state.topping} vegetarian={this.state.vegetarian}
          handleClick={this.handleClick}/>
        <PizzaList pizzas={this.state.pizzas} getPizza={this.getPizza}/>
      </Fragment>
    );
  }
}

export default App;

// <Fragment>
//   <Header/>
//   <PizzaForm/>
//   <PizzaList pizzas={this.state.pizzas}/>
// </Fragment>
