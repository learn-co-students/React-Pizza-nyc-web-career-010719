import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor(){
    super()
    this.state = {
      pizzas: [],
      clickedPizza: {topping: "Cherry", size: "Medium"}
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(r => r.json())
    .then(r => this.setState({pizzas: r}))
  }

  renderClickedPizza = (pizzaId) => {
    let found = this.state.pizzas.find(pizza => pizza.id == pizzaId)
    this.setState({clickedPizza: found})
  }

  postEdit = (updated) => {
    console.log(updated);
    fetch(`http://localhost:3000/pizzas/${updated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept:"application/json"
      },
      body: JSON.stringify(
        {
        topping: updated.topping,
        size: updated.size,
        vegetarian: updated.vegetarian
      }
    )
    })
    .then(r => r.json())
    .then(this.handleResponce)
  }

  handleResponce = (r) => {
    let copy = [...this.state.pizzas]
    let newPizzas = copy.map(pizza => {
      if (pizza.id == r.id){
        pizza = r
        return pizza
      }
      return pizza
    })
    this.setState({pizzas: newPizzas})
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.clickedPizza} postEdit={this.postEdit}/>
        <PizzaList pizzas={this.state.pizzas} renderClickedPizza={this.renderClickedPizza}/>
      </Fragment>
    );
  }
}

export default App;
