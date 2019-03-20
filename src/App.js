import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const API = "http://localhost:3000/pizzas"

class App extends Component {

  state = {
    pizzas: [],
    currentPizza: {
      id: "",
      topping: "",
      size: "",
      vegetarian: false
    }
  }

  componentDidMount(){
    fetch(API)
      .then(r=>r.json())
      .then(pizzas => {
        this.setState({
          pizzas: [...pizzas]
        })
      })
  }

  handlePizzaEdit = (id, tops, size, veg) => {
    this.setState({
      ...this.state,
      currentPizza: {
        id: id,
        topping: tops,
        size: size,
        vegetarian: veg
      }
    })
  }

  handleSizeChange = (e) => {
    this.setState({
      ...this.state,
      currentPizza: {
        ...this.state.currentPizza,
        size: e.target.value,
    }})
  }

  handleToppingChange = (e) => {
    this.setState({
      ...this.state,
      currentPizza: {
        ...this.state.currentPizza,
        topping: e.target.value,
    }})
  }

  handleVegClick = (e) => {
    let value = e.target.value === "Vegetarian" ? true : false
    this.setState({
      ...this.state,
      currentPizza: {
        ...this.state.currentPizza,
        vegetarian: value,
    }})
  }

  handleEditSubmit = (e) => {
    e.preventDefault()
    let currentPizza = this.state.currentPizza
    fetch(API+`/${currentPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "topping": currentPizza.topping,
        "size": currentPizza.size,
        "vegetarian": currentPizza.vegetarian
      })
      })
      .then(r=>r.json())
      let allPizzas = this.state.pizzas
      let oldPizza = allPizzas.find(pizza => pizza.id === currentPizza.id)
      let index = allPizzas.indexOf(oldPizza)
      allPizzas.splice(index, 1, currentPizza)
      this.setState({
        pizzas: allPizzas,
      })
    }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizza={this.state.currentPizza}
          handleSizeChange={this.handleSizeChange}
          handleToppingChange={this.handleToppingChange}
          handleEditSubmit={this.handleEditSubmit}
          handleVegClick={this.handleVegClick}/>
        <PizzaList pizzas={this.state.pizzas} handlePizzaEdit={this.handlePizzaEdit}/>
      </Fragment>
    );
  }
}

export default App;
