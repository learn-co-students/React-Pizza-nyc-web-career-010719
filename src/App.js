import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
state = {
  allPizzas: [],
  editPizza: '',
  editTopping: 'Pizza Topping',
  editSize: 'small',
  editVegetarian: null
}

componentDidMount() {
  fetch('http://localhost:3000/pizzas')
  .then(res => res.json())
  .then(pizzaRes => {
    this.setState({
      allPizzas: pizzaRes
    })
  })
}

editPizza = (id) => {
  let pizzaToEdit = this.state.allPizzas.find(pizza => pizza.id === id)
  this.setState({
    editPizza: pizzaToEdit,
    editTopping: pizzaToEdit.topping,
    editSize: pizzaToEdit.size,
    editVegetarian: pizzaToEdit.vegetarian
  })
}

handlePizzaInput = (event) => {
  if (event.target.type === 'text'){
    this.setState({
      editTopping: event.target.value
    }, () => console.log(this.state.editTopping))
  }
  else if (event.target.type === "select-one"){
    this.setState({
      editSize: event.target.value
    }, () => console.log(this.state.editSize))
  }
  else if (event.target.type === "radio") {
    if (event.target.value === "Vegetarian"){
      this.setState({
        editVegetarian: true
      })
    }
    else if (event.target.value === "Not Vegetarian"){
        this.setState({
          editVegetarian: false
        })
      }
    }
  }

updatePizzas = (id) => {
  let pizzaToEdit = this.state.allPizzas.find(pizza => pizza.id === id)
  let data = {
    topping: this.state.editTopping,
    size: this.state.editSize,
    vegetarian: this.state.editVegetarian
  }
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
       body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(editedPizza => {
      let newArray = [...this.state.allPizzas]
      let foundPizza = this.state.allPizzas.find(pizza => pizza.id == editedPizza.id)
      let index = newArray.indexOf(foundPizza)
      newArray.splice(index, 1, editedPizza)
      this.setState({
        allPizzas: newArray
      }, console.log(this.state.allPizzas))
    })
}


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToEdit={this.pizzaToEdit}
          editTopping={this.state.editTopping}
          editSize={this.state.editSize}
          editVegetarian={this.state.editVegetarian}
          editPizza={this.state.editPizza}
          handlePizzaInput={this.handlePizzaInput}
          updatePizzas={this.updatePizzas}
          />
        <PizzaList allPizzas={this.state.allPizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
