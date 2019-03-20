import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {


  state={
    allPizza: [],
    pizzaToEdit: {
      topping: '',
      size: 'small',
      vegetarian: false
    }
  }

  fetchPizzas(){
    fetch('http://localhost:3000/pizzas')
    .then(r => r.json())
    .then(pizza => this.setState({ allPizza:pizza }))
  }

  changeTopping = (e) => {
    this.setState({
      ...this.state,
      pizzaToEdit: {
        ...this.state.pizzaToEdit,
      topping: e.target.value
    }})
    console.log(this.state.pizzaToEdit)

  }

  changeSize = (e) => {
    this.setState({
      ...this.state,
      pizzaToEdit: {
        ...this.state.pizzaToEdit,
      size: e.target.value
    }})
    console.log(this.state.pizzaToEdit)
  }

  changeVeg = (e) => {
    let value = (e.target.value === "Vegetarian") ?  true : false
    this.setState({
      ...this.state,
      pizzaToEdit: {
        ...this.state.pizzaToEdit,
      vegetarian: value
    }})
    console.log(this.state.pizzaToEdit)
  }

  handleSubmit = (e) => {
    let updatedPizza = this.state.pizzaToEdit
    fetch(`http://localhost:3000/pizzas/${updatedPizza.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
       "topping": updatedPizza.topping,
       "size": updatedPizza.size,
       "vegetarian": updatedPizza.vegetarian
     })
    }).then(r=>r.json())
    let pizzas = this.state.allPizza
    let oldPizza = pizzas.find(pizza => pizza.id === updatedPizza.id)
    let index = pizzas.indexOf(oldPizza)
    pizzas.splice(index, 1, updatedPizza)
    this.setState({
      allPizza:pizzas
    })
  }

  editPizza = (id) => {
    let pizza = this.state.allPizza.find(pizza => pizza.id === id)
    this.setState({pizzaToEdit:pizza})
  }

  componentDidMount(){
    this.fetchPizzas()
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToEdit={this.state.pizzaToEdit}
        changeTopping={this.changeTopping}
        changeVeg={this.changeVeg}
        changeSize={this.changeSize}
        handleSubmit={this.handleSubmit}/>
        <PizzaList allPizza={this.state.allPizza} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
