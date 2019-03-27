import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    pizzaForEdit: {}
  }

  fetchPizzas = () => {
    fetch("http://localhost:7000/pizzas")
    .then(r => r.json())
    .then(json => this.setState({pizzas: json}))
  }

  componentDidMount(){
    this.fetchPizzas()
  }

  pizzaEdit = (id) => {
    let thePizzaForEdit = this.state.pizzas.find(pizza=> pizza.id === id)
    console.log("editing pizza", id)
    this.setState({pizzaForEdit: thePizzaForEdit})
  }

  submitPizzaEdit = (pizzaForEdit) => {
    // console.log("pizza submitted", pizzaForEdit)
    this.editPizza(pizzaForEdit)
  }

  editPizza = (pizzaForEdit) => {
    let data = {
      topping: pizzaForEdit.topping,
      size: pizzaForEdit.size,
      vegetarian: pizzaForEdit.vegetarian
    }
    console.log(data)
    console.log("pizzaforedit", pizzaForEdit.id)
    fetch(`http://localhost:7000/pizzas/${pizzaForEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "appication/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(json => this.setState({pizzaForEdit: json}))
  }

  updatePizzaTopping = (newTopping) => {
    this.setState(prevState => ({ pizzaForEdit: {...prevState.pizzaForEdit, topping: newTopping} }))
  }

  updatePizzaSize = (newSize) => {
    this.setState(prevState => ({ pizzaForEdit: {...prevState.pizzaForEdit, size: newSize} }))
  }

  updatePizzaVeg = (newVeg) => {
    this.setState(prevState => ({ pizzaForEdit: {...prevState.pizzaForEdit, vegetarian: newVeg} }))
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizzaForEdit={this.state.pizzaForEdit}
          pizzas={this.state.pizzas}
          submitPizzaEdit={this.submitPizzaEdit}
          updatePizzaTopping={this.updatePizzaTopping}
          updatePizzaSize={this.updatePizzaSize}
          updatePizzaVeg={this.updatePizzaVeg}
          />
        <PizzaList
          pizzas={this.state.pizzas}
          pizzaEdit={this.pizzaEdit}/>
      </Fragment>
    );
  }
}

export default App;
