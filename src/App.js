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
  }


  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => {
      this.setState({pizzas})
    })
  }

  selectEditPizza = (pizza) => {
    this.setState({
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  changePizza = (e) => {
    if (e.target.value === "Vegetarian") {
      this.setState({vegetarian: true})
    }
    else if (e.target.value === "Not Vegetarian") {
      this.setState({vegetarian: false})
    }
    else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  submitEdit = () => {
    let data = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }

    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pizza => {
      let oldPizzas = [...this.state.pizzas]
      let newPizzas = oldPizzas.map(op => op.id === pizza.id ? pizza : op)
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
        <PizzaForm topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian} changePizza={this.changePizza} submitEdit={this.submitEdit}/>
        <PizzaList pizzas={this.state.pizzas} selectEditPizza={this.selectEditPizza}/>
      </Fragment>
    );
  }
}

export default App;
