import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  //STATE***********************************************************************
  state={
    pizzas: [],
    id: "",
    topping: "",
    size: "",
    vegetarian: ""
  }

  //LIFECYCLE METHODS***********************************************************
  componentDidMount(){
    this.fetchPizzas()
  }

  //PIZZA LIST METHODS**********************************************************
  fetchPizzas = () => {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(pizzas => {
      this.setState({ pizzas })
    })
  }

  editPizza = (props) => {
    this.setState({
      id: props.id,
      topping: props.topping,
      size: props.size,
      vegetarian: props.vegetarian
    })
  }

  //PIZZA FORM METHODS**********************************************************
  editForm = (e) => {
    if(e.target.id === "topping" || e.target.id === "size"){
      this.setState({
        [e.target.id]: e.target.value
      })
    } else if (e.target.id === "vegetarian"){
      this.setState(prevState => ({
        vegetarian: !prevState.vegetarian
      }))
    }
  }

  updatePizza = () => {
    let data = {
      topping: this.state.topping,
      size: this.state.size,
      vegetarian: this.state.vegetarian
    }
    fetch(`http://localhost:3000/pizzas/${this.state.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(updatedPizza=>{
      let originalPizzas = [...this.state.pizzas]
      let newPizzas = originalPizzas.map(ogPizza => ogPizza.id === updatedPizza.id ? updatedPizza : ogPizza)
      this.setState({
        pizzas: newPizzas,
        id: "",
        topping: "",
        size: "",
        vegetarian: ""
      })
    })

  }

  //ACTUAL RENDER***************************************************************
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
          editForm={this.editForm}
          updatePizza={this.updatePizza}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          editPizza={this.editPizza}
        />
      </Fragment>
    );
  }
}

export default App;
